import React from 'react';
import { QuestStep } from '@/types/learning';
import { ConceptStepView } from './ConceptStepView';
import { QuizStepView } from './QuizStepView';

interface QuestStepDispatcherProps {
  step: QuestStep;
  selectedOptionId: string | null;
  isAnswerChecked: boolean;
  isCorrect: boolean;
  isLastStep: boolean;
  onSelectOption: (optionId: string) => void;
  onCheckAnswer: () => void;
  onRetry: () => void;
  onNextStep: () => void;
  onAdvanceConcept: () => void;
  onSkip?: () => void;
}

/**
 * Despachante extensível de etapas da Quest.
 * Permite que novos tipos de etapas (ordering, practical_challenge, etc.)
 * sejam renderizados por visualizadores dedicados sem alterar o motor central.
 */
export function QuestStepDispatcher({
  step,
  selectedOptionId,
  isAnswerChecked,
  isCorrect,
  isLastStep,
  onSelectOption,
  onCheckAnswer,
  onRetry,
  onNextStep,
  onAdvanceConcept,
  onSkip,
}: QuestStepDispatcherProps) {
  switch (step.type) {
    case 'concept':
      return (
        <ConceptStepView
          step={step}
          isLastStep={isLastStep}
          onAdvance={onAdvanceConcept}
        />
      );

    case 'multiple_choice':
    case 'true_false':
    case 'code_completion':
    case 'code_fix':
    case 'ordering':
    case 'practical_challenge':
    default:
      return (
        <QuizStepView
          step={step}
          selectedOptionId={selectedOptionId}
          isAnswerChecked={isAnswerChecked}
          isCorrect={isCorrect}
          isLastStep={isLastStep}
          onSelectOption={onSelectOption}
          onCheckAnswer={onCheckAnswer}
          onRetry={onRetry}
          onNextStep={onNextStep}
          onSkip={onSkip}
        />
      );
  }
}
