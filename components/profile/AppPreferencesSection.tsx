import React, { useState } from 'react';
import { Volume2, VolumeX, Wifi, ShieldCheck, AlertTriangle, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface AppPreferencesSectionProps {
  soundEnabled?: boolean;
  totalXp: number;
  onToggleSound: () => void;
  onResetProgress: () => void;
  onCloseModal: () => void;
}

export function AppPreferencesSection({
  soundEnabled = true,
  totalXp,
  onToggleSound,
  onResetProgress,
  onCloseModal,
}: AppPreferencesSectionProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  const handleConfirmReset = () => {
    onResetProgress();
    setConfirmReset(false);
    onCloseModal();
  };

  return (
    <div className="space-y-4">
      {/* Preferências do Aplicativo */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2.5">
          Configurações
        </label>
        <div className="space-y-2.5">
          {/* Efeitos Sonoros */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-[#1E293B] bg-[#0A0E1A]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#0F172A] border border-[#1E293B] text-[#94A3B8]">
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 text-[#38BDF8]" />
                ) : (
                  <VolumeX className="h-4 w-4 text-[#64748B]" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-[#F8FAFC]">Efeitos sonoros</div>
                <div className="text-[11px] text-[#64748B]">Tocar som ao acertar e avançar nas lições</div>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleSound}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                soundEnabled ? 'bg-[#2563EB]' : 'bg-[#334155]'
              }`}
              aria-label="Alternar som"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${
                  soundEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Status Offline PWA */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-[#1E293B] bg-[#0A0E1A]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#0F172A] border border-[#1E293B] text-[#2DD4BF]">
                <Wifi className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#F8FAFC]">Funciona sem internet</div>
                <div className="text-[11px] text-[#64748B]">Seu progresso fica salvo no seu aparelho</div>
              </div>
            </div>
            <Badge variant="cyan" className="text-[10px]">
              <ShieldCheck className="h-3 w-3" />
              Ativo
            </Badge>
          </div>
        </div>
      </div>

      {/* Zona de Reiniciar Progresso */}
      <div className="pt-2 border-t border-[#1E293B]">
        {confirmReset ? (
          <div className="p-4 rounded-2xl border border-[#EF4444]/40 bg-[#450A0A]/40 space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-5 w-5 text-[#EF4444] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#FCA5A5]">Tem certeza que deseja reiniciar?</h4>
                <p className="text-[11px] text-[#F87171] mt-0.5">
                  Todo o seu XP ({totalXp}), lições completadas e progresso voltarão ao início.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleConfirmReset}
                className="flex-1 py-2 rounded-xl bg-[#DC2626] text-white text-xs font-bold hover:bg-[#B91C1C] transition-colors cursor-pointer"
              >
                Sim, reiniciar tudo
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-3 py-2 rounded-xl bg-[#1E293B] text-[#94A3B8] text-xs font-bold hover:bg-[#334155] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-[#F87171] hover:bg-[#450A0A]/30 border border-transparent hover:border-[#EF4444]/30 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reiniciar meu progresso do curso</span>
          </button>
        )}
      </div>
    </div>
  );
}
