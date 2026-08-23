import React from 'react';
import { cn } from '@/lib/utils/cn';

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={cn(
        "text-[11px] font-normal uppercase text-(--color-ink) tracking-[0.05em] mb-[76px]",
        className
      )}
    >
      {children}
    </h3>
  );
}
