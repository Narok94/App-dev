import React, { useState } from 'react';
import { 
  X, 
  User, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  Flame, 
  Award, 
  Wifi, 
  ShieldCheck,
  AlertTriangle,
  Code2,
  Terminal,
  Cpu,
  Zap
} from 'lucide-react';
import { UserLearningState } from '@/types/learning';
import { Badge } from '@/components/ui/Badge';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userState: UserLearningState;
  onUpdateName: (name: string) => void;
  onUpdateAvatar: (mood: 'happy' | 'waving' | 'thinking' | 'celebrating') => void;
  onToggleSound: () => void;
  onResetProgress: () => void;
}

export function ProfileSettingsModal({
  isOpen,
  onClose,
  userState,
  onUpdateName,
  onUpdateAvatar,
  onToggleSound,
  onResetProgress,
}: ProfileSettingsModalProps) {
  const [editingName, setEditingName] = useState(userState.userName);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingName.trim()) {
      onUpdateName(editingName.trim());
      setIsEditing(false);
    }
  };

  const devModes: Array<{ mood: 'happy' | 'waving' | 'thinking' | 'celebrating'; label: string; icon: React.ReactNode }> = [
    { mood: 'happy', label: 'Focado', icon: <Terminal className="h-4 w-4" /> },
    { mood: 'waving', label: 'Explorador', icon: <Code2 className="h-4 w-4" /> },
    { mood: 'thinking', label: 'Curioso', icon: <Cpu className="h-4 w-4" /> },
    { mood: 'celebrating', label: 'Inovador', icon: <Zap className="h-4 w-4" /> },
  ];

  // Cálculo de nível
  const currentLevel = Math.floor(userState.xp / 100) + 1;
  const levelTitle = currentLevel === 1 
    ? 'Aprendiz de Sintaxe' 
    : currentLevel === 2 
    ? 'Arquiteto Web' 
    : 'Engenheiro Frontend';

  const firstLetter = (userState.userName || 'D').charAt(0).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#070B14]/80 backdrop-blur-md transition-opacity animate-fade-in">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal / Bottom Sheet Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Perfil e Configurações"
        className="relative z-10 w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#0F172A] border border-[#1E293B] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300"
      >
        {/* Mobile handle para deslizar */}
        <div className="sm:hidden w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-[#334155] rounded-full" />
        </div>

        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E293B]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#1E3A8A]/40 text-[#60A5FA] border border-[#2563EB]/30">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F8FAFC]">Perfil & Configurações Dev</h2>
              <p className="text-xs text-[#94A3B8]">Personalize seus parâmetros no App-dev</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC] transition-colors cursor-pointer"
            aria-label="Fechar painel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-5 space-y-5 flex-1">
          {/* Card do Perfil com Avatar Tech */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0A0E1A] border border-[#1E293B] flex flex-col sm:flex-row items-center gap-4">
            <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] border border-[#3B82F6]/40 text-2xl font-black text-[#60A5FA] shadow-[0_0_20px_rgba(59,130,246,0.25)]">
              {firstLetter}
            </div>

            <div className="flex-1 text-center sm:text-left w-full">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <Badge variant="electric">Nível {currentLevel}</Badge>
                <span className="text-xs font-semibold text-[#94A3B8]">&bull; {levelTitle}</span>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveName} className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    maxLength={25}
                    className="w-full px-3 py-1.5 text-sm font-bold rounded-xl border border-[#3B82F6] bg-[#0F172A] text-[#F8FAFC] focus:outline-hidden focus:ring-2 focus:ring-[#3B82F6]/30"
                    placeholder="Seu apelido dev"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-xs font-bold hover:from-[#3B82F6] hover:to-[#2563EB] transition-colors"
                  >
                    Salvar
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl font-black text-[#F8FAFC]">{userState.userName}</h3>
                  <button
                    onClick={() => {
                      setEditingName(userState.userName);
                      setIsEditing(true);
                    }}
                    className="text-xs font-bold text-[#38BDF8] hover:underline cursor-pointer"
                  >
                    Editar
                  </button>
                </div>
              )}

              <p className="text-xs text-[#64748B] mt-1">
                Ambiente de Desenvolvimento &bull; Trilha HTML Core
              </p>
            </div>
          </div>

          {/* Modo de Foco / Perfil Dev */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2.5">
              Modo de Foco do Desenvolvedor
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {devModes.map((item) => {
                const isSelected = (userState.avatarMood || 'happy') === item.mood;
                return (
                  <button
                    key={item.mood}
                    type="button"
                    onClick={() => onUpdateAvatar(item.mood)}
                    className={`flex flex-col items-center p-2.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#3B82F6] bg-[#1E3A8A]/40 text-[#60A5FA] shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                        : 'border-[#1E293B] bg-[#0A0E1A] text-[#64748B] hover:border-[#334155] hover:text-[#94A3B8]'
                    }`}
                  >
                    <div className="p-2 rounded-xl mb-1">{item.icon}</div>
                    <span className="text-[11px] font-bold">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Estatísticas Rápidas do Perfil */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2.5">
              Progresso Acumulado
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl border border-[#1E293B] bg-[#0A0E1A] text-center">
                <div className="inline-flex p-2 rounded-xl bg-[#1E3A8A]/40 text-[#38BDF8] mb-1">
                  <Sparkles className="h-4 w-4 fill-current" />
                </div>
                <div className="text-lg font-black text-[#F8FAFC]">{userState.xp}</div>
                <div className="text-[10px] font-bold text-[#64748B] uppercase">XP Total</div>
              </div>

              <div className="p-3 rounded-2xl border border-[#1E293B] bg-[#0A0E1A] text-center">
                <div className="inline-flex p-2 rounded-xl bg-[#7C2D12]/30 text-[#FB923C] mb-1">
                  <Flame className="h-4 w-4 fill-current" />
                </div>
                <div className="text-lg font-black text-[#F8FAFC]">{userState.streakDays} d</div>
                <div className="text-[10px] font-bold text-[#64748B] uppercase">Sequência</div>
              </div>

              <div className="p-3 rounded-2xl border border-[#1E293B] bg-[#0A0E1A] text-center">
                <div className="inline-flex p-2 rounded-xl bg-[#0F766E]/30 text-[#2DD4BF] mb-1">
                  <Award className="h-4 w-4" />
                </div>
                <div className="text-lg font-black text-[#F8FAFC]">{userState.completedModulesCount}</div>
                <div className="text-[10px] font-bold text-[#64748B] uppercase">Módulos</div>
              </div>
            </div>
          </div>

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
                    {userState.soundEnabled !== false ? (
                      <Volume2 className="h-4 w-4 text-[#38BDF8]" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-[#64748B]" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#F8FAFC]">Feedback Sonoro de Conclusão</div>
                    <div className="text-[11px] text-[#64748B]">Áudio ao acertar desafios práticos</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onToggleSound}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    userState.soundEnabled !== false ? 'bg-[#2563EB]' : 'bg-[#334155]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${
                      userState.soundEnabled !== false ? 'right-1' : 'left-1'
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
                    <div className="text-xs font-bold text-[#F8FAFC]">Modo Offline Ativo</div>
                    <div className="text-[11px] text-[#64748B]">Armazenamento local em tempo real</div>
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
                      Todo o seu XP ({userState.xp}), lições completadas e progresso voltarão ao início.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onResetProgress();
                      setConfirmReset(false);
                      onClose();
                    }}
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

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-[#1E293B] bg-[#070B14] flex items-center justify-between text-[11px] text-[#64748B]">
          <span>Tatu v2.0 &bull; Trilha Web</span>
          <span className="font-semibold text-[#38BDF8]">Tecnologia & Programação</span>
        </div>
      </div>
    </div>
  );
}
