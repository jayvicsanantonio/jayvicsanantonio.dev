"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const progress = Math.min(1, Math.max(0, doc.scrollTop / max));
      barRef.current?.style.setProperty("--scroll-progress", String(progress));
    };

    const scheduleUpdate = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed right-0 top-0 bottom-0 z-[999] w-2 bg-white/10">
      <div
        ref={barRef}
        className="absolute top-0 left-0 right-0 h-full origin-top scale-y-[var(--scroll-progress,0)] bg-gradient-to-b from-cyan-400/80 via-cyan-300/70 to-cyan-500/90 shadow-[0_0_10px_rgba(34,211,238,0.35)]"
      />
    </div>
  );
}
