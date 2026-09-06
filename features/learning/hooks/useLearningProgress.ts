import { useState, useEffect } from 'react';
import { LearningModule, UserLearningState, InteractiveLesson, Era } from '@/types/learning';
import {
  getAllModules,
  getQuestById,
  getFirstQuestOfModule,
  getActiveEra,
} from '../curriculum';

const STORAGE_KEY = 'tatu_learning_progress_v2';

export function useLearningProgress() {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [activeLesson, setActiveLesson] = useState<InteractiveLesson | null>(null);

  // Carrega estado de módulos inicial integrando com o catálogo de currículo da Era ativa
  const [modules, setModules] = useState<LearningModule[]>(() => {
    const baseModules = getAllModules();
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`${STORAGE_KEY}_modules`);
        if (saved) {
          const parsed = JSON.parse(saved) as LearningModule[];
          // Mescla com a definição de currículo atual para preservar progresso do aluno
          return baseModules.map((baseMod) => {
            const savedMod = parsed.find((p) => p.id === baseMod.id);
            if (!savedMod) return baseMod;
            return {
              ...baseMod,
              status: savedMod.status,
              lessons: baseMod.lessons.map((baseLesson) => {
                const savedLesson = savedMod.lessons.find((l) => l.id === baseLesson.id);
                return {
                  ...baseLesson,
                  isCompleted: savedLesson ? Boolean(savedLesson.isCompleted) : false,
                };
              }),
            };
          });
        }
      } catch (e) {
        console.warn('Erro ao carregar módulos do localStorage:', e);
      }
    }
    return baseModules;
  });

  // Carrega estado do usuário
  const [userState, setUserState] = useState<UserLearningState>(() => {
    const baseModules = getAllModules();
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            currentEraId: parsed.currentEraId || 'era-descoberta',
          };
        }
      } catch (e) {
        console.warn('Erro ao carregar progresso do localStorage:', e);
      }
    }
    // Estado inicial padrão com Módulo 01 pronto para ser explorado na Era da Descoberta
    return {
      userName: 'Explorador',
      xp: 0,
      streakDays: 1,
      totalModulesCount: baseModules.length,
      completedModulesCount: 0,
      currentEraId: 'era-descoberta',
      currentModuleId: 'html-mod-1',
      completedLessonIds: [],
      completedQuestIds: [],
      avatarMood: 'happy',
      dailyLessonsGoal: 1,
      soundEnabled: true,
      hapticEnabled: true,
    };
  });

  // Salva no localStorage quando o progresso muda
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
        localStorage.setItem(`${STORAGE_KEY}_modules`, JSON.stringify(modules));
      } catch (e) {
        console.warn('Erro ao salvar progresso no localStorage:', e);
      }
    }
  }, [userState, modules]);

  // Localiza o módulo corrente em andamento
  const currentModule =
    modules.find((m) => m.id === userState.currentModuleId) ||
    modules.find((m) => m.status === 'current') ||
    modules[0];

  // Cálculo da porcentagem total de progresso
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessonsCount = userState.completedLessonIds?.length || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  // Localiza a próxima lição / quest pendente de conclusão
  const getNextPendingLesson = () => {
    const currentMod = currentModule;
    const pendingInCurrent = currentMod?.lessons.find((l) => !l.isCompleted);
    if (pendingInCurrent && currentMod) {
      return { lesson: pendingInCurrent, module: currentMod };
    }

    for (const mod of modules) {
      const pending = mod.lessons.find((l) => !l.isCompleted);
      if (pending) {
        return { lesson: pending, module: mod };
      }
    }

    const fallbackMod = modules[0];
    return { lesson: fallbackMod.lessons[0], module: fallbackMod };
  };

  const nextPendingLesson = getNextPendingLesson();

  // Abre modal com detalhes do módulo
  const handleSelectModule = (mod: LearningModule) => {
    setSelectedModule(mod);
  };

  // Fecha modal de detalhes do módulo
  const closeModuleModal = () => {
    setSelectedModule(null);
  };

  // Inicia uma Quest interativa diretamente pelo ID
  const startLesson = (lessonId?: string) => {
    let quest: InteractiveLesson | null = null;
    const targetId = lessonId || nextPendingLesson.lesson.id;
    if (targetId) {
      quest = getQuestById(targetId) || null;
    }
    if (!quest) {
      quest = getFirstQuestOfModule(userState.currentModuleId || 'html-mod-1') || null;
    }

    if (quest) {
      setActiveLesson(quest);
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

  // Reinicia o progresso com segurança preservando o novo catálogo de currículo
  const resetProgress = () => {
    const baseModules = getAllModules();
    const freshModules = baseModules.map((m) => ({
      ...m,
      status: m.order === 1 ? ('current' as const) : ('locked' as const),
      lessons: m.lessons.map((l) => ({ ...l, isCompleted: false })),
    }));
    const freshUserState: UserLearningState = {
      userName: userState.userName || 'Explorador',
      xp: 0,
      streakDays: 1,
      totalModulesCount: baseModules.length,
      completedModulesCount: 0,
      currentEraId: 'era-descoberta',
      currentModuleId: 'html-mod-1',
      completedLessonIds: [],
      completedQuestIds: [],
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

  // Sai da lição/quest interativa e volta à trilha
  const exitLesson = () => {
    setActiveLesson(null);
  };

  // Conclui a lição/quest com sucesso e calcula XP e desbloqueio
  const completeLesson = (lessonId: string, xpEarned: number) => {
    // 1. Atualiza IDs de aulas/quests completadas e XP do usuário
    const currentCompleted = userState.completedLessonIds || [];
    const isAlreadyCompleted = currentCompleted.includes(lessonId);
    const updatedCompletedLessonIds = isAlreadyCompleted
      ? currentCompleted
      : [...currentCompleted, lessonId];
    const updatedCompletedQuestIds = userState.completedQuestIds?.includes(lessonId)
      ? userState.completedQuestIds
      : [...(userState.completedQuestIds || []), lessonId];

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
      completedQuestIds: updatedCompletedQuestIds,
      completedModulesCount: updatedCompletedModules,
      currentModuleId: nextCurrentModuleId,
    }));

    // Fecha o player da lição e volta para a tela de aprendizado
    setActiveLesson(null);
  };

  return {
    currentEra: getActiveEra(),
    modules,
    userState,
    currentModule,
    progressPercent,
    selectedModule,
    activeLesson,
    activeQuest: activeLesson,
    nextPendingLesson,
    handleSelectModule,
    closeModuleModal,
    startLesson,
    startQuest: startLesson,
    completeLesson,
    completeQuest: completeLesson,
    exitLesson,
    exitQuest: exitLesson,
    setUserState,
    updateUserName,
    updateAvatarMood,
    toggleSound,
    resetProgress,
  };
}
