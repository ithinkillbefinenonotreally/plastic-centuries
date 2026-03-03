'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const ReducedMotionContext = createContext<{
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}>({
  reducedMotion: false,
  toggleReducedMotion: () => {},
});

export const useReducedMotion = () => useContext(ReducedMotionContext);

export default function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  const toggleReducedMotion = () => setReducedMotion(prev => !prev);

  return (
    <ReducedMotionContext.Provider value={{ reducedMotion, toggleReducedMotion }}>
      <div className={reducedMotion ? 'reduce-motion' : ''}>
        {children}
      </div>
    </ReducedMotionContext.Provider>
  );
}
