import React, { useMemo } from 'react';
import { 
  BarChart3, 
  Clock, 
  Target, 
  BookCheck, 
  Flame, 
  TrendingUp,
  Award,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { UserLearningState, LearningModule } from '@/types/learning';
import { LevelProgress, calculateLevelProgress } from '@/features/learning/progression';

interface StatsSectionProps {
  userState: UserLearningState;
  modules?: LearningModule[];
  levelProgress?: LevelProgress;
}

export function StatsSection({ userState, modules = [], levelProgress }: StatsSectionProps) {
  const completedLessonIds = useMemo(() => userState.completedLessonIds || [], [userState.completedLessonIds]);
  const completedLessonsCount = completedLessonIds.length;

  // Calcula o catálogo completo de lições a partir dos módulos reais
  const allLessons = useMemo(() => modules.flatMap((m) => m.lessons), [modules]);
  const totalLessonsCount = allLessons.length > 0 ? allLessons.length : 12;

  // Tempo de prática real somando a duração das lições concluídas
  const practiceMinutes = useMemo(() => {
    if (completedLessonsCount === 0) return 0;
    const minutes = allLessons
      .filter((l) => completedLessonIds.includes(l.id))
      .reduce((acc, l) => acc + (l.durationMinutes || 4), 0);
    return Math.max(minutes, completedLessonsCount * 3);
  }, [allLessons, completedLessonIds, completedLessonsCount]);

  // Porcentagem de conclusão da trilha ativa
  const overallPercentage = Math.min(
    100,
    Math.round((completedLessonsCount / Math.max(totalLessonsCount, 1)) * 100)
  );

  // Informações de nível e XP (usa o levelProgress passado ou calcula diretamente)
  const resolvedLevelProgress = useMemo(() => {
    return levelProgress || calculateLevelProgress(userState.xp);
  }, [levelProgress, userState.xp]);

  const currentLevel = resolvedLevelProgress.currentLevel;
  const nextLevel = resolvedLevelProgress.nextLevel;
  const totalModulesCount = modules.length > 0 ? modules.length : (userState.totalModulesCount || 12);
  const completedModulesCount = userState.completedModulesCount || 0;

  const stats = [
    {
      label: 'Lições Dominadas',
      value: `${completedLessonsCount}/${totalLessonsCount}`,
      sub: `${overallPercentage}% da trilha`,
      icon: <BookCheck className="h-4 w-4 text-[#60A5FA]" />,
      bg: 'bg-[#1E3A8A]/20 border border-[#2563EB]/30',
    },
    {
      label: 'Módulos Concluídos',
      value: `${completedModulesCount}/${totalModulesCount}`,
      sub: 'Módulos da Era',
      icon: <Award className="h-4 w-4 text-[#C8F03D]" />,
      bg: 'bg-[#C8F03D]/10 border border-[#C8F03D]/30',
    },
    {
      label: 'Tempo Dedicado',
      value: `${practiceMinutes} min`,
      sub: 'Prática de código',
      icon: <Clock className="h-4 w-4 text-[#38BDF8]" />,
      bg: 'bg-[#0369A1]/20 border border-[#0284C7]/30',
    },
    {
      label: 'Sequência Ativa',
      value: `${userState.streakDays} ${userState.streakDays === 1 ? 'dia' : 'dias'}`,
      sub: 'Hábito diário',
      icon: <Flame className="h-4 w-4 text-[#FB923C] fill-current" />,
      bg: 'bg-[#7C2D12]/20 border border-[#EA580C]/30',
    },
  ];

  return (
    <section className="space-y-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-[#0369A1]/30 text-[#38BDF8] border border-[#0284C7]/30">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-[#F8FAFC] tracking-tight">
              Estatísticas & Desempenho
            </h2>
            <p className="text-xs text-[#94A3B8]">Métricas analíticas reais de evolução no código</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-[#2DD4BF]">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>{overallPercentage}% da Trilha</span>
        </div>
      </div>

      {/* Grid de Métricas Principais */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl border border-[#1E293B] bg-[#0A0E1A] hover:border-[#334155] transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                {stat.label}
              </span>
              <div className={`p-1.5 rounded-xl ${stat.bg}`}>{stat.icon}</div>
            </div>
            <div className="mt-2 text-xl font-black text-[#F8FAFC] tracking-tight">
              {stat.value}
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Card de Nível & Evolução RPG */}
      <div className="p-4 rounded-2xl border border-[#1E293B] bg-[#0A0E1A] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" role="img" aria-label="Nível badge">
              {currentLevel.badge}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#38BDF8]">
                  Nível {currentLevel.level}
                </span>
                <span className="text-xs text-[#64748B]">•</span>
                <span className="text-xs font-bold text-[#F8FAFC]">{currentLevel.title}</span>
              </div>
              <p className="text-[11px] text-[#94A3B8]">{currentLevel.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-black text-[#F8FAFC]">{userState.xp} XP</div>
            <div className="text-[10px] font-semibold text-[#64748B]">Total Acumulado</div>
          </div>
        </div>

        {/* Barra de Progresso até o próximo nível */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-[#94A3B8]">
              {resolvedLevelProgress.isMaxLevel
                ? 'Nível Máximo Alcançado!'
                : `Faltam ${resolvedLevelProgress.xpRequiredForNextLevel} XP para o Nível ${nextLevel?.level}`}
            </span>
            <span className="font-bold text-[#38BDF8]">{resolvedLevelProgress.percentage}%</span>
          </div>
          <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] rounded-full transition-all duration-500"
              style={{ width: `${resolvedLevelProgress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Detalhamento de Progresso por Módulo (Dados 100% reais) */}
      {modules.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Detalhamento por Módulo
            </h3>
            <span className="text-xs text-[#64748B]">
              {completedModulesCount} de {modules.length} concluídos
            </span>
          </div>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {modules.map((mod) => {
              const modCompletedLessons = mod.lessons.filter((l) =>
                completedLessonIds.includes(l.id)
              ).length;
              const modTotalLessons = mod.lessons.length;
              const modPercent = modTotalLessons > 0
                ? Math.round((modCompletedLessons / modTotalLessons) * 100)
                : 0;
              const isCompleted = mod.status === 'completed' || modCompletedLessons === modTotalLessons;
              const isCurrent = mod.status === 'current';

              return (
                <div
                  key={mod.id}
                  className="p-3 rounded-xl border border-[#1E293B] bg-[#0A0E1A]/70 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-[#2DD4BF] shrink-0" />
                      ) : isCurrent ? (
                        <Target className="h-4 w-4 text-[#38BDF8] shrink-0" />
                      ) : (
                        <Lock className="h-3.5 w-3.5 text-[#64748B] shrink-0" />
                      )}
                      <span className="text-xs font-bold text-[#F8FAFC] truncate">
                        {mod.order}. {mod.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-semibold text-[#94A3B8]">
                        {modCompletedLessons}/{modTotalLessons} lições
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          isCompleted
                            ? 'bg-[#0F766E]/30 text-[#2DD4BF] border border-[#0D9488]/30'
                            : isCurrent
                            ? 'bg-[#0369A1]/30 text-[#38BDF8] border border-[#0284C7]/30'
                            : 'bg-[#1E293B] text-[#64748B]'
                        }`}
                      >
                        {isCompleted ? 'Concluído' : isCurrent ? 'Em andamento' : 'Bloqueado'}
                      </span>
                    </div>
                  </div>

                  {/* Barra de progresso do módulo */}
                  <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-[#2DD4BF]'
                          : isCurrent
                          ? 'bg-[#38BDF8]'
                          : 'bg-[#475569]'
                      }`}
                      style={{ width: `${modPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

