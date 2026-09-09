import React from 'react';
import { motion } from 'motion/react';

interface StatsGridProps {
  streakDays: number;
  completedToday: boolean;
  unlockedBadgesCount: number;
  totalBadgesCount: number;
  onOpenAchievements: () => void;
  onOpenStats?: () => void;
}

function StatsGridComponent({
  streakDays,
  completedToday,
  unlockedBadgesCount,
  totalBadgesCount,
  onOpenAchievements,
  onOpenStats,
}: StatsGridProps) {
  return (
    <div className="stats">
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={onOpenStats ? { scale: 0.97 } : undefined}
        className={`stat-card ${onOpenStats ? 'cursor-pointer hover:border-[#FB923C]/40 transition-colors' : ''}`}
        onClick={onOpenStats}
        role={onOpenStats ? 'button' : undefined}
        tabIndex={onOpenStats ? 0 : undefined}
        onKeyDown={(e) => onOpenStats && e.key === 'Enter' && onOpenStats()}
        title={onOpenStats ? 'Ver estatísticas de sequência e progresso' : undefined}
      >
        <span className="stat-icon">🔥</span>
        <div className="stat-value">{streakDays}</div>
        <div className="stat-label">
          {streakDays === 1 ? 'dia ativo' : 'dias ativos'}
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        whileTap={onOpenStats ? { scale: 0.97 } : undefined}
        className={`stat-card ${onOpenStats ? 'cursor-pointer hover:border-[#38BDF8]/40 transition-colors' : ''}`}
        onClick={onOpenStats}
        role={onOpenStats ? 'button' : undefined}
        tabIndex={onOpenStats ? 0 : undefined}
        onKeyDown={(e) => onOpenStats && e.key === 'Enter' && onOpenStats()}
        title={onOpenStats ? 'Ver estatísticas detalhadas de desempenho' : undefined}
      >
        <span className="stat-icon">🎯</span>
        <div className="stat-value">{completedToday ? '1/1' : '0/1'}</div>
        <div className="stat-label">meta de hoje</div>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="stat-card cursor-pointer hover:border-[#38BDF8]/40 transition-colors"
        onClick={onOpenAchievements}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpenAchievements()}
        title="Ver conquistas detalhadas"
      >
        <span className="stat-icon">🏅</span>
        <div className="stat-value">
          {unlockedBadgesCount}/{totalBadgesCount}
        </div>
        <div className="stat-label">conquistas</div>
      </motion.div>
    </div>
  );
}

export const StatsGrid = React.memo(StatsGridComponent);
