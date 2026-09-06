import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomeScreen } from '@/features/home';
import { 
  LessonPlayer, 
  ModuleBottomSheet,
  useLearningProgress 
} from '@/features/learning';
import { ProfileSettingsModal } from '@/components/profile/ProfileSettingsModal';

export default function AppPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const {
    modules,
    userState,
    currentModule,
    progressPercent,
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
  } = useLearningProgress();

  // Ação direta: "Continuar aprendendo" abre imediatamente a próxima lição pendente!
  const handleContinueLearning = () => {
    if (nextPendingLesson?.lesson) {
      startLesson(nextPendingLesson.lesson.id);
    } else {
      handleSelectModule(currentModule);
    }
  };

  // Se houver uma lição ativa, exibe o player interativo da lição
  if (activeLesson) {
    return (
      <div className="h-[100dvh] max-h-[100dvh] w-full bg-[#12151F] text-[#F2F1EA] flex flex-col items-center justify-center overflow-hidden selection:bg-[#C8F03D] selection:text-[#12151F]">
        <div className="w-full max-w-[440px] h-full flex flex-col">
          <LessonPlayer
            lesson={activeLesson}
            onComplete={completeLesson}
            onExit={exitLesson}
          />
        </div>
      </div>
    );
  }

  return (
    <div
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
        {/* Topbar com logo e pílulas de streak e XP */}
        <Header
          xp={userState.xp}
          streakDays={userState.streakDays}
          userName={userState.userName}
          avatarMood={userState.avatarMood}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Dashboard: Saudação, Hero da próxima lição, Stats 3-cols, Trilha zigue-zague, Conquistas */}
        <HomeScreen
          userState={userState}
          modules={modules}
          currentModule={currentModule}
          progressPercent={progressPercent}
          nextPendingLesson={nextPendingLesson}
          onContinueLearning={handleContinueLearning}
          onSelectModule={handleSelectModule}
          onStartLesson={(lessonId) => {
            closeModuleModal();
            startLesson(lessonId);
          }}
        />

        {/* Rodapé sutil */}
        <Footer />
      </div>

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
    </div>
  );
}
