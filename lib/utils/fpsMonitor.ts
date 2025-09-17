export type FpsMetrics = {
  frames: number;
  durationMs: number;
  avgFps: number;
  minFps: number;
  maxFps: number;
  p95FrameMs: number;
  longFrames: number;
  longFrameThresholdMs: number;
  timeline: { t: number; dt: number }[];
  userAgent?: string;
};

export async function measureFps(
  durationMs = 3000,
  longFrameThresholdMs = 16.7,
): Promise<FpsMetrics> {
  return new Promise<FpsMetrics>((resolve) => {
    const start = performance.now();
    let last = start;
    let frames = 0;
    let minFps = Infinity;
    let maxFps = 0;
    let longFrames = 0;
    const dts: number[] = [];
    const timeline: { t: number; dt: number }[] = [];

    let rafId = 0;

    const tick = () => {
      const now = performance.now();
      const dt = now - last;
      last = now;

      if (dt < 1000) {
        dts.push(dt);
        timeline.push({ t: now - start, dt });
        const fps = 1000 / dt;
        if (fps < minFps) minFps = fps;
        if (fps > maxFps) maxFps = fps;
        if (dt > longFrameThresholdMs) longFrames++;
        frames++;
      }

      if (now - start < durationMs) {
        rafId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafId);
        const total = now - start;
        const avgFps = frames > 0 ? (frames / total) * 1000 : 0;
        const sorted = dts.slice().sort((a, b) => a - b);
        const p95Idx = Math.max(0, Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95)));
        const p95FrameMs = sorted[p95Idx] ?? 0;

        resolve({
          frames,
          durationMs: total,
          avgFps,
          minFps: Number.isFinite(minFps) ? minFps : 0,
          maxFps: Number.isFinite(maxFps) ? maxFps : 0,
          p95FrameMs,
          longFrames,
          longFrameThresholdMs,
          timeline,
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        });
      }
    };

    rafId = requestAnimationFrame(tick);
  });
}
