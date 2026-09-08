import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomeScreen } from '@/features/home';
import { 
  LessonPlayer, 
  ModuleBottomSheet,
  useLearningProgress 
} from '@/features/learning';
import { ProfileSettingsModal } from '@/components/profile/ProfileSettingsModal';
import { LevelUpModal } from '@/components/ui/LevelUpModal';
import { AchievementToast } from '@/components/ui/AchievementToast';

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
  const handleContinueLearning = () => {
    if (nextPendingLesson?.lesson) {
      startLesson(nextPendingLesson.lesson.id);
    } else {
      handleSelectModule(currentModule);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {activeLesson ? (
          <motion.div
            key="lesson-player"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="h-[100dvh] max-h-[100dvh] w-full bg-[#12151F] text-[#F2F1EA] flex flex-col items-center justify-center overflow-hidden selection:bg-[#C8F03D] selection:text-[#12151F] relative"
          >
            <div className="w-full max-w-[440px] h-full flex flex-col">
              <LessonPlayer
                lesson={activeLesson}
                userXp={userState.xp}
                onAwardXp={awardStepXp}
                onPenalizeXp={penalizeStepXp}
                onComplete={completeLesson}
                onExit={exitLesson}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="home-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-[#12151F] text-[#F2F1EA] flex flex-col items-center selection:bg-[#C8F03D] selection:text-[#12151F]"
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
                onOpenProfile={() => setIsProfileOpen(true)}
              />

              <HomeScreen
                userState={userState}
                modules={modules}
                currentModule={currentModule}
                progressPercent={progressPercent}
                levelProgress={levelProgress}
                nextPendingLesson={nextPendingLesson}
                onContinueLearning={handleContinueLearning}
                onSelectModule={handleSelectModule}
                onStartLesson={(lessonId) => {
                  closeModuleModal();
                  startLesson(lessonId);
                }}
              />

              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Level-up Modal */}
      <LevelUpModal
        level={levelUpModalLevel}
        isOpen={Boolean(levelUpModalLevel)}
        onClose={closeLevelUpModal}
      />

      {/* Global Achievement Toast */}
      <AchievementToast
        achievement={recentAchievement}
        onClose={closeAchievementToast}
      />

      {/* Painel / Bottom Sheet de Perfil & Configurações */}
      <ProfileSettingsModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userState={userState}
        onUpdateName={updateUserName}
        onUpdateAvatar={updateAvatarMood}
        onToggleSound={toggleSound}
        onResetProgress={resetProgress}
      />

      {/* Modal / Bottom Sheet de Detalhes do Módulo */}
      <ModuleBottomSheet
        module={selectedModule}
        onClose={closeModuleModal}
        onStartLesson={(lessonId) => {
          closeModuleModal();
          startLesson(lessonId);
        }}
        completedLessonIds={userState.completedLessonIds}
      />
    </>
  );
}

