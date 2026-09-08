import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserLearningState, LearningModule, LessonPreview } from '@/types/learning';
import { LevelProgress, evaluateAchievements } from '@/features/learning/progression';
import { LevelProgressCard } from './LevelProgressCard';
import { HeroMissionCard } from './HeroMissionCard';
import { StatsGrid } from './StatsGrid';
import { LearningTrailCard } from './LearningTrailCard';
import { EraUnlockBanner } from './EraUnlockBanner';
import { AchievementsSection } from './AchievementsSection';
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
  progressPercent?: number;
  onStartLesson?: (lessonId: string) => void;
}

export function HomeScreen({
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

  const evaluatedAchs = evaluateAchievements(userState);
  const unlockedBadgesCount = evaluatedAchs.filter((a) => a.unlocked).length;

  const calculatedLessonXp = Math.round(
    nextPendingLesson.module.xpReward / Math.max(nextPendingLesson.module.lessons.length, 1)
  );

  const greetingName = userState.userName ? userState.userName : 'explorador';
  const isEraCompleted = modules.length > 0 && modules.every((m) => m.status === 'completed');

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
      <motion.div
        className="badges-card"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setActiveModal(activeModal === 'achievements' ? null : 'achievements')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setActiveModal('achievements')}
      >
        <div>
          <h3>Suas conquistas</h3>
          <p>{unlockedBadgesCount} de 6 desbloqueadas</p>
        </div>
        <div className="badge-icons">
          {evaluatedAchs.slice(0, 3).map((ach) => (
            <div
              key={ach.id}
              className={`badge-circle ${ach.unlocked ? 'teal' : 'locked'}`}
              title={`${ach.title}: ${ach.unlocked ? 'Desbloqueada' : 'Bloqueada'}`}
            >
              {ach.unlocked ? ach.icon : '🔒'}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modal/Gaveta de Conquistas */}
      <AnimatePresence>
        {activeModal === 'achievements' && (
          <motion.div
            key="modal-achievements"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12151F]/80 backdrop-blur-sm"
          >
            <div className="fixed inset-0" onClick={() => setActiveModal(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring' as const, damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-md bg-[#1B1F2E] border border-[#2C3247] rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2C3247]">
                <h3 className="font-baloo text-lg font-bold text-[#F2F1EA]">Conquistas e Emblemas</h3>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="text-[#9096AC] hover:text-[#F2F1EA] text-sm px-2 py-1 rounded-lg bg-[#232840] transition-colors"
                >
                  ✕ Fechar
                </button>
              </div>
              <AchievementsSection userState={userState} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal/Gaveta de Estatísticas */}
      <AnimatePresence>
        {activeModal === 'stats' && (
          <motion.div
            key="modal-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12151F]/80 backdrop-blur-sm"
          >
            <div className="fixed inset-0" onClick={() => setActiveModal(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring' as const, damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-md bg-[#1B1F2E] border border-[#2C3247] rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2C3247]">
                <h3 className="font-baloo text-lg font-bold text-[#F2F1EA]">Seu Desempenho</h3>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="text-[#9096AC] hover:text-[#F2F1EA] text-sm px-2 py-1 rounded-lg bg-[#232840] transition-colors"
                >
                  ✕ Fechar
                </button>
              </div>
              <StatsSection userState={userState} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
