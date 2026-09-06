import React from 'react';
import { Swords, Check, X, RotateCcw, ArrowRight, Zap, AlertCircle, Code, ListOrdered, CheckCircle2 } from 'lucide-react';
import { LessonStep, QuizOption } from '@/types/learning';
import { CodeGrimoire } from './CodeGrimoire';

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
}: QuizStepViewProps) {
  // Determina rótulo e ícone contextual conforme o tipo de Quest Step
  const getStepTypeInfo = () => {
    switch (step.type) {
      case 'true_false':
        return {
          label: 'Verdadeiro ou Falso',
          icon: <CheckCircle2 className="w-3 h-3 text-[#38BDF8]" />,
          bg: 'rgba(56,189,248,0.12)',
          color: '#38BDF8',
        };
      case 'code_completion':
        return {
          label: 'Completar Código',
          icon: <Code className="w-3 h-3 text-[#C8F03D]" />,
          bg: 'rgba(200,240,61,0.12)',
          color: '#C8F03D',
        };
      case 'code_fix':
        return {
          label: 'Correção de Bug',
          icon: <AlertCircle className="w-3 h-3 text-[#FF6B4A]" />,
          bg: 'rgba(255,107,74,0.12)',
          color: '#FF6B4A',
        };
      case 'ordering':
        return {
          label: 'Ordenação de Código',
          icon: <ListOrdered className="w-3 h-3 text-[#8B7CF6]" />,
          bg: 'rgba(139,124,246,0.12)',
          color: '#8B7CF6',
        };
      case 'practical_challenge':
        return {
          label: 'Desafio Prático',
          icon: <Code className="w-3 h-3 text-[#C8F03D]" />,
          bg: 'rgba(200,240,61,0.12)',
          color: '#C8F03D',
        };
      default:
        return {
          label: 'Sua Missão na Quest',
          icon: <Swords className="w-3 h-3 text-[#FF6B4A]" />,
          bg: 'var(--coral-tint)',
          color: 'var(--coral)',
        };
    }
  };

  const typeInfo = getStepTypeInfo();
  const codeToDisplay = 
    ('codeSnippetWithBlank' in step && step.codeSnippetWithBlank) ||
    ('brokenCode' in step && step.brokenCode) ||
    ('starterCode' in step && (step as any).starterCode) ||
    ('codeSnippet' in step && step.codeSnippet);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2.5 sm:gap-3">
      {/* Área Central: Card da Quest com Pergunta e Alternativas */}
      <div className="w-full flex-1 flex flex-col justify-center min-h-0 overflow-y-auto no-scrollbar py-0.5">
        <div className="quest-card space-y-3 sm:space-y-3.5">
          {/* Tag de Desafio e XP em Jogo */}
          <div className="flex items-center justify-between">
            <div className="tag" style={{ background: typeInfo.bg, color: typeInfo.color }}>
              {typeInfo.icon}
              <span>{typeInfo.label}</span>
            </div>

            <span className="text-xs font-baloo font-bold text-[#8B7CF6] flex items-center gap-1">
              <Zap className="w-3 h-3" /> +{step.xpReward} XP em jogo
            </span>
          </div>

          {/* Título e Pergunta */}
          <div>
            <h2 className="q-title text-base sm:text-lg text-[#F2F1EA] mb-1.5">{step.title}</h2>
            <p className="text-[14px] sm:text-[15px] font-medium text-[#E0E5F0] leading-snug">{step.question}</p>
          </div>

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
          <div className="options" role="radiogroup" aria-label="Alternativas da questão">
            {step.options?.map((option: QuizOption, idx: number) => {
              const isSelected = selectedOptionId === option.id;
              const letter = String.fromCharCode(65 + idx); // A, B, C, D

              // Classes base e de status
              let optionClass = 'option';
              let letterClass = 'letter';
              let radioIndicatorClass = 'radio-indicator';
              let indicatorContent = null;

              if (isAnswerChecked) {
                if (option.isCorrect) {
                  optionClass += ' correct';
                  letterClass += ' bg-[#C8F03D] text-[#12151F] border-[#C8F03D]';
                  radioIndicatorClass += ' bg-[#C8F03D] text-[#12151F] border-[#C8F03D]';
                  indicatorContent = <Check className="w-3.5 h-3.5 text-[#12151F] stroke-[3]" />;
                } else if (isSelected && !option.isCorrect) {
                  optionClass += ' incorrect';
                  letterClass += ' bg-[#FF6B4A] text-white border-[#FF6B4A]';
                  radioIndicatorClass += ' bg-[#FF6B4A] text-white border-[#FF6B4A]';
                  indicatorContent = <X className="w-3.5 h-3.5 text-white stroke-[3]" />;
                } else {
                  optionClass += ' disabled opacity-35';
                }
              } else if (isSelected) {
                // ESTADO SELECIONADO: IMEDIATAMENTE ÓBVIO E IMPOSSÍVEL DE CONFUNDIR
                optionClass += ' selected';
                letterClass += ' bg-[#8B7CF6] text-[#12151F] border-[#8B7CF6]';
                radioIndicatorClass += ' bg-[#8B7CF6] text-[#12151F] border-[#8B7CF6] shadow-[0_0_10px_rgba(139,124,246,0.7)]';
                indicatorContent = <Check className="w-3.5 h-3.5 text-[#12151F] stroke-[3]" />;
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelectOption(option.id)}
                  disabled={isAnswerChecked}
                  className={optionClass}
                  aria-checked={isSelected}
                  role="radio"
                >
                  {/* Letra identificadora (A, B, C...) */}
                  <div className={letterClass}>
                    {letter}
                  </div>

                  {/* Texto da alternativa */}
                  <div className="label">
                    {option.text}
                  </div>

                  {/* Indicador visual circular à direita */}
                  <div className={radioIndicatorClass}>
                    {indicatorContent}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Painel Inferior Estável: Feedback Contextual + Botão de Ação */}
      <div className="w-full shrink-0 flex flex-col gap-2 pt-0.5">
        {/* Painel de Feedback Elegante, Compacto e Sem Deslocamentos Bruscos */}
        {isAnswerChecked && (
          <div className={`feedback show ${isCorrect ? 'correct-fb' : 'incorrect-fb'}`}>
            <div className="flex items-center justify-between">
              <div className="fb-title">
                {isCorrect ? (
                  <>
                    <Check className="w-4 h-4 text-[#C8F03D]" />
                    <span>Missão Cumprida com Sucesso! 🎯</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-[#FF6B4A]" />
                    <span>Missão Falhada ⚔️</span>
                  </>
                )}
              </div>

              {isCorrect ? (
                <span className="px-2 py-0.5 rounded-full bg-[#C8F03D]/20 text-[11px] font-baloo font-bold text-[#C8F03D] flex items-center gap-1 shrink-0">
                  <Zap className="w-3 h-3 fill-[#C8F03D]" /> +{step.xpReward} XP
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-[#FF6B4A]/20 text-[11px] font-baloo font-bold text-[#FF6B4A] flex items-center gap-1 shrink-0">
                  <Zap className="w-3 h-3 fill-[#FF6B4A]" /> -5 XP
                </span>
              )}
            </div>

            <div className="fb-text">
              {isCorrect
                ? step.explanationOnCorrect ||
                  'Excelente leitura do cenário! Você dominou a lógica essencial desta questão.'
                : step.explanationOnIncorrect ||
                  'Analise com calma os conceitos abordados. Lembre-se das funções principais de cada elemento.'}
            </div>
          </div>
        )}

        {/* Botões de Ação Grandes, Confortáveis e Fáceis de Tocar */}
        <div className="w-full">
          {!isAnswerChecked ? (
            <button
              type="button"
              onClick={onCheckAnswer}
              disabled={!selectedOptionId}
              className={`btn-primary py-3.5 sm:py-4 text-base rounded-2xl w-full select-none ${
                selectedOptionId ? 'ready shadow-[0_4px_0_var(--lime-dark)] active:translate-y-1' : 'disabled'
              }`}
            >
              <span>{selectedOptionId ? 'Confirmar Resposta ⚔️' : 'Selecione uma Alternativa'}</span>
            </button>
          ) : isCorrect ? (
            <button
              type="button"
              onClick={onNextStep}
              className="btn-primary ready py-3.5 sm:py-4 text-base rounded-2xl w-full shadow-[0_4px_0_var(--lime-dark)] active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>{isLastStep ? 'Concluir Quest 🏆' : 'Continuar a Jornada'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="flex gap-2.5 w-full">
              <button
                type="button"
                onClick={onRetry}
                className="btn-primary ready flex-1 py-3.5 sm:py-4 text-base rounded-2xl active:translate-y-1 cursor-pointer flex items-center justify-center gap-2"
                style={{
                  background: 'var(--coral)',
                  boxShadow: '0 4px 0 var(--coral-dark)',
                  color: '#12151F',
                }}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tentar Novamente</span>
              </button>
              <button
                type="button"
                onClick={onNextStep}
                className="px-4 py-3.5 sm:py-4 rounded-2xl border border-[#2C3247] bg-[#232840] text-[#9096AC] hover:text-[#F2F1EA] font-baloo font-bold text-sm transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0"
              >
                <span>Pular</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
