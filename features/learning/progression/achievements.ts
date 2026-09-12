/**
 * Achievements System (Conquistas e Recompensas).
 * Decoupled rule engine for tracking, awarding, and celebrating achievements.
 */

import { UserLearningState } from '@/types/learning';

export interface GameAchievement {
  id: string;
  title: string;
  description: string;
  criteriaText: string;
  category: 'starter' | 'streak' | 'mastery' | 'xp';
  icon: 'code' | 'flame' | 'zap' | 'shield' | 'target' | 'sparkles' | 'award';
  xpBonus: number;
  isUnlocked: (state: UserLearningState) => boolean;
}

export const GAME_ACHIEVEMENTS: GameAchievement[] = [
  {
    id: 'ach-first-code',
    title: 'Primeiro Código',
    description: 'Você concluiu sua primeira lição prática no Tatu!',
    criteriaText: 'Conclua a sua primeira lição.',
    category: 'starter',
    icon: 'code',
    xpBonus: 25,
    isUnlocked: (s) => (s.completedLessonIds?.length || 0) >= 1,
  },
  {
    id: 'ach-streak-1',
    title: 'Primeira Faísca',
    description: 'Começou sua rotina diária de prática de código.',
    criteriaText: 'Mantenha pelo menos 1 dia ativo no app.',
    category: 'streak',
    icon: 'flame',
    xpBonus: 30,
    isUnlocked: (s) => (s.streakDays || 0) >= 1,
  },
  {
    id: 'ach-streak-3',
    title: 'Chama Firme',
    description: '3 dias seguidos praticando. Constância faz a diferença!',
    criteriaText: 'Alcance uma sequência de 3 dias ativos.',
    category: 'streak',
    icon: 'zap',
    xpBonus: 50,
    isUnlocked: (s) => (s.streakDays || 0) >= 3,
  },
  {
    id: 'ach-module-1',
    title: 'Primeiro Módulo',
    description: 'Concluiu todas as lições do módulo inicial de HTML.',
    criteriaText: 'Finalize todas as lições do Módulo 1.',
    category: 'mastery',
    icon: 'shield',
    xpBonus: 75,
    isUnlocked: (s) => (s.completedModulesCount || 0) >= 1,
  },
  {
    id: 'ach-triad',
    title: 'No Ritmo',
    description: 'Completou 3 lições com prática e foco.',
    criteriaText: 'Conclua 3 ou mais lições.',
    category: 'starter',
    icon: 'target',
    xpBonus: 40,
    isUnlocked: (s) => (s.completedLessonIds?.length || 0) >= 3,
  },
  {
    id: 'ach-century',
    title: 'Centena de XP',
    description: 'Alcançou a marca de 100 pontos de experiência.',
    criteriaText: 'Atinja 100 de XP acumulados no seu perfil.',
    category: 'xp',
    icon: 'sparkles',
    xpBonus: 80,
    isUnlocked: (s) => (s.xp || 0) >= 100,
  },
];

export interface EvaluatedAchievement extends Omit<GameAchievement, 'isUnlocked'> {
  unlocked: boolean;
}

/**
 * Returns all achievements with their current unlocked status against state.
 */
export function evaluateAchievements(state: UserLearningState): EvaluatedAchievement[] {
  return GAME_ACHIEVEMENTS.map((ach) => ({
    id: ach.id,
    title: ach.title,
    description: ach.description,
    criteriaText: ach.criteriaText,
    category: ach.category,
    icon: ach.icon,
    xpBonus: ach.xpBonus,
    unlocked: ach.isUnlocked(state),
  }));
}

/**
 * Detects any newly unlocked achievement between two state snapshots.
 */
export function detectNewAchievements(
  previousState: UserLearningState,
  currentState: UserLearningState
): EvaluatedAchievement[] {
  const prevEvaluated = evaluateAchievements(previousState);
  const currEvaluated = evaluateAchievements(currentState);

  return currEvaluated.filter((curr) => {
    const prev = prevEvaluated.find((p) => p.id === curr.id);
    return curr.unlocked && (!prev || !prev.unlocked);
  });
}
