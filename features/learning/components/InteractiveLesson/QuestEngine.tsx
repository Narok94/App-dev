import React, { useState } from 'react';
import { Quest, QuestStep } from '@/types/learning';
import { QuestHeader } from './QuestHeader';
import { QuestStepDispatcher } from './QuestStepDispatcher';
import { QuestVictoryView } from './QuestVictoryView';

export interface QuestEngineProps {
  quest: Quest;
  onComplete: (questId: string, xpEarned: number) => void;
  onExit: () => void;
}

/**
 * QuestEngine: Motor central de execução e gamificação de Quests do App-dev.
 * Controla:
 * - Sequência ordenada de etapas (concept, multiple_choice, true_false, code_completion, code_fix, etc.)
 * - Seleção de respostas e interações
 * - Feedback contextual imediato
 * - Gamificação e acúmulo de XP
 * - Transição fluida e tela de vitória da Missão
 */
export function QuestEngine({ quest, onComplete, onExit }: QuestEngineProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [accumulatedXp, setAccumulatedXp] = useState(0);
  const [isQuestFinished, setIsQuestFinished] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const currentStep: QuestStep = quest.steps[currentStepIndex];
  const isLastStep = currentStepIndex === quest.steps.length - 1;

  // Seleciona uma alternativa de desafio
  const handleSelectOption = (optionId: string) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(optionId);
  };

  // Verifica resposta de etapas interativas
  const handleCheckAnswer = () => {
    if (!selectedOptionId || !currentStep.options) return;

    const chosenOption = currentStep.options.find((opt) => opt.id === selectedOptionId);
    const correct = Boolean(chosenOption?.isCorrect);

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setAccumulatedXp((prev) => prev + currentStep.xpReward);
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 500);
    }
  };

  // Permite tentar novamente após erro
  const handleRetry = () => {
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  // Avança para a próxima etapa da quest
  const handleNextStep = () => {
    if (currentStep.type === 'concept') {
      setAccumulatedXp((prev) => prev + currentStep.xpReward);
    }

    if (isLastStep) {
      setIsQuestFinished(true);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    }
  };

  // Conclui a Quest com sucesso e consolida progresso
  const handleFinalContinue = () => {
    const finalXp = accumulatedXp > 0 ? accumulatedXp : quest.totalXp;
    onComplete(quest.id, finalXp);
  };

  // TELA DE CONCLUSÃO / VITÓRIA NA QUEST
  if (isQuestFinished) {
    const finalXp = accumulatedXp > 0 ? accumulatedXp : quest.totalXp;

    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center overflow-y-auto no-scrollbar"
        style={{
          paddingTop: 'var(--lesson-padding-top)',
          paddingBottom: 'var(--lesson-padding-bottom)',
          paddingLeft: 'var(--lesson-padding-x)',
          paddingRight: 'var(--lesson-padding-x)',
        }}
      >
        <QuestVictoryView
          lesson={quest}
          finalXp={finalXp}
          onContinue={handleFinalContinue}
        />
      </div>
    );
  }

  // TELA DA QUEST EM ANDAMENTO
  return (
    <div
      className="w-full h-full flex flex-col justify-between gap-2.5 sm:gap-3 overflow-hidden select-none"
      style={{
        paddingTop: 'var(--lesson-padding-top)',
        paddingBottom: 'var(--lesson-padding-bottom)',
        paddingLeft: 'var(--lesson-padding-x)',
        paddingRight: 'var(--lesson-padding-x)',
      }}
    >
      {/* Topo da Quest: Saída, Título, Etapa e Barra Segmentada */}
      <div className="w-full shrink-0">
        <QuestHeader
          moduleTitle={quest.moduleTitle}
          lessonTitle={quest.title}
          currentStepIndex={currentStepIndex}
          steps={quest.steps}
          totalXp={quest.totalXp}
          isFlashing={isFlashing}
          onExit={onExit}
        />
      </div>

      {/* Conteúdo Dinâmico da Etapa Atual renderizado pelo Despachante */}
      <div className="w-full flex-1 flex flex-col min-h-0 overflow-hidden">
        <QuestStepDispatcher
          step={currentStep}
          selectedOptionId={selectedOptionId}
          isAnswerChecked={isAnswerChecked}
          isCorrect={isCorrect}
          isLastStep={isLastStep}
          onSelectOption={handleSelectOption}
          onCheckAnswer={handleCheckAnswer}
          onRetry={handleRetry}
          onNextStep={handleNextStep}
          onAdvanceConcept={handleNextStep}
        />
      </div>
    </div>
  );
}
