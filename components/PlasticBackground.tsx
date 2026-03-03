'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './ReducedMotionProvider';

interface PlasticElement {
  id: number;
  type: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  speed: number;
  layer: number;
}

const PLASTIC_SHAPES = {
  bag: `M10,30 Q15,5 20,5 Q25,5 25,15 L22,45 Q22,50 15,50 Q8,50 8,45 Z`,
  bottle: `M12,5 L12,10 Q8,12 8,15 L8,45 Q8,48 15,48 Q22,48 22,45 L22,15 Q22,12 18,10 L18,5 Z`,
  cap: `M10,8 Q10,2 20,2 Q30,2 30,8 L30,15 Q30,18 20,18 Q10,18 10,15 Z`,
  straw: `M18,2 L22,2 L22,58 L18,58 Z`,
  bag2: `M5,10 Q5,2 20,2 Q35,2 35,10 L32,38 Q32,42 20,42 Q8,42 8,38 Z M15,2 L15,12 M25,2 L25,12`,
  dot: `M20,20 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0`,
  rectangle: `M5,5 L35,5 L35,25 L5,25 Z`,
  pipe: `M5,15 L5,25 L35,25 L35,15 Z`,
};

function generateElements(count: number, scrollProgress: number, layer: number): PlasticElement[] {
  const elements: PlasticElement[] = [];
  const types = Object.keys(PLASTIC_SHAPES);
  
  for (let i = 0; i < count; i++) {
    elements.push({
      id: layer * 1000 + i,
      type: types[Math.floor((i * 7 + layer * 13) % types.length)],
      x: ((i * 37 + layer * 53) % 100),
      y: ((i * 23 + layer * 41) % 100) + scrollProgress * 8,
      size: layer === 0 ? 24 + (i % 3) * 8 : layer === 1 ? 14 + (i % 4) * 5 : 6 + (i % 5) * 3,
      opacity: layer === 0 ? 0.03 : layer === 1 ? 0.04 : 0.055,
      rotation: (i * 17 + layer * 29) % 360,
      speed: 0.1 + (i % 5) * 0.05,
      layer,
    });
  }
  return elements;
}

export default function PlasticBackground() {
  const { reducedMotion } = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [elements, setElements] = useState<PlasticElement[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateElements = () => {
      const density = 1 + scrollProgress * 2;
      const layer0 = generateElements(Math.floor(8 * density), scrollProgress, 0);
      const layer1 = generateElements(Math.floor(15 * density), scrollProgress, 1);
      const layer2 = generateElements(Math.floor(25 * density), scrollProgress, 2);
      setElements([...layer0, ...layer1, ...layer2]);
    };
    updateElements();
  }, [scrollProgress]);

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {elements.map((el) => {
          const shape = PLASTIC_SHAPES[el.type as keyof typeof PLASTIC_SHAPES];
          const translateY = reducedMotion ? 0 : scrollProgress * el.layer * 15;
          
          return (
            <g
              key={el.id}
              transform={`translate(${el.x}%, ${el.y - translateY}%) rotate(${el.rotation}) scale(${el.size / 40})`}
              style={{
                transition: reducedMotion ? 'none' : 'all 0.5s ease-out',
              }}
            >
              <path
                d={shape}
                fill="none"
                stroke="#1E3A5F"
                strokeWidth="1.5"
                opacity={el.opacity + scrollProgress * 0.03}
              />
            </g>
          );
        })}
      </svg>

      {/* Gradient fade at bottom - density increases */}
      <div
        className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(220, 238, 255, 0.08), transparent)',
          opacity: scrollProgress,
        }}
      />
    </div>
  );
}
