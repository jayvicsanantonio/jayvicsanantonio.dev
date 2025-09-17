import { useEffect } from 'react';

import { getBrowserCapabilities } from '@/lib/utils/browserUtils';

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
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const capabilities = getBrowserCapabilities();
    let raf = 0;
    let lastY = -1;
    let lastTime = 0;
    let velocity = 0;
    let isScrolling = false;
    let scrollTimeout: number;

    const update = () => {
      const currentTime = performance.now();
      const y = window.scrollY || window.pageYOffset || 0;

      // Skip if scroll position hasn't changed
      if (y === lastY) return;

      // Calculate scroll velocity for Safari optimizations
      if (lastTime > 0) {
        const deltaY = y - lastY;
        const deltaTime = currentTime - lastTime;
        velocity = Math.abs(deltaY / deltaTime);
      }

      lastY = y;
      lastTime = currentTime;

      const vh = window.innerHeight || 1;
      const p = Math.min(y / cfg.scroll.max, 1);

      const sh = Math.min(
        Math.max((y - cfg.scroll.shutterStartPx) / cfg.scroll.shutterLengthPx, 0),
        1,
      );

      let gate = Math.min(Math.max((sh - 0.45) / 0.55, 0), 1);
      const yn = vh ? y / vh : 0;

      // NUCLEAR Safari optimization: disable all complex calculations during scroll
      let overlayUp: number;
      let cyan: number;
      let ui: number;

      if (reduceMotion) {
        overlayUp = Math.min(yn / 0.2, 1);
        gate = 0;
        cyan = 0;
        ui = 0;
      } else if (capabilities.isSafari && isScrolling) {
        // NUCLEAR: Freeze all animations during scroll - static values only
        overlayUp = 0;
        cyan = 0;
        ui = 0;
        gate = 0;
      } else if (capabilities.isSafari) {
        // Only update when scroll has completely stopped
        if (velocity > 0.1) {
          // Still some momentum - keep static
          overlayUp = yn > 0.5 ? 1 : 0;
          cyan = sh > 0.5 ? 1 : 0;
          ui = sh > 0.7 ? 1 : 0;
        } else {
          // Completely stopped - allow smooth calculations
          overlayUp = 1.4 * yn * gate;
          const CYAN_START = cfg.scroll.cyanStartT;
          const CYAN_DEN = 1 - CYAN_START;
          cyan = Math.min(Math.max((sh - CYAN_START) / CYAN_DEN, 0), 1);
          const UI_START = cfg.scroll.uiRevealStartT;
          const UI_DEN = 1 - UI_START;
          ui = Math.min(Math.max((sh - UI_START) / UI_DEN, 0), 1);
        }
      } else {
        // Full calculations for other browsers
        overlayUp = 1.4 * yn * gate;
        const CYAN_START = cfg.scroll.cyanStartT;
        const CYAN_DEN = 1 - CYAN_START;
        cyan = Math.min(Math.max((sh - CYAN_START) / CYAN_DEN, 0), 1);
        const UI_START = cfg.scroll.uiRevealStartT;
        const UI_DEN = 1 - UI_START;
        ui = Math.min(Math.max((sh - UI_START) / UI_DEN, 0), 1);
      }

      // Mark scroll state for Safari optimizations
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, capabilities.isSafari ? 50 : 150); // Faster timeout for Safari

      // NUCLEAR: Minimize DOM writes for Safari
      const props: Record<string, string> = {};

      if (capabilities.isSafari && isScrolling) {
        // NUCLEAR: Only the absolute minimum during scroll
        props['--scroll-y'] = String(y);
        props['--is-scrolling'] = '1';
        // Skip all other properties to reduce DOM thrashing
      } else if (capabilities.isSafari && velocity > 0.1) {
        // Still has momentum - minimal properties
        props['--scroll-y'] = String(y);
        props['--p'] = String(p);
        props['--is-scrolling'] = '0';
      } else {
        // Full property set for stopped Safari or other browsers
        props['--scroll-y'] = String(y);
        props['--p'] = String(p);
        props['--vh'] = String(vh);
        props['--sh'] = String(sh);
        props['--gate'] = String(gate);
        props['--overlay-up'] = String(overlayUp);
        props['--scroll-velocity'] = String(velocity.toFixed(2));
        props['--is-scrolling'] = isScrolling ? '1' : '0';
        props['--cyan'] = String(cyan);
        props['--ui'] = String(ui);
        props['--closeMaxY'] = cfg.closeMaxY;
        props['--closeMaxX'] = cfg.closeMaxX;
      }

      // Apply all properties at once
      Object.entries(props).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(update, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });

    // Initial update
    update();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
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
  ]);
}
