import React from 'react';
import { motion } from 'motion/react';
import { LevelProgress } from '@/features/learning/progression';

interface LevelProgressCardProps {
  levelProgress: LevelProgress;
  userXp: number;
}

function LevelProgressCardComponent({ levelProgress, userXp }: LevelProgressCardProps) {
  const currentLevel = levelProgress.currentLevel;

  return (
    <div className="w-full p-4 rounded-3xl bg-[#1B1F2E] border border-[#2C3247] shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col gap-3 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 right-0 w-36 h-20 bg-[radial-gradient(ellipse_at_top_right,rgba(139,124,246,0.15),transparent_70%)] pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8B7CF6] to-[#6366F1] text-white flex items-center justify-center text-xl shadow-[0_3px_0_#4F46E5] shrink-0">
            <span>{currentLevel?.badge || '🌱'}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B7CF6]">
                Nível {currentLevel?.level}
              </span>
              <span className="text-[10px] text-[#9096AC] font-medium">
                · {userXp} XP total
              </span>
            </div>
            <h3 className="font-baloo text-base font-bold text-[#F2F1EA] leading-tight">
              {currentLevel?.title}
            </h3>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-[#C8F03D]/15 border border-[#C8F03D]/30 text-[#C8F03D] font-baloo font-bold text-xs">
          {levelProgress.percentage}%
        </span>
      </div>

      {/* Progress Bar towards next level */}
      <div className="space-y-1.5">
        <div className="w-full h-2 rounded-full bg-[#12151F] border border-[#2C3247] overflow-hidden p-[1px]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8B7CF6] via-[#A78BFA] to-[#C8F03D] rounded-full"
            initial={false}
            animate={{ width: `${levelProgress.percentage}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#9096AC]">
          <span>
            {levelProgress.xpInCurrentLevel} / {currentLevel ? currentLevel.maxXp - currentLevel.minXp : 100} XP
          </span>
          <span>
            {levelProgress.nextLevel
              ? `${levelProgress.xpRequiredForNextLevel} XP para ${levelProgress.nextLevel.title}`
              : 'Nível Máximo Alcançado!'}
          </span>
        </div>
      </div>
    </div>
  );
}

export const LevelProgressCard = React.memo(LevelProgressCardComponent);
