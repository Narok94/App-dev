import React, { useState } from 'react';
import { InteractiveLesson, LessonStep } from '@/types/learning';
import { QuestHeader } from './QuestHeader';
import { ConceptStepView } from './ConceptStepView';
import { QuizStepView } from './QuizStepView';
import { QuestVictoryView } from './QuestVictoryView';

interface LessonPlayerProps {
  lesson: InteractiveLesson;
  onComplete: (lessonId: string, xpEarned: number) => void;
  onExit: () => void;
}

export function LessonPlayer({ lesson, onComplete, onExit }: LessonPlayerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [accumulatedXp, setAccumulatedXp] = useState(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const currentStep: LessonStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;

  // Manipula a seleção de uma alternativa com feedback imediato
  const handleSelectOption = (optionId: string) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(optionId);
  };

  // Verifica a resposta do exercício
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

  // Tenta novamente caso erre
  const handleRetry = () => {
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  // Avança para o próximo passo ou conclui a aula
  const handleNextStep = () => {
    if (currentStep.type === 'concept') {
      setAccumulatedXp((prev) => prev + currentStep.xpReward);
    }

    if (isLastStep) {
      setIsLessonFinished(true);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    }
  };

  // Conclui a aula e retorna para a trilha
  const handleFinalContinue = () => {
    const finalXp = accumulatedXp > 0 ? accumulatedXp : lesson.totalXp;
    onComplete(lesson.id, finalXp);
  };

  // TELA DE CONCLUSÃO / VITÓRIA NA QUEST
  if (isLessonFinished) {
    const finalXp = accumulatedXp > 0 ? accumulatedXp : lesson.totalXp;

    return (
      <div className="w-full h-full flex flex-col items-center justify-center px-3.5 sm:px-4 pt-[max(10px,env(safe-area-inset-top))] pb-[max(12px,env(safe-area-inset-bottom))] overflow-y-auto no-scrollbar">
        <QuestVictoryView
          lesson={lesson}
          finalXp={finalXp}
          onContinue={handleFinalContinue}
        />
      </div>
    );
  }

  // TELA DA LIÇÃO EM ANDAMENTO (CONCEITO OU DESAFIO DE MÚLTIPLA ESCOLHA)
  return (
    <div className="w-full h-full flex flex-col justify-between px-3.5 sm:px-4 pt-[max(10px,env(safe-area-inset-top))] pb-[max(12px,env(safe-area-inset-bottom))] gap-2.5 sm:gap-3 overflow-hidden select-none">
      {/* Topo da Quest: Saída, Título, Etapa e Barra Segmentada */}
      <div className="w-full shrink-0">
        <QuestHeader
          moduleTitle={lesson.moduleTitle}
          lessonTitle={lesson.title}
          currentStepIndex={currentStepIndex}
          steps={lesson.steps}
          totalXp={lesson.totalXp}
          isFlashing={isFlashing}
          onExit={onExit}
        />
      </div>

      {/* Conteúdo Dinâmico da Etapa Atual */}
      <div className="w-full flex-1 flex flex-col min-h-0 overflow-hidden">
        {currentStep.type === 'concept' ? (
          <ConceptStepView
            step={currentStep}
            isLastStep={isLastStep}
            onAdvance={handleNextStep}
          />
        ) : (
          <QuizStepView
            step={currentStep}
            selectedOptionId={selectedOptionId}
            isAnswerChecked={isAnswerChecked}
            isCorrect={isCorrect}
            isLastStep={isLastStep}
            onSelectOption={handleSelectOption}
            onCheckAnswer={handleCheckAnswer}
            onRetry={handleRetry}
            onNextStep={handleNextStep}
          />
        )}
      </div>
    </div>
  );
}
