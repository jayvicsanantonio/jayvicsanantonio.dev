import { useEffect } from 'react';

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

export function useScrollCssVariables(
  rootRef: React.RefObject<HTMLElement>,
  cfg: ScrollCfg,
  reduceMotion: boolean
) {
  useEffect(() => {
    const root = rootRef.current as HTMLElement | null;
    if (!root) return;

    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      const vh = window.innerHeight || 1;
      const p = Math.min(y / cfg.scroll.max, 1);

      const sh = Math.min(
        Math.max((y - cfg.scroll.shutterStartPx) / cfg.scroll.shutterLengthPx, 0),
        1
      );

      let gate = Math.min(Math.max((sh - 0.45) / 0.55, 0), 1);
      const yn = vh ? y / vh : 0;
      const overlayUp = reduceMotion ? Math.min(yn / 0.2, 1) : 1.4 * yn * gate;
      if (reduceMotion) gate = 0;

      root.style.setProperty('--scroll-y', String(y));
      root.style.setProperty('--p', String(p));
      root.style.setProperty('--vh', String(vh));
      root.style.setProperty('--sh', String(sh));
      root.style.setProperty('--gate', String(gate));
      root.style.setProperty('--overlay-up', String(overlayUp));

      const CYAN_START = cfg.scroll.cyanStartT;
      const CYAN_DEN = 1 - CYAN_START;
      const cyan = Math.min(Math.max((sh - CYAN_START) / CYAN_DEN, 0), 1);
      root.style.setProperty('--cyan', String(cyan));

      const UI_START = cfg.scroll.uiRevealStartT;
      const UI_DEN = 1 - UI_START;
      const ui = Math.min(Math.max((sh - UI_START) / UI_DEN, 0), 1);
      root.style.setProperty('--ui', String(ui));

      root.style.setProperty('--closeMaxY', cfg.closeMaxY);
      root.style.setProperty('--closeMaxX', cfg.closeMaxX);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };
    const onResize = () => update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    update();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [rootRef, cfg.scroll.max, cfg.scroll.shutterStartPx, cfg.scroll.shutterLengthPx, cfg.scroll.cyanStartT, cfg.scroll.uiRevealStartT, cfg.closeMaxX, cfg.closeMaxY, reduceMotion]);
}

