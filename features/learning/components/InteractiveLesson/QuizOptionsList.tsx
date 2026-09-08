import React from 'react';
import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { QuizOption } from '@/types/learning';

interface QuizOptionsListProps {
  options?: QuizOption[];
  selectedOptionId: string | null;
  isAnswerChecked: boolean;
  isCorrect: boolean;
  onSelectOption: (optionId: string) => void;
}

export function QuizOptionsList({
  options,
  selectedOptionId,
  isAnswerChecked,
  isCorrect,
  onSelectOption,
}: QuizOptionsListProps) {
  if (!options || options.length === 0) return null;

  return (
    <motion.div
      className="options"
      role="radiogroup"
      aria-label="Alternativas da questão"
      animate={isAnswerChecked && !isCorrect ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {options.map((option: QuizOption, idx: number) => {
        const isSelected = selectedOptionId === option.id;
        const letter = String.fromCharCode(65 + idx); // A, B, C, D

        // Classes base e de status
        let optionClass = 'option';
        let letterClass = 'letter';
        let radioIndicatorClass = 'radio-indicator';
        let indicatorContent: React.ReactNode = null;

        if (isAnswerChecked) {
          if (option.isCorrect) {
            optionClass += ' correct';
            letterClass += ' bg-[#C8F03D] text-[#12151F] border-[#C8F03D]';
            radioIndicatorClass += ' bg-[#C8F03D] text-[#12151F] border-[#C8F03D]';
            indicatorContent = <Check className="w-3.5 h-3.5 text-[#12151F] stroke-[3]" />;
          } else if (isSelected && !option.isCorrect) {
            optionClass += ' incorrect';
            letterClass += ' bg-[#FF6B4A] text-white border-[#FF6B4A]';
            radioIndicatorClass += ' bg-[#FF6B4A] text-white border-[#FF6B4A]';
            indicatorContent = <X className="w-3.5 h-3.5 text-white stroke-[3]" />;
          } else {
            optionClass += ' disabled opacity-35';
          }
        } else if (isSelected) {
          optionClass += ' selected';
          letterClass += ' bg-[#8B7CF6] text-[#12151F] border-[#8B7CF6]';
          radioIndicatorClass +=
            ' bg-[#8B7CF6] text-[#12151F] border-[#8B7CF6] shadow-[0_0_10px_rgba(139,124,246,0.7)]';
          indicatorContent = <Check className="w-3.5 h-3.5 text-[#12151F] stroke-[3]" />;
        }

        return (
          <motion.button
            whileHover={!isAnswerChecked ? { scale: 1.01 } : {}}
            whileTap={!isAnswerChecked ? { scale: 0.98 } : {}}
            key={option.id}
            type="button"
            onClick={() => onSelectOption(option.id)}
            disabled={isAnswerChecked}
            className={optionClass}
            aria-checked={isSelected}
            role="radio"
          >
            {/* Letra identificadora (A, B, C...) */}
            <div className={letterClass}>{letter}</div>

            {/* Texto da alternativa */}
            <div className="label">{option.text}</div>

            {/* Indicador visual circular à direita */}
            <div className={radioIndicatorClass}>{indicatorContent}</div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
