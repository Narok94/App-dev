import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ArrowRight, Award, Sparkles } from 'lucide-react';
import { PlayerLevel } from '@/features/learning/progression';

interface LevelUpModalProps {
  level: PlayerLevel | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LevelUpModal({ level, isOpen, onClose }: LevelUpModalProps) {
  if (!level) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#070B14]/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Dialog Container */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 12 },
              visible: { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: { 
                  type: 'spring' as const, damping: 24, stiffness: 320,
                  staggerChildren: 0.08
                }
              }
            }}
            className="relative w-full max-w-[360px] rounded-3xl bg-[#1B1F2E] border border-[#C8F03D]/40 p-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(200,240,61,0.2)] overflow-hidden"
          >
            {/* Top Glow Ambient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[radial-gradient(ellipse_at_top,rgba(200,240,61,0.25),transparent_70%)] pointer-events-none" />

            {/* Level Badge Icon */}
            <motion.div
              variants={{
                hidden: { scale: 0, rotate: -20 },
                visible: { scale: 1, rotate: 0, transition: { type: 'spring', damping: 14, stiffness: 280 } }
              }}
              className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C8F03D] to-[#8DB017] text-[#12151F] flex items-center justify-center shadow-[0_6px_0_#6E8C0C,0_0_20px_rgba(200,240,61,0.4)] text-3xl mb-3"
            >
              <span>{level.badge}</span>
            </motion.div>

            {/* Eyebrow */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C8F03D]/15 border border-[#C8F03D]/30 text-[#C8F03D] text-[11px] font-bold uppercase tracking-wider mb-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Subiu de Nível!</span>
            </motion.div>

            {/* Level Number & Title */}
            <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}>
              <h2 className="font-baloo text-2xl font-black text-[#F2F1EA] tracking-tight leading-tight">
                Nível {level.level}
              </h2>
              <div className="font-baloo text-lg font-bold text-[#C8F03D] mt-0.5">
                {level.title}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}
              className="text-xs text-[#9096AC] leading-relaxed mt-2 px-1"
            >
              {level.description}
            </motion.p>

            {/* Level Perks / Status */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}
              className="mt-4 p-3 rounded-2xl bg-[#12151F] border border-[#2C3247] flex items-center justify-around text-xs"
            >
              <div className="flex items-center gap-1.5 text-[#8B7CF6]">
                <Award className="w-4 h-4" />
                <span className="font-semibold text-[#F2F1EA]">Nova Patente</span>
              </div>
              <div className="w-[1px] h-4 bg-[#2C3247]" />
              <div className="flex items-center gap-1.5 text-[#C8F03D]">
                <Zap className="w-4 h-4 fill-[#C8F03D]" />
                <span className="font-semibold text-[#F2F1EA]">Jornada Dev</span>
              </div>
            </motion.div>

            {/* Action Button */}
            <motion.button
              variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={onClose}
              className="mt-5 w-full py-3.5 px-4 rounded-2xl bg-[#C8F03D] text-[#12151F] font-baloo font-bold text-sm tracking-wide shadow-[0_4px_0_#8DB017] hover:brightness-105 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 select-none"
            >
              <span>Continuar Evoluindo</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
