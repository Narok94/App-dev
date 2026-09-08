import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserLearningState, LearningModule, LessonPreview } from '@/types/learning';
import { LevelProgress, evaluateAchievements } from '@/features/learning/progression';
import { AchievementsSection } from './AchievementsSection';
import { StatsSection } from './StatsSection';

interface HomeScreenProps {
  userState: UserLearningState;
  modules: LearningModule[];
  currentModule: LearningModule;
  progressPercent: number;
  levelProgress?: LevelProgress;
  nextPendingLesson: {
    lesson: LessonPreview;
    module: LearningModule;
  };
  onContinueLearning: () => void;
  onSelectModule: (mod: LearningModule) => void;
  onStartLesson: (lessonId: string) => void;
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
  const [isPathOpen, setIsPathOpen] = useState(false);

  const completedToday = (userState.completedLessonIds?.length || 0) > 0;
  const completedLessonsCount = userState.completedLessonIds?.length || 0;

  const evaluatedAchs = evaluateAchievements(userState);
  const unlockedBadgesCount = evaluatedAchs.filter((a) => a.unlocked).length;

  const calculatedLessonXp = Math.round(
    nextPendingLesson.module.xpReward / Math.max(nextPendingLesson.module.lessons.length, 1)
  );

  const greetingName = userState.userName ? userState.userName : 'explorador';

  // Padrão de posições em zigue-zague conforme referência: center -> right -> center -> left
  const positions: Array<'center' | 'right' | 'left'> = ['center', 'right', 'center', 'left'];

  const currentLevel = levelProgress?.currentLevel;

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

