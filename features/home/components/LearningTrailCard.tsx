import React, { useState } from 'react';
import { LearningModule } from '@/types/learning';

interface LearningTrailCardProps {
  modules: LearningModule[];
  currentModule: LearningModule;
  currentModuleId: string;
  nextLessonTitle?: string;
  completedModulesCount: number;
  onSelectModule: (mod: LearningModule) => void;
}

const POSITIONS: Array<'center' | 'right' | 'left'> = ['center', 'right', 'center', 'left'];

export function LearningTrailCard({
  modules,
  currentModule,
  currentModuleId,
  nextLessonTitle,
  completedModulesCount,
  onSelectModule,
}: LearningTrailCardProps) {
  const [isPathOpen, setIsPathOpen] = useState(false);

  return (
    <div className="path-card">
      <div className="path-head">
        <h3>Trilha de HTML</h3>
        <span>{completedModulesCount} de {modules.length} módulos</span>
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
          <div className="next-title">{nextLessonTitle || currentModule.title}</div>
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
          const isCurrent = mod.status === 'current' || (!isCompleted && mod.id === currentModuleId);
          const pos = POSITIONS[index % POSITIONS.length];
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
  );
}
