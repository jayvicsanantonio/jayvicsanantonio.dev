'use client'

export const CFG = {
  timings: {
    introStartDelay: 800,
    introExpansionDuration: 2000,
    reveal: {
      name: 1000,
      title: 3600,
      desc: 3200,
    },
    graceAfterExpandMs: 200,
  },
  scroll: {
    max: 1800,
    shutterStartPx: 120,
    shutterLengthPx: 900,
    cyanStartT: 0.45,
    uiRevealStartT: 0.95,
  },
  closeMaxY: '39vh',
  closeMaxX: '38vw',
  overlayUpDampen: 0.35,
  video: {
    playbackRate: 0.75,
    scale: 1.05,
    preload: 'metadata' as const,
  },
  nav: {
    centerTop: '46%',
    buttonSize: { w: 84, h: 72 },
    leftOffsetsPx: { projects: 54, linkedin: 150 },
    rightOffsetsPx: { work: 54, github: 150 },
  },
} as const
