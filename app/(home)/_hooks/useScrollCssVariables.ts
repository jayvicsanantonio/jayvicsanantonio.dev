import { useEffect } from "react";
import gsap from "gsap";
import type { Scrollbar as SmoothScrollbar } from "smooth-scrollbar/interfaces/scrollbar";
import type { ScrollStatus } from "smooth-scrollbar/interfaces";

export type ScrollCfg = {
  scroll: {
    max: number;
    shutterStartPx: number;
    shutterLengthPx: number;
    cyanStartT: number;
    uiRevealStartT: number;
  };
  closeMaxX: string;
  closeMaxY: string;
};

export function useScrollCssVariables<T extends HTMLElement>(
  rootRef: React.RefObject<T | null>,
  cfg: ScrollCfg,
  reduceMotion: boolean,
  options?: {
    scrollbar?: SmoothScrollbar | null;
  },
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    let lastY = -1;

    const compute = (y: number) => {
      // Skip if scroll position hasn't changed
      if (y === lastY) return;
      lastY = y;

      const vh = window.innerHeight || 1;
      const p = Math.min(y / cfg.scroll.max, 1);

      const sh = Math.min(
        Math.max((y - cfg.scroll.shutterStartPx) / cfg.scroll.shutterLengthPx, 0),
        1,
      );

      let gate = Math.min(Math.max((sh - 0.45) / 0.55, 0), 1);
      const yn = vh ? y / vh : 0;
      const overlayUp = reduceMotion ? Math.min(yn / 0.2, 1) : 1.4 * yn * gate;
      if (reduceMotion) gate = 0;

      // Batch DOM writes
      const props: Record<string, number | string> = {
        "--scroll-y": y,
        "--p": p,
        "--vh": vh,
        "--sh": sh,
        "--gate": gate,
        "--overlay-up": overlayUp,
      };

      const CYAN_START = cfg.scroll.cyanStartT;
      const CYAN_DEN = 1 - CYAN_START;
      const cyan = Math.min(Math.max((sh - CYAN_START) / CYAN_DEN, 0), 1);
      props["--cyan"] = cyan;

      const UI_START = cfg.scroll.uiRevealStartT;
      const UI_DEN = 1 - UI_START;
      const ui = Math.min(Math.max((sh - UI_START) / UI_DEN, 0), 1);
      props["--ui"] = ui;

      props["--closeMaxY"] = cfg.closeMaxY;
      props["--closeMaxX"] = cfg.closeMaxX;

      // Apply all properties via GSAP for consistent animation timing
      gsap.set(root, {
        css: props,
      });
    };

    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      const currentY = options?.scrollbar ? options.scrollbar.offset.y : window.scrollY || 0;
      resizeTimer = window.setTimeout(() => compute(currentY), 150);
    };

    const scrollbar = options?.scrollbar ?? null;
    let removeScrollListener: (() => void) | null = null;

    if (scrollbar) {
      const handleScroll = ({ offset }: ScrollStatus) => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => compute(offset.y));
      };

      scrollbar.addListener(handleScroll);
      compute(scrollbar.offset.y);

      removeScrollListener = () => {
        scrollbar.removeListener(handleScroll);
      };
    } else {
      const onScroll = () => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => compute(window.scrollY || 0));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      compute(window.scrollY || 0);

      removeScrollListener = () => {
        window.removeEventListener("scroll", onScroll);
      };
    }

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });


    return () => {
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      removeScrollListener?.();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [
    rootRef,
    cfg.scroll.max,
    cfg.scroll.shutterStartPx,
    cfg.scroll.shutterLengthPx,
    cfg.scroll.cyanStartT,
    cfg.scroll.uiRevealStartT,
    cfg.closeMaxX,
    cfg.closeMaxY,
    reduceMotion,
    options?.scrollbar,
  ]);
}
