import React from 'react';
import { X, Sparkles, Swords, Zap } from 'lucide-react';
import { LessonStep } from '@/types/learning';

interface QuestHeaderProps {
  moduleTitle: string;
  lessonTitle: string;
  currentStepIndex: number;
  steps: LessonStep[];
  totalXp: number;
  userXp?: number;
  xpDelta?: { amount: number; type: 'gain' | 'loss'; id: number } | null;
  isFlashing: boolean;
  onExit: () => void;
}

export function QuestHeader({
  moduleTitle,
  lessonTitle,
  currentStepIndex,
  steps,
  totalXp,
  userXp,
  xpDelta,
  isFlashing,
  onExit,
}: QuestHeaderProps) {
  const currentStep = steps[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Barra de Ações do Topo */}
      <div className="flex items-center justify-between gap-3">
        {/* Botão de Saída Estilo RPG */}
        <button
          type="button"
          onClick={onExit}
          className="w-10 h-10 rounded-2xl bg-[#1B1F2E] border border-[#2C3247] hover:border-[#8B7CF6]/50 hover:bg-[#232840] text-[#9096AC] hover:text-[#F2F1EA] flex items-center justify-center transition-all duration-150 cursor-pointer shadow-sm active:scale-95"
          aria-label="Sair da Quest"
          title="Sair da quest e retornar ao hub"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Título & Progresso da Missão */}
        <div className="flex-1 flex flex-col items-center text-center min-w-0 px-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8B7CF6]">
            {currentStep.type === 'concept' ? (
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#8B7CF6]" /> Descoberta
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Swords className="w-3 h-3 text-[#FF6B4A]" /> Missão
              </span>
            )}
            <span className="text-[#2C3247]">·</span>
            <span className="text-[#9096AC]">
              Etapa {currentStepIndex + 1} de {steps.length}
            </span>
          </div>

          <div className="text-xs font-semibold text-[#F2F1EA] truncate max-w-[210px] sm:max-w-[260px]">
            {lessonTitle}
          </div>
        </div>

        {/* Total XP em tempo real do aluno com indicador dinâmico */}
        <div
          className={`h-10 px-3 rounded-2xl bg-[#1B1F2E] border flex items-center gap-1.5 text-xs font-baloo font-bold transition-all duration-300 shrink-0 select-none ${
            xpDelta?.type === 'gain'
              ? 'border-[#C8F03D] text-[#C8F03D] shadow-[0_0_16px_rgba(200,240,61,0.35)] scale-105'
              : xpDelta?.type === 'loss'
              ? 'border-[#FF6B4A] text-[#FF6B4A] shadow-[0_0_16px_rgba(255,107,74,0.35)] scale-105'
              : 'border-[#2C3247] text-[#C8F03D] shadow-[0_0_15px_rgba(200,240,61,0.12)]'
          }`}
          title={`${userXp ?? totalXp} XP acumulados no seu progresso`}
        >
          <Zap
            className={`w-3.5 h-3.5 ${
              xpDelta?.type === 'loss' ? 'fill-[#FF6B4A]' : 'fill-[#C8F03D]'
            }`}
          />
          <span>{userXp ?? totalXp} XP</span>
          {xpDelta && (
            <span
              key={xpDelta.id}
              className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                xpDelta.type === 'gain'
                  ? 'bg-[#C8F03D]/25 text-[#C8F03D] animate-pulse'
                  : 'bg-[#FF6B4A]/25 text-[#FF6B4A] animate-pulse'
              }`}
            >
              {xpDelta.type === 'gain' ? `+${xpDelta.amount}` : `-${xpDelta.amount}`}
            </span>
          )}
        </div>
      </div>

      {/* Trilha de Progresso Segmentada de Quest */}
      <div className="flex items-center gap-1.5 w-full">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={step.id || idx}
              className="flex-1 h-2 rounded-full overflow-hidden bg-[#1B1F2E] border border-[#2C3247]/50 relative"
            >
              {isCompleted && (
                <div className="w-full h-full bg-[#C8F03D] shadow-[0_0_8px_rgba(200,240,61,0.6)]" />
              )}
              {isCurrent && (
                <div
                  className={`w-full h-full bg-[#8B7CF6] shadow-[0_0_10px_rgba(139,124,246,0.8)] relative ${
                    isFlashing ? 'animate-pulse' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
