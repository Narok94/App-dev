/**
 * Learning and curriculum domain types.
 */

export type ModuleStatus = 'completed' | 'current' | 'locked';

export interface LessonPreview {
  id: string;
  title: string;
  durationMinutes: number;
  isCompleted?: boolean;
}

export interface LearningModule {
  id: string;
  order: number;
  title: string;
  tagline: string;
  description: string;
  status: ModuleStatus;
  xpReward: number;
  iconName: 'flag' | 'code' | 'file-text' | 'link' | 'image' | 'list' | 'layout' | 'check-circle';
  lessons: LessonPreview[];
  estimatedMinutes: number;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface LessonStep {
  id: string;
  type: 'concept' | 'multiple_choice';
  title: string;
  conceptText?: string;
  codeSnippet?: string;
  tatuTip?: string;
  question?: string;
  options?: QuizOption[];
  correctOptionId?: string;
  explanationOnCorrect?: string;
  explanationOnIncorrect?: string;
  xpReward: number;
}

export interface InteractiveLesson {
  id: string;
  moduleId: string;
  moduleOrder: number;
  moduleTitle: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  totalXp: number;
  steps: LessonStep[];
}

export interface UserLearningState {
  xp: number;
  streakDays: number;
  totalModulesCount: number;
  completedModulesCount: number;
  currentModuleId: string;
  completedLessonIds?: string[];
  userName: string;
  avatarMood?: 'happy' | 'waving' | 'thinking' | 'celebrating';
  dailyLessonsGoal?: number;
  soundEnabled?: boolean;
  hapticEnabled?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpBonus: number;
  unlocked: boolean;
  category: 'starter' | 'streak' | 'mastery' | 'speed';
}

