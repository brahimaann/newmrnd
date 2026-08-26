'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Single dynamic import for ShaderGradient package
const DynamicShader = dynamic(
  () =>
    import('shadergradient').then((mod) => {
      const { ShaderGradientCanvas, ShaderGradient } = mod;
      return function ShaderContainer(props: any) {
        return (
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
              type={props.type || 'waterPlane'}
              animate="on"
              uTime={0}
              uSpeed={0.25}
              uStrength={2.2}
              uDensity={1.3}
              uFrequency={4.2}
              uAmplitude={0}
              positionX={0}
              positionY={0}
              positionZ={0}
              rotationX={0}
              rotationY={15}
              rotationZ={0}
              color1={props.color1 || '#ff5e3a'}
              color2={props.color2 || '#1e1d1a'}
              color3={props.color3 || '#dfd8cb'}
              reflection={0.15}
              wireframe={false}
              brightness={1.1}
              lightType="3d"
              cAzimuthAngle={180}
              cPolarAngle={90}
              cDistance={3.6}
              cameraZoom={1}
              grain="on"
              grainBlending={0.3}
            />
          </ShaderGradientCanvas>
        );
      };
    }),
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
  color1 = '#e86a38',
  color2 = '#1b1a17',
  color3 = '#dfd8cb',
  className = '',
}: ShaderGradientBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      suppressHydrationWarning
      className={`absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-(--color-parchment) ${className}`}
      aria-hidden="true"
    >
      {mounted && <DynamicShader type={type} color1={color1} color2={color2} color3={color3} />}
      
      {/* Subtle grain/parchment diffusion */}
      <div className="absolute inset-0 bg-(--color-parchment)/25 backdrop-blur-[1px] pointer-events-none" />
    </div>
  );
}

export default ShaderGradientBackground;
