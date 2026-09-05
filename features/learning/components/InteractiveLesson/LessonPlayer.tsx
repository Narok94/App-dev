import React, { useState } from 'react';
import { X } from 'lucide-react';
import { InteractiveLesson, LessonStep } from '@/types/learning';

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
  const progressPercent = Math.round(((currentStepIndex + 1) / lesson.steps.length) * 100);

  // Manipula a seleção de uma alternativa
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
      setTimeout(() => setIsFlashing(false), 400);
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

  // TELA DE CONCLUSÃO
  if (isLessonFinished) {
    const finalXp = accumulatedXp > 0 ? accumulatedXp : lesson.totalXp;

    return (
      <div className="screen animate-in fade-in duration-200">
        <div className="card text-center p-6 sm:p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--lime)] text-[#12151F] flex items-center justify-center text-3xl font-bold mx-auto shadow-[0_4px_0_var(--lime-dark)]">
            🏆
          </div>

          <div className="tag mx-auto" style={{ background: 'var(--lime-tint)', color: 'var(--lime)' }}>
            ✦ lição concluída
          </div>

          <h2 className="q-title text-2xl mb-1">Excelente trabalho! 🎉</h2>
          <p className="text-xs sm:text-sm text-[var(--text-dim)] leading-relaxed max-w-sm mx-auto">
            Você dominou os conceitos e colocou em prática. Mais conhecimento foi adicionado à sua base na web!
          </p>

          <div className="bg-[var(--bg-card-raised)] border border-[var(--line)] rounded-2xl p-4 text-center my-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-dim)] block mb-1">
              Recompensa obtida
            </span>
            <div className="font-baloo font-bold text-3xl text-[var(--lime)] flex items-center justify-center gap-2">
              <span>⚡</span>
              <span>+{finalXp} XP</span>
            </div>
            <p className="text-[11px] text-[var(--text-dim)] mt-1">
              Adicionado ao seu saldo de experiência
            </p>
          </div>

          <div className="text-left rounded-2xl border border-[var(--line)] bg-[var(--bg-card-raised)] p-4 text-xs text-[var(--text-dim)] space-y-2">
            <span className="font-bold uppercase tracking-wider text-[10px] text-[var(--text-dim)] block mb-1">
              Conhecimentos Consolidados:
            </span>
            <div className="flex items-center gap-2 text-[var(--lime)]">
              <span>✓</span>
              <span className="text-[var(--text)] font-medium">Compreendeu os fundamentos de tags e marcação</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--lime)]">
              <span>✓</span>
              <span className="text-[var(--text)] font-medium">Testou sua compreensão no quiz prático</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFinalContinue}
            className="btn-primary ready mt-4"
          >
            continuar aprendendo
          </button>
        </div>
      </div>
    );
  }

  // TELA DA LIÇÃO EM ANDAMENTO (CONCEITO OU EXERCÍCIO)
  return (
    <div className="screen animate-in fade-in duration-200">
      {/* Barra Superior da Aula: Botão Sair, Breadcrumb e XP */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onExit}
          className="text-[var(--text-dim)] hover:text-[var(--text)] p-1.5 rounded-xl hover:bg-[var(--bg-card-raised)] transition-colors cursor-pointer"
          aria-label="Sair da lição"
          title="Sair da lição e voltar para a tela inicial"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="crumb flex-1 text-center truncate uppercase font-semibold text-xs tracking-wider">
          {lesson.moduleTitle} · {lesson.title}
        </div>

        <div className="pill xp text-xs py-1 px-2.5 shrink-0">
          ⚡ +{lesson.totalXp} xp
        </div>
      </div>

      {/* Barra de Progresso com Flash */}
      <div className="progress-track">
        <div
          className={`progress-fill ${isFlashing ? 'flash' : ''}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* TIPO: CONCEITO / EXPLICAÇÃO */}
      {currentStep.type === 'concept' && (
        <>
          <div className="card space-y-4">
            <div className="tag" style={{ background: 'var(--violet-tint)', color: 'var(--violet)' }}>
              ✦ conceito essencial
            </div>

            <h2 className="q-title">{currentStep.title}</h2>

            <div className="q-text text-sm space-y-3 leading-relaxed text-[#F2F1EA]">
              {currentStep.conceptText?.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Bloco de Código de Exemplo (se houver) */}
            {currentStep.codeSnippet && (
              <div className="rounded-2xl border border-[var(--line)] bg-[#12151F] p-4 text-xs font-mono text-[#F2F1EA] overflow-x-auto">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--line)] text-[10px] text-[var(--text-dim)]">
                  <span>exemplo.html</span>
                  <span className="text-[var(--lime)] font-bold">HTML5</span>
                </div>
                <pre className="text-xs leading-relaxed">
                  <code>{currentStep.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Dica de Estudo (sem mascote) */}
            {currentStep.tatuTip && (
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-card-raised)] p-4 text-xs">
                <div className="font-baloo font-bold text-[var(--lime)] mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  💡 Dica importante
                </div>
                <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                  {currentStep.tatuTip}
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleNextStep}
            className="btn-primary ready"
          >
            {isLastStep ? 'finalizar lição' : 'entendi! próximo passo'}
          </button>
        </>
      )}

      {/* TIPO: EXERCÍCIO DE MÚLTIPLA ESCOLHA */}
      {currentStep.type === 'multiple_choice' && (
        <>
          <div className="card">
            <div className="tag">✦ exercício prático</div>
            <div className="q-title">{currentStep.title}</div>
            <div className="q-text">{currentStep.question}</div>

            <div className="options" id="options" role="radiogroup">
              {currentStep.options?.map((option, idx) => {
                const isSelected = selectedOptionId === option.id;
                const letter = String.fromCharCode(65 + idx); // A, B, C, D

                let optionClass = 'option';
                let iconChar = '';

                if (isAnswerChecked) {
                  if (option.isCorrect) {
                    optionClass += ' correct';
                    iconChar = '✓';
                  } else if (isSelected && !option.isCorrect) {
                    optionClass += ' incorrect';
                    iconChar = '✕';
                  } else {
                    optionClass += ' disabled';
                  }
                } else if (isSelected) {
                  optionClass += ' selected';
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isAnswerChecked}
                    className={optionClass}
                  >
                    <div className="letter">{letter}</div>
                    <div className="label">{option.text}</div>
                    <div className="icon">{iconChar}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback imediato */}
          {isAnswerChecked && (
            <div className={`feedback show ${isCorrect ? 'correct-fb' : 'incorrect-fb'}`}>
              <div className="fb-title">
                {isCorrect ? 'Isso aí! Resposta certa.' : 'Não foi bem essa. Mas não desanime!'}
              </div>
              <div className="fb-text">
                {isCorrect
                  ? currentStep.explanationOnCorrect || 'O HTML dá estrutura e sentido ao conteúdo — exatamente como você aprendeu.'
                  : currentStep.explanationOnIncorrect || 'Lembre-se da estrutura e das tags fundamentais do HTML.'}
              </div>
            </div>
          )}

          {/* Botão Principal de Ação */}
          <div className="w-full">
            {!isAnswerChecked ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={!selectedOptionId}
                className={`btn-primary ${selectedOptionId ? 'ready' : 'disabled'}`}
              >
                verificar resposta
              </button>
            ) : isCorrect ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="btn-primary ready"
              >
                {isLastStep ? 'finalizar lição' : 'continuar'}
              </button>
            ) : (
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="btn-primary ready flex-1"
                  style={{ background: 'var(--coral)', boxShadow: '0 4px 0 var(--coral-dark)' }}
                >
                  tentar novamente
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-3 rounded-2xl border border-[var(--line)] bg-[var(--bg-card-raised)] text-[var(--text-dim)] hover:text-[var(--text)] font-baloo font-bold text-sm transition-colors cursor-pointer"
                >
                  pular
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
