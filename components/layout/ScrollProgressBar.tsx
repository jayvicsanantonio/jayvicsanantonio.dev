"use client";

type ScrollProgressBarProps = {
  progress: number;
};

/**
 * Visual indicator showing scroll progress as a vertical bar on the right edge.
 * Height grows from 0% to 100% as the user scrolls from top to bottom.
 */
export default function ScrollProgressBar({ progress }: ScrollProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <div aria-hidden="true" className="fixed right-0 top-0 bottom-0 z-[999] w-2 bg-white/10">
      <div
        className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-cyan-400/80 via-cyan-300/70 to-cyan-500/90 shadow-[0_0_10px_rgba(34,211,238,0.35)]"
        style={{ height: `${clampedProgress * 100}%` }}
      />
    </div>
  );
}
