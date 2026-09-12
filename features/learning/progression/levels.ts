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
    title: 'Primeiros Passos',
    minXp: 0,
    maxXp: 45,
    badge: '🌱',
    description: 'Começando a jornada e entendendo a base do código.',
  },
  {
    level: 2,
    title: 'Explorador de Tags',
    minXp: 45,
    maxXp: 110,
    badge: '⚡',
    description: 'Criando elementos, abrindo e fechando tags.',
  },
  {
    level: 3,
    title: 'Construtor de Páginas',
    minXp: 110,
    maxXp: 200,
    badge: '🧱',
    description: 'Montando estruturas completas com títulos e seções.',
  },
  {
    level: 4,
    title: 'Mestre da Semântica',
    minXp: 200,
    maxXp: 320,
    badge: '🛡️',
    description: 'Organizando páginas com clareza, hierarquia e boas práticas.',
  },
  {
    level: 5,
    title: 'Desenvolvedor Front-end',
    minXp: 320,
    maxXp: 480,
    badge: '🚀',
    description: 'Pronto para estruturar páginas web completas.',
  },
  {
    level: 6,
    title: 'Desenvolvedor Avançado',
    minXp: 480,
    maxXp: 700,
    badge: '👑',
    description: 'Código limpo, seguro e fundamentos dominados.',
  },
  {
    level: 7,
    title: 'Guia da Trilha',
    minXp: 700,
    maxXp: 1000,
    badge: '⭐',
    description: 'Conhecimento consolidado em toda a base web.',
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
