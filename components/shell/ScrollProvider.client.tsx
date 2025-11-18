"use client";

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode };

export default function ScrollProvider({ children }: Props) {
  const [progress, setProgress] = React.useState(0);
  const pathname = usePathname();

  const resetScrollPosition = React.useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (typeof document !== "undefined") {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

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
    if (pathname !== "/") {
      return;
    }

    const raf = requestAnimationFrame(() => {
      resetScrollPosition();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, resetScrollPosition]);

  // Native scroll progress sampler
  React.useEffect(() => {
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
  }, []);

  return (
    <>
      <div>{children}</div>

      {/* Native scroll progress bar at the right edge */}
      <div aria-hidden className="fixed right-0 top-0 bottom-0 z-[999] w-2 bg-white/10">
        <div
          className="absolute top-0 left-0 right-0 origin-top bg-cyan-300/70 shadow-[0_0_10px_rgba(34,211,238,0.35)]"
          style={{ height: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
        />
      </div>
    </>
  );
}
