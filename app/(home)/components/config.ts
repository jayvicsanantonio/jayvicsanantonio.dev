"use client";

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
  closeMaxY: "39vh",
  closeMaxX: "38vw",
  overlayUpDampen: 0.35,
  video: {
    playbackRate: 0.75,
    scale: 1.05,
    preload: "metadata" as const,
  },
  nav: {
    centerTop: "46%",
    buttonSize: { w: 82, h: 64 },
    leftOffsetsPx: { projects: 54, linkedin: 150 },
    rightOffsetsPx: { work: 54, github: 150 },
  },
} as const;

// --- From hero-animation-timing.ts ---

/**
 * Timing values for the hero intro animation sequence.
 */
export const INTRO_TIMING = {
  DELAY: 1,
  PILL_EXPAND_DURATION: 2,
  PILL_ROUND_DURATION: 0.8,
  CONTENT_FADE_DURATION: 0.45,
  PROFILE_FADE_DURATION: 0.6,
  VIDEO_FADE_DURATION: 0.8,
  OVERLAY_FADE_DURATION: 0.6,
  PILL_BACKGROUND_FADE_DURATION: 0.8,
  LABEL_FADE_DURATION: 0.65,
  LABEL_STAGGER: 0.08,
  LABEL_REVEAL_OFFSET: 0.05,
} as const;

/**
 * Timing values for scroll-triggered animations.
 */
export const SCROLL_TIMING = {
  SCRUB_SMOOTHING: 0.6,
  NAV_FADE_DURATION: 0.45,
  PILL_BORDER_DURATION: 0.25,
  PILL_CONTENT_DURATION: 0.35,
  PILL_CONTENT_FADE_DURATION: 0.4,
  PILL_SKIN_FADE_DURATION: 0.4,
  OVERLAY_FADE_DURATION: 0.4,
  VIDEO_FADE_OUT_DURATION: 0.35,
  PILL_SNAP_DURATION: 0.3,
  NAV_ROW_START_OFFSET: 0.55,
  LABEL_EXIT_SCRUB: true,
  COVER_FILL_SCRUB: true,
  COVER_CONTENT_SCRUB: true,
  SKILLS_ENTRANCE_SCRUB: true,
} as const;

/**
 * Overlay opacity values for different animation states.
 */
export const OVERLAY_OPACITY = {
  INITIAL: 0.55,
  PEAK: 0.85,
} as const;

/**
 * Timing values for skills section entrance animation.
 */
export const SKILLS_TIMING = {
  HEADING_DURATION: 0.6,
  ROWS_FADE_DURATION: 0.8,
  BELOW_DELAY: 0.3,
  HEADING_DELAY: 0.12,
} as const;

/**
 * Scroll progress thresholds and tolerances.
 */
export const SCROLL_THRESHOLDS = {
  MIN_ALIGNMENT_PROGRESS: 0.05,
  PILL_POSITION_TOLERANCE: 0.5,
} as const;

/**
 * ScrollTrigger start and end positions for scroll-driven animations.
 */
export const SCROLL_TRIGGER_POSITIONS = {
  SKILLS_START: "top 40%",
  SKILLS_END: "center center",
  COVER_FILL_START: "top bottom",
  COVER_FILL_END: "top top",
  COVER_CONTENT_START: "top top",
} as const;

/**
 * Initial Y-percent values for label animations.
 */
export const LABEL_INITIAL_STATE = {
  Y_PERCENT: 35,
} as const;

/**
 * Navigation row initial state values.
 */
export const NAV_INITIAL_STATE = {
  Y_PERCENT: 18,
} as const;

/**
 * Skills section initial state values for animations.
 */
export const SKILLS_INITIAL_STATE = {
  HEADING_Y_PERCENT: 12,
  HEADING_SCALE: 0.88,
  ABOVE_X_PERCENT: 18,
  BELOW_X_PERCENT: -18,
} as const;

/**
 * Cover section animation timing values.
 */
export const COVER_TIMING = {
  PARALLAX_DISTANCE: 0.9,
  LABEL_Y_RANGE: { from: -12, to: 12 },
  BODY_Y_RANGE: { from: 12, to: -12 },
} as const;

// --- From hero.constants.ts ---

import type { CSSProperties } from "react";

export const PANEL_BORDER_RADIUS = "32px";
export const PILL_SHRINK_BOX_SHADOW =
  "0 18px 36px rgba(1,11,26,0.62), 0 0 26px rgba(34,211,238,0.38), 0 0 0 1px rgba(34,211,238,0.35)";
export const PILL_SHRINK_BACKGROUND =
  "linear-gradient(145deg, rgba(7,24,45,0.96), rgba(3,11,24,0.94))";
export const PILL_SHRINK_BORDER = "rgba(59,201,255,0.78)";
export const VIDEO_WATERMARK_MASK =
  "radial-gradient(ellipse at 94% 88%, rgba(1,5,11,0.92) 0%, rgba(1,5,11,0.86) 18%, rgba(1,5,11,0.72) 34%, rgba(1,5,11,0.52) 52%, rgba(1,5,11,0.16) 70%, rgba(1,5,11,0) 86%)";
export const VIDEO_OVERLAY_BACKGROUND = [
  "radial-gradient(ellipse at 92% 88%, rgba(1,4,12,0.88) 0%, rgba(1,4,12,0.82) 22%, rgba(1,4,12,0.68) 38%, rgba(1,4,12,0.48) 55%, rgba(1,4,12,0) 78%)",
  "radial-gradient(ellipse at 50% 50%, rgba(1,4,12,0) 46%, rgba(1,4,12,0.55) 76%, rgba(1,4,12,0.78) 100%)",
  "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.45), transparent 45%)",
  "radial-gradient(circle at 80% 30%, rgba(59,130,246,0.35), transparent 40%)",
  "linear-gradient(180deg, rgba(6,16,35,0.25), rgba(1,5,11,0.75))",
].join(",");
export const PROFILE_DROP_SHADOW =
  "drop-shadow(0 24px 36px rgba(0,0,0,0.55)) drop-shadow(0 0 20px rgba(34,211,238,0.45))";
export const HERO_SCROLL_DISTANCE = 1;
export const LABEL_EXIT_Y_PERCENT = -185;
export const LABEL_EXIT_SCROLL_DISTANCE = 0.5;
export const PROFILE_BASE_Z_INDEX = 1;
export const PROFILE_COVER_Z_INDEX = 0;

export const FINAL_GEOMETRY_STATE = {
  width: "100%",
  height: "100%",
  left: "50%",
  top: "50%",
  xPercent: -50,
  yPercent: -50,
};

export const FINAL_PANEL_STATE = {
  ...FINAL_GEOMETRY_STATE,
  borderRadius: PANEL_BORDER_RADIUS,
};

export const INITIAL_NAV_ROW_STYLE: CSSProperties = {
  visibility: "hidden",
};

export const SCROLL_SMOOTHER_CONFIG = {
  smooth: 1.2,
  smoothTouch: 0.12,
  effects: true,
  normalizeScroll: true,
  ignoreMobileResize: true,
};

export const PROFILE_SCROLL_CONFIG = {
  scale: 0.55,
  transformOrigin: "50% 100%",
  ease: "none" as const,
};
