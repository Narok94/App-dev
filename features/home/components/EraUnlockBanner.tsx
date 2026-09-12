import React from 'react';

export function EraUnlockBanner() {
  return (
    <div className="w-full p-4 rounded-2xl bg-gradient-to-br from-[#8B7CF6]/20 to-[#38BDF8]/10 border border-[#8B7CF6]/40 shadow-lg flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        <span className="text-2xl">🏆</span>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8F03D]">
            Grande Conquista
          </span>
          <h4 className="font-baloo text-base font-bold text-[#F2F1EA] leading-tight">
            Era da Descoberta Concluída!
          </h4>
        </div>
      </div>
      <p className="text-xs text-[#E0E5F0] leading-relaxed">
        Você completou todas as lições da era inicial de HTML!
      </p>
      <div className="pt-2 border-t border-[#8B7CF6]/20 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B7CF6]">
          <span>🎨 Próxima etapa:</span>
          <span className="text-[#F2F1EA]">Era da Construção — CSS</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B7CF6]/20 text-[#8B7CF6] font-bold border border-[#8B7CF6]/30">
          Liberada
        </span>
      </div>
    </div>
  );
}
