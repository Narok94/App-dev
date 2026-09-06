import React from 'react';
import { InteractiveLesson } from '@/types/learning';
import { QuestEngine } from './QuestEngine';

export interface LessonPlayerProps {
  lesson: InteractiveLesson;
  onComplete: (lessonId: string, xpEarned: number) => void;
  onExit: () => void;
}

/**
 * Componente LessonPlayer compatível com a arquitetura existente,
 * implementado sobre o novo QuestEngine.
 */
export function LessonPlayer({ lesson, onComplete, onExit }: LessonPlayerProps) {
  return (
    <QuestEngine
      quest={lesson}
      onComplete={onComplete}
      onExit={onExit}
    />
  );
}

export { QuestEngine };
