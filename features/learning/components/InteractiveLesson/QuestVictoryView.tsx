import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Zap, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { InteractiveLesson } from '@/types/learning';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface QuestVictoryViewProps {
  lesson: InteractiveLesson;
  finalXp: number;
  onContinue: () => void;
}

export function QuestVictoryView({
  lesson,
  finalXp,
  onContinue,
}: QuestVictoryViewProps) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, damping: 20, stiffness: 200 }
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-[420px] my-auto"
    >
      <div className="quest-card text-center p-4 sm:p-6 space-y-3.5 sm:space-y-4 relative overflow-hidden">
        {/* Aura de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[radial-gradient(ellipse_at_top,rgba(200,240,61,0.2),transparent_70%)] pointer-events-none" />

        {/* Emblema de Vitória da Quest com animação */}
        <motion.div
          variants={itemVariants}
          className="relative mx-auto w-16 h-16 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-[#C8F03D] text-[#12151F] flex items-center justify-center shadow-[0_0_25px_rgba(200,240,61,0.4),0_5px_0_var(--lime-dark)]"
        >
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 260, delay: 0.1 }}
          >
            <Trophy className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
          </motion.div>
        </motion.div>

        {/* Tag de Vitória */}
        <motion.div variants={itemVariants} className="tag tag-lime mx-auto mb-0">
          ✦ Lição Concluída!
        </motion.div>

        {/* Título & Mensagem da Vitória */}
        <motion.div variants={itemVariants} className="space-y-1">
          <h2 className="q-title text-xl sm:text-2xl text-white mb-1">Mandou muito bem! 🎉</h2>
          <p className="text-xs text-[#9096AC] leading-relaxed max-w-xs mx-auto">
            Você completou todas as etapas e praticou{' '}
            <span className="text-[#F2F1EA] font-semibold">{lesson.title}</span>.
          </p>
        </motion.div>

        {/* Baú de Recompensa (Loot de XP) */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-[#C8F03D]/30 bg-[#202538] p-3 sm:p-3.5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#9096AC] block mb-0.5">
            XP conquistado
          </span>

          <div className="font-baloo font-bold text-2xl sm:text-3xl text-[#C8F03D] flex items-center justify-center gap-1.5 drop-shadow-[0_0_12px_rgba(200,240,61,0.5)]">
            <Zap className="w-6 h-6 fill-[#C8F03D]" />
            <span>+<AnimatedCounter value={finalXp} suffix=" XP" /></span>
          </div>

          <p className="text-[10px] sm:text-[11px] text-[#9096AC] mt-0.5 font-medium">
            Adicionado ao seu perfil
          </p>
        </motion.div>

        {/* Conhecimentos Consolidados (Perks da Jornada) */}
        <motion.div variants={itemVariants} className="text-left rounded-2xl border border-[#2C3247] bg-[#161926] p-3 sm:p-3.5 text-xs space-y-2">
          <span className="font-bold uppercase tracking-wider text-[10px] text-[#9096AC] block mb-0.5">
            O que você praticou:
          </span>

          <div className="flex items-center gap-2 text-[#C8F03D]">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[#F2F1EA] font-medium text-xs">
              Conceitos e tags essenciais na prática
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#C8F03D]">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[#F2F1EA] font-medium text-xs">
              Exercícios resolvidos com sucesso
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#8B7CF6]">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[#9096AC] font-medium text-xs">
              Pronto para a próxima lição
            </span>
          </div>
        </motion.div>

        {/* Botão Principal de Retorno ao Hub */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onContinue}
          className="btn-primary ready w-full py-3.5 sm:py-4 text-base rounded-2xl shadow-[0_4px_0_var(--lime-dark)] active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 group mt-1 select-none"
        >
          <span>Continuar</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}

