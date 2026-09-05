import React from 'react';
import { Sparkles, Compass, CheckCircle2, ArrowLeft } from 'lucide-react';
import { LearningModule } from '@/types/learning';
import { LearningTrail } from './LearningTrail';
import { ModuleDetailModal } from './ModuleDetailModal';

interface LearnScreenProps {
  modules: LearningModule[];
  selectedModule: LearningModule | null;
  onSelectModule: (module: LearningModule) => void;
  onCloseModal: () => void;
  onBackToHome: () => void;
  onStartLesson: (lessonId?: string) => void;
}

export function LearnScreen({
  modules,
  selectedModule,
  onSelectModule,
  onCloseModal,
  onBackToHome,
  onStartLesson,
}: LearnScreenProps) {
  const completedCount = modules.filter((m) => m.status === 'completed').length;
  const totalXpInTrack = modules.reduce((acc, curr) => acc + curr.xpReward, 0);

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-10">
      {/* Botão de retorno rápido e contexto */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C5146] hover:text-[#2B231D] bg-[#EFEAE2] hover:bg-[#E5DFD4] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Voltar ao Início</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#706457]">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#2E5A44]" />
            {completedCount} de {modules.length} concluídos
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1 font-semibold text-[#C25E30]">
            <Sparkles className="h-3.5 w-3.5" />
            {totalXpInTrack} XP total
          </span>
        </div>
      </div>

      {/* Trilha de Aprendizado */}
      <div className="rounded-3xl border border-[#E5DFD4] bg-[#FFFDF9]/80 backdrop-blur-xs p-4 sm:p-6 shadow-xs">
        <LearningTrail
          modules={modules}
          onSelectModule={onSelectModule}
        />
      </div>

      {/* Modal de Detalhes do Módulo */}
      <ModuleDetailModal
        module={selectedModule}
        onClose={onCloseModal}
        onStartLesson={onStartLesson}
      />
    </div>
  );
}
