import { motion, AnimatePresence } from 'framer-motion';
import OptionCard from '../molecules/OptionCard';
import ScrollIndicators from '../molecules/ScrollIndicators';

export default function OptionsList({ options, scrollIndex, maxVisible, closing, color, distance, onHover, onLeave, onWheel, onScrollUp, onScrollDown }) {
  const visibleOptions = options.slice(scrollIndex, scrollIndex + maxVisible);
  const canScrollUp = scrollIndex > 0;
  const canScrollDown = scrollIndex + maxVisible < options.length;

  return (
    <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-start" style={{ left: `calc(50% + ${distance}px)` }} onWheel={onWheel}>
      <ScrollIndicators
        canScrollUp={canScrollUp}
        canScrollDown={canScrollDown}
        closing={closing}
        scrollIndex={scrollIndex}
        optionsLength={options.length}
        maxVisible={maxVisible}
        color={color}
        onScrollUp={onScrollUp}
        onScrollDown={onScrollDown}
      />

      <div className="flex flex-col" style={{ gap: '10px' }}>
        <AnimatePresence mode="popLayout">
          {visibleOptions.map((opt, index) => (
            <OptionCard
              key={opt._uid}
              opt={opt}
              index={index}
              color={color}
              closing={closing}
              onHover={onHover}
              onLeave={onLeave}
              onClick={() => {
                fetch('https://ox_target/select', {
                  method: 'POST',
                  body: JSON.stringify([opt._type, opt._idx, opt._zone])
                }).catch(() => {});
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
