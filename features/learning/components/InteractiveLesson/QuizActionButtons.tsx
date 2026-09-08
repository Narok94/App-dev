import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface QuizActionButtonsProps {
  isAnswerChecked: boolean;
  isCorrect: boolean;
  isLastStep: boolean;
  selectedOptionId: string | null;
  onCheckAnswer: () => void;
  onNextStep: () => void;
  onRetry: () => void;
  onSkip?: () => void;
}

export function QuizActionButtons({
  isAnswerChecked,
  isCorrect,
  isLastStep,
  selectedOptionId,
  onCheckAnswer,
  onNextStep,
  onRetry,
  onSkip,
}: QuizActionButtonsProps) {
  return (
    <div className="w-full">
      {!isAnswerChecked ? (
        <motion.button
          whileHover={selectedOptionId ? { scale: 1.02 } : {}}
          whileTap={selectedOptionId ? { scale: 0.97 } : {}}
          type="button"
          onClick={onCheckAnswer}
          disabled={!selectedOptionId}
          className={`btn-primary py-3.5 sm:py-4 text-base rounded-2xl w-full select-none cursor-pointer ${
            selectedOptionId ? 'ready shadow-[0_4px_0_var(--lime-dark)] active:translate-y-1' : 'disabled'
          }`}
        >
          <span>{selectedOptionId ? 'Confirmar Resposta ⚡' : 'Selecione uma Alternativa'}</span>
        </motion.button>
      ) : isCorrect ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onNextStep}
          className="btn-primary ready py-3.5 sm:py-4 text-base rounded-2xl w-full shadow-[0_4px_0_var(--lime-dark)] active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 group"
        >
          <span>{isLastStep ? 'Concluir Missão 🏆' : 'Continuar a Jornada'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      ) : (
        <div className="flex gap-2.5 w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onRetry}
            className="btn-primary ready flex-1 py-3.5 sm:py-4 text-base rounded-2xl active:translate-y-1 cursor-pointer flex items-center justify-center gap-2"
            style={{
              background: 'var(--coral)',
              boxShadow: '0 4px 0 var(--coral-dark)',
              color: '#12151F',
            }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tentar de Novo</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onSkip}
            className="px-4 py-3.5 sm:py-4 rounded-2xl border border-[#2C3247] bg-[#232840] text-[#9096AC] hover:text-[#F2F1EA] font-baloo font-bold text-sm transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0"
          >
            <span>Pular</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
