"use client";

import { useEffect, useState } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const sample = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const p = Math.min(1, Math.max(0, doc.scrollTop / max));
      setProgress(p);
      raf = requestAnimationFrame(sample);
    };

    sample();

    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sample);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return progress;
}