      {/* 1.5. Card de Nível & Evolução RPG */}
      {levelProgress && (
        <div className="w-full p-4 rounded-3xl bg-[#1B1F2E] border border-[#2C3247] shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col gap-3 relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 right-0 w-36 h-20 bg-[radial-gradient(ellipse_at_top_right,rgba(139,124,246,0.15),transparent_70%)] pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8B7CF6] to-[#6366F1] text-white flex items-center justify-center text-xl shadow-[0_3px_0_#4F46E5] shrink-0">
                <span>{currentLevel?.badge || '🌱'}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B7CF6]">
                    Nível {currentLevel?.level}
                  </span>
                  <span className="text-[10px] text-[#9096AC] font-medium">
                    · {userState.xp} XP total
                  </span>
                </div>
                <h3 className="font-baloo text-base font-bold text-[#F2F1EA] leading-tight">
                  {currentLevel?.title}
                </h3>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-[#C8F03D]/15 border border-[#C8F03D]/30 text-[#C8F03D] font-baloo font-bold text-xs">
              {levelProgress.percentage}%
            </span>
          </div>

          {/* Progress Bar towards next level */}
          <div className="space-y-1.5">
            <div className="w-full h-2 rounded-full bg-[#12151F] border border-[#2C3247] overflow-hidden p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8B7CF6] via-[#A78BFA] to-[#C8F03D] rounded-full"
                initial={false}
                animate={{ width: `${levelProgress.percentage}%` }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#9096AC]">
              <span>
                {levelProgress.xpInCurrentLevel} / {currentLevel ? currentLevel.maxXp - currentLevel.minXp : 100} XP
              </span>
              <span>
                {levelProgress.nextLevel
                  ? `${levelProgress.xpRequiredForNextLevel} XP para ${levelProgress.nextLevel.title}`
                  : 'Nível Máximo Alcançado!'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Hero - Próxima Lição / Missão Ativa */}
      <div className="hero">
        <div className="hero-eyebrow flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C8F03D] animate-pulse" />
          <span>módulo {nextPendingLesson.module.order} · {nextPendingLesson.module.title.toLowerCase()}</span>
        </div>
        <h2>{nextPendingLesson.lesson.title}</h2>
        <div className="hero-sub">
          {nextPendingLesson.module.tagline || 'Descubra a fundação da web'}
        </div>
        <div className="hero-meta">
          <span>⏱ ~{nextPendingLesson.lesson.durationMinutes} min</span>
          <span className="text-[#C8F03D] font-bold">⚡ +{calculatedLessonXp} xp</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onContinueLearning}
          className="btn-primary cursor-pointer select-none"
        >
          {completedLessonsCount === 0 ? 'Iniciar Missão' : 'Continuar Missão'}
        </motion.button>
      </div>

      {/* 3. Stats Grid (3 Colunas) */}
      <div className="stats">
        <motion.div whileHover={{ y: -2 }} className="stat-card">
          <span className="stat-icon">🔥</span>
          <div className="stat-value">{userState.streakDays}</div>
          <div className="stat-label">
            {userState.streakDays === 1 ? 'dia ativo' : 'dias ativos'}
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="stat-card">
          <span className="stat-icon">🎯</span>
          <div className="stat-value">{completedToday ? '1/1' : '0/1'}</div>
          <div className="stat-label">meta de hoje</div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="stat-card cursor-pointer hover:border-[#38BDF8]/40 transition-colors"
          onClick={() => setActiveModal(activeModal === 'achievements' ? null : 'achievements')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setActiveModal('achievements')}
          title="Ver conquistas detalhadas"
        >
          <span className="stat-icon">🏅</span>
          <div className="stat-value">{unlockedBadgesCount}/{evaluatedAchs.length}</div>
          <div className="stat-label">conquistas</div>
        </motion.div>
      </div>

      {/* 4. Trilha de Aprendizado (Compacta por padrão, expansível em zigue-zague) */}
      <div className="path-card">
        <div className="path-head">
          <h3>Trilha de HTML</h3>
          <span>{userState.completedModulesCount} de {modules.length} módulos</span>
        </div>

        <div className="path-compact">
          <button
            type="button"
            onClick={() => onSelectModule(currentModule)}
            className={`node ${currentModule.status === 'completed' ? 'done' : 'current'}`}
            title={`Módulo ${currentModule.order}: ${currentModule.title}`}
          >
            {currentModule.status === 'completed' ? '✓' : currentModule.order}
          </button>
          <div className="path-compact-info">
            <div className="next-label">próximo módulo</div>
            <div className="next-title">{nextPendingLesson.lesson.title || currentModule.title}</div>
          </div>
          <button 
            type="button" 
            className={`expand-btn ${isPathOpen ? 'open' : ''}`} 
            onClick={() => setIsPathOpen(!isPathOpen)}
          >
            <span>{isPathOpen ? 'ocultar trilha' : 'ver trilha'}</span>
            <span className="chevron">▾</span>
          </button>
        </div>

        <div className={`path-zigzag ${isPathOpen ? 'open' : ''}`}>
          {modules.map((mod, index) => {
            const isCompleted = mod.status === 'completed';
            const isCurrent = mod.status === 'current' || (!isCompleted && mod.id === userState.currentModuleId);
            const pos = positions[index % positions.length];
            const isLast = index === modules.length - 1;

            let nodeClass = 'node';
            if (isCompleted) {
              nodeClass += ' done';
            } else if (isCurrent) {
              nodeClass += ' current';
            } else {
              nodeClass += ' locked';
            }

            return (
              <React.Fragment key={mod.id}>
                <div className={`zig-row ${pos}`}>
                  <div className="node-wrap">
                    <button
                      type="button"
                      onClick={() => onSelectModule(mod)}
                      className={nodeClass}
                      title={`Módulo ${mod.order}: ${mod.title} (${isCompleted ? 'Concluído' : isCurrent ? 'Atual' : 'Bloqueado'})`}
                      aria-label={`Módulo ${mod.order}: ${mod.title}`}
                    >
                      {isCompleted ? '✓' : mod.order}
                    </button>
                  </div>
                </div>

                {!isLast && (
                  <div className={`zig-row ${pos}`}>
                    <div className={`connector ${isCompleted ? 'filled' : ''}`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 4.5. Desbloqueio da Próxima Era: Era da Construção — CSS */}
      {modules.length > 0 && modules.every((m) => m.status === 'completed') && (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-br from-[#8B7CF6]/20 to-[#38BDF8]/10 border border-[#8B7CF6]/40 shadow-lg flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🏆</span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8F03D]">
                Conquista Lendária
              </span>
              <h4 className="font-baloo text-base font-bold text-[#F2F1EA] leading-tight">
                Era da Descoberta Conquistada!
              </h4>
            </div>
          </div>
          <p className="text-xs text-[#E0E5F0] leading-relaxed">
            Você ergueu seu <strong>Primeiro Artefato</strong> e domina o esqueleto semântico da Web!
          </p>
          <div className="pt-2 border-t border-[#8B7CF6]/20 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B7CF6]">
              <span>🎨 Próxima Evolução:</span>
              <span className="text-[#F2F1EA]">Era da Construção — CSS</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B7CF6]/20 text-[#8B7CF6] font-bold border border-[#8B7CF6]/30">
              Desbloqueada
            </span>
          </div>
        </div>
      )}

      {/* 5. Card de Conquistas */}
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

      {/* Modal/Gaveta de Conquistas (Abre ao tocar no card de conquistas) */}
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
