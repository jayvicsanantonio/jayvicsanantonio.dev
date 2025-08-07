'use client';

import React, { useRef, createContext, useContext } from 'react';
import { motion, useScroll, MotionValue } from 'framer-motion';

// Create a context to hold the scroll progress value.
interface ScrollContextType {
  scrollYProgress: MotionValue<number>;
}
const ScrollContext = createContext<ScrollContextType | null>(null);

// Custom hook to easily access the scroll context.
export function useNarrativeScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useNarrativeScroll must be used within a NarrativeScroll provider');
  }
  return context;
}

// This component will orchestrate the narrative scrolling experience.
// It provides the `scrollYProgress` value to all children via context.
export default function NarrativeScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={scrollRef} className="relative">
      <ScrollContext.Provider value={{ scrollYProgress }}>
        {children}
      </ScrollContext.Provider>
    </div>
  );
}
