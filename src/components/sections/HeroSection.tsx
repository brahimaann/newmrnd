import React from 'react';
import { ShaderSphere } from '@/components/ui/ShaderSphere';
import { GhostLink } from '@/components/ui/GhostLink';

export function HeroSection() {
  return (
    <section className="relative flex-1 flex flex-col justify-center px-[24px] md:px-[30px] pt-[80px] pb-[20px] overflow-hidden">
      <ShaderSphere />
      
      <div className="z-10 w-full max-w-[1400px] mx-auto my-auto">
        <h1 
          style={{ fontFamily: 'var(--font-andrew-elegant), "Andrew Elegant", serif' }}
          className="text-[58px] sm:text-[80px] md:text-[104px] lg:text-[116px] leading-[0.82] tracking-[1px] uppercase text-(--color-ink) max-w-[900px] mb-[36px] md:mb-[52px] font-normal"
        >
          Modern<br />Renaissance
        </h1>
        
        <div className="flex flex-col md:flex-row gap-[24px] md:gap-[90px] items-start">
          <p className="text-[15px] sm:text-[17px] md:text-[18px] leading-[1.45] tracking-[0.23px] text-(--color-ink) max-w-[420px] font-normal">
            A creative collective and multimedia lifestyle brand empowering emerging talent through culture, content, and community.
          </p>
          
          <nav className="flex flex-col gap-[10px]">
            <GhostLink href="/timeline">Explore Timeline</GhostLink>
            <GhostLink href="/team">Team</GhostLink>
            <GhostLink href="/events">Upcoming Events</GhostLink>
          </nav>
        </div>
      </div>
    </section>
  );
}
