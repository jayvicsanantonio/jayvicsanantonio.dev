"use client";

import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { useKeywordsLayout, type KeywordItem } from "./hooks/useKeywordsLayout";

export type { KeywordItem };

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
  /** Minimum spacing between tokens (percent of viewport). Default 7. */
  minDistancePct?: number;
  /** Padding from edges for token centers (percent). Default 4. */
  padPct?: number;
  /**
   * Optional Tetris-style layout: provide a rectangular "hole" (in % of container)
   * where no tokens are placed. Tokens will fall into a simple grid elsewhere.
   * If omitted, the component uses the scatter layout.
   */
  tetrisHoleRect?: {
    leftPct: number;
    topPct: number;
    widthPct: number;
    heightPct: number;
  };
  /** Number of columns for Tetris grid. Default 14. */
  tetrisCols?: number;
}

export default function KeywordsBackground({
  items,
  className,
  count = 72,
  seed = 1337,
  controlledProgress,
  onComplete,
  minDistancePct = 7,
  padPct = 4,
  tetrisHoleRect,
  tetrisCols = 14,
}: KeywordsBackgroundProps) {
  const reduceMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 based on scroll within container
  const hasCompletedRef = useRef(false);

  // Precompute layout positions and per-item animation offsets
  const tokens = useKeywordsLayout({
    items,
    count,
    seed,
    minDistancePct,
    padPct,
    tetrisHoleRect,
    tetrisCols,
  });

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
          // Two modes: Tetris fall (if holeRect provided) vs scatter (original)
          let opacity = 1;
          let translateY = 0;
          let blur = 0;
          let scale = (t.emphasis ?? 1);
          let glow = 0.08; // for subtle textShadow intensity

          if (tetrisHoleRect) {
            // Local fall progress per token
            const lp = reduceMotion
              ? 1
              : Math.max(0, Math.min(1, (effectiveProgress * 1.08 - t.delay) * 3.2));
            // Ease like gravity -> snap
            const eased = lp * lp * (3 - 2 * lp); // smoothstep
            const bounce = (1 - lp) * (1 - lp) * 8; // small residual bounce near landing
            translateY = (1 - eased) * (-t.dy) + bounce;
            opacity = 0.08 + eased * 0.9;
            blur = (1 - eased) * 2.2;
            scale = (0.985 + eased * 0.015) * (t.emphasis ?? 1);
            glow = 0.08 * eased;
          } else {
            // Scatter mode: appear then disappear
            const appearPhase = effectiveProgress < 0.5;
            const disappearPhase = effectiveProgress >= 0.5;
            const appearProgress = appearPhase ? effectiveProgress * 2 : 1;
            const disappearProgress = disappearPhase ? (effectiveProgress - 0.5) * 2 : 0;
            const tokenAppear = reduceMotion
              ? 1
              : Math.max(0, Math.min(1, (appearProgress * 1.1 - t.delay) * 5));
            const tokenDisappear = reduceMotion
              ? 0
              : Math.max(0, Math.min(1, (disappearProgress * 1.1 - (1 - t.delay)) * 5));
            const visibility = reduceMotion ? 1 : tokenAppear * (1 - tokenDisappear);
            opacity = 0.12 + visibility * 0.8;
            translateY = (1 - visibility) * t.dy;
            blur = Math.pow(1 - visibility, 2) * 2.0;
            scale = (0.98 + visibility * 0.02) * (t.emphasis ?? 1);
            glow = 0.08 * visibility;
          }

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
                textShadow: `0 0 12px rgba(34,211,238,${glow})`,
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
