import { useMemo } from "react";
import { rng } from "@/lib/utils/rng";

export type KeywordItem = {
  label: string;
  accentClass?: string; // e.g. text-cyan-300
  emphasis?: number; // 1 = normal, >1 = larger, e.g., 1.2, 1.35
};

export type UseKeywordsLayoutArgs = {
  items: KeywordItem[];
  count: number;
  seed: number;
  minDistancePct: number;
  padPct: number;
  tetrisHoleRect?: {
    leftPct: number;
    topPct: number;
    widthPct: number;
    heightPct: number;
  } | undefined;
  tetrisCols: number;
};

export function useKeywordsLayout({
  items,
  count,
  seed,
  minDistancePct,
  padPct,
  tetrisHoleRect,
  tetrisCols,
}: UseKeywordsLayoutArgs) {
  // Rough width/height estimate -> percentage-radius to avoid overlaps
  const estimateRadiusPct = (label: string, emphasis = 1) => {
    const len = Math.min(28, label.length);
    const base = 1.8; // base footprint
    const perChar = 0.22; // each char adds ~0.22%
    const r = (base + len * perChar) * emphasis;
    return r; // percentage of container as radius proxy
  };

  // Precompute layout positions and per-item animation offsets
  return useMemo(() => {
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
        c1: Math.min(
          cols - 1,
          Math.ceil((tetrisHoleRect.leftPct + tetrisHoleRect.widthPct) / colW) - 1,
        ),
        r0: Math.max(0, Math.floor(tetrisHoleRect.topPct / rowH)),
        r1: Math.min(
          rows - 1,
          Math.ceil((tetrisHoleRect.topPct + tetrisHoleRect.heightPct) / rowH) - 1,
        ),
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
      cells.sort((a, b) => b.row - a.row || a.col - b.col);

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
          const rs = minD + curR + p.r + 1.2; // +margin
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
}
