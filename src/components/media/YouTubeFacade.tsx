'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  thumbnailUrl?: string;
  className?: string;
}

export function YouTubeFacade({ videoId, title, thumbnailUrl, className }: YouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const bgImage = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (isPlaying) {
    return (
      <div className={cn("relative w-full aspect-video bg-black", className)}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <div 
      className={cn("relative w-full aspect-video bg-(--color-stone) cursor-pointer group flex items-center justify-center overflow-hidden", className)}
      onClick={() => setIsPlaying(true)}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      <div className="relative z-10 w-16 h-16 bg-white/90 rounded-[10px] flex items-center justify-center transition-transform group-hover:scale-110">
        <Play className="w-8 h-8 text-(--color-ink) ml-1" />
      </div>
    </div>
  );
}
