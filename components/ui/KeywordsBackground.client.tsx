"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export type KeywordItem = {
  label: string;
  accentClass?: string; // e.g. text-cyan-300
};

export interface KeywordsBackgroundProps {
  items: KeywordItem[];
  className?: string;
  /**
   * Estimated number of tokens to render. If greater than items.length,
   * items are repeated cyclically to achieve the density.
   */
  count?: number;
  /**
   * Optional seed so layout is stable between renders.
   */
  seed?: number;
  /**
   * Optional controlled progress (0-1). If provided, component won't track scroll internally.
   * Progress 0-0.5: keywords appear
   * Progress 0.5-1: keywords disappear
   */
  controlledProgress?: number;
  /**
   * Callback when all keywords have appeared and disappeared (progress >= 1)
   */
  onComplete?: () => void;
}

// Small, stable LCG for deterministic pseudo-randoms
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export default function KeywordsBackground({
  items,
  className,
  count = 72,
  seed = 1337,
  controlledProgress,
  onComplete,
}: KeywordsBackgroundProps) {
  const reduceMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 based on scroll within container
  const hasCompletedRef = useRef(false);

  // Precompute layout positions and per-item animation offsets
  const tokens = useMemo(() => {
    const out: Array<{
      key: string;
      label: string;
      accentClass?: string;
      x: number; // 0..100 (% left)
      y: number; // 0..100 (% top)
      rot: number; // degrees
      dy: number; // px travel on appear
      delay: number; // 0..1 logical order for reveal
    }> = [];

    const next = rng(seed);
    const base = items.length ? items : [{ label: "Keyword" }];
    const N = Math.max(1, count);
    for (let i = 0; i < N; i++) {
      const src = base[i % base.length]!;
      const x = 8 + next() * 84; // avoid edges
      const y = 6 + next() * 88;
      const rot = (next() - 0.5) * 8; // -4..4 deg
      const dy = 6 + next() * 18; // 6..24 px
      const delay = (i + next() * 0.5) / N; // spread, slightly noisy

      const t: {
        key: string;
        label: string;
        accentClass?: string;
        x: number;
        y: number;
        rot: number;
        dy: number;
        delay: number;
      } = {
        key: `${src.label}-${i}`,
        label: src.label,
        x,
        y,
        rot,
        dy,
        delay,
      };
      if (src.accentClass) t.accentClass = src.accentClass;
      out.push(t);
    }
    return out.sort((a, b) => a.delay - b.delay);
  }, [items, count, seed]);

  // Use controlled progress if provided, otherwise track scroll
  const effectiveProgress = controlledProgress !== undefined ? controlledProgress : progress;

  // Measure scroll progress relative to the container's viewport intersection.
  useEffect(() => {
    // If controlled progress is provided, don't track scroll
    if (controlledProgress !== undefined) return;

    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // Start a bit before entering, finish a bit after fully visible
        const start = vh * 0.9; // when bottom nears viewport
        const end = -(rect.height * 0.2); // when top passes a bit upward
        const t = (start - rect.top) / (start - end);
        const p = Math.max(0, Math.min(1, t));
        setProgress(p);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [controlledProgress]);

  // Call onComplete when progress reaches 1
  useEffect(() => {
    if (effectiveProgress >= 1 && !hasCompletedRef.current && onComplete) {
      hasCompletedRef.current = true;
      onComplete();
    } else if (effectiveProgress < 1) {
      hasCompletedRef.current = false;
    }
  }, [effectiveProgress, onComplete]);

  return (
    <div ref={containerRef} className={className} aria-hidden>
      <div className="absolute inset-0 pointer-events-none select-none">
        {tokens.map((t, i) => {
          // Progress 0-0.5: appear, 0.5-1: disappear
          const appearPhase = effectiveProgress < 0.5;
          const disappearPhase = effectiveProgress >= 0.5;
          
          // Normalize progress for appear phase (0-0.5 -> 0-1)
          const appearProgress = appearPhase ? effectiveProgress * 2 : 1;
          // Normalize progress for disappear phase (0.5-1 -> 0-1)
          const disappearProgress = disappearPhase ? (effectiveProgress - 0.5) * 2 : 0;
          
          // Calculate per-token appear/disappear
          const tokenAppear = reduceMotion
            ? 1
            : Math.max(0, Math.min(1, (appearProgress * 1.1 - t.delay) * 5));
          
          // Tokens disappear in reverse order (last to appear, first to disappear)
          const tokenDisappear = reduceMotion
            ? 0
            : Math.max(0, Math.min(1, (disappearProgress * 1.1 - (1 - t.delay)) * 5));
          
          // Combine appear and disappear
          const visibility = reduceMotion ? 1 : tokenAppear * (1 - tokenDisappear);
          
          const opacity = 0.12 + visibility * 0.8; // start faint, end readable but subtle
          const translateY = (1 - visibility) * t.dy;
          const blur = (1 - visibility) * 2.2;
          const scale = 0.98 + visibility * 0.02;

          return (
            <span
              key={t.key}
              className={[
                "absolute rounded-full border px-2.5 py-0.5 text-[11px] sm:text-xs font-medium tracking-[0.12em] uppercase",
                "transition-[transform,opacity,filter] duration-500 will-change-transform",
                "border-white/10 bg-white/5 text-gray-300",
                t.accentClass ?? "",
              ].join(" ")}
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                transform: `translate(-50%, -50%) translateY(${translateY}px) rotate(${t.rot}deg) scale(${scale})`,
                opacity,
                filter: `blur(${blur}px)`,
                transitionDelay: `${Math.round((i % 12) * 12)}ms`,
                // Soft glow echo
                textShadow: `0 0 12px rgba(34,211,238,${0.08 * visibility})`,
              }}
            >
              {t.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
