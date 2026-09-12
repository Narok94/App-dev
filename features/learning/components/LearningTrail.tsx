import React from 'react';
import { Lock, Check, Sparkles, BookOpen, Star, Compass } from 'lucide-react';
import { LearningModule } from '@/types/learning';
import { TatuMascot } from '@/features/mascot/components/TatuMascot';

interface LearningTrailProps {
  modules: LearningModule[];
  onSelectModule: (module: LearningModule) => void;
}

export function LearningTrail({ modules, onSelectModule }: LearningTrailProps) {
  return (
    <div className="relative py-4 px-2 max-w-xl mx-auto">
      {/* Cabeçalho de Contexto da Trilha */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3EC] border border-[#D1E4D6] text-xs font-semibold text-[#2E5A44] mb-2">
          <Compass className="h-3.5 w-3.5" />
          <span>Trilha de HTML</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#2B231D]">
          Do Zero à Primeira Página Web
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[#706457]">
          Aprenda os fundamentos da web passo a passo.
        </p>
      </div>

      {/* Trilha Winding Vertical com Linha de Conexão Terrosa */}
      <div className="relative flex flex-col items-center">
        {/* Linha de trilha central pontilhada/sólida conectando os módulos */}
        <div className="absolute top-10 bottom-16 w-1 bg-gradient-to-b from-[#2E5A44] via-[#D58C5D] to-[#D6CEBF] rounded-full z-0" />

        {/* Nós da Trilha */}
        <div className="w-full space-y-8 z-10">
          {modules.map((mod, index) => {
            const isCompleted = mod.status === 'completed';
            const isCurrent = mod.status === 'current';
            const isLocked = mod.status === 'locked';

            // Alternância suave de alinhamento para criar um efeito de caminho orgânico
            const isLeft = index % 2 === 0;

            return (
              <div
                key={mod.id}
                className={`relative flex flex-col sm:flex-row items-center gap-4 ${
                  isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* O Nó do Módulo no Caminho */}
                <div className="relative flex items-center justify-center shrink-0">
                  {/* Se for o módulo atual, o mascote Tatu aparece animado acima dele */}
                  {isCurrent && (
                    <div className="absolute -top-20 z-20 flex flex-col items-center pointer-events-none">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C25E30] text-[#FFFDF9] px-2 py-0.5 rounded-full shadow-sm mb-1 animate-pulse">
                        Você está aqui!
                      </span>
                      <TatuMascot size="sm" mood="waving" />
                    </div>
                  )}

                  {/* Círculo do Nó Interativo */}
                  <button
                    onClick={() => onSelectModule(mod)}
                    className={`group relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-4 transition-all duration-200 cursor-pointer shadow-md ${
                      isCompleted
                        ? 'bg-[#2E5A44] border-[#D9EADB] text-[#FAF8F5] hover:scale-105 hover:bg-[#254A38]'
                        : isCurrent
                        ? 'bg-[#C25E30] border-[#FCEFE9] text-[#FFFDF9] ring-4 ring-[#C25E30]/20 scale-105 animate-pulse'
                        : 'bg-[#EFEAE2] border-[#DBD4C8] text-[#8C8074] hover:bg-[#E5DFD4]'
                    }`}
                    aria-label={`Módulo ${mod.order}: ${mod.title} (${
                      isCompleted ? 'Concluído' : isCurrent ? 'Em andamento' : 'Bloqueado'
                    })`}
                  >
                    {isCompleted ? (
                      <Check className="h-8 w-8 stroke-[2.5]" />
                    ) : isCurrent ? (
                      <BookOpen className="h-7 w-7 text-[#FFFDF9]" />
                    ) : (
                      <Lock className="h-6 w-6 text-[#9E9284]" />
                    )}

                    {/* Badge de Recompensa de XP */}
                    <div className="absolute -bottom-2 -right-1 flex items-center gap-0.5 rounded-full bg-[#FCFAF6] border border-[#E0D8CC] px-1.5 py-0.5 text-[10px] font-bold text-[#54473C] shadow-sm">
                      <Sparkles className="h-2.5 w-2.5 text-[#C25E30]" />
                      <span>{mod.xpReward}</span>
                    </div>
                  </button>
                </div>

                {/* Card Descritivo do Módulo ao lado do Nó */}
                <div
                  onClick={() => onSelectModule(mod)}
                  className={`w-full sm:max-w-xs cursor-pointer rounded-xl border p-4 transition-all ${
                    isCompleted
                      ? 'bg-[#FCFAF6] border-[#D4E5D8] hover:border-[#2E5A44]/50 shadow-sm'
                      : isCurrent
                      ? 'bg-[#FFFDF9] border-[#E89E78] shadow-md hover:border-[#C25E30]'
                      : 'bg-[#F5F2EC]/80 border-[#E5DFD4] opacity-75 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7D70]">
                      Etapa {mod.order}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-[#EAF3EC] text-[#2E5A44]'
                          : isCurrent
                          ? 'bg-[#FBEFE9] text-[#C25E30]'
                          : 'bg-[#ECE7DF] text-[#7A6E63]'
                      }`}
                    >
                      {isCompleted ? 'Completado' : isCurrent ? 'Atual' : 'Bloqueado'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#2B231D] tracking-tight">
                    {mod.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#706457] line-clamp-2">
                    {mod.tagline}
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#EDE8DF] text-[11px] text-[#8A7D70]">
                    <span>{mod.lessons.length} lições</span>
                    <span className="flex items-center gap-1 font-medium text-[#2E5A44]">
                      <Star className="h-3 w-3 fill-current text-[#C25E30]" />
                      +{mod.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
