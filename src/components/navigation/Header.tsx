'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  // Do not render site header inside Sanity Studio
  if (pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <header className="absolute top-0 left-0 w-full z-50 p-[24px] md:p-[30px] flex justify-between items-center pointer-events-none">
      <Link href="/" className="pointer-events-auto flex items-center group">
        <img 
          src="/images/mrnd-logo.png" 
          alt="MRND" 
          style={{ height: '36px', width: 'auto', maxHeight: '36px' }}
          className="h-[32px] md:h-[36px] w-auto max-h-[36px] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" 
        />
      </Link>
      <nav className="flex gap-[19px] pointer-events-auto">
        <Link href="/timeline" className="text-[11px] uppercase tracking-[0.05em] text-(--color-ink) hover:underline decoration-1 underline-offset-4 transition-all">
          Timeline
        </Link>
        <Link href="/team" className="text-[11px] uppercase tracking-[0.05em] text-(--color-ink) hover:underline decoration-1 underline-offset-4 transition-all">
          Team
        </Link>
        <Link href="/events" className="text-[11px] uppercase tracking-[0.05em] text-(--color-ink) hover:underline decoration-1 underline-offset-4 transition-all">
          Events
        </Link>
      </nav>
    </header>
  );
}
