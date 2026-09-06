import React from 'react';

interface AppDevIconProps {
  size?: number | string;
  className?: string;
  withContainer?: boolean;
}

export function AppDevIcon({
  size = 24,
  className = '',
  withContainer = false,
}: AppDevIconProps) {
  const iconSvg = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}
      className={`shrink-0 ${className}`}
      aria-label="App-dev Ícone"
    >
      <defs>
        <linearGradient id="appDevViolet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A79BFF" />
          <stop offset="100%" stopColor="#7C6BF0" />
        </linearGradient>
        <linearGradient id="appDevLime" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D9F966" />
          <stop offset="100%" stopColor="#B2E61E" />
        </linearGradient>
      </defs>

      {/* Chevron Esquerdo < (Violeta / Lógica Dev) */}
      <path
        d="M20 14L12 22C10.9 23.1 10.9 24.9 12 26L20 34C20.8 34.8 22.2 34.8 23 34C23.8 33.2 23.8 31.8 23 31L16.5 24.5C16.2 24.2 16.2 23.8 16.5 23.5L23 17C23.8 16.2 23.8 14.8 23 14C22.2 13.2 20.8 13.2 20 14Z"
        fill="url(#appDevViolet)"
      />

      {/* Chevron Direito > (Verde-Lima / Compilação & Ação) */}
      <path
        d="M28 14C27.2 13.2 25.8 13.2 25 14C24.2 14.8 24.2 16.2 25 17L31.5 23.5C31.8 23.8 31.8 24.2 31.5 24.5L25 31C24.2 31.8 24.2 33.2 25 34C25.8 34.8 27.2 34.8 28 34L36 26C37.1 24.9 37.1 23.1 36 22L28 14Z"
        fill="url(#appDevLime)"
      />

      {/* Barra sutil de compilação intermediária */}
      <path
        d="M26 16L22 32"
        stroke="#3D4766"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Núcleo / Spark Central */}
      <circle cx="24" cy="24" r="2.5" fill="#FFFFFF" />
    </svg>
  );

  if (withContainer) {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#1B1F2E] border border-[#2C3247] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
        {iconSvg}
      </div>
    );
  }

  return iconSvg;
}
