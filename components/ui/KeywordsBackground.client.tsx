"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export type KeywordItem = {
  label: string;
  accentClass?: string; // e.g. text-cyan-300
  emphasis?: number; // 1 = normal, >1 = larger, e.g., 1.2, 1.35
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
  minDistancePct = 7,
  padPct = 4,
  tetrisHoleRect,
  tetrisCols = 14,
}: KeywordsBackgroundProps) {
  const reduceMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 based on scroll within container
  const hasCompletedRef = useRef(false);

  // Rough width/height estimate -> percentage-radius to avoid overlaps
  const estimateRadiusPct = (label: string, emphasis = 1) => {
    const len = Math.min(28, label.length);
    const base = 1.8; // base footprint
    const perChar = 0.22; // each char adds ~0.22%
    const r = (base + len * perChar) * emphasis;
    return r; // percentage of container as radius proxy
  };

  // Precompute layout positions and per-item animation offsets
  const tokens = useMemo(() => {
    const out: Array<{
      key: string;
      label: string;
      accentClass?: string;
      emphasis?: number;
      x: number; // 0..100 (% left)
      y: number; // 0..100 (% top)
      rot: number; // degrees
      dy: number; // px travel on appear (scatter) / fall distance (tetris)
      delay: number; // 0..1 logical order for reveal/fall
    }> = [];

    const next = rng(seed);
    const base = items.length ? items : [{ label: "Keyword" }];
    const N = Math.max(1, count);

    // If tetrisHoleRect provided, produce grid layout with a rectangular hole.
    if (tetrisHoleRect) {
      const cols = Math.max(6, Math.min(32, Math.floor(tetrisCols)));
      const colW = 100 / cols;
      const rowH = Math.max(3, Math.min(10, colW * 0.8)); // percent height per row
      const rows = Math.max(8, Math.floor(100 / rowH));

      const hole = {
        c0: Math.max(0, Math.floor(tetrisHoleRect.leftPct / colW)),
        c1: Math.min(cols - 1, Math.ceil((tetrisHoleRect.leftPct + tetrisHoleRect.widthPct) / colW) - 1),
        r0: Math.max(0, Math.floor(tetrisHoleRect.topPct / rowH)),
        r1: Math.min(rows - 1, Math.ceil((tetrisHoleRect.topPct + tetrisHoleRect.heightPct) / rowH) - 1),
      };

      // Create cell list excluding the hole
      const cells: Array<{ col: number; row: number }> = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (c >= hole.c0 && c <= hole.c1 && r >= hole.r0 && r <= hole.r1) continue;
          cells.push({ col: c, row: r });
        }
      }
      // Fill bottom-up: rows descending so lower rows land first; columns L->R
      cells.sort((a, b) => (b.row - a.row) || (a.col - b.col));

      const usable = Math.min(N, cells.length);
      for (let i = 0; i < usable; i++) {
        const cell = cells[i]!;
        const src = base[i % base.length]!;
        const cx = (cell.col + 0.5) * colW;
        const cy = (cell.row + 0.5) * rowH;

        // Slight per-token jitter so it feels organic
        const jitterX = (next() - 0.5) * (colW * 0.2);
        const rot = (next() - 0.5) * 6;
        const fall = 40 + next() * 60; // px of fall distance before landing
        const delay = i / usable; // linear order; bottom cells earlier

        const t: {
          key: string;
          label: string;
          accentClass?: string;
          emphasis?: number;
          x: number;
          y: number;
          rot: number;
          dy: number;
          delay: number;
        } = {
          key: `${src.label}-${i}`,
          label: src.label,
          emphasis: src.emphasis ?? 1,
          x: cx + jitterX,
          y: cy,
          rot,
          dy: fall,
          delay,
        };
        if (src.accentClass) t.accentClass = src.accentClass;
        out.push(t);
      }
      return out;
    }

    // Scatter layout (original behavior)
    const placed: { x: number; y: number; r: number }[] = [];
    const PAD = Math.max(0, Math.min(8, padPct));
    const MIN_D = Math.max(2, Math.min(20, minDistancePct));

    for (let i = 0; i < N; i++) {
      const src = base[i % base.length]!;

      let x = 50;
      let y = 50;
      let ok = false;
      let attempts = 0;
      let minD = MIN_D * (src.emphasis ?? 1);
      const estR = estimateRadiusPct(src.label, src.emphasis ?? 1);
      let curR = estR;
      while (!ok && attempts < 60) {
        attempts++;
        // Wider scatter, avoid edges by PAD
        x = PAD + next() * (100 - PAD * 2);
        y = PAD + next() * (100 - PAD * 2);

        // Bias long/emphasized labels toward edges to reduce central crowding
        const long = Math.max(0, Math.min(1, (src.label.length - 10) / 18));
        const emph = Math.max(0, Math.min(1, ((src.emphasis ?? 1) - 1) / 0.4));
        const bias = Math.max(0, Math.min(1, 0.6 * long + 0.4 * emph));
        if (bias > 0) {
          const dx = x - 50;
          const dy = y - 50;
          const factor = 1 + 0.7 * bias; // push outward up to ~70%
          x = 50 + dx * factor;
          y = 50 + dy * factor;
          // respect padding
          x = Math.max(PAD, Math.min(100 - PAD, x));
          y = Math.max(PAD, Math.min(100 - PAD, y));
        }

        ok = true;
        for (const p of placed) {
          const dx = x - p.x;
          const dy = y - p.y;
          const d2 = dx * dx + dy * dy;
          const rs = (minD + curR + p.r + 1.2); // +margin
          if (d2 < rs * rs) {
            ok = false;
            break;
          }
        }
        if (!ok && attempts % 15 === 0) {
          // Gradually relax spacing if we're struggling to place tokens
          minD = Math.max(2, minD * 0.85);
          curR = Math.max(1.2, curR * 0.9);
        }
      }
      placed.push({ x, y, r: Math.max(curR, minD * 0.5) });

      const rot = (next() - 0.5) * 10; // slightly wider tilt
      const dy = 8 + next() * 22; // more travel
      const delay = (i + next() * 0.5) / N; // spread, slightly noisy

      const t: {
        key: string;
        label: string;
        accentClass?: string;
        emphasis?: number;
        x: number;
        y: number;
        rot: number;
        dy: number;
        delay: number;
      } = {
        key: `${src.label}-${i}`,
        label: src.label,
        emphasis: src.emphasis ?? 1,
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
  }, [items, count, seed, minDistancePct, padPct, tetrisHoleRect, tetrisCols]);

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
