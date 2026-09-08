import React from 'react';
import { LessonStep } from '@/types/learning';
import { CodeGrimoire } from './CodeGrimoire';
import { getQuizStepTypeInfo, getStepCodeToDisplay } from './quizStepUtils';
import { QuizOptionsList } from './QuizOptionsList';
import { QuizFeedbackPanel } from './QuizFeedbackPanel';
import { QuizActionButtons } from './QuizActionButtons';

interface QuizStepViewProps {
  step: LessonStep;
  selectedOptionId: string | null;
  isAnswerChecked: boolean;
  isCorrect: boolean;
  isLastStep: boolean;
  onSelectOption: (optionId: string) => void;
  onCheckAnswer: () => void;
  onRetry: () => void;
  onNextStep: () => void;
  onSkip?: () => void;
}

export function QuizStepView({
  step,
  selectedOptionId,
  isAnswerChecked,
  isCorrect,
  isLastStep,
  onSelectOption,
  onCheckAnswer,
  onRetry,
  onNextStep,
  onSkip,
}: QuizStepViewProps) {
  const typeInfo = getQuizStepTypeInfo(step.type);
  const codeToDisplay = getStepCodeToDisplay(step);

  return (
    <div className="flex flex-col justify-between h-full max-w-xl mx-auto w-full gap-3">
      {/* Scrollable Quest Body */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-3">
          {/* Tag de Tipo do Passo */}
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-baloo font-bold tracking-wide border border-current/20"
              style={{
                backgroundColor: typeInfo.bg,
                color: typeInfo.color,
              }}
            >
              {typeInfo.icon}
              {typeInfo.label}
            </span>
          </div>

          {/* Enunciado do Desafio */}
          <h2 className="step-prompt text-lg sm:text-xl font-baloo font-bold text-[#F2F1EA] leading-snug">
            {step.question || 'Analise o desafio e selecione a resposta correta:'}
          </h2>

          {/* Grimório de Código / Snippet do Desafio se houver */}
          {codeToDisplay && (
            <div className="py-0.5">
              <CodeGrimoire
                code={codeToDisplay}
                fileName={step.type === 'code_fix' ? 'debug_index.html' : 'snippet.html'}
              />
            </div>
          )}

          {/* Lista de Alternativas com Seleção Imediata e Dimensionalmente Estável */}
          <QuizOptionsList
            options={step.options}
            selectedOptionId={selectedOptionId}
            isAnswerChecked={isAnswerChecked}
            isCorrect={isCorrect}
            onSelectOption={onSelectOption}
          />
        </div>
      </div>

      {/* Painel Inferior Estável: Feedback Contextual + Botão de Ação */}
      <div className="w-full shrink-0 flex flex-col gap-2 pt-0.5">
        {/* Painel de Feedback Elegante, Compacto e Encorajador */}
        {isAnswerChecked && (
          <QuizFeedbackPanel
            isCorrect={isCorrect}
            xpReward={step.xpReward}
            explanationOnCorrect={step.explanationOnCorrect}
            explanationOnIncorrect={step.explanationOnIncorrect}
          />
        )}

        {/* Botões de Ação Grandes, Confortáveis e Fáceis de Tocar */}
        <QuizActionButtons
          isAnswerChecked={isAnswerChecked}
          isCorrect={isCorrect}
          isLastStep={isLastStep}
          selectedOptionId={selectedOptionId}
          onCheckAnswer={onCheckAnswer}
          onNextStep={onNextStep}
          onRetry={onRetry}
          onSkip={onSkip}
        />
      </div>
    </div>
  );
}
