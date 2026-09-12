import React from 'react';
import { motion } from 'motion/react';
import { LearningModule, LessonPreview } from '@/types/learning';

interface HeroMissionCardProps {
  nextPendingLesson: {
    lesson: LessonPreview;
    module: LearningModule;
  };
  completedLessonsCount: number;
  calculatedLessonXp: number;
  onContinueLearning: () => void;
}

function HeroMissionCardComponent({
  nextPendingLesson,
  completedLessonsCount,
  calculatedLessonXp,
  onContinueLearning,
}: HeroMissionCardProps) {
  return (
    <div className="hero">
      <div className="hero-eyebrow flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#C8F03D] animate-pulse" />
        <span>
          módulo {nextPendingLesson.module.order} · {nextPendingLesson.module.title.toLowerCase()}
        </span>
      </div>
      <h2>{nextPendingLesson.lesson.title}</h2>
      <div className="hero-sub">
        {nextPendingLesson.module.tagline || 'Fundamentos da web na prática'}
      </div>
      <div className="hero-meta">
        <span>⏱ ~{nextPendingLesson.lesson.durationMinutes} min</span>
        <span className="text-[#C8F03D] font-bold">⚡ +{calculatedLessonXp} xp</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={onContinueLearning}
        className="btn-primary cursor-pointer select-none"
      >
        {completedLessonsCount === 0 ? 'Começar lição' : 'Continuar praticando'}
      </motion.button>
    </div>
  );
}

export const HeroMissionCard = React.memo(HeroMissionCardComponent);
