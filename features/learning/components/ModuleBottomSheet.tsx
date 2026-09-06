import React from 'react';
import { X, Play, CheckCircle2, Lock, Clock, Sparkles, BookOpen } from 'lucide-react';
import { LearningModule } from '@/types/learning';
import { Badge } from '@/components/ui/Badge';

interface ModuleBottomSheetProps {
  module: LearningModule | null;
  onClose: () => void;
  onStartLesson: (lessonId: string) => void;
  completedLessonIds?: string[];
}

export function ModuleBottomSheet({
  module,
  onClose,
  onStartLesson,
  completedLessonIds = [],
}: ModuleBottomSheetProps) {
  if (!module) return null;

  const isLocked = module.status === 'locked';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#070B14]/80 backdrop-blur-md transition-opacity animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Sheet / Dialog Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes do ${module.title}`}
        className="relative z-10 w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#0F172A] border border-[#1E293B] shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col animate-in slide-in-from-bottom duration-300"
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-[#334155] rounded-full" />
        </div>

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#1E293B] bg-gradient-to-b from-[#131D38] to-[#0F172A]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant={isLocked ? 'neutral' : module.status === 'completed' ? 'cyan' : 'electric'}>
                  {isLocked ? 'Bloqueado' : module.status === 'completed' ? 'Concluído' : 'Em Andamento'}
                </Badge>
                <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                  Módulo {String(module.order).padStart(2, '0')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#F8FAFC] tracking-tight">
                {module.title}
              </h2>
              <p className="text-xs text-[#94A3B8] leading-relaxed max-w-md">
                {module.description}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC] transition-colors cursor-pointer shrink-0"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Meta badges: XP e Duração */}
          <div className="mt-4 flex items-center gap-3 pt-3 border-t border-[#1E293B]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FBBF24]">
              <Sparkles className="h-4 w-4 fill-current" />
              <span>+{module.xpReward} XP Recompensa</span>
            </div>
            <span className="text-[#334155]">&bull;</span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#94A3B8]">
              <Clock className="h-4 w-4 text-[#38BDF8]" />
              <span>~{module.estimatedMinutes} minutos totais</span>
            </div>
          </div>
        </div>

        {/* Lesson List */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-3 flex-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
            Aulas Práticas ({module.lessons.length})
          </h3>

          {isLocked ? (
            <div className="p-6 rounded-2xl border border-dashed border-[#1E293B] bg-[#0A0E1A] text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-[#1E293B] text-[#64748B]">
                <Lock className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-bold text-[#F8FAFC]">Módulo Bloqueado</h4>
              <p className="text-xs text-[#94A3B8] max-w-xs mx-auto">
                Complete as lições do módulo anterior para desbloquear esta nova etapa de desenvolvimento!
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {module.lessons.map((lesson, idx) => {
                const isCompleted = completedLessonIds.includes(lesson.id) || lesson.isCompleted;

                return (
                  <div
                    key={lesson.id}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all ${
                      isCompleted
                        ? 'border-[#06B6D4]/40 bg-[#0E7490]/15 hover:bg-[#0E7490]/25'
                        : 'border-[#1E293B] bg-[#0A0E1A] hover:border-[#3B82F6]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                          isCompleted
                            ? 'bg-[#06B6D4] text-[#070B14] shadow-xs'
                            : 'bg-[#1E293B] text-[#94A3B8]'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : `0${idx + 1}`}
                      </div>

                      <div className="truncate">
                        <h4 className="text-xs sm:text-sm font-bold text-[#F8FAFC] truncate">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#94A3B8]">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-[#38BDF8]" />
                            {lesson.durationMinutes} min
                          </span>
                          {isCompleted && (
                            <>
                              <span>&bull;</span>
                              <span className="text-[#2DD4BF] font-semibold">Concluída</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onStartLesson(lesson.id)}
                      className={`shrink-0 ml-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                        isCompleted
                          ? 'bg-[#0E7490]/30 border border-[#06B6D4]/40 text-[#2DD4BF] hover:bg-[#0E7490]/50'
                          : 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#3B82F6] hover:to-[#2563EB] text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                      }`}
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>{isCompleted ? 'Revisar' : 'Começar'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action button at bottom if not locked */}
        {!isLocked && (
          <div 
            className="p-4 border-t border-[#1E293B] bg-[#0A0E1A]"
            style={{
              paddingBottom: 'max(16px, calc(env(safe-area-inset-bottom, 0px) + 12px))',
            }}
          >
            <button
              onClick={() => onStartLesson(module.lessons[0].id)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#3B82F6] hover:to-[#2563EB] text-white text-sm font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all active:scale-[0.98] cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>
                {module.status === 'completed'
                  ? 'Revisar Módulo Completo'
                  : 'Começar Próxima Aula do Módulo'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
