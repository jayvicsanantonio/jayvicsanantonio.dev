"use client";

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode };

export default function ScrollProvider({ children }: Props) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [mode, setMode] = React.useState<"native" | "smooth">("native");

  React.useEffect(() => {
    const prefersReduced = typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true
      : false;

    if (prefersReduced) {
      setMode("native");
      return;
    }

    let destroyed = false;
    let prevHtmlOverflow = "";
    let prevBodyOverflow = "";
    let scrollbar: any = null;

    const el = scrollerRef.current;
    if (!el) return;

    // Try dynamic import to avoid hard dependency during development.
    (async () => {
      try {
        const mod = await import("smooth-scrollbar");
        if (destroyed) return;
        const Scrollbar = mod.default ?? (mod as any);

        // Hide document scrolling while custom scroller is active.
        prevHtmlOverflow = document.documentElement.style.overflow;
        prevBodyOverflow = document.body.style.overflow;
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        scrollbar = Scrollbar.init(el, {
          damping: 0.1,
          thumbMinSize: 20,
          renderByPixels: true,
          alwaysShowTracks: true,
          continuousScrolling: false,
        });

        setMode("smooth");

        // Proxy to GSAP ScrollTrigger
        ScrollTrigger.scrollerProxy(el, {
          scrollTop(value?: number) {
            if (typeof value === "number") {
              scrollbar.scrollTo(0, value, 0);
            }
            return scrollbar?.offset?.y ?? 0;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          pinType: "transform",
        });

        ScrollTrigger.defaults({ scroller: el });

        const update = () => {
          const lim = scrollbar.limit?.y ?? 0;
          const off = scrollbar.offset?.y ?? 0;
          const p = lim > 0 ? off / lim : 0;
          setProgress(p);
          ScrollTrigger.update();
        };
        scrollbar.addListener(update);
        update();
        ScrollTrigger.refresh();
      } catch (_err) {
        // Fallback: native scroll handled in separate effect
        setMode("native");
      }
    })();

    return () => {
      destroyed = true;
      try {
        if (scrollbar) {
          scrollbar.destroy();
        }
      } catch {}
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  // Native mode progress sampler
  React.useEffect(() => {
    if (mode !== "native") return;
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
      // force a sample soon after resize
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sample);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [mode]);

  return (
    <>
      {mode === "smooth" ? (
        <div id="scroller" ref={scrollerRef} data-scrollbar className="h-[100dvh] overflow-hidden">
          <div>{children}</div>
        </div>
      ) : (
        // Native fallback: no fixed-height container; allow normal document scrolling
        <div>{children}</div>
      )}
      {/* Vertical progress bar at right edge (non-interactive) */}
      <div
        aria-hidden
        className="pointer-events-none fixed right-0 top-0 bottom-0 z-[999] w-2 bg-white/10"
      >
        <div
          className="absolute top-0 left-0 right-0 origin-top bg-cyan-300/70 shadow-[0_0_10px_rgba(34,211,238,0.35)]"
          style={{ height: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
        />
      </div>
    </>
  );
}
