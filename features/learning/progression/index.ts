export * from './levels';
export * from './achievements';

/**
 * Standard central XP rules for application-wide consistency.
 */
export const XP_RULES = {
  /** Penalty applied on incorrect answer */
  WRONG_ANSWER_PENALTY: 5,
  /** Standard XP earned on interactive step */
  STANDARD_STEP_XP: 15,
  /** Standard XP earned on reading discovery concept */
  CONCEPT_STEP_XP: 10,
  /** Bonus XP awarded for full module completion */
  MODULE_COMPLETION_BONUS: 50,
} as const;
