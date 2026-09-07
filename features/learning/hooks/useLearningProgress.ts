import { useState, useEffect } from 'react';
import { LearningModule, UserLearningState, InteractiveLesson, Era } from '@/types/learning';
import {
  getAllModules,
  getQuestById,
  getFirstQuestOfModule,
  getActiveEra,
} from '../curriculum';
import { validateUserState, validateLearningModules, isValidXp } from '@/utils/validation';
import { sanitizeUserName } from '@/utils/sanitize';
import { logger } from '@/utils/logger';

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
          const parsed = JSON.parse(saved);
          return validateLearningModules(parsed, baseModules);
        }
      } catch (e) {
        logger.warn('Falha ao restaurar módulos do armazenamento local.', 'useLearningProgress', e);
      }
    }
    return baseModules;
  });

  // Carrega estado do usuário com validação estrita de schema
  const [userState, setUserState] = useState<UserLearningState>(() => {
    const baseModules = getAllModules();
    const defaultState: UserLearningState = {
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

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return validateUserState(parsed, defaultState);
        }
      } catch (e) {
        logger.warn('Falha ao restaurar estado do usuário do armazenamento local.', 'useLearningProgress', e);
      }
    }
    return defaultState;
  });

  // Salva no localStorage quando o progresso muda
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
        localStorage.setItem(`${STORAGE_KEY}_modules`, JSON.stringify(modules));
      } catch (e) {
        logger.warn('Falha ao persistir estado no armazenamento local.', 'useLearningProgress', e);
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

  // Atualiza nome do usuário com sanitização estrita contra XSS e injeções
  const updateUserName = (name: string) => {
    const sanitized = sanitizeUserName(name, userState.userName);
    if (sanitized) {
      setUserState((prev) => ({ ...prev, userName: sanitized }));
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

  // Concede XP de uma etapa da quest de forma atômica e persistente
  const awardStepXp = (amount: number) => {
    if (!isValidXp(amount) || amount <= 0) return;
    setUserState((prev) => {
      const nextXp = Math.min(10_000_000, prev.xp + amount);
      const nextState = { ...prev, xp: nextXp };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
        } catch (e) {
          logger.warn('Falha ao registrar XP.', 'useLearningProgress', e);
        }
      }
      return nextState;
    });
  };

  // Penaliza com desconto exato de XP (padrão 5 XP), nunca ficando abaixo de 0
  const penalizeStepXp = (penalty: number = 5) => {
    const penaltyAmount = Math.abs(penalty);
    if (!Number.isFinite(penaltyAmount)) return;
    setUserState((prev) => {
      const nextXp = Math.max(0, prev.xp - penaltyAmount);
      const nextState = { ...prev, xp: nextXp };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
        } catch (e) {
          logger.warn('Falha ao registrar penalidade de XP.', 'useLearningProgress', e);
        }
      }
      return nextState;
    });
  };

  // Permite ajuste arbitrário de XP garantindo nunca ser negativo
  const addXp = (amount: number) => {
    if (amount > 0) {
      awardStepXp(amount);
    } else if (amount < 0) {
      penalizeStepXp(Math.abs(amount));
    }
  };

  // Sai da lição/quest interativa e volta à trilha
  const exitLesson = () => {
    setActiveLesson(null);
  };

  // Conclui a lição/quest com sucesso e calcula desbloqueios sem duplicar XP
  const completeLesson = (lessonId: string, _xpEarned?: number) => {
    // 1. Atualiza IDs de aulas/quests completadas
    const currentCompleted = userState.completedLessonIds || [];
    const isAlreadyCompleted = currentCompleted.includes(lessonId);
    const updatedCompletedLessonIds = isAlreadyCompleted
      ? currentCompleted
      : [...currentCompleted, lessonId];
    const updatedCompletedQuestIds = userState.completedQuestIds?.includes(lessonId)
      ? userState.completedQuestIds
      : [...(userState.completedQuestIds || []), lessonId];

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
    // Preserva o XP atual (única fonte de verdade atualizada em tempo real)
    setUserState((prev) => {
      const nextState = {
        ...prev,
        completedLessonIds: updatedCompletedLessonIds,
        completedQuestIds: updatedCompletedQuestIds,
        completedModulesCount: updatedCompletedModules,
        currentModuleId: nextCurrentModuleId,
      };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
          localStorage.setItem(`${STORAGE_KEY}_modules`, JSON.stringify(updatedModules));
        } catch (e) {
          logger.warn('Falha ao persistir conclusão de aula no armazenamento local.', 'useLearningProgress', e);
        }
      }
      return nextState;
    });

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
    awardStepXp,
    penalizeStepXp,
    addXp,
  };
}
