"use client";

import { useEffect, useState } from "react";

/**
 * Tracks scroll progress as a normalized value between 0 and 1.
 *
 * Uses requestAnimationFrame for smooth, performant updates.
 * Automatically handles window resize events.
 *
 * @returns Current scroll progress where:
 *   - 0 = top of page
 *   - 1 = bottom of page
 *
 * @example
 * function MyComponent() {
 *   const progress = useScrollProgress();
 *   return <div style={{ opacity: progress }}>Fades in on scroll</div>;
 * }
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    // RAF-based scroll sampling for smooth updates.
    // Using requestAnimationFrame ensures updates sync with browser repaints (60fps).
    const sample = () => {
      const doc = document.documentElement;
      // Calculate maximum scrollable distance (total height - viewport height).
      // Minimum of 1 prevents division by zero on non-scrollable pages.
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      // Normalize scroll position to 0-1 range.
      // Formula: current_scroll / max_scroll, clamped between 0 and 1.
      const p = Math.min(1, Math.max(0, doc.scrollTop / max));
      setProgress(p);
      raf = requestAnimationFrame(sample);
    };

    // Start sampling.
    sample();

    // Force a sample soon after resize.
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sample);
    };

    window.addEventListener("resize", onResize);

    // Cleanup.
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return progress;
}
