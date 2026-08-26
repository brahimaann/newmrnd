'use client';

import React from 'react';
import { ShaderGradientBackground } from '@/components/ui/ShaderGradientBackground';
import { GhostLink } from '@/components/ui/GhostLink';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-[24px] md:px-[40px] pt-[110px] pb-[36px] overflow-hidden">
      {/* Dynamic 3D Shader Gradient Background */}
      <ShaderGradientBackground 
        type="waterPlane"
        color1="#dfd8cb"
        color2="#1e1d1a"
        color3="#c4bcac"
      />
      
      <div className="z-10 w-full max-w-[1400px] mx-auto my-auto relative">
        <h1 
          style={{ fontFamily: 'var(--font-andrew-elegant), "Andrew Elegant", serif' }}
          className="text-[58px] sm:text-[80px] md:text-[104px] lg:text-[118px] leading-[0.82] tracking-[1px] uppercase text-(--color-ink) max-w-[900px] mb-[36px] md:mb-[52px] font-normal drop-shadow-xs"
        >
          Modern<br />Renaissance
        </h1>
        
        <div className="flex flex-col md:flex-row gap-[24px] md:gap-[90px] items-start">
          <p className="text-[15px] sm:text-[17px] md:text-[18px] leading-[1.45] tracking-[0.23px] text-(--color-ink) max-w-[420px] font-normal backdrop-blur-[2px] bg-(--color-parchment)/30 p-[8px] -ml-[8px] rounded-[4px]">
            A creative collective and multimedia lifestyle brand empowering emerging talent through culture, content, and community.
          </p>
          
          <nav className="flex flex-col gap-[10px]">
            <GhostLink href="/timeline">Explore Timeline</GhostLink>
            <GhostLink href="/team">Team</GhostLink>
            <GhostLink href="/events">Upcoming Events</GhostLink>
          </nav>
        </div>
      </div>

      {/* Smooth Scroll Indicator to Next Screen */}
      <div className="w-full max-w-[1400px] mx-auto z-10 flex justify-between items-center pt-[20px]">
        <a 
          href="#footer" 
          className="inline-flex items-center gap-[6px] text-[11px] font-mono uppercase tracking-[0.12em] text-(--color-ash) hover:text-(--color-ink) transition-colors cursor-pointer"
        >
          <span>Scroll down for collective & contact</span>
          <ArrowDown className="w-[12px] h-[12px] animate-bounce" />
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
