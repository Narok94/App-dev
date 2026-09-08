import React from 'react';
import { Sparkles, Flame, Award } from 'lucide-react';

interface ProfileStatsOverviewProps {
  xp: number;
  streakDays: number;
  completedModulesCount: number;
}

export function ProfileStatsOverview({
  xp,
  streakDays,
  completedModulesCount,
}: ProfileStatsOverviewProps) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2.5">
        Progresso Acumulado
      </label>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-2xl border border-[#1E293B] bg-[#0A0E1A] text-center">
          <div className="inline-flex p-2 rounded-xl bg-[#1E3A8A]/40 text-[#38BDF8] mb-1">
            <Sparkles className="h-4 w-4 fill-current" />
          </div>
          <div className="text-lg font-black text-[#F8FAFC]">{xp}</div>
          <div className="text-[10px] font-bold text-[#64748B] uppercase">XP Total</div>
        </div>

        <div className="p-3 rounded-2xl border border-[#1E293B] bg-[#0A0E1A] text-center">
          <div className="inline-flex p-2 rounded-xl bg-[#7C2D12]/30 text-[#FB923C] mb-1">
            <Flame className="h-4 w-4 fill-current" />
          </div>
          <div className="text-lg font-black text-[#F8FAFC]">{streakDays} d</div>
          <div className="text-[10px] font-bold text-[#64748B] uppercase">Sequência</div>
        </div>

        <div className="p-3 rounded-2xl border border-[#1E293B] bg-[#0A0E1A] text-center">
          <div className="inline-flex p-2 rounded-xl bg-[#0F766E]/30 text-[#2DD4BF] mb-1">
            <Award className="h-4 w-4" />
          </div>
          <div className="text-lg font-black text-[#F8FAFC]">{completedModulesCount}</div>
          <div className="text-[10px] font-bold text-[#64748B] uppercase">Módulos</div>
        </div>
      </div>
    </div>
  );
}
