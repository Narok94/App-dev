import React from 'react';
import { Terminal, Code2, Cpu, Zap } from 'lucide-react';
import { AvatarMood } from '@/types/learning';

interface DevModeSelectorProps {
  currentMood?: AvatarMood;
  onSelectMood: (mood: AvatarMood) => void;
}

interface DevModeOption {
  mood: AvatarMood;
  label: string;
  icon: React.ReactNode;
}

const DEV_MODES: DevModeOption[] = [
  { mood: 'happy', label: 'Focado', icon: <Terminal className="h-4 w-4" /> },
  { mood: 'waving', label: 'Explorador', icon: <Code2 className="h-4 w-4" /> },
  { mood: 'thinking', label: 'Curioso', icon: <Cpu className="h-4 w-4" /> },
  { mood: 'celebrating', label: 'Inovador', icon: <Zap className="h-4 w-4" /> },
];

export function DevModeSelector({ currentMood = 'happy', onSelectMood }: DevModeSelectorProps) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2.5">
        Modo de Foco do Desenvolvedor
      </label>
      <div className="grid grid-cols-4 gap-2.5">
        {DEV_MODES.map((item) => {
          const isSelected = currentMood === item.mood;
          return (
            <button
              key={item.mood}
              type="button"
              onClick={() => onSelectMood(item.mood)}
              className={`flex flex-col items-center p-2.5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#3B82F6] bg-[#1E3A8A]/40 text-[#60A5FA] shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                  : 'border-[#1E293B] bg-[#0A0E1A] text-[#64748B] hover:border-[#334155] hover:text-[#94A3B8]'
              }`}
            >
              <div className="p-2 rounded-xl mb-1">{item.icon}</div>
              <span className="text-[11px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
