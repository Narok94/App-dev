import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  Flame, 
  Target, 
  CheckCircle2, 
  Lock, 
  X, 
  ShieldCheck, 
  Zap,
  Code2
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { UserLearningState } from '@/types/learning';

interface AchievementsSectionProps {
  userState: UserLearningState;
}

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  criteria: string;
  icon: 'first' | 'streak' | 'accuracy' | 'module' | 'speed' | 'xp';
  xpBonus: number;
  isUnlocked: boolean;
}

export function AchievementsSection({ userState }: AchievementsSectionProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  const completedCount = userState.completedLessonIds?.length || 0;

  const achievements: AchievementItem[] = [
    {
      id: 'ach-1',
      title: 'Primeiro Compilado',
      description: 'Você executou seu primeiro bloco de código na web!',
      criteria: 'Conclua a sua primeira lição interativa.',
      icon: 'first',
      xpBonus: 25,
      isUnlocked: completedCount >= 1,
    },
    {
      id: 'ach-2',
      title: 'Circuito Ativo',
      description: 'A consistência diária é o motor de evolução do desenvolvedor.',
      criteria: 'Mantenha pelo menos 1 dia de sequência ativa.',
      icon: 'streak',
      xpBonus: 30,
      isUnlocked: userState.streakDays >= 1,
    },
    {
      id: 'ach-3',
      title: 'Mestre da Sintaxe',
      description: 'Tags e aninhamentos estruturais dominados com precisão.',
      criteria: 'Acerte os desafios de abertura e fechamento de tags.',
      icon: 'accuracy',
      xpBonus: 50,
      isUnlocked: completedCount >= 2,
    },
    {
      id: 'ach-4',
      title: 'Arquiteto Core',
      description: 'Concluiu com sucesso o Módulo 1 de Fundamentos HTML!',
      criteria: 'Complete todas as lições do primeiro módulo.',
      icon: 'module',
      xpBonus: 100,
      isUnlocked: userState.completedModulesCount >= 1,
    },
    {
      id: 'ach-5',
      title: 'Dev Imparável',
      description: 'Velocidade e foco construindo fundações sólidas de código.',
      criteria: 'Conclua 3 ou mais lições no aplicativo.',
      icon: 'speed',
      xpBonus: 75,
      isUnlocked: completedCount >= 3,
    },
    {
      id: 'ach-6',
      title: 'Kernel de Experiência',
      description: 'Acumulou mais de 70 XP em aprendizado prático.',
      criteria: 'Atinja 70 pontos de experiência no seu perfil.',
      icon: 'xp',
      xpBonus: 80,
      isUnlocked: userState.xp >= 70,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  const getIcon = (type: AchievementItem['icon'], isUnlocked: boolean) => {
    const iconClass = `h-5 w-5 ${isUnlocked ? 'text-[#38BDF8]' : 'text-[#64748B]'}`;
    switch (type) {
      case 'first':
        return <Award className={iconClass} />;
      case 'streak':
        return <Flame className={`h-5 w-5 ${isUnlocked ? 'text-[#FB923C] fill-current' : 'text-[#64748B]'}`} />;
      case 'accuracy':
        return <Target className={iconClass} />;
      case 'module':
        return <ShieldCheck className={`h-5 w-5 ${isUnlocked ? 'text-[#34D399]' : 'text-[#64748B]'}`} />;
      case 'speed':
        return <Zap className={iconClass} />;
      case 'xp':
        return <Sparkles className={`h-5 w-5 ${isUnlocked ? 'text-[#FBBF24] fill-current' : 'text-[#64748B]'}`} />;
    }
  };

  return (
    <section className="space-y-3.5">
      {/* Cabeçalho com contador de conquistas */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-[#1E3A8A]/40 text-[#60A5FA] border border-[#2563EB]/30">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-[#F8FAFC] tracking-tight">
              Conquistas & Distintivos Tech
            </h2>
            <p className="text-xs text-[#94A3B8]">Marcos de evolução na sua jornada dev</p>
          </div>
        </div>

        <Badge variant={unlockedCount > 0 ? 'electric' : 'neutral'}>
          {unlockedCount} de {achievements.length} Desbloqueados
        </Badge>
      </div>

      {/* Grade de Conquistas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => setSelectedAchievement(item)}
              className={`group p-3.5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                item.isUnlocked
                  ? 'border-[#3B82F6]/40 bg-gradient-to-b from-[#0F172A] to-[#131E38] hover:border-[#38BDF8] shadow-xs'
                  : 'border-[#1E293B] bg-[#0A0E1A]/90 hover:bg-[#0F172A]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-xl transition-transform group-hover:scale-110 ${
                      item.isUnlocked ? 'bg-[#1E3A8A]/50 border border-[#3B82F6]/30' : 'bg-[#1E293B]'
                    }`}
                  >
                    {getIcon(item.icon, item.isUnlocked)}
                  </div>

                  {item.isUnlocked ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0E7490]/30 text-[#2DD4BF] border border-[#06B6D4]/40">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1E293B] text-[#64748B]">
                      <Lock className="h-3 w-3" />
                    </span>
                  )}
                </div>

                <h3
                  className={`text-xs font-bold leading-tight ${
                    item.isUnlocked ? 'text-[#F8FAFC]' : 'text-[#64748B]'
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#94A3B8] mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#1E293B] flex items-center justify-between text-[10px]">
                <span className="font-bold text-[#FBBF24]">+{item.xpBonus} XP</span>
                <span
                  className={`font-semibold ${
                    item.isUnlocked ? 'text-[#34D399]' : 'text-[#64748B]'
                  }`}
                >
                  {item.isUnlocked ? 'Desbloqueado' : 'A Conquistar'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Dialog de Detalhe da Conquista */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070B14]/80 backdrop-blur-md animate-fade-in">
          <div className="fixed inset-0" onClick={() => setSelectedAchievement(null)} />
          <div className="relative z-10 w-full max-w-sm rounded-3xl bg-[#0F172A] border border-[#1E293B] p-6 shadow-2xl text-center animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:bg-[#1E293B] rounded-full transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div
              className={`mx-auto mb-3 inline-flex p-4 rounded-3xl ${
                selectedAchievement.isUnlocked ? 'bg-[#1E3A8A]/50 border border-[#3B82F6]/40' : 'bg-[#1E293B]'
              }`}
            >
              {getIcon(selectedAchievement.icon, selectedAchievement.isUnlocked)}
            </div>

            <Badge
              variant={selectedAchievement.isUnlocked ? 'electric' : 'neutral'}
              className="mb-2"
            >
              {selectedAchievement.isUnlocked ? 'Conquistado!' : 'Ainda Bloqueado'}
            </Badge>

            <h3 className="text-lg font-black text-[#F8FAFC]">
              {selectedAchievement.title}
            </h3>

            <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
              {selectedAchievement.description}
            </p>

            <div className="mt-4 p-3 rounded-2xl bg-[#0B0F19] border border-[#1E293B] text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                Requisito de Desbloqueio:
              </span>
              <p className="text-xs font-semibold text-[#F8FAFC] mt-0.5">
                {selectedAchievement.criteria}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-bold px-1">
              <span className="text-[#94A3B8]">Recompensa:</span>
              <span className="text-[#FBBF24] flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 fill-current" />
                +{selectedAchievement.xpBonus} XP de bônus
              </span>
            </div>

            <button
              onClick={() => setSelectedAchievement(null)}
              className="mt-5 w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#3B82F6] hover:to-[#2563EB] text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
