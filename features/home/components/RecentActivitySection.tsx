import React from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Terminal, 
  Clock 
} from 'lucide-react';
import { UserLearningState } from '@/types/learning';

interface RecentActivitySectionProps {
  userState: UserLearningState;
}

export function RecentActivitySection({ userState }: RecentActivitySectionProps) {
  const completedIds = userState.completedLessonIds || [];

  const activities = [
    ...(completedIds.includes('les-1-3')
      ? [
          {
            id: 'act-3',
            title: 'Concluiu a aula "Seu primeiro Olá, Mundo!"',
            detail: 'Criou sua primeira tag <h1> no navegador',
            xp: '+35 XP',
            time: 'Hoje',
            icon: <CheckCircle2 className="h-4 w-4 text-[#2DD4BF]" />,
            bg: 'bg-[#0F766E]/20 border border-[#0D9488]/30',
          },
        ]
      : []),
    ...(completedIds.includes('les-1-2')
      ? [
          {
            id: 'act-2',
            title: 'Dominou a "Anatomia de uma Tag"',
            detail: 'Compreendeu abertura, fechamento e conteúdo',
            xp: '+30 XP',
            time: 'Hoje',
            icon: <CheckCircle2 className="h-4 w-4 text-[#2DD4BF]" />,
            bg: 'bg-[#0F766E]/20 border border-[#0D9488]/30',
          },
        ]
      : []),
    ...(completedIds.includes('les-1-1')
      ? [
          {
            id: 'act-1',
            title: 'Concluiu o conceito "O que é HTML?"',
            detail: 'Aprendeu sobre a fundação estrutural da Web',
            xp: '+35 XP',
            time: 'Hoje',
            icon: <CheckCircle2 className="h-4 w-4 text-[#2DD4BF]" />,
            bg: 'bg-[#0F766E]/20 border border-[#0D9488]/30',
          },
        ]
      : []),
    {
      id: 'act-streak',
      title: `${userState.streakDays} dias de sequência ativa`,
      detail: 'Construindo o hábito de programar diariamente',
      xp: 'Hábito',
      time: 'Ativo',
      icon: <Flame className="h-4 w-4 text-[#FB923C] fill-current" />,
      bg: 'bg-[#7C2D12]/20 border border-[#EA580C]/30',
    },
    {
      id: 'act-init',
      title: 'Iniciou a jornada de aprendizado',
      detail: 'Trilha de Fundamentos HTML5 desbloqueada',
      xp: '+10 XP',
      time: 'Início',
      icon: <Terminal className="h-4 w-4 text-[#38BDF8]" />,
      bg: 'bg-[#0369A1]/20 border border-[#0284C7]/30',
    },
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <div className="p-1.5 rounded-xl bg-[#0369A1]/30 text-[#38BDF8] border border-[#0284C7]/30">
          <Activity className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#F8FAFC]">Linha do Tempo de Atividades</h3>
          <p className="text-xs text-[#94A3B8]">Histórico cronológico recente de execução</p>
        </div>
      </div>

      <div className="space-y-2">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-2xl border border-[#1E293B] bg-[#0A0E1A] hover:border-[#334155] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${item.bg}`}>{item.icon}</div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#F8FAFC] truncate">{item.title}</h4>
                <p className="text-[11px] text-[#94A3B8] truncate">{item.detail}</p>
              </div>
            </div>

            <div className="text-right shrink-0 pl-3">
              <span className="text-xs font-bold text-[#FBBF24] block">{item.xp}</span>
              <span className="text-[10px] text-[#64748B] flex items-center justify-end gap-1">
                <Clock className="h-2.5 w-2.5" />
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
