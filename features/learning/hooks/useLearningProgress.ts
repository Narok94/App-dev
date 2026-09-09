import { useState, useEffect, useMemo, useCallback } from 'react';
import { LearningModule, UserLearningState, InteractiveLesson, Era } from '@/types/learning';
import {
  getAllModules,
  getQuestById,
  getFirstQuestOfModule,
  getActiveEra,
} from '../curriculum';
import {
  calculateLevelProgress,
  detectLevelUp,
  detectNewAchievements,
  PlayerLevel,
  EvaluatedAchievement,
  LevelProgress,
  XP_RULES,
} from '../progression';
import {
  playSuccessSound,
  playErrorSound,
  playLevelUpSound,
  playXpGainSound,
} from '@/lib/soundEffects';
import { validateUserState, validateLearningModules, isValidXp } from '@/utils/validation';
import { sanitizeUserName } from '@/utils/sanitize';
import { logger } from '@/utils/logger';

const STORAGE_KEY = 'tatu_learning_progress_v2';

export function useLearningProgress() {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [activeLesson, setActiveLesson] = useState<InteractiveLesson | null>(null);
  const [levelUpModalLevel, setLevelUpModalLevel] = useState<PlayerLevel | null>(null);
  const [recentAchievement, setRecentAchievement] = useState<EvaluatedAchievement | null>(null);
  const [recentXpDelta, setRecentXpDelta] = useState<{ id: number; amount: number; type: 'gain' | 'loss' } | null>(null);

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

  // Localiza o módulo corrente em andamento (memoizado para evitar buscas lineares redundantes)
  const currentModule = useMemo(() => {
    return (
      modules.find((m) => m.id === userState.currentModuleId) ||
      modules.find((m) => m.status === 'current') ||
      modules[0]
    );
  }, [modules, userState.currentModuleId]);

  // Cálculo da porcentagem total de progresso (memoizado)
  const progressPercent = useMemo(() => {
    const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedLessonsCount = userState.completedLessonIds?.length || 0;
    return totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
  }, [modules, userState.completedLessonIds]);

  // Localiza a próxima lição / quest pendente de conclusão (memoizado para manter estabilidade referencial)
  const nextPendingLesson = useMemo(() => {
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
  }, [modules, currentModule]);

  // Abre modal com detalhes do módulo
  const handleSelectModule = useCallback((mod: LearningModule) => {
    setSelectedModule(mod);
  }, []);

  // Fecha modal de detalhes do módulo
  const closeModuleModal = useCallback(() => {
    setSelectedModule(null);
  }, []);

  // Inicia uma Quest interativa diretamente pelo ID
  const startLesson = useCallback((lessonId?: string) => {
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
  }, [nextPendingLesson, userState.currentModuleId]);

  // Atualiza nome do usuário com sanitização estrita contra XSS e injeções
  const updateUserName = useCallback((name: string) => {
    const sanitized = sanitizeUserName(name, userState.userName);
    if (sanitized) {
      setUserState((prev) => ({ ...prev, userName: sanitized }));
    }
  }, [userState.userName]);

  // Atualiza avatar do usuário
  const updateAvatarMood = useCallback((mood: 'happy' | 'waving' | 'thinking' | 'celebrating') => {
    setUserState((prev) => ({ ...prev, avatarMood: mood }));
  }, []);

  // Alterna som
  const toggleSound = useCallback(() => {
    setUserState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  // Reinicia o progresso com segurança preservando o novo catálogo de currículo
  const resetProgress = useCallback(() => {
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
  }, [userState.userName]);

  // Concede XP de uma etapa da quest de forma atômica e persistente
  const awardStepXp = useCallback((amount: number) => {
    if (!isValidXp(amount) || amount <= 0) return;

    // Efeito sonoro de ganho de XP
    playXpGainSound(userState.soundEnabled !== false);

    setRecentXpDelta({
      id: Date.now(),
      amount,
      type: 'gain',
    });

    setUserState((prev) => {
      const nextXp = Math.min(10_000_000, prev.xp + amount);
      const nextState = { ...prev, xp: nextXp };

      // Verifica se houve Level Up
      const levelUp = detectLevelUp(prev.xp, nextXp);
      if (levelUp) {
        setLevelUpModalLevel(levelUp.newLevel);
        playLevelUpSound(userState.soundEnabled !== false);
      }

      // Verifica se desbloqueou nova conquista com esse ganho
      const newAchs = detectNewAchievements(prev, nextState);
      if (newAchs.length > 0) {
        setRecentAchievement(newAchs[0]);
      }

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
        } catch (e) {
          logger.warn('Falha ao registrar XP.', 'useLearningProgress', e);
        }
      }
      return nextState;
    });
  }, [userState.soundEnabled]);

  // Penaliza com desconto exato de XP (padrão 5 XP), nunca ficando abaixo de 0
  const penalizeStepXp = useCallback((penalty: number = XP_RULES.WRONG_ANSWER_PENALTY) => {
    const penaltyAmount = Math.abs(penalty);
    if (!Number.isFinite(penaltyAmount)) return;

    // Efeito sonoro suave de erro
    playErrorSound(userState.soundEnabled !== false);

    setRecentXpDelta({
      id: Date.now(),
      amount: penaltyAmount,
      type: 'loss',
    });

    setUserState((prev) => {
      const nextXp = Math.max(0, prev.xp - penaltyAmount);
      return { ...prev, xp: nextXp };
    });
  }, [userState.soundEnabled]);

  // Permite ajuste arbitrário de XP garantindo nunca ser negativo
  const addXp = useCallback((amount: number) => {
    if (amount > 0) {
      awardStepXp(amount);
    } else if (amount < 0) {
      penalizeStepXp(Math.abs(amount));
    }
  }, [awardStepXp, penalizeStepXp]);

  // Sai da lição/quest interativa e volta à trilha
  const exitLesson = useCallback(() => {
    setActiveLesson(null);
  }, []);

  // Conclui a lição/quest com sucesso e calcula desbloqueios sem duplicar XP
  const completeLesson = useCallback((lessonId: string, _xpEarned?: number) => {
    playSuccessSound(userState.soundEnabled !== false);

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

    // Se o módulo atual foi completado, desbloqueia o próximo módulo de forma imutável
    let finalModules = updatedModules;
    const currentModObj = updatedModules.find((m) => m.id === userState.currentModuleId);
    if (currentModObj && currentModObj.status === 'completed') {
      const nextMod = updatedModules.find((m) => m.order === currentModObj.order + 1);
      if (nextMod) {
        nextCurrentModuleId = nextMod.id;
        finalModules = updatedModules.map((m) =>
          m.id === nextMod.id ? { ...m, status: 'current' as const } : m
        );
      }
    }

    setModules(finalModules);
    // Preserva o XP atual (única fonte de verdade atualizada em tempo real)
    setUserState((prev) => {
      const nextState = {
        ...prev,
        completedLessonIds: updatedCompletedLessonIds,
        completedQuestIds: updatedCompletedQuestIds,
        completedModulesCount: updatedCompletedModules,
        currentModuleId: nextCurrentModuleId,
      };

      // Detecta novas conquistas desbloqueadas pela conclusão da lição/módulo
      const newAchs = detectNewAchievements(prev, nextState);
      if (newAchs.length > 0) {
        setRecentAchievement(newAchs[0]);
      }

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
  }, [userState.soundEnabled, userState.completedLessonIds, userState.completedQuestIds, userState.completedModulesCount, userState.currentModuleId, modules]);

  const levelProgress = useMemo(
    () => calculateLevelProgress(userState.xp),
    [userState.xp]
  );

  const currentEra = useMemo(() => getActiveEra(), []);

  const closeLevelUpModal = useCallback(() => setLevelUpModalLevel(null), []);
  const closeAchievementToast = useCallback(() => setRecentAchievement(null), []);

  return {
    currentEra,
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
