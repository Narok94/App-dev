import React, { useState, useMemo } from 'react';
import { UserLearningState, LearningModule, LessonPreview } from '@/types/learning';
import { LevelProgress, evaluateAchievements } from '@/features/learning/progression';
import { AppDialogModal } from '@/components/ui/AppDialogModal';
import { LevelProgressCard } from './LevelProgressCard';
import { HeroMissionCard } from './HeroMissionCard';
import { StatsGrid } from './StatsGrid';
import { LearningTrailCard } from './LearningTrailCard';
import { EraUnlockBanner } from './EraUnlockBanner';
import { AchievementsSection } from './AchievementsSection';
import { AchievementsSummaryCard } from './AchievementsSummaryCard';
import { StatsSection } from './StatsSection';

export interface HomeScreenProps {
  userState: UserLearningState;
  modules: LearningModule[];
  currentModule: LearningModule;
  levelProgress?: LevelProgress;
  nextPendingLesson: {
    lesson: LessonPreview;
    module: LearningModule;
  };
  onContinueLearning: () => void;
  onSelectModule: (mod: LearningModule) => void;
}

function HomeScreenComponent({
  userState,
  modules,
  currentModule,
  levelProgress,
  nextPendingLesson,
  onContinueLearning,
  onSelectModule,
}: HomeScreenProps) {
  const [activeModal, setActiveModal] = useState<'achievements' | 'stats' | null>(null);

  const completedToday = (userState.completedLessonIds?.length || 0) > 0;
  const completedLessonsCount = userState.completedLessonIds?.length || 0;

  const evaluatedAchs = useMemo(() => evaluateAchievements(userState), [userState]);
  const unlockedBadgesCount = useMemo(
    () => evaluatedAchs.filter((a) => a.unlocked).length,
    [evaluatedAchs]
  );

  const calculatedLessonXp = useMemo(() => {
    return Math.round(
      nextPendingLesson.module.xpReward / Math.max(nextPendingLesson.module.lessons.length, 1)
    );
  }, [nextPendingLesson.module.xpReward, nextPendingLesson.module.lessons.length]);

  const greetingName = userState.userName ? userState.userName : 'explorador';
  const isEraCompleted = useMemo(
    () => modules.length > 0 && modules.every((m) => m.status === 'completed'),
    [modules]
  );

  return (
    <div className="flex flex-col gap-[18px] w-full">
      {/* 1. Saudação */}
      <div className="greeting">
        <h1 className="font-baloo text-2xl font-bold text-[#F2F1EA]">Olá, {greetingName} 👋</h1>
        <p className="text-xs text-[#9096AC]">
          {completedToday
            ? 'Mandou bem hoje! Que tal avançar mais uma missão no código?'
            : 'Sua jornada de código te espera. Pronto para a próxima missão?'}
        </p>
      </div>

      {/* 2. Card de Nível & Evolução RPG */}
      {levelProgress && (
        <LevelProgressCard levelProgress={levelProgress} userXp={userState.xp} />
      )}

      {/* 3. Hero - Próxima Missão Ativa */}
      <HeroMissionCard
        nextPendingLesson={nextPendingLesson}
        completedLessonsCount={completedLessonsCount}
        calculatedLessonXp={calculatedLessonXp}
        onContinueLearning={onContinueLearning}
      />

      {/* 4. Stats Grid (3 Colunas) */}
      <StatsGrid
        streakDays={userState.streakDays}
        completedToday={completedToday}
        unlockedBadgesCount={unlockedBadgesCount}
        totalBadgesCount={evaluatedAchs.length}
        onOpenAchievements={() =>
          setActiveModal(activeModal === 'achievements' ? null : 'achievements')
        }
      />

      {/* 5. Trilha de Aprendizado (Compacta por padrão, expansível em zigue-zague) */}
      <LearningTrailCard
        modules={modules}
        currentModule={currentModule}
        currentModuleId={userState.currentModuleId}
        nextLessonTitle={nextPendingLesson.lesson.title || currentModule.title}
        completedModulesCount={userState.completedModulesCount}
        onSelectModule={onSelectModule}
      />

      {/* 6. Desbloqueio da Próxima Era: Era da Construção — CSS */}
      {isEraCompleted && <EraUnlockBanner />}

      {/* 7. Card de Resumo de Conquistas */}
      <AchievementsSummaryCard
        unlockedCount={unlockedBadgesCount}
        totalCount={evaluatedAchs.length}
        achievements={evaluatedAchs}
        onOpen={() => setActiveModal(activeModal === 'achievements' ? null : 'achievements')}
      />

      {/* Modal/Gaveta de Conquistas */}
      <AppDialogModal
        isOpen={activeModal === 'achievements'}
        onClose={() => setActiveModal(null)}
        title="Conquistas e Emblemas"
      >
        {activeModal === 'achievements' && <AchievementsSection userState={userState} />}
      </AppDialogModal>

      {/* Modal/Gaveta de Estatísticas */}
      <AppDialogModal
        isOpen={activeModal === 'stats'}
        onClose={() => setActiveModal(null)}
        title="Seu Desempenho"
      >
        {activeModal === 'stats' && <StatsSection userState={userState} />}
      </AppDialogModal>
    </div>
  );
}

export const HomeScreen = React.memo(HomeScreenComponent);

