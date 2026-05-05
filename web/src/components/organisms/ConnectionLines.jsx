import { motion, AnimatePresence } from 'framer-motion';
import ConnectionLine from '../molecules/ConnectionLine';

export default function ConnectionLines({ visibleOptions, hoveredIndex, color, closing, itemHeight, cardHeight, distance }) {
  if (visibleOptions.length === 0) return null;

  const n = visibleOptions.length;
  // O ponto central (dot) está em (0,0) no SVG
  // O centro do primeiro card visível é c0 = - (n-1)*itemHeight/2 (grupo centralizado)
  const c0 = - (n - 1) * itemHeight / 2;
  const dotX = 0, dotY = 0;
  const targetX = distance;

  return (
    <svg
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{
        width: targetX + 300,
        height: 1000, // Altura arbitrária (usamos overflow visible)
        overflow: 'visible'
      }}
    >
      <AnimatePresence>
        {visibleOptions.map((opt, i) => {
          // Centro do i-ésimo card (c0 + i*itemHeight)
          const endY = c0 + i * itemHeight;
          
          const isHovered = hoveredIndex === i;
          const tX = isHovered ? targetX + 8 : targetX;
          const path = `M ${dotX} ${dotY} L ${dotX + 30} ${dotY} C ${dotX + 80} ${dotY}, ${dotX + 80} ${endY}, ${tX} ${endY}`;
          
          return (
            <ConnectionLine
              key={`line-${opt._uid}`}
              opt={opt}
              index={i}
              color={color}
              closing={closing}
              isHovered={isHovered}
              lineProps={{
                path,
                delay: i * 0.05,
                exitDelay: (visibleOptions.length - 1 - i) * 0.04 + 0.1
              }}
            />
          );
        })}
      </AnimatePresence>
    </svg>
  );
}
