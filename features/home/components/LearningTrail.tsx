import React from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Code, 
  Flag, 
  FileText, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  List,
  Terminal
} from 'lucide-react';
import { LearningModule } from '@/types/learning';
import { Badge } from '@/components/ui/Badge';

interface LearningTrailProps {
  modules: LearningModule[];
  currentModuleId: string;
  onSelectModule: (mod: LearningModule) => void;
  onStartLesson: (lessonId: string) => void;
  completedLessonIds?: string[];
}

export function LearningTrail({
  modules,
  currentModuleId,
  onSelectModule,
  onStartLesson,
  completedLessonIds = [],
}: LearningTrailProps) {
  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'flag':
        return <Flag className="h-5 w-5" />;
      case 'code':
        return <Code className="h-5 w-5" />;
      case 'link':
        return <LinkIcon className="h-5 w-5" />;
      case 'image':
        return <ImageIcon className="h-5 w-5" />;
      case 'list':
        return <List className="h-5 w-5" />;
      case 'file-text':
        return <FileText className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <section className="space-y-4">
      {/* Cabeçalho da Trilha */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-sm sm:text-base font-black text-[#F8FAFC] tracking-tight flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#06B6D4] animate-pulse" />
            Trilha de Desenvolvimento HTML5
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Siga os módulos estruturados para construir seu alicerce web
          </p>
        </div>
        <Badge variant="cyan">
          {modules.filter((m) => m.status === 'completed').length} de {modules.length} Concluídos
        </Badge>
      </div>

      {/* Visual Trail Container */}
      <div className="relative space-y-4 pt-2">
        {/* Linha vertical contínua da trilha conectando os módulos */}
        <div className="absolute left-[27px] sm:left-[31px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-[#1E293B] pointer-events-none -z-0" />

        {modules.map((mod) => {
          const isCurrent = mod.id === currentModuleId || mod.status === 'current';
          const isCompleted = mod.status === 'completed';
          const isLocked = mod.status === 'locked';

          const completedCount = mod.lessons.filter(
            (l) => completedLessonIds.includes(l.id) || l.isCompleted
          ).length;

          const nextLessonForMod =
            mod.lessons.find((l) => !completedLessonIds.includes(l.id) && !l.isCompleted) ||
            mod.lessons[0];

          return (
            <div
              key={mod.id}
              className={`relative z-10 flex items-start gap-3.5 sm:gap-4 transition-all duration-300 ${
                isLocked ? 'opacity-60 hover:opacity-80' : 'opacity-100'
              }`}
            >
              {/* Marcador / Nó visual na linha do tempo */}
              <div className="shrink-0 pt-3">
                <button
                  type="button"
                  onClick={() => onSelectModule(mod)}
                  className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border transition-all cursor-pointer select-none ${
                    isCompleted
                      ? 'border-[#06B6D4] bg-[#0E7490]/30 text-[#2DD4BF] shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : isCurrent
                      ? 'border-[#3B82F6] bg-[#1E3A8A]/30 text-[#60A5FA] shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-2 ring-[#3B82F6]/30 animate-pulse-subtle'
                      : 'border-[#1E293B] bg-[#0B0F19] text-[#64748B]'
                  }`}
                  aria-label={`Módulo ${mod.order}: ${mod.title}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-7 w-7" />
                  ) : isLocked ? (
                    <Lock className="h-6 w-6" />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      {getModuleIcon(mod.iconName)}
                      <span className="text-[10px] font-black uppercase mt-0.5 tracking-wider">
                        0{mod.order}
                      </span>
                    </div>
                  )}
                </button>
              </div>

              {/* Cartão de Conteúdo do Módulo */}
              <div
                className={`flex-1 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border transition-all ${
                  isCurrent
                    ? 'border-[#3B82F6]/50 bg-gradient-to-br from-[#0F172A] to-[#131D36] shadow-lg ring-1 ring-[#3B82F6]/20'
                    : isCompleted
                    ? 'border-[#0E7490]/40 bg-[#0B1323] hover:border-[#06B6D4]/60 shadow-xs'
                    : 'border-[#1E293B] bg-[#0A0E1A] hover:border-[#334155]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Informações Textuais */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#38BDF8]">
                        Módulo {mod.order}
                      </span>
                      <Badge
                        variant={
                          isCompleted
                            ? 'cyan'
                            : isCurrent
                            ? 'electric'
                            : 'neutral'
                        }
                        className="text-[10px] py-0"
                      >
                        {isCompleted
                          ? 'Concluído'
                          : isCurrent
                          ? 'Em Andamento'
                          : 'Bloqueado'}
                      </Badge>

                      {!isLocked && (
                        <span className="text-[11px] font-semibold text-[#64748B]">
                          &bull; {completedCount}/{mod.lessons.length} aulas
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => onSelectModule(mod)}
                      className="text-base font-black text-[#F8FAFC] hover:text-[#38BDF8] transition-colors cursor-pointer"
                    >
                      {mod.title}
                    </h3>

                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2 max-w-xl">
                      {mod.description}
                    </p>
                  </div>

                  {/* Recompensa & Metadados */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1E293B]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#FBBF24]">
                      <Sparkles className="h-3.5 w-3.5 fill-current" />
                      <span>+{mod.xpReward} XP</span>
                    </div>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" />
                      <span>~{mod.estimatedMinutes} min</span>
                    </div>
                  </div>
                </div>

                {/* Ações Rápidas no Rodapé do Cartão */}
                <div className="mt-3.5 pt-3 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-2.5">
                  {/* Detalhe de Progresso das Aulas */}
                  <div className="flex items-center gap-1.5">
                    {mod.lessons.map((les, i) => {
                      const done = completedLessonIds.includes(les.id) || les.isCompleted;
                      return (
                        <div
                          key={les.id}
                          title={`${les.title} (${done ? 'Concluída' : 'Pendente'})`}
                          className={`h-1.5 rounded-full transition-all ${
                            done
                              ? 'w-5 bg-[#06B6D4]'
                              : isCurrent && i === completedCount
                              ? 'w-5 bg-[#3B82F6] animate-pulse'
                              : 'w-2 bg-[#1E293B]'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Botões de Ação Direta */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectModule(mod)}
                      className="px-3 py-1.5 rounded-xl border border-[#1E293B] bg-[#0F172A] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-bold transition-all cursor-pointer"
                    >
                      <span>Ver Aulas</span>
                    </button>

                    {!isLocked && (
                      <button
                        type="button"
                        onClick={() => onStartLesson(nextLessonForMod.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 ${
                          isCompleted
                            ? 'bg-[#0E7490]/30 hover:bg-[#0E7490]/50 text-[#2DD4BF] border border-[#06B6D4]/40'
                            : 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#3B82F6] hover:to-[#2563EB] text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                        }`}
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>
                          {isCompleted ? 'Revisar' : 'Próxima Aula'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
