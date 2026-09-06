import React from 'react';
import { InteractiveLesson } from '@/types/learning';
import { QuestEngine } from './QuestEngine';

export interface LessonPlayerProps {
  lesson: InteractiveLesson;
  userXp: number;
  onAwardXp: (amount: number) => void;
  onPenalizeXp: (penalty?: number) => void;
  onComplete: (lessonId: string, xpEarned: number) => void;
  onExit: () => void;
}

/**
 * Componente LessonPlayer compatível com a arquitetura existente,
 * implementado sobre o novo QuestEngine.
 */
export function LessonPlayer({
  lesson,
  userXp,
  onAwardXp,
  onPenalizeXp,
  onComplete,
  onExit,
}: LessonPlayerProps) {
  return (
    <QuestEngine
      quest={lesson}
      userXp={userXp}
      onAwardXp={onAwardXp}
      onPenalizeXp={onPenalizeXp}
      onComplete={onComplete}
      onExit={onExit}
    />
  );
}

export { QuestEngine };
