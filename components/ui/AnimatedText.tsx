'use client';

import { useEffect } from 'react';

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
  const letters = Array.from(text);

  // Fire onComplete after the last letter finishes its transition
  useEffect(() => {
    if (!start) return;
    const total = baseDelay + (letters.length - 1) * perCharDelay + 500; // 500ms ~ transition duration
    const t = window.setTimeout(() => onComplete?.(), total);
    return () => window.clearTimeout(t);
  }, [start, baseDelay, perCharDelay, letters.length, onComplete]);

  return (
    <span className={className} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
      {/* Screen-reader friendly: expose the full string once, hide per-letter spans */}
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {letters.map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity, filter',
              transitionProperty: 'opacity, transform, filter',
              transitionDuration: '500ms, 500ms, 700ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: `${baseDelay + i * perCharDelay}ms`,
              opacity: start ? 1 : 0,
              transform: start ? 'translateY(0) scale(1)' : 'translateY(12px) scale(1.02)',
              filter: start ? 'blur(0px)' : 'blur(2px)',
            }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
