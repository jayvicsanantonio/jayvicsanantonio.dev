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

      // Safari optimization: reduce complex calculations during fast scroll
      let overlayUp: number;
      if (reduceMotion) {
        overlayUp = Math.min(yn / 0.2, 1);
        gate = 0;
      } else if (capabilities.isSafari && velocity > 1.5) {
        // Simplified calculations during fast scroll in Safari
        overlayUp = yn * gate;
      } else {
        overlayUp = 1.4 * yn * gate;
      }

      // Mark scroll state for Safari optimizations
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 150);

      // Batch DOM writes with Safari optimizations
      const props: Record<string, string> = {
        '--scroll-y': String(y),
        '--p': String(p),
        '--vh': String(vh),
        '--sh': String(sh),
        '--gate': String(gate),
        '--overlay-up': String(overlayUp),
        '--scroll-velocity': String(velocity.toFixed(2)),
        '--is-scrolling': isScrolling ? '1' : '0',
      };

      const CYAN_START = cfg.scroll.cyanStartT;
      const CYAN_DEN = 1 - CYAN_START;
      const cyan = Math.min(Math.max((sh - CYAN_START) / CYAN_DEN, 0), 1);
      props['--cyan'] = String(cyan);

      const UI_START = cfg.scroll.uiRevealStartT;
      const UI_DEN = 1 - UI_START;
      const ui = Math.min(Math.max((sh - UI_START) / UI_DEN, 0), 1);
      props['--ui'] = String(ui);

      props['--closeMaxY'] = cfg.closeMaxY;
      props['--closeMaxX'] = cfg.closeMaxX;

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
