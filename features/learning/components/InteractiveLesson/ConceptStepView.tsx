import React from 'react';
import { Sparkles, Compass, Lightbulb, ArrowRight, Check } from 'lucide-react';
import { LessonStep } from '@/types/learning';
import { CodeGrimoire } from './CodeGrimoire';

interface ConceptStepViewProps {
  step: LessonStep;
  isLastStep: boolean;
  onAdvance: () => void;
}

export function ConceptStepView({
  step,
  isLastStep,
  onAdvance,
}: ConceptStepViewProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between gap-2.5 sm:gap-3">
      {/* Card Principal de Descoberta com Scroll Independente e Suave */}
      <div className="w-full flex-1 flex flex-col min-h-0 overflow-y-auto no-scrollbar py-0.5">
        <div className="quest-card space-y-3 sm:space-y-4">
          {/* Tag de Descoberta RPG */}
          <div className="tag tag-violet">
            <Sparkles className="w-3 h-3 text-[#8B7CF6]" />
            <span>Revelação de Conhecimento</span>
          </div>

          {/* Título do Conceito */}
          <h2 className="q-title text-lg sm:text-xl text-[#F2F1EA]">{step.title}</h2>

          {/* Texto Explicativo com Boa Tipografia e Espaçamento */}
          <div className="q-text space-y-2.5 leading-relaxed text-[#F2F1EA]">
            {step.conceptText?.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-[13.5px] sm:text-[14.5px] text-[#E0E5F0] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Container de Código Moderno (Grimório de Código) */}
          {step.codeSnippet && (
            <div className="pt-0.5">
              <CodeGrimoire
                code={step.codeSnippet}
                fileName="estrutura.html"
                language="HTML5"
              />
            </div>
          )}

          {/* Pergaminho de Sabedoria / Dica Essencial */}
          {step.tatuTip && (
            <div className="rounded-2xl border border-[#8B7CF6]/25 bg-[#202538]/70 p-3.5 sm:p-4 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#8B7CF6]/20 border border-[#8B7CF6]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#C8F03D]">
                  <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8F03D]" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[11px] sm:text-xs font-baloo font-bold uppercase tracking-wider text-[#C8F03D] flex items-center gap-1.5">
                    Pergaminho de Sabedoria
                  </div>
                  <p className="text-xs text-[#9096AC] leading-relaxed">
                    {step.tatuTip}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Botão de Avanço Grande, Arredondado e Estável no Rodapé */}
      <div className="w-full shrink-0 pt-0.5">
        <button
          type="button"
          onClick={onAdvance}
          className="btn-primary ready w-full py-3.5 sm:py-4 text-base rounded-2xl shadow-[0_4px_0_var(--lime-dark)] active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 group select-none"
        >
          <span>{isLastStep ? 'Concluir Quest 🏆' : 'Compreendido! Próxima Etapa'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
