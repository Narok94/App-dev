import React from 'react';
import { 
  BarChart3, 
  Clock, 
  Target, 
  BookCheck, 
  Flame, 
  TrendingUp 
} from 'lucide-react';
import { UserLearningState } from '@/types/learning';

interface StatsSectionProps {
  userState: UserLearningState;
}

export function StatsSection({ userState }: StatsSectionProps) {
  const completedLessons = userState.completedLessonIds?.length || 0;
  const estimatedMinutes = Math.max(completedLessons * 4, 3);
  const accuracyRate = completedLessons > 0 ? 100 : 0;

  const stats = [
    {
      label: 'Tempo Dedicado',
      value: `${estimatedMinutes} min`,
      sub: 'Tempo prático focado',
      icon: <Clock className="h-4 w-4 text-[#38BDF8]" />,
      bg: 'bg-[#0369A1]/20 border border-[#0284C7]/30',
    },
    {
      label: 'Precisão nos Quizzes',
      value: `${accuracyRate}%`,
      sub: 'Taxa de acertos',
      icon: <Target className="h-4 w-4 text-[#2DD4BF]" />,
      bg: 'bg-[#0F766E]/20 border border-[#0D9488]/30',
    },
    {
      label: 'Lições Concluídas',
      value: `${completedLessons}`,
      sub: 'Etapas dominadas',
      icon: <BookCheck className="h-4 w-4 text-[#60A5FA]" />,
      bg: 'bg-[#1E3A8A]/20 border border-[#2563EB]/30',
    },
    {
      label: 'Sequência Ativa',
      value: `${userState.streakDays} dias`,
      sub: 'Hábito diário',
      icon: <Flame className="h-4 w-4 text-[#FB923C] fill-current" />,
      bg: 'bg-[#7C2D12]/20 border border-[#EA580C]/30',
    },
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-[#0369A1]/30 text-[#38BDF8] border border-[#0284C7]/30">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-[#F8FAFC] tracking-tight">
              Estatísticas & Desempenho
            </h2>
            <p className="text-xs text-[#94A3B8]">Métricas analíticas de evolução no código</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-[#2DD4BF]">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Evolução Constante</span>
        </div>
      </div>

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
    </section>
  );
}
