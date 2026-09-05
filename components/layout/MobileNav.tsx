import { Home, Compass, BookOpen } from 'lucide-react';

interface MobileNavProps {
  currentTab: 'home' | 'learn';
  onTabChange: (tab: 'home' | 'learn') => void;
}

export function MobileNav({ currentTab, onTabChange }: MobileNavProps) {
  return (
    <nav
      aria-label="Navegação mobile"
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t border-[#E5DFD4] bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-2 shadow-lg"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 gap-1 transition-colors ${
            currentTab === 'home'
              ? 'text-[#2B231D] font-bold'
              : 'text-[#8A7E72] hover:text-[#2B231D]'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              currentTab === 'home' ? 'bg-[#EFEAE2]' : ''
            }`}
          >
            <Home className="h-5 w-5" />
          </div>
          <span className="text-[11px] leading-none">Início</span>
        </button>

        <button
          onClick={() => onTabChange('learn')}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 gap-1 transition-colors ${
            currentTab === 'learn'
              ? 'text-[#2E5A44] font-bold'
              : 'text-[#8A7E72] hover:text-[#2B231D]'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              currentTab === 'learn' ? 'bg-[#EAF3EC]' : ''
            }`}
          >
            <Compass className="h-5 w-5" />
          </div>
          <span className="text-[11px] leading-none">Aprender</span>
        </button>
      </div>
    </nav>
  );
}
