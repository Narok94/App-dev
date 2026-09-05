import React from 'react';
import { cn } from '@/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  key?: React.Key;
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[#E5DFD4] bg-[#FFFDF9] p-5 shadow-sm transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
