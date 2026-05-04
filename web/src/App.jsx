import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cálculo responsivo baseado na resolução real do jogador
const CARD_HEIGHT_PX = Math.round(window.innerHeight * 0.0625); // ~68px em 1080p, ~45px em 720p
const MAX_VISIBLE    = Math.min(12, Math.floor((window.innerHeight * 0.88) / CARD_HEIGHT_PX));
const DISTANCE       = Math.round(window.innerWidth  * 0.073);  // ~140px em 1920px, ~93px em 1280px

function App() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [options, setOptions] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0); // Índice do primeiro item visível
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [theme, setTheme] = useState({ color: '#00e58c', shadow: 'rgba(0, 229, 140, 0.4)' });

  const closeTimer = useRef(null);

  const closeWithAnimation = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setVisible(false);
      setOptions([]);
      setClosing(false);
      setScrollIndex(0);
      closeTimer.current = null;
    }, 450);
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setClosing(false);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;
      const { event: eventName, state, themeColor, themeShadow } = data;

      if (themeColor) setTheme(prev => ({ ...prev, color: themeColor }));
      if (themeShadow) setTheme(prev => ({ ...prev, shadow: themeShadow }));

      switch (eventName) {
        case 'visible':
          if (state) {
            setVisible(true);
            setClosing(false);
            setScrollIndex(0);
          } else {
            closeWithAnimation();
          }
          break;

        case 'leftTarget':
          closeWithAnimation();
          break;

        case 'setTarget': {
          cancelClose();
          const allOptions = [];

          const rawOptions = data.options;
          if (rawOptions && typeof rawOptions === 'object') {
            Object.keys(rawOptions).forEach(key => {
              const group = rawOptions[key];
              if (Array.isArray(group)) {
                group.forEach((opt, idx) => {
                  if (!opt.hide) allOptions.push({ ...opt, _type: key, _idx: idx + 1, _zone: null });
                });
              }
            });
          }

          const rawZones = data.zones;
          if (rawZones && Array.isArray(rawZones)) {
            rawZones.forEach((zoneOpts, zoneIdx) => {
              if (Array.isArray(zoneOpts)) {
                zoneOpts.forEach((opt, optIdx) => {
                  if (!opt.hide) allOptions.push({ ...opt, _type: 'zone', _idx: optIdx + 1, _zone: zoneIdx + 1 });
                });
              }
            });
          }

          const stable = allOptions.map((opt, i) => ({
            ...opt,
            _uid: `${opt._type}-${opt._zone ?? 'null'}-${opt._idx}-${opt.name ?? i}`
          }));

          if (stable.length > 0) {
            setVisible(true);
            setScrollIndex(0); // Sempre volta ao topo quando muda o menu
            setOptions(stable);
          }
          break;
        }

        default:
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // ── Scroll com roda do mouse ───────────────────────────────────
  const handleWheel = useCallback((e) => {
    if (options.length <= MAX_VISIBLE) return;
    const maxScroll = options.length - MAX_VISIBLE;
    setScrollIndex(prev => Math.max(0, Math.min(maxScroll, prev + (e.deltaY > 0 ? 1 : -1))));
  }, [options.length]);

  const CARD_HEIGHT = CARD_HEIGHT_PX;
  const DISTANCE_FROM_CENTER = DISTANCE;

  // Fatia apenas os itens visíveis
  const visibleOptions = options.slice(scrollIndex, scrollIndex + MAX_VISIBLE);
  const canScrollUp   = scrollIndex > 0;
  const canScrollDown = scrollIndex + MAX_VISIBLE < options.length;

  const renderLines = () => {
    if (visibleOptions.length === 0) return null;
    const dotX = 0, dotY = 500;
    const targetX = DISTANCE_FROM_CENTER;
    const startY = dotY - ((visibleOptions.length - 1) * CARD_HEIGHT) / 2;

    return (
      <svg className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[600px] h-[1000px] pointer-events-none overflow-visible">
        <AnimatePresence>
          {visibleOptions.map((opt, i) => {
            const endY = startY + i * CARD_HEIGHT;
            const isHovered = hoveredIndex === i;
            const tX = isHovered ? targetX + 8 : targetX;
            const path = `M ${dotX} ${dotY} L ${dotX + 30} ${dotY} C ${dotX + 80} ${dotY}, ${dotX + 80} ${endY}, ${tX} ${endY}`;
            return (
              <motion.path
                key={`line-${opt._uid}`}
                d={path}
                stroke={theme.color}
                strokeWidth="2.8"
                strokeOpacity={isHovered ? 1 : 0.75}
                fill="none"
                style={{ filter: `drop-shadow(0 0 5px ${theme.color}70)` }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={closing
                  ? { pathLength: 0, opacity: 0 }
                  : { pathLength: 1, opacity: 0.8 }
                }
                transition={{
                  pathLength: {
                    duration: closing ? 0.3 : 0.4,
                    delay: closing ? (visibleOptions.length - 1 - i) * 0.04 + 0.1 : i * 0.05,
                    ease: 'easeInOut'
                  },
                  d: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                }}
              />
            );
          })}
        </AnimatePresence>
      </svg>
    );
  };

  return (
    <div className="w-screen h-screen relative font-['Saira'] overflow-hidden" style={{ background: 'transparent' }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: closing ? 0 : 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full h-full relative"
          >
            {/* Linhas SVG */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {renderLines()}
            </div>

            {/* Ponto Central */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1.1], boxShadow: [`0 0 8px ${theme.color}`, `0 0 22px ${theme.color}`, `0 0 12px ${theme.color}`] }}
                exit={{ scale: 0 }}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: theme.color }}
              />
            </div>

            {/* Container de Botões com Scroll */}
            <div
              className="absolute top-1/2 -translate-y-1/2 flex flex-col items-start"
              style={{ left: `calc(50% + ${DISTANCE_FROM_CENTER}px)` }}
              onWheel={handleWheel}
            >
              {/* Indicador de Scroll para Cima */}
              <AnimatePresence>
                {canScrollUp && !closing && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 mb-2 pl-2 cursor-pointer select-none"
                    onClick={() => setScrollIndex(prev => Math.max(0, prev - 1))}
                  >
                    <i className="fas fa-chevron-up text-xs" style={{ color: theme.color }} />
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: theme.color }}>
                      {scrollIndex} oculto{scrollIndex > 1 ? 's' : ''}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Lista de Botões Visíveis */}
              <div className="flex flex-col" style={{ gap: '10px' }}>
                <AnimatePresence mode="popLayout">
                  {visibleOptions.map((opt, index) => (
                    <motion.div
                      key={opt._uid}
                      initial={{ scaleX: 0, opacity: 0, originX: 0 }}
                      animate={closing
                        ? { scaleX: 0, opacity: 0, originX: 0 }
                        : { scaleX: 1, opacity: 1 }
                      }
                      whileHover={closing ? {} : { x: 8 }}
                      transition={{
                        duration: closing ? 0.22 : 0.32,
                        delay: closing
                          ? (visibleOptions.length - 1 - index) * 0.04
                          : 0.06 + index * 0.06,
                        x: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="group cursor-pointer h-[58px] flex items-center"
                      onClick={() => {
                        fetch('https://ox_target/select', {
                          method: 'POST',
                          body: JSON.stringify([opt._type, opt._idx, opt._zone])
                        }).catch(() => {});
                      }}
                    >
                      <div
                        className="flex items-center gap-4 px-5 h-full min-w-[220px] max-w-[440px] rounded-2xl border transition-colors duration-200"
                        style={{
                          background: 'rgba(10, 10, 12, 0.82)',
                          borderColor: `${theme.color}25`,
                          boxShadow: '0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = `${theme.color}55`}
                        onMouseLeave={e => e.currentTarget.style.borderColor = `${theme.color}25`}
                      >
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 border transition-transform duration-200 group-hover:scale-110"
                          style={{ background: `${theme.color}12`, borderColor: `${theme.color}22` }}
                        >
                          {opt.icon ? (
                            <i className={`${opt.icon.includes('fa-') ? opt.icon : 'fas fa-' + opt.icon} text-base`} style={{ color: theme.color }} />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.color }} />
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <span className="block text-white/90 text-sm font-bold tracking-widest uppercase truncate group-hover:text-white transition-colors">
                            {opt.label}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Indicador de Scroll para Baixo */}
              <AnimatePresence>
                {canScrollDown && !closing && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 mt-2 pl-2 cursor-pointer select-none"
                    onClick={() => setScrollIndex(prev => Math.min(options.length - MAX_VISIBLE, prev + 1))}
                  >
                    <i className="fas fa-chevron-down text-xs" style={{ color: theme.color }} />
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: theme.color }}>
                      {options.length - scrollIndex - MAX_VISIBLE} mais
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
