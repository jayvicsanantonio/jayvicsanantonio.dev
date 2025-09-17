'use client';

import React, { useEffect } from 'react';

import { getBrowserCapabilities } from '@/lib/utils/browserUtils';

export interface AnimatedTextProps {
  text: string;
  start: boolean;
  perCharDelay?: number; // ms delay between letters
  baseDelay?: number; // ms delay before first letter
  className?: string;
  onComplete?: () => void;
}

export default function AnimatedText({
  text,
  start,
  perCharDelay = 40,
  baseDelay = 0,
  className,
  onComplete,
}: AnimatedTextProps) {
  const capabilities = getBrowserCapabilities();
  const [isScrolling, setIsScrolling] = React.useState(false);

  // NUCLEAR: Detect scroll state for performance optimization
  useEffect(() => {
    if (!capabilities.isSafari) return;

    const handleScroll = () => {
      setIsScrolling(true);
      if ((window as any).__animatedTextScrollTimeout) {
        clearTimeout((window as any).__animatedTextScrollTimeout);
      }
      (window as any).__animatedTextScrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if ((window as any).__animatedTextScrollTimeout) {
        clearTimeout((window as any).__animatedTextScrollTimeout);
      }
    };
  }, [capabilities.isSafari]);

  const letterObjs = React.useMemo(
    () => Array.from(text).map((ch, idx) => ({ ch, key: `${ch}-${idx}-${text.length}` })),
    [text],
  );

  // NUCLEAR Safari scroll optimization
  const getSafariOptimizedProps = () => {
    if (capabilities.isSafari && isScrolling) {
      // NUCLEAR: No animations during scroll
      return {
        willChange: 'auto',
        transitionProperty: 'none',
        transitionDuration: '0ms',
        transform: 'translateY(0) scale(1)', // Static position
        filter: 'none',
        opacity: start ? 1 : 0.3, // Simple opacity only
      };
    }

    if (capabilities.isSafari) {
      return {
        willChange: 'opacity, transform',
        transitionProperty: 'opacity, transform',
        transitionDuration: '400ms, 400ms',
        transitionTimingFunction: 'ease-out',
        transform: start ? 'translateY(0) scale(1)' : 'translateY(8px) scale(1)',
        filter: 'none',
      };
    }

    return {
      willChange: 'transform, opacity, filter',
      transitionProperty: 'opacity, transform, filter',
      transitionDuration: '500ms, 500ms, 700ms',
      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      transform: start ? 'translateY(0) scale(1)' : 'translateY(12px) scale(1.02)',
      filter: start ? 'blur(0px)' : 'blur(2px)',
    };
  };

  // Fire onComplete after the last letter finishes its transition
  useEffect(() => {
    if (!start) return;
    const charCount = Array.from(text).length;
    const total = baseDelay + (charCount - 1) * perCharDelay + 500; // 500ms ~ transition duration
    const t = window.setTimeout(() => onComplete?.(), total);
    return () => window.clearTimeout(t);
  }, [start, baseDelay, perCharDelay, text, onComplete]);

  return (
    <span className={className} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
      {/* Screen-reader friendly: expose the full string once, hide per-letter spans */}
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {letterObjs.map((item, i) => {
          const optimizedProps = getSafariOptimizedProps();
          return (
            <span
              key={item.key}
              style={{
                display: 'inline-block',
                ...optimizedProps,
                transitionDelay: `${baseDelay + i * perCharDelay}ms`,
                opacity: start ? 1 : 0,
              }}
            >
              {item.ch === ' ' ? '\u00A0' : item.ch}
            </span>
          );
        })}
      </span>
    </span>
  );
}
