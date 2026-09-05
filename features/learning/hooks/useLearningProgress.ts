import { useState, useEffect } from 'react';
import { LearningModule, UserLearningState, InteractiveLesson } from '@/types/learning';
import { HTML_BEGINNER_TRACK } from '../data/htmlCurriculum';
import { getLessonById, getFirstLessonOfModule } from '../data/htmlLessonsData';

const STORAGE_KEY = 'tatu_learning_progress_v2';

export function useLearningProgress() {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [activeLesson, setActiveLesson] = useState<InteractiveLesson | null>(null);

  // Carrega estado de módulos inicial
  const [modules, setModules] = useState<LearningModule[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`${STORAGE_KEY}_modules`);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Erro ao carregar módulos do localStorage:', e);
      }
    }
    return HTML_BEGINNER_TRACK;
  });

  // Carrega estado do usuário
  const [userState, setUserState] = useState<UserLearningState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Erro ao carregar progresso do localStorage:', e);
      }
    }
    // Estado inicial padrão com Módulo 01 pronto para ser explorado
    return {
      userName: 'Explorador',
      xp: 0,
      streakDays: 1,
      totalModulesCount: HTML_BEGINNER_TRACK.length,
      completedModulesCount: 0,
      currentModuleId: 'html-mod-1',
      completedLessonIds: [],
      avatarMood: 'happy',
      dailyLessonsGoal: 1,
      soundEnabled: true,
      hapticEnabled: true,
    };
  });

  // Salva no localStorage quando o estado for alterado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
        localStorage.setItem(`${STORAGE_KEY}_modules`, JSON.stringify(modules));
      } catch (e) {
        console.warn('Erro ao salvar no localStorage:', e);
      }
    }
  }, [userState, modules]);

  // Módulo atual em andamento
  const currentModule = modules.find((m) => m.id === userState.currentModuleId) || modules[0];

  // Identifica a próxima lição pendente de forma inteligente
  const nextPendingLesson = (() => {
    const completedSet = new Set(userState.completedLessonIds || []);
    // Procura no módulo atual
    const pendingInCurrent = currentModule.lessons.find((l) => !completedSet.has(l.id));
    if (pendingInCurrent) {
      return {
        lesson: pendingInCurrent,
        module: currentModule,
      };
    }
    // Caso o módulo atual esteja concluído, procura no próximo módulo desbloqueado
    const nextMod = modules.find((m) => m.status === 'current' && m.id !== currentModule.id);
    if (nextMod) {
      const pendingInNext = nextMod.lessons.find((l) => !completedSet.has(l.id));
      if (pendingInNext) {
        return {
          lesson: pendingInNext,
          module: nextMod,
        };
      }
    }
    // Fallback para a primeira lição do módulo atual
    return {
      lesson: currentModule.lessons[0],
      module: currentModule,
    };
  })();

  // Cálculo da porcentagem global de progresso da trilha
  const progressPercent = Math.round(
    (userState.completedModulesCount / (userState.totalModulesCount || 1)) * 100
  );

  const handleSelectModule = (mod: LearningModule) => {
    setSelectedModule(mod);
  };

  const closeModuleModal = () => {
    setSelectedModule(null);
  };

  // Inicia uma lição interativa diretamente
  const startLesson = (lessonId?: string) => {
    let lesson: InteractiveLesson | null = null;
    const targetId = lessonId || nextPendingLesson.lesson.id;
    if (targetId) {
      lesson = getLessonById(targetId);
    }
    if (!lesson) {
      lesson = getFirstLessonOfModule(userState.currentModuleId || 'html-mod-1');
    }

    if (lesson) {
      setActiveLesson(lesson);
      setSelectedModule(null); // Fecha modal caso esteja aberto
    }
  };

  // Atualiza nome do usuário
  const updateUserName = (name: string) => {
    const trimmed = name.trim();
    if (trimmed) {
      setUserState((prev) => ({ ...prev, userName: trimmed }));
    }
  };

  // Atualiza avatar do usuário
  const updateAvatarMood = (mood: 'happy' | 'waving' | 'thinking' | 'celebrating') => {
    setUserState((prev) => ({ ...prev, avatarMood: mood }));
  };

  // Alterna som
  const toggleSound = () => {
    setUserState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  // Reinicia o progresso com segurança
  const resetProgress = () => {
    const freshModules = HTML_BEGINNER_TRACK.map((m) => ({
      ...m,
      status: m.order === 1 ? ('current' as const) : ('locked' as const),
      lessons: m.lessons.map((l) => ({ ...l, isCompleted: false })),
    }));
    const freshUserState: UserLearningState = {
      userName: userState.userName || 'Explorador',
      xp: 0,
      streakDays: 1,
      totalModulesCount: HTML_BEGINNER_TRACK.length,
      completedModulesCount: 0,
      currentModuleId: 'html-mod-1',
      completedLessonIds: [],
      avatarMood: 'happy',
      dailyLessonsGoal: 1,
      soundEnabled: true,
      hapticEnabled: true,
    };
    setModules(freshModules);
    setUserState(freshUserState);
    setActiveLesson(null);
    setSelectedModule(null);
  };

  // Sai da lição interativa e volta à trilha
  const exitLesson = () => {
    setActiveLesson(null);
  };

  // Conclui a lição com sucesso e calcula XP e desbloqueio
  const completeLesson = (lessonId: string, xpEarned: number) => {
    // 1. Atualiza IDs de aulas completadas e XP do usuário
    const currentCompleted = userState.completedLessonIds || [];
    const isAlreadyCompleted = currentCompleted.includes(lessonId);
    const updatedCompletedLessonIds = isAlreadyCompleted
      ? currentCompleted
      : [...currentCompleted, lessonId];

    const updatedXp = userState.xp + (isAlreadyCompleted ? 0 : xpEarned);

    // 2. Atualiza a lista de módulos marcando a aula
    let updatedCompletedModules = userState.completedModulesCount;
    let nextCurrentModuleId = userState.currentModuleId;

    const updatedModules = modules.map((mod) => {
      const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId);
      if (lessonIndex === -1) return mod;

      const updatedLessons = mod.lessons.map((l) =>
        l.id === lessonId ? { ...l, isCompleted: true } : l
      );

      // Verifica se todas as lições do módulo agora estão completas
      const allLessonsDone = updatedLessons.every((l) => l.isCompleted);

      if (allLessonsDone && mod.status !== 'completed') {
        updatedCompletedModules += 1;
      }

      return {
        ...mod,
        lessons: updatedLessons,
        status: allLessonsDone ? ('completed' as const) : mod.status,
      };
    });

    // Se o módulo atual foi completado, desbloqueia o próximo módulo
    const currentModObj = updatedModules.find((m) => m.id === userState.currentModuleId);
    if (currentModObj && currentModObj.status === 'completed') {
      const nextMod = updatedModules.find((m) => m.order === currentModObj.order + 1);
      if (nextMod) {
        nextMod.status = 'current';
        nextCurrentModuleId = nextMod.id;
      }
    }

    setModules(updatedModules);
    setUserState((prev) => ({
      ...prev,
      xp: updatedXp,
      completedLessonIds: updatedCompletedLessonIds,
      completedModulesCount: updatedCompletedModules,
      currentModuleId: nextCurrentModuleId,
    }));

    // Fecha o player da lição e volta para a tela de aprendizado
    setActiveLesson(null);
  };

  return {
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
    setUserState,
    updateUserName,
    updateAvatarMood,
    toggleSound,
    resetProgress,
  };
}
