import { motion, AnimatePresence } from 'framer-motion';

interface StateTooltipProps {
  name: string;
  capital: string;
  x: number;
  y: number;
  isVisible: boolean;
}

export default function StateTooltip({ name, capital, x, y, isVisible }: StateTooltipProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          style={{ left: x + 15, top: y + 15 }} // Offset from cursor
          className="fixed z-50 px-3 py-2 bg-neutral-800 text-white text-sm rounded-md shadow-lg pointer-events-none"
        >
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-neutral-300">{capital}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}