import React from 'react';
import { motion } from 'motion/react';

interface StatsGridProps {
  streakDays: number;
  completedToday: boolean;
  unlockedBadgesCount: number;
  totalBadgesCount: number;
  onOpenAchievements: () => void;
}

function StatsGridComponent({
  streakDays,
  completedToday,
  unlockedBadgesCount,
  totalBadgesCount,
  onOpenAchievements,
}: StatsGridProps) {
  return (
    <div className="stats">
      <motion.div whileHover={{ y: -2 }} className="stat-card">
        <span className="stat-icon">🔥</span>
        <div className="stat-value">{streakDays}</div>
        <div className="stat-label">
          {streakDays === 1 ? 'dia ativo' : 'dias ativos'}
        </div>
      </motion.div>

      <motion.div whileHover={{ y: -2 }} className="stat-card">
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
