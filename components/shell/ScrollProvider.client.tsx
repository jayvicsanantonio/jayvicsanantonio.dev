"use client";

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Toggle smooth-scrollbar while debugging other client effects (e.g., view transitions)
const ENABLE_SMOOTH_SCROLLBAR = false;

gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode };

export default function ScrollProvider({ children }: Props) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const scrollbarRef = React.useRef<any>(null);
  const modeRef = React.useRef<"native" | "smooth">("native");
  const [progress, setProgress] = React.useState(0);
  const [mode, setMode] = React.useState<"native" | "smooth">("native");

  const resetScrollPosition = React.useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (modeRef.current === "smooth" && scrollbarRef.current) {
      try {
        scrollbarRef.current.setMomentum?.(0, 0);
        scrollbarRef.current.scrollTo(0, 0, 0);
        return;
      } catch (_err) {
        // fall through to native reset if the instance is unavailable
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (typeof document !== "undefined") {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  React.useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const supportsScrollRestoration = "scrollRestoration" in window.history;
    let previousRestoration: History["scrollRestoration"] | undefined;

    if (supportsScrollRestoration) {
      previousRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
    }

    const handleBeforeUnload = () => {
      resetScrollPosition();
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        resetScrollPosition();
      }
    };

    resetScrollPosition();
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pageshow", handlePageShow);
      if (supportsScrollRestoration && typeof previousRestoration !== "undefined") {
        window.history.scrollRestoration = previousRestoration;
      }
    };
  }, [resetScrollPosition]);

  React.useEffect(() => {
    resetScrollPosition();
  }, [mode, resetScrollPosition]);

  React.useEffect(() => {
    const prefersReduced = typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true
      : false;

    if (!ENABLE_SMOOTH_SCROLLBAR || prefersReduced) {
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

        scrollbarRef.current = scrollbar;
        scrollbar.scrollTo(0, 0, 0);

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
      scrollbarRef.current = null;
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
      <div
        id="scroller"
        ref={scrollerRef}
        data-scrollbar={mode === "smooth" ? "" : undefined}
        className={mode === "smooth" ? "h-[100dvh] overflow-hidden" : undefined}
      >
        <div>{children}</div>
      </div>

      {mode === "native" && (
        // Native fallback progress bar at the right edge
        <div aria-hidden className="fixed right-0 top-0 bottom-0 z-[999] w-2 bg-white/10">
          <div
            className="absolute top-0 left-0 right-0 origin-top bg-cyan-300/70 shadow-[0_0_10px_rgba(34,211,238,0.35)]"
            style={{ height: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
          />
        </div>
      )}
    </>
  );
}
