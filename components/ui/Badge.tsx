import React from 'react';
import { cn } from '@/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  key?: React.Key;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'neutral' | 'earth' | 'gold' | 'electric' | 'cyan';
  className?: string;
  children?: React.ReactNode;
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-[#1E293B] text-[#94A3B8] border-[#334155]',
    success: 'bg-[#064E3B]/50 text-[#34D399] border-[#059669]/50',
    warning: 'bg-[#7C2D12]/40 text-[#FB923C] border-[#EA580C]/40',
    info: 'bg-[#0C4A6E]/50 text-[#38BDF8] border-[#0284C7]/50',
    neutral: 'bg-[#1E293B] text-[#94A3B8] border-[#334155]',
    earth: 'bg-[#78350F]/40 text-[#FBBF24] border-[#D97706]/40',
    gold: 'bg-[#78350F]/40 text-[#FCD34D] border-[#F59E0B]/40',
    electric: 'bg-[#1D4ED8]/30 text-[#60A5FA] border-[#2563EB]/50',
    cyan: 'bg-[#0E7490]/30 text-[#2DD4BF] border-[#0891B2]/50',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border tracking-tight whitespace-nowrap shadow-2xs',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
