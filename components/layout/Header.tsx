import React from 'react';
import { motion } from 'motion/react';
import { AppDevIcon } from '@/components/ui/AppDevIcon';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { XpFloatingBadge, XpDeltaItem } from '@/components/ui/XpFloatingBadge';
import { LevelProgress } from '@/features/learning/progression';

interface HeaderProps {
  xp?: number;
  streakDays?: number;
  userName?: string;
  avatarMood?: 'happy' | 'waving' | 'thinking' | 'celebrating';
  levelProgress?: LevelProgress;
  xpDelta?: XpDeltaItem | null;
  onOpenProfile: () => void;
}

function HeaderComponent({
  xp = 0,
  streakDays = 1,
  levelProgress,
  xpDelta,
  onOpenProfile,
}: HeaderProps) {
  const currentLevel = levelProgress?.currentLevel;

  return (
    <header className="w-full flex flex-col gap-2 select-none">
      <div className="topbar">
        {/* Brand & Profile Action */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={onOpenProfile}
          className="brand bg-transparent border-0 cursor-pointer p-0 text-left flex items-center gap-2.5 group"
          title="Ver perfil e configurações"
        >
          <div className="mascot p-1 flex items-center justify-center group-hover:brightness-110 transition-all">
            <AppDevIcon size={28} />
          </div>
          <span className="brand-name font-baloo font-bold text-lg text-[#F2F1EA] tracking-tight group-hover:text-[#C8F03D] transition-colors">
            App-dev
          </span>
        </motion.button>

        {/* Gamification Pills Row */}
        <div className="pill-row flex items-center gap-2">
          {/* Developer Level Pill */}
          {currentLevel && (
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="pill level cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B7CF6]/15 border border-[#8B7CF6]/35 text-[#8B7CF6] font-baloo font-bold text-xs shadow-xs"
              onClick={onOpenProfile}
              title={`Nível ${currentLevel.level}: ${currentLevel.title}`}
            >
              <span>{currentLevel.badge}</span>
              <span>Nv. {currentLevel.level}</span>
            </motion.div>
          )}

          {/* Daily Streak Pill */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`pill fire flex items-center gap-1.5 px-3 py-1.5 rounded-full font-baloo font-bold text-xs border ${
              streakDays > 0
                ? 'bg-[#FF6B4A]/15 border-[#FF6B4A]/35 text-[#FF6B4A]'
                : 'bg-[#1E2436] border-[#2C3247] text-[#9096AC]'
            }`}
            title={`${streakDays} ${streakDays === 1 ? 'dia ativo consecutivo' : 'dias ativos consecutivos'}`}
          >
            <motion.span
              key={streakDays}
              animate={streakDays > 0 ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-block"
            >
              🔥
            </motion.span>
            <span>{streakDays}</span>
          </motion.div>

          {/* XP Pill with Animated Counter and Floating Delta Badge */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="pill xp flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C8F03D]/15 border border-[#C8F03D]/35 text-[#C8F03D] font-baloo font-bold text-xs shadow-[0_0_12px_rgba(200,240,61,0.12)]"
              title={`${xp} pontos de experiência acumulados na jornada`}
            >
              <span>⚡</span>
              <AnimatedCounter value={xp} suffix=" xp" />
            </motion.div>

            {/* Floating "+15 XP" / "-5 XP" animation */}
            <XpFloatingBadge delta={xpDelta || null} />
          </div>
        </div>
      </div>

      {/* Mini Level Progress Bar */}
      {levelProgress && !levelProgress.isMaxLevel && (
        <div
          className="w-full flex items-center gap-2 px-1 text-[10px] text-[#9096AC] font-medium"
          title={`${levelProgress.xpInCurrentLevel} de ${
            levelProgress.currentLevel.maxXp - levelProgress.currentLevel.minXp
          } XP para o Nível ${levelProgress.nextLevel?.level || ''} (${levelProgress.percentage}%)`}
        >
          <div className="flex-1 h-1.5 rounded-full bg-[#1B1F2E] border border-[#2C3247] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8B7CF6] to-[#C8F03D] rounded-full"
              initial={false}
              animate={{ width: `${levelProgress.percentage}%` }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            />
          </div>
          <span className="shrink-0 font-baloo font-bold text-[#C8F03D]">
            {levelProgress.percentage}%
          </span>
        </div>
      )}
    </header>
  );
}

export const Header = React.memo(HeaderComponent);

