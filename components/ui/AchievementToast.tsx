import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Zap, X } from 'lucide-react';
import { EvaluatedAchievement } from '@/features/learning/progression';

interface AchievementToastProps {
  achievement: EvaluatedAchievement | null;
  onClose: () => void;
  duration?: number;
}

export function AchievementToast({
  achievement,
  onClose,
  duration = 4200,
}: AchievementToastProps) {
  useEffect(() => {
    if (!achievement) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [achievement, duration, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[380px] rounded-2xl bg-[#1B1F2E] border border-[#38BDF8]/40 p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(56,189,248,0.2)] flex items-center justify-between gap-3 select-none"
          style={{
            top: 'max(16px, calc(env(safe-area-inset-top, 0px) + 12px))',
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Badge Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-[#12151F] flex items-center justify-center shrink-0 shadow-[0_3px_0_#0369A1]">
              <Award className="w-5 h-5 stroke-[2.5]" />
            </div>

            {/* Content */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#38BDF8]">
                  Conquista Desbloqueada!
                </span>
                <span className="text-[10px] font-bold text-[#C8F03D] flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5 fill-[#C8F03D]" /> +{achievement.xpBonus} XP
                </span>
              </div>
              <div className="font-baloo text-sm font-bold text-[#F2F1EA] truncate">
                {achievement.title}
              </div>
              <div className="text-[11px] text-[#9096AC] truncate">
                {achievement.description}
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#232840] hover:bg-[#2C3247] text-[#9096AC] hover:text-[#F2F1EA] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            aria-label="Fechar notificação"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
