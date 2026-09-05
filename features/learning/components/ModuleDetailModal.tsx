import React from 'react';
import { X, Lock, CheckCircle2, Play, Sparkles, Clock, BookOpen } from 'lucide-react';
import { LearningModule } from '@/types/learning';
import { Badge } from '@/components/ui/Badge';
import { TatuMascot } from '@/features/mascot/components/TatuMascot';

interface ModuleDetailModalProps {
  module: LearningModule | null;
  onClose: () => void;
  onStartLesson?: (lessonId?: string) => void;
}

export function ModuleDetailModal({ module, onClose, onStartLesson }: ModuleDetailModalProps) {
  if (!module) return null;

  const isLocked = module.status === 'locked';
  const isCompleted = module.status === 'completed';

  // Encontra a primeira aula pendente ou a primeira aula do módulo
  const nextLesson = module.lessons.find((l) => !l.isCompleted) || module.lessons[0];

  const handleStart = (lessonId?: string) => {
    if (onStartLesson) {
      onStartLesson(lessonId || nextLesson?.id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1915]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#E3DBD0] bg-[#FCFAF6] p-6 shadow-xl text-[#2B231D] relative transition-all overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Faixa decorativa sutil no topo inspirada em solo fértil */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2E5A44] via-[#C25E30] to-[#E9A67B]" />

        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#7A6E63] hover:text-[#2B231D] hover:bg-[#EFEAE1] transition-colors"
          aria-label="Fechar detalhes"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Cabeçalho do Módulo */}
        <div className="flex items-start gap-3 mt-1">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
              isCompleted
                ? 'bg-[#EAF3EC] border-[#366848]/40 text-[#2E5A44]'
                : isLocked
                ? 'bg-[#EAE4DC] border-[#D9D1C5] text-[#8C8074]'
                : 'bg-[#FBEFE9] border-[#C25E30]/40 text-[#C25E30]'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : isLocked ? (
              <Lock className="h-6 w-6" />
            ) : (
              <BookOpen className="h-6 w-6" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A7D70]">
                Módulo {module.order}
              </span>
              <Badge
                variant={
                  isCompleted ? 'success' : isLocked ? 'neutral' : 'warning'
                }
              >
                {isCompleted
                  ? 'Concluído'
                  : isLocked
                  ? 'Bloqueado'
                  : 'Em Andamento'}
              </Badge>
            </div>
            <h3 className="text-lg font-bold tracking-tight text-[#2B231D] mt-0.5">
              {module.title}
            </h3>
          </div>
        </div>

        {/* Descrição */}
        <p className="mt-3 text-xs sm:text-sm text-[#5C5146] leading-relaxed">
          {module.description}
        </p>

        {/* Metadados rápidos */}
        <div className="mt-4 flex items-center gap-4 py-2.5 px-3 rounded-lg bg-[#F3EFE8] border border-[#E5DFD4] text-xs text-[#5C5146]">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="h-3.5 w-3.5 text-[#C25E30]" />
            <span>+{module.xpReward} XP</span>
          </div>
          <div className="h-3 w-px bg-[#D9D1C5]" />
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#7A6E63]" />
            <span>~{module.estimatedMinutes} minutos</span>
          </div>
          <div className="h-3 w-px bg-[#D9D1C5]" />
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#7A6E63]" />
            <span>{module.lessons.length} aulas</span>
          </div>
        </div>

        {/* Grade de Aulas do Módulo */}
        <div className="mt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6E63] mb-2">
            Estrutura das Aulas
          </h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {module.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                onClick={() => !isLocked && handleStart(lesson.id)}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-colors ${
                  !isLocked
                    ? 'border-[#E6E0D6] bg-[#FFFFFF] hover:border-[#2E5A44] hover:bg-[#FAF8F5] cursor-pointer'
                    : 'border-[#EBE6DD] bg-[#F7F4EE] opacity-75'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EFECE6] text-[10px] font-bold text-[#5C5146]">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-[#2B231D]">
                    {lesson.title}
                  </span>
                </div>
                {lesson.isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-[#2E5A44] shrink-0" />
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8C8074]">
                    <span>{lesson.durationMinutes} min</span>
                    {!isLocked && <Play className="h-3 w-3 text-[#2E5A44] fill-current" />}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Estado Bloqueado vs Desbloqueado */}
        {isLocked ? (
          <div className="mt-5 rounded-xl border border-[#DFD6CA] bg-[#F5F0E8] p-3.5 flex items-center gap-3">
            <TatuMascot size="sm" mood="thinking" />
            <div className="text-xs text-[#5C5146]">
              <p className="font-semibold text-[#3D3228]">Caminho trancado por enquanto!</p>
              <p className="mt-0.5">
                Complete os módulos anteriores na trilha para liberar esta etapa com o Tatu.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <button
              onClick={() => handleStart(nextLesson?.id)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#2E5A44] hover:bg-[#254A38] text-[#FAF8F5] text-sm font-bold shadow-md hover:shadow-lg transition-transform active:scale-[0.99] cursor-pointer"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>
                {isCompleted
                  ? 'Revisar Conteúdo'
                  : nextLesson
                  ? `Iniciar: ${nextLesson.title}`
                  : 'Iniciar Lição'}
              </span>
            </button>
            <p className="mt-2 text-center text-[11px] text-[#7A6E63]">
              Aprenda no seu ritmo com o Mascote Tatu ao seu lado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
