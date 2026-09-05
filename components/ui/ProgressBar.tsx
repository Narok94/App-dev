import React from 'react';
import { cn } from '@/utils';

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  colorVariant?: 'moss' | 'terracotta' | 'gold' | 'emerald' | 'electric' | 'cyan';
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  label,
  colorVariant = 'electric',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const colors = {
    electric: 'bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#06B6D4]',
    cyan: 'bg-gradient-to-r from-[#06B6D4] to-[#10B981]',
    emerald: 'bg-gradient-to-r from-[#10B981] to-[#059669]',
    moss: 'bg-gradient-to-r from-[#16A34A] to-[#047857]',
    terracotta: 'bg-gradient-to-r from-[#FB923C] to-[#EA580C]',
    gold: 'bg-gradient-to-r from-[#FBBF24] to-[#F59E0B]',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-bold text-[#94A3B8] mb-1.5">
          <span>{label || 'Progresso'}</span>
          <span className="font-mono text-[#38BDF8]">{percentage}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#1E293B] border border-[#334155]/60 p-[1px] shadow-inner">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700 ease-out shadow-xs',
            colors[colorVariant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
