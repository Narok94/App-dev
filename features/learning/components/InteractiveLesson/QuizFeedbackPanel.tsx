import React from 'react';
import { motion } from 'motion/react';
import { Check, AlertCircle, Zap } from 'lucide-react';
import { XP_RULES } from '@/features/learning/progression';

interface QuizFeedbackPanelProps {
  isCorrect: boolean;
  xpReward: number;
  explanationOnCorrect?: string;
  explanationOnIncorrect?: string;
}

export function QuizFeedbackPanel({
  isCorrect,
  xpReward,
  explanationOnCorrect,
  explanationOnIncorrect,
}: QuizFeedbackPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className={`feedback show ${isCorrect ? 'correct-fb' : 'incorrect-fb'}`}
    >
      <div className="flex items-center justify-between">
        <div className="fb-title">
          {isCorrect ? (
            <>
              <Check className="w-4 h-4 text-[#C8F03D]" />
              <span>Na mosca! Resposta certa. 🎯</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-[#FF6B4A]" />
              <span>Não foi dessa vez. Dá uma olhada com calma: 💡</span>
            </>
          )}
        </div>

        {isCorrect ? (
          <span className="px-2 py-0.5 rounded-full bg-[#C8F03D]/20 text-[11px] font-baloo font-bold text-[#C8F03D] flex items-center gap-1 shrink-0">
            <Zap className="w-3 h-3 fill-[#C8F03D]" /> +{xpReward} XP
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-full bg-[#FF6B4A]/20 text-[11px] font-baloo font-bold text-[#FF6B4A] flex items-center gap-1 shrink-0">
            <Zap className="w-3 h-3 fill-[#FF6B4A]" /> -{XP_RULES.WRONG_ANSWER_PENALTY} XP
          </span>
        )}
      </div>

      <div className="fb-text">
        {isCorrect
          ? explanationOnCorrect || 'Muito bem! Você acertou a resposta.'
          : explanationOnIncorrect ||
            'Sem problemas errar, o importante é tentar de novo.'}
      </div>
    </motion.div>
  );
}
