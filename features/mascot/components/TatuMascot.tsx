import React from 'react';
import { cn } from '@/utils';

interface TatuMascotProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
  mood?: 'happy' | 'waving' | 'thinking' | 'sleeping' | 'celebrating';
  speechText?: string;
}

export function TatuMascot({
  className,
  size = 'md',
  mood = 'happy',
  speechText,
}: TatuMascotProps) {
  const sizeMap = {
    xs: 'w-9 h-9',
    sm: 'w-12 h-12',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
    hero: 'w-36 h-36 sm:w-44 sm:h-44',
  };

  return (
    <div className={cn('relative inline-flex flex-col items-center select-none', className)}>
      {/* Balão de fala contextual do Tatu (se presente) */}
      {speechText && (
        <div className="mb-2 max-w-[200px] sm:max-w-[240px] rounded-2xl border border-[#E7E0D5] bg-[#FFFFFF] px-3.5 py-2 text-xs font-semibold text-[#1C1917] shadow-sm relative animate-bounce-subtle z-10">
          <p className="leading-snug">{speechText}</p>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-b border-r border-[#E7E0D5] bg-[#FFFFFF]" />
        </div>
      )}

      {/* Ilustração Vetorial Minimalista, Carismática & Integrada à Marca (Natureza + Tech) */}
      <div className={cn('relative transition-transform duration-300 hover:scale-105 active:scale-95', sizeMap[size])}>
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
          role="img"
          aria-label={`Mascote Tatu - ${mood}`}
        >
          <defs>
            {/* Gradiente da Carapaça Terracota Viva */}
            <linearGradient id="tatuShellGrad" x1="20" y1="30" x2="130" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="50%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>

            {/* Gradiente da Pele Quente & Suave */}
            <linearGradient id="tatuSkinGrad" x1="90" y1="50" x2="150" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="100%" stopColor="#FDBA74" />
            </linearGradient>

            {/* Gradiente Natureza Tech (Folha Esmeralda Digital) */}
            <linearGradient id="tatuTechEmerald" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Sombra Suave */}
            <linearGradient id="tatuInnerPlate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9A3412" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Sombra de chão difusa e orgânica */}
          <ellipse cx="80" cy="144" rx="52" ry="8" fill="#1C1917" opacity="0.08" />

          {/* Cauda em arco moderno */}
          <path
            d="M32 116 C18 122 10 114 12 104 C14 98 22 100 30 108 Z"
            fill="#EA580C"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Patinha Traseira Esquerda */}
          <ellipse cx="50" cy="132" rx="11" ry="7" fill="#EA580C" stroke="#9A3412" strokeWidth="2.5" />
          <path d="M45 133 L45 138 M50 133 L50 138 M55 133 L55 138" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />

          {/* CORPO / CARAPAÇA GEOMÉTRICA MINIMALISTA */}
          {/* Base da Carapaça do Tatu */}
          <path
            d="M30 114 C30 62 62 38 106 42 C126 44 138 68 132 98 C126 122 110 132 72 132 C48 132 30 126 30 114 Z"
            fill="url(#tatuShellGrad)"
            stroke="#9A3412"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Arco de Iluminação Elegante no Topo da Carapaça */}
          <path
            d="M44 68 C64 50 96 50 114 62"
            stroke="#FED7AA"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Placas da Carapaça (Listras Clássicas e Modernas do Tatu-Bola) */}
          <path
            d="M38 88 C58 72 96 72 122 86"
            stroke="#9A3412"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M34 104 C58 90 94 90 124 102"
            stroke="#9A3412"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Detalhes Minimalistas de Armadura (Micro-placas e nós de energia verde tech) */}
          <circle cx="68" cy="62" r="2.5" fill="#FBBF24" />
          <circle cx="86" cy="64" r="2.5" fill="#FBBF24" />
          <circle cx="104" cy="68" r="2.5" fill="#FBBF24" />
          
          {/* Micro nó de tecnologia / folha integrada na carapaça */}
          <circle cx="60" cy="80" r="2" fill="#34D399" />
          <circle cx="78" cy="82" r="2" fill="#34D399" />
          <circle cx="96" cy="84" r="2" fill="#34D399" />

          {/* Orelhinha de trás */}
          <path
            d="M114 36 C116 22 125 18 128 22 C131 26 126 34 120 40 Z"
            fill="#FDBA74"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Orelhinha da frente */}
          <path
            d="M106 38 C106 24 114 18 118 22 C122 26 117 36 112 42 Z"
            fill="#FED7AA"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M109 32 C110 26 114 22 116 24 C117 26 115 32 112 36" fill="#F87171" opacity="0.8" />

          {/* CABEÇA E FOCINHO MINIMALISTA */}
          <path
            d="M108 62 C116 52 132 54 142 66 C152 78 153 92 140 98 C128 103 116 96 108 80 Z"
            fill="url(#tatuSkinGrad)"
            stroke="#9A3412"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Narizinho minimalista escuro com brilho */}
          <ellipse cx="147" cy="84" rx="4.5" ry="3.5" fill="#1C1917" />
          <circle cx="146" cy="83" r="1.2" fill="#FFFFFF" />

          {/* Olhinhos Expressivos Minimalistas conforme Mood */}
          {mood === 'celebrating' ? (
            <g>
              {/* Olho piscando de alegria (^_^) */}
              <path d="M122 70 C125 64 131 64 134 70" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" />
              {/* Estrelinha dourada de celebração */}
              <path d="M142 42 L143.5 45 L146.5 46.5 L143.5 48 L142 51 L140.5 48 L137.5 46.5 L140.5 45 Z" fill="#F59E0B" />
              <path d="M100 24 L101 26 L103 27 L101 28 L100 30 L99 28 L97 27 L99 26 Z" fill="#10B981" />
            </g>
          ) : mood === 'thinking' ? (
            <g>
              {/* Olho pensativo com sobrancelha sutil */}
              <circle cx="127" cy="68" r="5" fill="#1C1917" />
              <circle cx="125.5" cy="66.5" r="1.8" fill="#FFFFFF" />
              <path d="M121 60 C124 58 128 60 131 63" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : mood === 'sleeping' ? (
            <g>
              {/* Olho dormindo sossegado */}
              <path d="M122 71 C125 74 130 74 133 71" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
              <text x="140" y="55" fill="#9A3412" fontSize="10" fontWeight="bold">z</text>
              <text x="146" y="47" fill="#EA580C" fontSize="12" fontWeight="bold">Z</text>
            </g>
          ) : (
            /* Olhar Curioso & Simpático (Happy / Waving) */
            <g>
              <circle cx="127" cy="70" r="5.5" fill="#1C1917" />
              <circle cx="125.5" cy="68" r="2.2" fill="#FFFFFF" />
              <circle cx="128.5" cy="72" r="1" fill="#FFFFFF" />
            </g>
          )}

          {/* Bochecha rosada calorosa */}
          <ellipse cx="126" cy="78" rx="6" ry="3.5" fill="#F43F5E" opacity={mood === 'celebrating' ? 0.6 : 0.4} />

          {/* Sorriso simpático */}
          <path
            d={
              mood === 'celebrating'
                ? "M134 90 C130 96 124 95 121 89"
                : "M133 90 C130 93 126 92 123 89"
            }
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Patinha Dianteira */}
          {mood === 'waving' || mood === 'celebrating' ? (
            <g className={mood === 'celebrating' ? "animate-bounce" : "animate-pulse"}>
              <path
                d="M114 96 C118 82 128 80 130 86 C132 92 124 102 118 106 Z"
                fill="#FDBA74"
                stroke="#9A3412"
                strokeWidth="2.5"
              />
              <circle cx="125" cy="85" r="1.5" fill="#EA580C" />
            </g>
          ) : mood === 'thinking' ? (
            <g>
              <path
                d="M116 100 C120 92 126 92 126 96 C124 102 118 107 114 108 Z"
                fill="#FDBA74"
                stroke="#9A3412"
                strokeWidth="2.5"
              />
            </g>
          ) : (
            <g>
              <ellipse cx="102" cy="132" rx="11" ry="7" fill="#EA580C" stroke="#9A3412" strokeWidth="2.5" />
              <path d="M97 133 L97 138 M102 133 L102 138 M107 133 L107 138" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* Folha / Broto de Natureza Tech no Canto da Patinha */}
          <path
            d="M136 135 C142 127 150 128 152 136 C144 140 138 139 136 135 Z"
            fill="url(#tatuTechEmerald)"
            stroke="#047857"
            strokeWidth="1.8"
          />
          <path d="M139 136 C143 133 147 134 149 135" stroke="#ECFDF5" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
