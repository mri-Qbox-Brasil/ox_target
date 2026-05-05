import { motion } from 'framer-motion';

export default function ConnectionLine({ opt, index, color, closing, isHovered, lineProps }) {
  const { path, delay, exitDelay } = lineProps;

  return (
    <motion.path
      key={`line-${opt._uid}`}
      d={path}
      stroke={color}
      strokeWidth="2.8"
      strokeOpacity={isHovered ? 1 : 0.75}
      fill="none"
      style={{ filter: `drop-shadow(0 0 5px ${color}70)` }}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={closing ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.8 }}
      transition={{
        pathLength: {
          duration: closing ? 0.3 : 0.4,
          delay: closing ? exitDelay : delay,
          ease: 'easeInOut'
        },
        d: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
      }}
    />
  );
}
