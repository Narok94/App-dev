import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import { UserLearningState, AvatarMood, LearningModule } from '@/types/learning';
import { Badge } from '@/components/ui/Badge';
import { sanitizeUserName } from '@/utils/sanitize';
import { calculateLevelProgress } from '@/features/learning/progression';
import { DevModeSelector } from './DevModeSelector';
import { ProfileStatsOverview } from './ProfileStatsOverview';
import { AppPreferencesSection } from './AppPreferencesSection';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userState: UserLearningState;
  modules?: LearningModule[];
  onUpdateName: (name: string) => void;
  onUpdateAvatar: (mood: AvatarMood) => void;
  onToggleSound: () => void;
  onResetProgress: () => void;
}

export function ProfileSettingsModal({
  isOpen,
  onClose,
  userState,
  modules = [],
  onUpdateName,
  onUpdateAvatar,
  onToggleSound,
  onResetProgress,
}: ProfileSettingsModalProps) {
  const [editingName, setEditingName] = useState(userState.userName);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const totalLessonsCount = modules.length > 0
    ? modules.flatMap((m) => m.lessons).length
    : 12;
  const completedLessonsCount = userState.completedLessonIds?.length || 0;
  const totalModulesCount = modules.length > 0 ? modules.length : (userState.totalModulesCount || 12);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizeUserName(editingName, userState.userName);
    if (sanitized) {
      onUpdateName(sanitized);
      setEditingName(sanitized);
      setIsEditing(false);
    }
  };

  // Nível oficial padronizado com o sistema RPG
  const playerLevel = calculateLevelProgress(userState.xp).currentLevel;
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
        className="relative z-10 w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#0F172A] border border-[#1E293B] shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col animate-in slide-in-from-bottom duration-300"
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
                <Badge variant="electric">Nível {playerLevel.level}</Badge>
                <span className="text-xs font-semibold text-[#94A3B8]">&bull; {playerLevel.title}</span>
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
          <DevModeSelector
            currentMood={userState.avatarMood}
            onSelectMood={onUpdateAvatar}
          />

          {/* Estatísticas Rápidas do Perfil */}
          <ProfileStatsOverview
            xp={userState.xp}
            streakDays={userState.streakDays}
            completedModulesCount={userState.completedModulesCount}
            totalModulesCount={totalModulesCount}
            completedLessonsCount={completedLessonsCount}
            totalLessonsCount={totalLessonsCount}
          />

          {/* Preferências do Aplicativo & Zona de Reiniciar */}
          <AppPreferencesSection
            soundEnabled={userState.soundEnabled}
            totalXp={userState.xp}
            onToggleSound={onToggleSound}
            onResetProgress={onResetProgress}
            onCloseModal={onClose}
          />
        </div>

        {/* Footer info com Safe Area Bottom */}
        <div
          className="px-6 py-3 border-t border-[#1E293B] bg-[#070B14] flex items-center justify-between text-[11px] text-[#64748B]"
          style={{
            paddingBottom: 'max(12px, calc(env(safe-area-inset-bottom, 0px) + 8px))',
          }}
        >
          <span>App-dev v2.0 &bull; Trilha Web</span>
          <span className="font-semibold text-[#38BDF8]">Tecnologia & Programação</span>
        </div>
      </div>
    </div>
  );
}
