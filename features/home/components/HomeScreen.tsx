import React, { useState } from 'react';
import { UserLearningState, LearningModule, LessonPreview } from '@/types/learning';
import { AchievementsSection } from './AchievementsSection';
import { StatsSection } from './StatsSection';

interface HomeScreenProps {
  userState: UserLearningState;
  modules: LearningModule[];
  currentModule: LearningModule;
  progressPercent: number;
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
  nextPendingLesson,
  onContinueLearning,
  onSelectModule,
}: HomeScreenProps) {
  const [activeModal, setActiveModal] = useState<'achievements' | 'stats' | null>(null);
  const [isPathOpen, setIsPathOpen] = useState(false);

  const completedToday = (userState.completedLessonIds?.length || 0) > 0;
  const completedLessonsCount = userState.completedLessonIds?.length || 0;

  // Cálculo das conquistas desbloqueadas (1 a 6)
  const isBadge1 = completedLessonsCount >= 1;
  const isBadge2 = userState.streakDays >= 1;
  const isBadge3 = completedLessonsCount >= 2;
  const isBadge4 = userState.completedModulesCount >= 1;
  const isBadge5 = userState.xp >= 100;
  const isBadge6 = userState.completedModulesCount >= 3;

  const unlockedBadgesCount = 
    (isBadge1 ? 1 : 0) +
    (isBadge2 ? 1 : 0) +
    (isBadge3 ? 1 : 0) +
    (isBadge4 ? 1 : 0) +
    (isBadge5 ? 1 : 0) +
    (isBadge6 ? 1 : 0);

  const calculatedLessonXp = Math.round(
    nextPendingLesson.module.xpReward / Math.max(nextPendingLesson.module.lessons.length, 1)
  );

  const greetingName = userState.userName ? userState.userName : 'explorador';

  // Padrão de posições em zigue-zague conforme referência: center -> right -> center -> left
  const positions: Array<'center' | 'right' | 'left'> = ['center', 'right', 'center', 'left'];

  return (
    <>
      {/* 1. Saudação */}
      <div className="greeting">
        <h1>Olá, {greetingName}</h1>
        <p>
          {completedToday
            ? 'Você já praticou hoje. Pronto para avançar na próxima lição?'
            : 'Continue seu estudo para manter o ritmo diário.'}
        </p>
      </div>

      {/* 2. Hero - Próxima Lição */}
      <div className="hero">
        <div className="hero-eyebrow">
          módulo {nextPendingLesson.module.order} · {nextPendingLesson.module.title.toLowerCase()}
        </div>
        <h2>{nextPendingLesson.lesson.title}</h2>
        <div className="hero-sub">
          {nextPendingLesson.module.tagline || 'Descubra a fundação da web'}
        </div>
        <div className="hero-meta">
          <span>⏱ ~{nextPendingLesson.lesson.durationMinutes} min</span>
          <span>⚡ +{calculatedLessonXp} xp</span>
        </div>
        <button
          type="button"
          onClick={onContinueLearning}
          className="btn-primary"
        >
          {completedLessonsCount === 0 ? 'Começar lição' : 'Continuar lição'}
        </button>
      </div>

      {/* 3. Stats Grid (3 Colunas) */}
      <div className="stats">
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <div className="stat-value">{userState.streakDays}</div>
          <div className="stat-label">
            {userState.streakDays === 1 ? 'dia ativo' : 'dias ativos'}
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🎯</span>
          <div className="stat-value">{completedToday ? '1/1' : '0/1'}</div>
          <div className="stat-label">hoje</div>
        </div>

        <div 
          className="stat-card cursor-pointer hover:border-[#38BDF8]/40 transition-colors"
          onClick={() => setActiveModal(activeModal === 'achievements' ? null : 'achievements')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setActiveModal('achievements')}
          title="Ver conquistas detalhadas"
        >
          <span className="stat-icon">🏅</span>
          <div className="stat-value">{unlockedBadgesCount}/6</div>
          <div className="stat-label">conquistas</div>
        </div>
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

      {/* 5. Card de Conquistas */}
      <div 
        className="badges-card"
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
          <div className={`badge-circle ${isBadge1 ? 'teal' : 'locked'}`}>
            {isBadge1 ? '🌱' : '🔒'}
          </div>
          <div className={`badge-circle ${isBadge2 ? 'amber' : 'locked'}`}>
            {isBadge2 ? '⭐' : '🔒'}
          </div>
          <div className={`badge-circle ${isBadge3 || isBadge5 ? 'teal' : 'locked'}`}>
            {isBadge3 || isBadge5 ? '⚡' : '🔒'}
          </div>
        </div>
      </div>

      {/* Modal/Gaveta de Conquistas (Abre ao tocar no card de conquistas) */}
      {activeModal === 'achievements' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12151F]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setActiveModal(null)} />
          <div className="relative z-10 w-full max-w-md bg-[#1B1F2E] border border-[#2C3247] rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2C3247]">
              <h3 className="font-baloo text-lg font-bold text-[#F2F1EA]">Conquistas e Emblemas</h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-[#9096AC] hover:text-[#F2F1EA] text-sm px-2 py-1 rounded-lg bg-[#232840]"
              >
                ✕ Fechar
              </button>
            </div>
            <AchievementsSection userState={userState} />
          </div>
        </div>
      )}

      {/* Modal/Gaveta de Estatísticas */}
      {activeModal === 'stats' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12151F]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setActiveModal(null)} />
          <div className="relative z-10 w-full max-w-md bg-[#1B1F2E] border border-[#2C3247] rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2C3247]">
              <h3 className="font-baloo text-lg font-bold text-[#F2F1EA]">Seu Desempenho</h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-[#9096AC] hover:text-[#F2F1EA] text-sm px-2 py-1 rounded-lg bg-[#232840]"
              >
                ✕ Fechar
              </button>
            </div>
            <StatsSection userState={userState} />
          </div>
        </div>
      )}
    </>
  );
}
