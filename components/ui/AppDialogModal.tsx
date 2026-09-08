import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AppDialogModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function AppDialogModal({ isOpen, onClose, title, children }: AppDialogModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dialog-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12151F]/80 backdrop-blur-sm"
        >
          <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-[#1B1F2E] border border-[#2C3247] rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2C3247]">
              <h3 className="font-baloo text-lg font-bold text-[#F2F1EA]">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="text-[#9096AC] hover:text-[#F2F1EA] text-sm px-2 py-1 rounded-lg bg-[#232840] transition-colors cursor-pointer"
              >
                ✕ Fechar
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
