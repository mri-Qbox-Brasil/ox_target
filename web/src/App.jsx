import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CentralDot from './components/atoms/CentralDot';
import OptionsList from './components/organisms/OptionsList';
import ConnectionLines from './components/organisms/ConnectionLines';
import DebugPanel from './components/organisms/DebugPanel';

const CARD_HEIGHT = 58;
const GAP = 10;
const ITEM_HEIGHT = CARD_HEIGHT + GAP; // 68px total por item
const MAX_VISIBLE = Math.min(12, Math.floor((window.innerHeight * 0.88) / ITEM_HEIGHT));
const DISTANCE = Math.round(window.innerWidth * 0.073);

function App() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [options, setOptions] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
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
            setScrollIndex(0);
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

  const handleWheel = useCallback((e) => {
    if (options.length <= MAX_VISIBLE) return;
    const maxScroll = options.length - MAX_VISIBLE;
    setScrollIndex(prev => Math.max(0, Math.min(maxScroll, prev + (e.deltaY > 0 ? 1 : -1))));
  }, [options.length]);

  const visibleOptions = options.slice(scrollIndex, scrollIndex + MAX_VISIBLE);

  const isBrowser = typeof window.GetParentResourceName === 'undefined';

  return (
    <div className="w-screen h-screen relative font-['Saira'] overflow-hidden" style={{ background: 'transparent' }}>
      {isBrowser && <DebugPanel />}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: closing ? 0 : 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full h-full relative"
          >
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <ConnectionLines
                visibleOptions={visibleOptions}
                hoveredIndex={hoveredIndex}
                color={theme.color}
                closing={closing}
                itemHeight={ITEM_HEIGHT}
                cardHeight={CARD_HEIGHT}
                distance={DISTANCE}
              />
            </div>

            <CentralDot color={theme.color} closing={closing} />

            <OptionsList
              options={options}
              scrollIndex={scrollIndex}
              maxVisible={MAX_VISIBLE}
              closing={closing}
              color={theme.color}
              distance={DISTANCE}
              onHover={setHoveredIndex}
              onLeave={() => setHoveredIndex(null)}
              onWheel={handleWheel}
              onScrollUp={() => setScrollIndex(prev => Math.max(0, prev - 1))}
              onScrollDown={() => setScrollIndex(prev => Math.min(options.length - MAX_VISIBLE, prev + 1))}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
