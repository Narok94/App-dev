import React from 'react';
import { motion } from 'motion/react';
import { EvaluatedAchievement } from '@/features/learning/progression';

interface AchievementsSummaryCardProps {
  unlockedCount: number;
  totalCount: number;
  achievements: EvaluatedAchievement[];
  onOpen: () => void;
}

export function AchievementsSummaryCard({
  unlockedCount,
  totalCount,
  achievements,
  onOpen,
}: AchievementsSummaryCardProps) {
  return (
    <motion.div
      className="badges-card"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
    >
      <div>
        <h3>Suas conquistas</h3>
        <p>
          {unlockedCount} de {totalCount} desbloqueadas
        </p>
      </div>
      <div className="badge-icons">
        {achievements.slice(0, 3).map((ach) => (
          <div
            key={ach.id}
            className={`badge-circle ${ach.unlocked ? 'teal' : 'locked'}`}
            title={`${ach.title}: ${ach.unlocked ? 'Desbloqueada' : 'Bloqueada'}`}
          >
            {ach.unlocked ? ach.icon : '🔒'}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
