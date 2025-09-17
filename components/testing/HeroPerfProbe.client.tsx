'use client';

import { useEffect, useMemo, useState } from 'react';
import { type FpsMetrics, measureFps } from '@/lib/utils/fpsMonitor';

declare global {
  interface Window {
    heroPerf?: {
      intro: FpsMetrics;
      steady: FpsMetrics;
      combined: FpsMetrics;
    };
  }
}

export default function HeroPerfProbe() {
  const [visible, setVisible] = useState(false);
  const [metrics, setMetrics] = useState<FpsMetrics | null>(null);
  const [running, setRunning] = useState(false);

  const shouldMeasure = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const p = new URLSearchParams(window.location.search);
    return p.get('measure') === 'hero';
  }, []);

  const shouldScroll = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const p = new URLSearchParams(window.location.search);
    return p.get('scroll') === '1' || p.get('scroll') === 'true';
  }, []);

  useEffect(() => {
    if (!shouldMeasure) return;
    setVisible(true);

    let cancelled = false;
    let restoreScroll = 0;
    let rafId = 0;
    let stopScrollLocal: (() => void) | null = null;

    const scrollDuration = 5000; // scroll only during steady window (~5s)
    const animateScroll = () => {
      if (!shouldScroll || typeof window === 'undefined') return () => {};
      const start = performance.now();
      restoreScroll = window.scrollY;
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const maxScroll = Math.max(0, docHeight - window.innerHeight);
      const totalDistance = Math.max(0, maxScroll - restoreScroll);

      const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

      const step = () => {
        if (cancelled) return;
        const now = performance.now();
        const elapsed = now - start;
        const p = Math.min(1, Math.max(0, elapsed / scrollDuration));
        const eased = easeInOut(p);
        const target = Math.min(
          maxScroll,
          Math.max(0, restoreScroll + Math.floor(eased * totalDistance)),
        );
        window.scrollTo(0, target);
        if (p < 1) {
          rafId = requestAnimationFrame(step);
        }
      };
      rafId = requestAnimationFrame(step);
      return () => {
        cancelAnimationFrame(rafId);
        window.scrollTo(0, restoreScroll);
      };
    };

    (async () => {
      setRunning(true);
      const intro = await measureFps(5000, 16.7); // 5s pre-scroll
      if (cancelled) return;

      if (shouldScroll && typeof window !== 'undefined') {
        stopScrollLocal = animateScroll(); // start scroll exactly when steady measurement starts
      }

      const steady = await measureFps(5000, 16.7); // ~5s during scroll to bottom
      if (cancelled) {
        if (stopScrollLocal) stopScrollLocal();
        return;
      }
      if (stopScrollLocal) stopScrollLocal();

      // Wait 1s after reaching bottom before finalizing
      await new Promise((res) => setTimeout(res, 1000));

      const combined: FpsMetrics = {
        frames: intro.frames + steady.frames,
        durationMs: intro.durationMs + steady.durationMs,
        avgFps:
          (intro.avgFps * intro.durationMs + steady.avgFps * steady.durationMs) /
          (intro.durationMs + steady.durationMs),
        minFps: Math.min(intro.minFps, steady.minFps),
        maxFps: Math.max(intro.maxFps, steady.maxFps),
        p95FrameMs: Math.max(intro.p95FrameMs, steady.p95FrameMs),
        longFrames: intro.longFrames + steady.longFrames,
        longFrameThresholdMs: intro.longFrameThresholdMs,
        timeline: [
          ...intro.timeline.map((x) => ({ t: x.t, dt: x.dt })),
          ...steady.timeline.map((x) => ({ t: intro.durationMs + x.t, dt: x.dt })),
        ],
        userAgent: intro.userAgent || steady.userAgent || '',
      };

      window.heroPerf = { intro, steady, combined };
      // eslint-disable-next-line no-console
      console.log('Hero performance metrics (intro, steady, combined):', {
        intro,
        steady,
        combined,
      });
      setMetrics(combined);
      setRunning(false);
    })();

    return () => {
      cancelled = true;
      if (stopScrollLocal) stopScrollLocal();
    };
  }, [shouldMeasure, shouldScroll]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed top-4 right-4 z-[100] rounded-lg border border-white/10 bg-black/80 p-3 text-xs text-white"
      style={{ maxWidth: 260 }}
    >
      <div className="mb-1 font-semibold">Hero FPS Monitor</div>
      {running && <div>Measuring…</div>}
      {!running && metrics && (
        <div className="space-y-0.5">
          <div>avg: {metrics.avgFps.toFixed(1)} fps</div>
          <div>min: {metrics.minFps.toFixed(1)} fps</div>
          <div>max: {metrics.maxFps.toFixed(1)} fps</div>
          <div>p95 frame: {metrics.p95FrameMs.toFixed(1)} ms</div>
          <div>
            long frames (&gt;{metrics.longFrameThresholdMs}ms): {metrics.longFrames}
          </div>
          <div className="opacity-70">UA: {metrics.userAgent?.slice(0, 48)}…</div>
          <div className="opacity-70">See window.heroPerf and console for full details.</div>
        </div>
      )}
    </div>
  );
}
