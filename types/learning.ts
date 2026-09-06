/**
 * Learning and curriculum domain types.
 */

/**
 * Learning, Eras and Quests domain types.
 * Architecture: Era -> Module -> Quest -> Steps
 */

export type EraStatus = 'completed' | 'current' | 'locked';
export type ModuleStatus = 'completed' | 'current' | 'locked';

export type QuestStepType =
  | 'concept'
  | 'multiple_choice'
  | 'true_false'
  | 'code_completion'
  | 'code_fix'
  | 'ordering'
  | 'practical_challenge';

/**
 * Era Definition (e.g. Era da Descoberta [HTML], Era dos Estilos [CSS], Era da Interatividade [JS])
 */
export interface Era {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  technology: string;
  iconName: string;
  status: EraStatus;
  accentColor?: string;
  moduleIds?: string[];
  modules?: LearningModule[];
}

export interface LessonPreview {
  id: string;
  title: string;
  durationMinutes: number;
  isCompleted?: boolean;
  type?: 'quest' | 'boss_challenge' | 'checkpoint';
}

export type QuestPreview = LessonPreview;

export interface LearningModule {
  id: string;
  eraId?: string;
  order: number;
  title: string;
  tagline: string;
  description: string;
  status: ModuleStatus;
  xpReward: number;
  iconName:
    | 'flag'
    | 'code'
    | 'file-text'
    | 'link'
    | 'image'
    | 'list'
    | 'layout'
    | 'table'
    | 'check-square'
    | 'zap'
    | 'award'
    | 'sparkles'
    | 'check-circle'
    | string;
  lessons: LessonPreview[];
  quests?: LessonPreview[];
  estimatedMinutes: number;
}

export type QuestModule = LearningModule;

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface BaseQuestStep {
  id: string;
  type: QuestStepType;
  title: string;
  xpReward: number;
  conceptText?: string;
  codeSnippet?: string;
  tatuTip?: string;
  question?: string;
  options?: QuizOption[];
  correctOptionId?: string;
  explanationOnCorrect?: string;
  explanationOnIncorrect?: string;
}

export interface ConceptStep extends BaseQuestStep {
  type: 'concept';
  conceptText: string;
  codeSnippet?: string;
}

export interface MultipleChoiceStep extends BaseQuestStep {
  type: 'multiple_choice';
  question: string;
  options: QuizOption[];
  correctOptionId: string;
}

export interface TrueFalseStep extends BaseQuestStep {
  type: 'true_false';
  question: string;
  isTrue?: boolean;
  options: QuizOption[];
  correctOptionId: string;
}

export interface CodeCompletionStep extends BaseQuestStep {
  type: 'code_completion';
  question: string;
  codeSnippetWithBlank?: string;
  options: QuizOption[];
  correctOptionId: string;
  correctAnswer?: string;
}

export interface CodeFixStep extends BaseQuestStep {
  type: 'code_fix';
  question: string;
  brokenCode?: string;
  options: QuizOption[];
  correctOptionId: string;
  fixedCode?: string;
}

export interface OrderingStepItem {
  id: string;
  content: string;
}

export interface OrderingStep extends BaseQuestStep {
  type: 'ordering';
  question: string;
  items?: OrderingStepItem[];
  correctOrderIds?: string[];
  options?: QuizOption[];
  codeSnippetWithBlank?: string;
}

export interface PracticalChallengeStep extends BaseQuestStep {
  type: 'practical_challenge';
  question: string;
  starterCode?: string;
  expectedOutput?: string;
  options?: QuizOption[];
  codeSnippetWithBlank?: string;
  correctAnswer?: string;
}

export type QuestStep =
  | ConceptStep
  | MultipleChoiceStep
  | TrueFalseStep
  | CodeCompletionStep
  | CodeFixStep
  | OrderingStep
  | PracticalChallengeStep
  | BaseQuestStep;

export type LessonStep = QuestStep;

export interface Quest {
  id: string;
  eraId?: string;
  moduleId: string;
  moduleOrder: number;
  moduleTitle: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  totalXp: number;
  steps: QuestStep[];
}

export type InteractiveLesson = Quest;

export interface UserLearningState {
  xp: number;
  streakDays: number;
  totalModulesCount: number;
  completedModulesCount: number;
  currentEraId?: string;
  currentModuleId: string;
  completedLessonIds?: string[];
  completedQuestIds?: string[];
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

