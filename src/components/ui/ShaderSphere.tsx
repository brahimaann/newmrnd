'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export function ShaderSphere({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={cn(
        "w-[50vh] h-[50vh] min-w-[300px] min-h-[300px] max-w-[600px] max-h-[600px] rounded-full",
        "absolute right-[10%] top-[20%] -z-10 mix-blend-multiply opacity-90 blur-[1px]",
        className
      )}
      style={{
        background: "var(--gradient-iridescent-sphere)"
      }}
    />
  );
}
