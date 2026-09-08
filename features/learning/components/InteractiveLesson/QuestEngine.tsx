import React, { useState } from 'react';
import { Quest, QuestStep } from '@/types/learning';
import { QuestHeader } from './QuestHeader';
import { QuestStepDispatcher } from './QuestStepDispatcher';
import { QuestVictoryView } from './QuestVictoryView';

export interface QuestEngineProps {
  quest: Quest;
  userXp: number;
  onAwardXp: (amount: number) => void;
  onPenalizeXp: (penalty?: number) => void;
  onComplete: (questId: string, xpEarned: number) => void;
  onExit: () => void;
}

/**
 * QuestEngine: Motor central de execução e gamificação de Quests do App-dev.
 * Controla:
 * - Sequência ordenada de etapas (concept, multiple_choice, true_false, code_completion, code_fix, etc.)
 * - Seleção de respostas e interações
 * - Feedback contextual imediato (+X XP / -5 XP)
 * - Concessão atômica de XP e penalidade de 5 XP com piso zero
 * - Prevenção de duplicação de XP por etapa
 * - Transição fluida e tela de vitória da Missão
 */
export function QuestEngine({
  quest,
  userXp,
  onAwardXp,
  onPenalizeXp,
  onComplete,
  onExit,
}: QuestEngineProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [rewardedStepIds, setRewardedStepIds] = useState<string[]>([]);
  const [sessionNetXp, setSessionNetXp] = useState(0);
  const [isQuestFinished, setIsQuestFinished] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [xpDelta, setXpDelta] = useState<{ amount: number; type: 'gain' | 'loss'; id: number } | null>(null);

  const currentStep: QuestStep = quest.steps[currentStepIndex];
  const isLastStep = currentStepIndex === quest.steps.length - 1;

  // Seleciona uma alternativa de desafio
  const handleSelectOption = (optionId: string) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(optionId);
  };

  // Verifica resposta de etapas interativas com concessão imediata de XP ou penalidade de 5 XP
  const handleCheckAnswer = () => {
    if (!selectedOptionId || !currentStep.options) return;

    const chosenOption = currentStep.options.find((opt) => opt.id === selectedOptionId);
    const correct = Boolean(chosenOption?.isCorrect);

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      // Concede XP da etapa apenas uma vez para esta resolução correta
      if (!rewardedStepIds.includes(currentStep.id)) {
        const reward = currentStep.xpReward || 0;
        if (reward > 0) {
          onAwardXp(reward);
          setRewardedStepIds((prev) => [...prev, currentStep.id]);
          setSessionNetXp((prev) => prev + reward);
        }
      }
      setXpDelta({
        amount: currentStep.xpReward || 0,
        type: 'gain',
        id: Date.now(),
      });
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 600);
    } else {
      // Desconta exatamente 5 XP a cada resposta incorreta, nunca abaixo de 0
      onPenalizeXp(5);
      setSessionNetXp((prev) => Math.max(0, prev - 5));
      setXpDelta({
        amount: 5,
        type: 'loss',
        id: Date.now(),
      });
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 600);
    }
  };

  // Permite tentar novamente após erro, mantendo o histórico de penalidades
  const handleRetry = () => {
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setXpDelta(null);
  };

  // Avança para a próxima etapa da quest
  const handleNextStep = () => {
    // Concede XP de conceitos informativos ao avançar, se ainda não concedido
    if (currentStep.type === 'concept') {
      if (!rewardedStepIds.includes(currentStep.id)) {
        const reward = currentStep.xpReward || 0;
        if (reward > 0) {
          onAwardXp(reward);
          setRewardedStepIds((prev) => [...prev, currentStep.id]);
          setSessionNetXp((prev) => prev + reward);
          setXpDelta({
            amount: reward,
            type: 'gain',
            id: Date.now(),
          });
          setIsFlashing(true);
          setTimeout(() => setIsFlashing(false), 600);
        }
      }
    }

    if (isLastStep) {
      setIsQuestFinished(true);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setXpDelta(null);
    }
  };

  // Conclui a Quest com sucesso e consolida progresso sem duplicar XP
  const handleFinalContinue = () => {
    onComplete(quest.id, sessionNetXp);
  };

  // TELA DE CONCLUSÃO / VITÓRIA NA QUEST
  if (isQuestFinished) {
    const finalXp = sessionNetXp > 0 ? sessionNetXp : quest.totalXp;

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
      {/* Topo da Quest: Saída, Título, Etapa, XP em Tempo Real e Barra Segmentada */}
      <div className="w-full shrink-0">
        <QuestHeader
          moduleTitle={quest.moduleTitle}
          lessonTitle={quest.title}
          currentStepIndex={currentStepIndex}
          steps={quest.steps}
          totalXp={quest.totalXp}
          userXp={userXp}
          xpDelta={xpDelta}
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
          onSkip={onExit}
        />
      </div>
    </div>
  );
}
