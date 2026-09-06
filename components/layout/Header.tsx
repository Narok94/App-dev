import React from 'react';
import { AppDevIcon } from '@/components/ui/AppDevIcon';

interface HeaderProps {
  xp?: number;
  streakDays?: number;
  userName?: string;
  avatarMood?: 'happy' | 'waving' | 'thinking' | 'celebrating';
  onOpenProfile: () => void;
}

export function Header({
  xp = 0,
  streakDays = 1,
  onOpenProfile,
}: HeaderProps) {
  return (
    <header className="w-full">
      <div className="topbar">
        <button
          type="button"
          onClick={onOpenProfile}
          className="brand bg-transparent border-0 cursor-pointer p-0 text-left flex items-center gap-2.5"
          title="Ver perfil e configurações"
        >
          <div className="mascot p-1 flex items-center justify-center">
            <AppDevIcon size={28} />
          </div>
          <span className="brand-name">App-dev</span>
        </button>

        <div className="pill-row">
          <div className="pill fire" title={`${streakDays} ${streakDays === 1 ? 'dia ativo' : 'dias ativos'}`}>
            🔥 {streakDays}
          </div>
          <div className="pill xp" title={`${xp} pontos de XP acumulados`}>
            ⚡ {xp} xp
          </div>
        </div>
      </div>
    </header>
  );
}
