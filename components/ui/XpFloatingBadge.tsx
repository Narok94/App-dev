import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap } from 'lucide-react';

export interface XpDeltaItem {
  id: number;
  amount: number;
  type: 'gain' | 'loss';
}

interface XpFloatingBadgeProps {
  delta: XpDeltaItem | null;
}

export function XpFloatingBadge({ delta }: XpFloatingBadgeProps) {
  return (
    <AnimatePresence>
      {delta && (
        <motion.div
          key={delta.id}
          initial={{ opacity: 0, y: -4, scale: 0.9 }}
          animate={{ opacity: 1, y: 2, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-none absolute top-full mt-2 right-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-baloo font-extrabold tracking-wide shadow-lg select-none z-20 ${
            delta.type === 'gain'
              ? 'bg-[#C8F03D] text-[#12151F] shadow-[0_0_16px_rgba(200,240,61,0.5)]'
              : 'bg-[#FF6B4A] text-white shadow-[0_0_16px_rgba(255,107,74,0.5)]'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${delta.type === 'gain' ? 'fill-[#12151F]' : 'fill-white'}`} />
          <span>{delta.type === 'gain' ? `+${delta.amount} XP` : `-${delta.amount} XP`}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
