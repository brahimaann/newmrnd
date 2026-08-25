'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Talent } from '@/types/sanity.types';
import { GhostLink } from '@/components/ui/GhostLink';
import { urlForImage } from '@/sanity/image';

interface TeamSectionProps {
  talents: Talent[];
}

export function TeamSection({ talents }: TeamSectionProps) {
  return (
    <section id="team" className="flex-1 py-[30px] md:py-[50px] px-[20px] md:px-[30px] bg-(--color-parchment) flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full my-auto">
        <SectionLabel>Team</SectionLabel>
        
        {(!talents || talents.length === 0) && (
          <p className="text-(--color-ink) font-mono text-[13px] mt-[40px]">No team members found in Sanity.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[30px] mt-[24px]">
          {talents && talents.map((talent) => {
            const headshotSrc = talent.headshot
              ? urlForImage(talent.headshot)?.width(1000).auto('format').url()
              : talent.headshotUrl || '';

            return (
              <motion.div 
                key={talent._id}
                whileHover="hover"
                initial="idle"
                className="group relative aspect-[3/4] bg-(--color-paper) overflow-hidden border border-(--color-ash)"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: headshotSrc ? `url(${headshotSrc})` : undefined }}
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/40" />
              
                <div className="absolute inset-0 p-[24px] md:p-[30px] flex flex-col justify-end text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-[11px] font-normal uppercase tracking-[0.05em] mb-[8px]">
                    {talent.discipline}
                  </span>
                  <h3 className="text-[28px] md:text-[34px] leading-[1] tracking-[0.44px] font-normal mb-[12px]">
                    {talent.name}
                  </h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.4] mb-[16px]">
                    {talent.shortBio}
                  </p>
                  <GhostLink href={`#talent-${talent._id}`} className="text-white hover:text-white border-white hover:border-white w-fit">
                    View Profile
                  </GhostLink>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
export const RosterSection = TeamSection;
