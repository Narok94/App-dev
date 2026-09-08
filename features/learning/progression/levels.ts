/**
 * Developer Progression & Leveling System.
 * Pure domain logic, fully decoupled from storage/UI, ready for future backend sync.
 */

export interface PlayerLevel {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  badge: string;
  description: string;
}

export const LEVELS: PlayerLevel[] = [
  {
    level: 1,
    title: 'Recruta do Terminal',
    minXp: 0,
    maxXp: 45,
    badge: '🌱',
    description: 'Dando os primeiros passos na sintaxe e estrutura de código.',
  },
  {
    level: 2,
    title: 'Explorador de Tags',
    minXp: 45,
    maxXp: 110,
    badge: '⚡',
    description: 'Dominando abertura, fechamento e atributos da web.',
  },
  {
    level: 3,
    title: 'Arquiteto da Estrutura',
    minXp: 110,
    maxXp: 200,
    badge: '🧱',
    description: 'Construindo esqueletos semânticos sólidos e organizados.',
  },
  {
    level: 4,
    title: 'Mestre da Semântica',
    minXp: 200,
    maxXp: 320,
    badge: '🛡️',
    description: 'Acessibilidade, hierarquia e padrões modernos aplicados.',
  },
  {
    level: 5,
    title: 'Dev Front-end Júnior',
    minXp: 320,
    maxXp: 480,
    badge: '🚀',
    description: 'Capacidade comprovada em montar páginas completas.',
  },
  {
    level: 6,
    title: 'Engenheiro de Código Pleno',
    minXp: 480,
    maxXp: 700,
    badge: '👑',
    description: 'Precisão técnica, código limpo e fundamentos consolidados.',
  },
  {
    level: 7,
    title: 'Tech Lead da Web',
    minXp: 700,
    maxXp: 1000,
    badge: '⭐',
    description: 'Mestria absoluta na fundação da arquitetura web.',
  },
];

export interface LevelProgress {
  currentLevel: PlayerLevel;
  nextLevel: PlayerLevel | null;
  currentXp: number;
  xpInCurrentLevel: number;
  xpRequiredForNextLevel: number;
  percentage: number;
  isMaxLevel: boolean;
}

/**
 * Calculates current level, progression percentage and XP needed for next milestone.
 */
export function calculateLevelProgress(xp: number): LevelProgress {
  const safeXp = Math.max(0, Math.floor(xp));

  let currentLevel = LEVELS[0];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (safeXp >= LEVELS[i].minXp) {
      currentLevel = LEVELS[i];
      break;
    }
  }

  const nextLevel = LEVELS.find((l) => l.level === currentLevel.level + 1) || null;
  const isMaxLevel = !nextLevel;

  if (isMaxLevel) {
    return {
      currentLevel,
      nextLevel: null,
      currentXp: safeXp,
      xpInCurrentLevel: safeXp - currentLevel.minXp,
      xpRequiredForNextLevel: 0,
      percentage: 100,
      isMaxLevel: true,
    };
  }

  const rangeSpan = currentLevel.maxXp - currentLevel.minXp;
  const xpIntoLevel = Math.max(0, safeXp - currentLevel.minXp);
  const percentage = Math.min(100, Math.max(0, Math.round((xpIntoLevel / rangeSpan) * 100)));
  const xpRemaining = Math.max(0, currentLevel.maxXp - safeXp);

  return {
    currentLevel,
    nextLevel,
    currentXp: safeXp,
    xpInCurrentLevel: xpIntoLevel,
    xpRequiredForNextLevel: xpRemaining,
    percentage,
    isMaxLevel: false,
  };
}

export interface LevelUpEvent {
  previousLevel: PlayerLevel;
  newLevel: PlayerLevel;
}

/**
 * Detects if a level transition occurred between two XP snapshots.
 */
export function detectLevelUp(previousXp: number, currentXp: number): LevelUpEvent | null {
  if (currentXp <= previousXp) return null;
  const prevProgress = calculateLevelProgress(previousXp);
  const currProgress = calculateLevelProgress(currentXp);

  if (currProgress.currentLevel.level > prevProgress.currentLevel.level) {
    return {
      previousLevel: prevProgress.currentLevel,
      newLevel: currProgress.currentLevel,
    };
  }

  return null;
}
