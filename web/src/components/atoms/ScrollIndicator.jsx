import { motion, AnimatePresence } from 'framer-motion';
import { MriBadge } from '@mriqbox/ui-kit';

export default function ScrollIndicator({ direction, visible, closing, count, color, onClick }) {
  if (!visible || closing) return null;

  const isUp = direction === 'up';
  const Icon = isUp ? 'fa-chevron-up' : 'fa-chevron-down';
  const text = isUp
    ? `${count} oculto${count > 1 ? 's' : ''}`
    : `${count} mais`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: isUp ? -4 : 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={onClick}
      >
        <i className={`fas ${Icon} text-xs`} style={{ color }} />
        <MriBadge variant="outline" className="text-[10px] font-bold tracking-widest uppercase" style={{ color, borderColor: color }}>
          {text}
        </MriBadge>
      </motion.div>
    </AnimatePresence>
  );
}
