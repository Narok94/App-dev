/**
 * Runtime Data Validation and Schema Guard Utilities.
 * Protects application state, inputs, and localStorage from corruption, injection, or unexpected payloads.
 */

import { UserLearningState, LearningModule } from '@/types/learning';
import { sanitizeUserName } from './sanitize';

/**
 * Validates if an ID is safe and conforms to identifier standards (alphanumeric, hyphens, underscores).
 */
export function isValidId(id: unknown, maxLength = 64): boolean {
  if (typeof id !== 'string') return false;
  if (!id || id.length > maxLength) return false;
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

/**
 * Validates if XP is a safe non-negative integer within reasonable bounds.
 */
export function isValidXp(xp: unknown): boolean {
  if (typeof xp !== 'number') return false;
  if (!Number.isFinite(xp)) return false;
  if (!Number.isInteger(xp)) return false;
  return xp >= 0 && xp <= 10_000_000;
}

/**
 * Validates URLs ensuring only permitted protocols (https or relative paths) are accepted.
 */
export function isValidUrl(url: unknown, allowRelative = true): boolean {
  if (typeof url !== 'string' || !url.trim()) return false;
  const trimmed = url.trim();

  // Allow relative URLs starting with / (excluding protocol-relative //)
  if (allowRelative && trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return true;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || (parsed.protocol === 'http:' && (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'));
  } catch {
    return false;
  }
}

/**
 * Validates simple email pattern without exposing catastrophic backtracking (ReDoS).
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false;
  if (email.length > 254 || email.length < 5) return false;
  // Safe, non-backtracking email regex
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email);
}

const VALID_AVATAR_MOODS = new Set(['happy', 'waving', 'thinking', 'celebrating']);
const VALID_MODULE_STATUSES = new Set(['locked', 'current', 'completed']);

/**
 * Validates and sanitizes a UserLearningState object loaded from untrusted storage (e.g. localStorage).
 * Returns a guaranteed valid UserLearningState, falling back to defaults for any corrupt or tampered field.
 */
export function validateUserState(
  data: unknown,
  fallback: UserLearningState
): UserLearningState {
  if (!data || typeof data !== 'object') {
    return fallback;
  }

  const record = data as Record<string, unknown>;

  const userName = sanitizeUserName(record.userName, fallback.userName);
  const xp = isValidXp(record.xp) ? (record.xp as number) : fallback.xp;
  const streakDays =
    typeof record.streakDays === 'number' && Number.isInteger(record.streakDays) && record.streakDays >= 0 && record.streakDays <= 3650
      ? record.streakDays
      : fallback.streakDays;

  const currentEraId =
    typeof record.currentEraId === 'string' && isValidId(record.currentEraId)
      ? record.currentEraId
      : fallback.currentEraId;

  const currentModuleId =
    typeof record.currentModuleId === 'string' && isValidId(record.currentModuleId)
      ? record.currentModuleId
      : fallback.currentModuleId;

  const completedLessonIds = Array.isArray(record.completedLessonIds)
    ? record.completedLessonIds.filter(isValidId)
    : fallback.completedLessonIds;

  const completedQuestIds = Array.isArray(record.completedQuestIds)
    ? record.completedQuestIds.filter(isValidId)
    : fallback.completedQuestIds;

  const completedModulesCount =
    typeof record.completedModulesCount === 'number' && record.completedModulesCount >= 0
      ? record.completedModulesCount
      : fallback.completedModulesCount;

  const avatarMood =
    typeof record.avatarMood === 'string' && VALID_AVATAR_MOODS.has(record.avatarMood)
      ? (record.avatarMood as UserLearningState['avatarMood'])
      : fallback.avatarMood;

  const soundEnabled = typeof record.soundEnabled === 'boolean' ? record.soundEnabled : fallback.soundEnabled;
  const hapticEnabled = typeof record.hapticEnabled === 'boolean' ? record.hapticEnabled : fallback.hapticEnabled;
  const dailyLessonsGoal =
    typeof record.dailyLessonsGoal === 'number' && record.dailyLessonsGoal > 0 && record.dailyLessonsGoal <= 100
      ? record.dailyLessonsGoal
      : fallback.dailyLessonsGoal;

  return {
    userName,
    xp,
    streakDays,
    totalModulesCount: fallback.totalModulesCount,
    completedModulesCount,
    currentEraId,
    currentModuleId,
    completedLessonIds,
    completedQuestIds,
    avatarMood,
    dailyLessonsGoal,
    soundEnabled,
    hapticEnabled,
  };
}

/**
 * Validates an array of stored modules against authoritative base modules.
 * Ensures that tampered status or corrupted structure cannot break the application.
 */
export function validateLearningModules(
  stored: unknown,
  baseModules: LearningModule[]
): LearningModule[] {
  if (!Array.isArray(stored)) {
    return baseModules;
  }

  const storedMap = new Map<string, Record<string, unknown>>();
  for (const item of stored) {
    if (item && typeof item === 'object' && typeof (item as Record<string, unknown>).id === 'string') {
      storedMap.set((item as Record<string, unknown>).id as string, item as Record<string, unknown>);
    }
  }

  return baseModules.map((baseMod) => {
    const saved = storedMap.get(baseMod.id);
    if (!saved) return baseMod;

    const rawStatus = typeof saved.status === 'string' ? saved.status : '';
    const status = VALID_MODULE_STATUSES.has(rawStatus)
      ? (rawStatus as LearningModule['status'])
      : baseMod.status;

    const savedLessons = Array.isArray(saved.lessons) ? saved.lessons : [];
    const savedLessonMap = new Map<string, boolean>();
    for (const l of savedLessons) {
      if (l && typeof l === 'object' && typeof l.id === 'string' && typeof l.isCompleted === 'boolean') {
        savedLessonMap.set(l.id, l.isCompleted);
      }
    }

    return {
      ...baseMod,
      status,
      lessons: baseMod.lessons.map((baseLesson) => ({
        ...baseLesson,
        isCompleted: savedLessonMap.get(baseLesson.id) ?? false,
      })),
    };
  });
}
