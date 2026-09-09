import { useState, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomeScreen } from '@/features/home';
import { useLearningProgress } from '@/features/learning';

const LessonPlayer = lazy(() =>
  import('@/features/learning/components/InteractiveLesson/LessonPlayer').then((m) => ({
    default: m.LessonPlayer,
  }))
);

const ProfileSettingsModal = lazy(() =>
  import('@/components/profile/ProfileSettingsModal').then((m) => ({
    default: m.ProfileSettingsModal,
  }))
);

const LevelUpModal = lazy(() =>
  import('@/components/ui/LevelUpModal').then((m) => ({
    default: m.LevelUpModal,
  }))
);

const AchievementToast = lazy(() =>
  import('@/components/ui/AchievementToast').then((m) => ({
    default: m.AchievementToast,
  }))
);

const ModuleBottomSheet = lazy(() =>
  import('@/features/learning/components/ModuleBottomSheet').then((m) => ({
    default: m.ModuleBottomSheet,
  }))
);

export default function AppPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const {
    modules,
    userState,
    currentModule,
    progressPercent,
    levelProgress,
    levelUpModalLevel,
    recentAchievement,
    recentXpDelta,
    closeLevelUpModal,
    closeAchievementToast,
    selectedModule,
    activeLesson,
    nextPendingLesson,
    handleSelectModule,
    closeModuleModal,
    startLesson,
    completeLesson,
    exitLesson,
    updateUserName,
    updateAvatarMood,
    toggleSound,
    resetProgress,
    awardStepXp,
    penalizeStepXp,
  } = useLearningProgress();

  // Ação direta: "Continuar aprendendo" abre imediatamente a próxima lição pendente!
  const handleContinueLearning = useCallback(() => {
    if (nextPendingLesson?.lesson) {
      startLesson(nextPendingLesson.lesson.id);
    } else {
      handleSelectModule(currentModule);
    }
  }, [nextPendingLesson, startLesson, handleSelectModule, currentModule]);

  const handleOpenProfile = useCallback(() => {
    setIsProfileOpen(true);
  }, []);

  const handleCloseProfile = useCallback(() => {
    setIsProfileOpen(false);
  }, []);

  const handleStartLessonFromSheet = useCallback(
    (lessonId: string) => {
      closeModuleModal();
      startLesson(lessonId);
    },
    [closeModuleModal, startLesson]
  );

  return (
    <div className="w-full min-h-screen min-h-[100dvh] bg-[#12151F] text-[#F2F1EA] relative flex flex-col items-center selection:bg-[#C8F03D] selection:text-[#12151F]">
      <AnimatePresence mode="wait" initial={false}>
        {activeLesson ? (
          <motion.div
            key="lesson-player"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="h-[100dvh] max-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden relative"
          >
            <div className="w-full max-w-[440px] h-full flex flex-col">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-[#C8F03D] border-t-transparent animate-spin" />
                  </div>
                }
              >
                <LessonPlayer
                  lesson={activeLesson}
                  userXp={userState.xp}
                  onAwardXp={awardStepXp}
                  onPenalizeXp={penalizeStepXp}
                  onComplete={completeLesson}
                  onExit={exitLesson}
                />
              </Suspense>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="home-screen"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen min-h-[100dvh] flex flex-col items-center"
            style={{
              paddingTop: 'var(--page-padding-top)',
              paddingBottom: 'var(--page-padding-bottom)',
              paddingLeft: 'max(16px, calc(env(safe-area-inset-left, 0px) + 16px))',
              paddingRight: 'max(16px, calc(env(safe-area-inset-right, 0px) + 16px))',
            }}
          >
            {/* Screen container: max-w: 420px, gap: 18px */}
            <div className="tatu-screen w-full max-w-[420px] flex flex-col gap-[18px]">
              <Header
                xp={userState.xp}
                streakDays={userState.streakDays}
                userName={userState.userName}
                avatarMood={userState.avatarMood}
                levelProgress={levelProgress}
                xpDelta={recentXpDelta}
                onOpenProfile={handleOpenProfile}
              />

              <HomeScreen
                userState={userState}
                modules={modules}
                currentModule={currentModule}
                levelProgress={levelProgress}
                nextPendingLesson={nextPendingLesson}
                onContinueLearning={handleContinueLearning}
                onSelectModule={handleSelectModule}
              />

              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Level-up Modal (Carregado sob demanda com lazy/Suspense) */}
      {Boolean(levelUpModalLevel) && (
        <Suspense fallback={null}>
          <LevelUpModal
            level={levelUpModalLevel}
            isOpen={Boolean(levelUpModalLevel)}
            onClose={closeLevelUpModal}
          />
        </Suspense>
      )}

      {/* Global Achievement Toast (Carregado sob demanda com lazy/Suspense) */}
      {Boolean(recentAchievement) && (
        <Suspense fallback={null}>
          <AchievementToast
            achievement={recentAchievement}
            onClose={closeAchievementToast}
          />
        </Suspense>
      )}

      {/* Painel / Bottom Sheet de Perfil & Configurações (Carregado sob demanda com lazy/Suspense) */}
      {isProfileOpen && (
        <Suspense fallback={null}>
          <ProfileSettingsModal
            isOpen={isProfileOpen}
            onClose={handleCloseProfile}
            userState={userState}
            modules={modules}
            onUpdateName={updateUserName}
            onUpdateAvatar={updateAvatarMood}
            onToggleSound={toggleSound}
            onResetProgress={resetProgress}
          />
        </Suspense>
      )}

      {/* Modal / Bottom Sheet de Detalhes do Módulo (Carregado sob demanda com lazy/Suspense) */}
      {Boolean(selectedModule) && (
        <Suspense fallback={null}>
          <ModuleBottomSheet
            module={selectedModule}
            onClose={closeModuleModal}
            onStartLesson={handleStartLessonFromSheet}
            completedLessonIds={userState.completedLessonIds}
          />
        </Suspense>
      )}
    </div>
  );
}

