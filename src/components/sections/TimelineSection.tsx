'use client';

import React from 'react';
import { TimelineEvent } from '@/types/sanity.types';
import { ArrowUpRight } from 'lucide-react';

interface TimelineSectionProps {
  events: TimelineEvent[];
}

const DEFAULT_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    _id: 'tl-1',
    _type: 'timelineEvent',
    title: 'MRND SOUND ARCHIVE S01.',
    date: '26-05-10',
    tags: ['HIMA', 'RELEASE'],
    link: 'https://youtube.com',
  },
  {
    _id: 'tl-2',
    _type: 'timelineEvent',
    title: 'THE GREENHOUSE SESSIONS VOL 2.',
    date: '26-04-18',
    tags: ['MALIK', 'CYPHER'],
    link: 'https://soundcloud.com',
  },
  {
    _id: 'tl-3',
    _type: 'timelineEvent',
    title: 'EDITORIAL FILM: MODERN RENAISSANCE.',
    date: '26-03-02',
    tags: ['FILM', 'VISUALS'],
    link: 'https://vimeo.com',
  },
  {
    _id: 'tl-4',
    _type: 'timelineEvent',
    title: 'COLLECTIVE MANIFESTO & IDENTITY.',
    date: '26-01-15',
    tags: ['COMMUNITY', 'ARCHIVE'],
    link: 'https://instagram.com',
  },
];

export function TimelineSection({ events }: TimelineSectionProps) {
  const displayEvents = events && events.length > 0 ? events : DEFAULT_TIMELINE_EVENTS;

  return (
    <section 
      suppressHydrationWarning 
      className="min-h-screen flex flex-col items-center justify-center px-[20px] md:px-[30px] py-[60px] md:py-[80px] bg-(--color-parchment)"
    >
      <div className="w-full max-w-[760px] mx-auto my-auto flex flex-col items-center">
        
        {/* Minimalist Editorial Timeline Stream */}
        <div className="w-full flex flex-col gap-[14px] md:gap-[18px]">
          {displayEvents.map((item) => {
            const targetUrl = item.link || (item.youtubeId ? `https://youtube.com/watch?v=${item.youtubeId}` : undefined);

            return (
              <div 
                key={item._id} 
                className="group flex items-start gap-[20px] md:gap-[32px] w-full text-left"
              >
                {/* Date Column (Muted Fixed Monospace) */}
                <span className="font-mono text-[13px] md:text-[14px] tracking-wider text-(--color-ash) w-[75px] md:w-[85px] shrink-0 pt-[2px] select-none">
                  {item.date}
                </span>

                {/* Content & Tags */}
                <div className="flex-1 flex flex-wrap items-baseline gap-x-[12px] gap-y-[4px]">
                  {targetUrl ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[16px] md:text-[18px] font-medium leading-[1.3] text-(--color-ink) hover:underline decoration-1 underline-offset-4 transition-all inline-flex items-baseline gap-[4px]"
                      title="Visit link"
                    >
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-[12px] h-[12px] text-(--color-ash) group-hover:text-(--color-ink) transition-colors self-center shrink-0" />
                    </a>
                  ) : (
                    <span className="text-[16px] md:text-[18px] font-medium leading-[1.3] text-(--color-ink)">
                      {item.title}
                    </span>
                  )}

                  {/* Borderless Minimalist Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="inline-flex items-center gap-[6px] text-(--color-ash) text-[11px] font-mono tracking-wider uppercase select-none">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="group-hover:text-(--color-ink)/60 transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default TimelineSection;
