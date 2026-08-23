'use client';

import React from 'react';
import Link from 'next/link';
import { TimelineEvent } from '@/types/sanity.types';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

interface TimelineSectionProps {
  events: TimelineEvent[];
}

const DEFAULT_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    _id: 'tl-1',
    _type: 'timelineEvent',
    title: 'MRND SOUND ARCHIVE S01',
    date: '26-05-10',
    tags: ['HIMA', 'RELEASE'],
    link: 'https://youtube.com',
  },
  {
    _id: 'tl-2',
    _type: 'timelineEvent',
    title: 'THE GREENHOUSE SESSIONS VOL 2',
    date: '26-04-18',
    tags: ['MALIK', 'CYPHER'],
    link: 'https://soundcloud.com',
  },
  {
    _id: 'tl-3',
    _type: 'timelineEvent',
    title: 'EDITORIAL FILM: MODERN RENAISSANCE',
    date: '26-03-02',
    tags: ['FILM', 'VISUALS'],
    link: 'https://vimeo.com',
  },
  {
    _id: 'tl-4',
    _type: 'timelineEvent',
    title: 'COLLECTIVE MANIFESTO & IDENTITY',
    date: '26-01-15',
    tags: ['COMMUNITY', 'ARCHIVE'],
    link: 'https://instagram.com',
  },
];

export function TimelineSection({ events }: TimelineSectionProps) {
  const displayEvents = events && events.length > 0 ? events : DEFAULT_TIMELINE_EVENTS;

  return (
    <section className="pt-[30px] pb-[119px] px-[20px] md:px-[30px] bg-(--color-parchment) min-h-[85vh] flex flex-col items-center">
      <div className="w-full max-w-[900px] mx-auto flex flex-col items-center">
        
        <div className="w-full text-center mb-[40px]">
          <SectionLabel>Archive & History</SectionLabel>
          <h1 className="text-[38px] sm:text-[52px] md:text-[64px] font-normal uppercase text-(--color-ink) tracking-[0.6px] mt-[16px]">
            Timeline Archive
          </h1>
        </div>

        <div className="w-full flex flex-col gap-[14px]">
          {displayEvents.map((item) => {
            const targetUrl = item.link || (item.youtubeId ? `https://youtube.com/watch?v=${item.youtubeId}` : undefined);

            return (
              <div 
                key={item._id} 
                className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-[18px] md:p-[24px] bg-(--color-paper) border border-(--color-ash) hover:border-(--color-ink) transition-all duration-300 gap-[14px]"
              >
                {/* Left: Date + Title */}
                <div className="flex items-center gap-[14px] flex-1 flex-wrap">
                  <span className="font-mono text-[12px] md:text-[13px] tracking-wider text-(--color-ash) shrink-0 group-hover:text-(--color-ink) transition-colors">
                    {item.date}
                  </span>

                  {targetUrl ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[16px] md:text-[18px] font-bold tracking-[0.04em] text-(--color-ink) uppercase hover:underline decoration-1 underline-offset-4 transition-all flex items-center gap-[6px]"
                      title="Visit link"
                    >
                      {item.title}
                      <ArrowUpRight className="w-[14px] h-[14px] text-(--color-ink)/60 group-hover:text-(--color-ink) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-[16px] md:text-[18px] font-bold tracking-[0.04em] text-(--color-ink) uppercase">
                      {item.title}
                    </span>
                  )}
                </div>

                {/* Right: Tags & Action Link Button */}
                <div className="flex items-center gap-[10px] shrink-0 self-end sm:self-center">
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex items-center gap-[6px]">
                      {item.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="font-mono text-[10px] border border-(--color-ash) text-(--color-ink)/70 px-[6px] py-[2px] tracking-widest uppercase bg-(--color-parchment)/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {targetUrl && (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-[4px] px-[10px] py-[4px] border border-(--color-ink) text-[10px] font-mono uppercase tracking-wider text-(--color-ink) hover:bg-(--color-ink) hover:text-(--color-paper) transition-colors"
                    >
                      Visit Link <ExternalLink className="w-[10px] h-[10px]" />
                    </a>
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
