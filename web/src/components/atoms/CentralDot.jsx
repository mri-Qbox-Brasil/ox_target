import { motion } from 'framer-motion';

export default function CentralDot({ color, closing }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1.1], boxShadow: [`0 0 8px ${color}`, `0 0 22px ${color}`, `0 0 12px ${color}`] }}
        exit={{ scale: 0 }}
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
