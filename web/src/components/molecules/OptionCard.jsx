import { motion } from 'framer-motion';
import { MriCard } from '@mriqbox/ui-kit';
import OptionIcon from '../atoms/OptionIcon';
import OptionLabel from '../atoms/OptionLabel';

export default function OptionCard({ opt, index, color, closing, onHover, onLeave, onClick }) {
  return (
    <motion.div
      key={opt._uid}
      data-card-index={index}
      initial={{ scaleX: 0, opacity: 0, originX: 0 }}
      animate={closing ? { scaleX: 0, opacity: 0, originX: 0 } : { scaleX: 1, opacity: 1 }}
      whileHover={closing ? {} : { x: 8 }}
      transition={{
        duration: closing ? 0.22 : 0.32,
        delay: closing ? index * 0.04 : 0.06 + index * 0.06,
        x: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      className="group cursor-pointer h-[58px] flex items-center"
      onClick={onClick}
    >
      <MriCard
        className="flex items-center gap-4 px-5 h-full min-w-[220px] max-w-[440px] rounded-2xl border transition-colors duration-200"
        style={{
          background: 'rgba(10, 10, 12, 0.82)',
          borderColor: `${color}25`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)'
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = `${color}55`}
        onMouseLeave={e => e.currentTarget.style.borderColor = `${color}25`}
      >
        <OptionIcon icon={opt.icon} color={color} />
        <OptionLabel label={opt.label} />
      </MriCard>
    </motion.div>
  );
}
