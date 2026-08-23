import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface GhostLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  showArrow?: boolean;
  href: string;
}

export function GhostLink({ children, className, showArrow = true, href, ...props }: GhostLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1 py-[5px] px-0 text-[15px] leading-[1.4] font-normal",
        "text-(--color-ink) bg-transparent rounded-[10px] cursor-pointer",
        "hover:underline decoration-1 underline-offset-4 transition-all",
        className
      )}
      {...props}
    >
      {children}
      {showArrow && <span className="transition-transform group-hover:translate-x-1">→</span>}
    </Link>
  );
}
