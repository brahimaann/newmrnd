'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // Do not render site footer inside Sanity Studio
  if (pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <footer className="py-[18px] md:py-[22px] px-[24px] md:px-[30px] border-t border-(--color-ash) text-center bg-(--color-parchment) shrink-0">
      <span className="text-[11px] font-normal uppercase tracking-[0.05em] text-(--color-ink)/80">
        © {new Date().getFullYear()} Modern Renaissance. All rights reserved.
      </span>
    </footer>
  );
}
