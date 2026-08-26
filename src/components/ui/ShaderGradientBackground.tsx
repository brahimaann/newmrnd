'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled to ensure WebGL canvas only mounts on client
const ShaderGradientCanvas = dynamic(
  () => import('shadergradient').then((mod) => mod.ShaderGradientCanvas),
  { ssr: false }
);

const ShaderGradient = dynamic(
  () => import('shadergradient').then((mod) => mod.ShaderGradient),
  { ssr: false }
);

interface ShaderGradientBackgroundProps {
  type?: 'plane' | 'sphere' | 'waterPlane';
  color1?: string;
  color2?: string;
  color3?: string;
  className?: string;
}

export function ShaderGradientBackground({
  type = 'waterPlane',
  color1 = '#dfd8cb',
  color2 = '#1c1b18',
  color3 = '#b8af9f',
  className = '',
}: ShaderGradientBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div 
        className={`absolute inset-0 -z-10 pointer-events-none transition-opacity duration-1000 bg-(--color-parchment) ${className}`} 
      />
    );
  }

  return (
    <div 
      className={`absolute inset-0 -z-10 pointer-events-none overflow-hidden opacity-85 transition-opacity duration-1000 ${className}`}
      aria-hidden="true"
    >
      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        pixelDensity={1.2}
        fov={45}
      >
        <ShaderGradient
          control="props"
          type={type}
          animate="on"
          uTime={0}
          uSpeed={0.2}
          uStrength={1.8}
          uDensity={1.2}
          uFrequency={4.0}
          uAmplitude={0}
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={10}
          rotationZ={0}
          color1={color1}
          color2={color2}
          color3={color3}
          reflection={0.1}
          wireframe={false}
          brightness={1.05}
          lightType="3d"
          cAzimuthAngle={180}
          cPolarAngle={90}
          cDistance={3.8}
          cameraZoom={1}
          grain="on"
          grainBlending={0.4}
        />
      </ShaderGradientCanvas>
      
      {/* Subtle brand tint overlay to blend harmoniously with MRND parchment palette */}
      <div className="absolute inset-0 bg-(--color-parchment)/40 mix-blend-soft-light pointer-events-none" />
    </div>
  );
}

export default ShaderGradientBackground;
