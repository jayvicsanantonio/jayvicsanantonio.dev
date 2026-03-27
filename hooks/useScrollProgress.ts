"use client";

import { useEffect, useState } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const updateProgress = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      setProgress(Math.min(1, Math.max(0, doc.scrollTop / max)));
    };

    const scheduleUpdate = () => {
      if (raf !== 0) {
        return;
      }

      raf = requestAnimationFrame(() => {
        raf = 0;
        updateProgress();
      });
    };

    updateProgress();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return progress;
}
