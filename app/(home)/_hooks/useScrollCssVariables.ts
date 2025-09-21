import { useEffect } from 'react'

export type ScrollCfg = {
  scroll: {
    max: number
    shutterStartPx: number
    shutterLengthPx: number
    cyanStartT: number
    uiRevealStartT: number
  }
  closeMaxX: string
  closeMaxY: string
}

export function useScrollCssVariables<T extends HTMLElement>(
  rootRef: React.RefObject<T | null>,
  cfg: ScrollCfg,
  reduceMotion: boolean,
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let raf = 0
    let lastY = -1

    const update = () => {
      const y = window.scrollY || window.pageYOffset || 0

      // Skip if scroll position hasn't changed
      if (y === lastY) return
      lastY = y

      const vh = window.innerHeight || 1
      const p = Math.min(y / cfg.scroll.max, 1)

      const sh = Math.min(
        Math.max((y - cfg.scroll.shutterStartPx) / cfg.scroll.shutterLengthPx, 0),
        1,
      )

      let gate = Math.min(Math.max((sh - 0.45) / 0.55, 0), 1)
      const yn = vh ? y / vh : 0
      const overlayUp = reduceMotion ? Math.min(yn / 0.2, 1) : 1.4 * yn * gate
      if (reduceMotion) gate = 0

      // Batch DOM writes
      const props: Record<string, string> = {
        '--scroll-y': String(y),
        '--p': String(p),
        '--vh': String(vh),
        '--sh': String(sh),
        '--gate': String(gate),
        '--overlay-up': String(overlayUp),
      }

      const CYAN_START = cfg.scroll.cyanStartT
      const CYAN_DEN = 1 - CYAN_START
      const cyan = Math.min(Math.max((sh - CYAN_START) / CYAN_DEN, 0), 1)
      props['--cyan'] = String(cyan)

      const UI_START = cfg.scroll.uiRevealStartT
      const UI_DEN = 1 - UI_START
      const ui = Math.min(Math.max((sh - UI_START) / UI_DEN, 0), 1)
      props['--ui'] = String(ui)

      props['--closeMaxY'] = cfg.closeMaxY
      props['--closeMaxX'] = cfg.closeMaxX

      // Apply all properties at once
      Object.entries(props).forEach(([key, value]) => {
        root.style.setProperty(key, value)
      })
    }

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    let resizeTimer: number
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(update, 150)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('orientationchange', onResize, { passive: true })

    // Initial update
    update()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
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
  ])
}
