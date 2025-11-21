/**
 * Animation timing constants for hero section animations.
 *
 * This file contains all timing-related values used in the hero intro and scroll animations.
 * Values are organized by animation phase and grouped logically for maintainability.
 *
 * All durations are in seconds unless otherwise noted.
 */

/**
 * Timing values for the hero intro animation sequence.
 *
 * The intro animation plays on page load and includes:
 * - Initial delay before animation starts
 * - Pill expansion and morphing
 * - Content fade transitions
 * - Profile and video reveals
 * - Label (nameplate/designation) animations
 */
export const INTRO_TIMING = {
  /** Initial delay before intro animation begins (seconds) */
  DELAY: 1,

  /** Duration of pill expansion to full size (seconds) */
  PILL_EXPAND_DURATION: 2,

  /** Duration of pill border radius rounding (seconds) */
  PILL_ROUND_DURATION: 0.8,

  /** Duration of pill content fade out (seconds) */
  CONTENT_FADE_DURATION: 0.45,

  /** Duration of profile image fade in (seconds) */
  PROFILE_FADE_DURATION: 0.6,

  /** Duration of video fade in (seconds) */
  VIDEO_FADE_DURATION: 0.8,

  /** Duration of video overlay fade in (seconds) */
  OVERLAY_FADE_DURATION: 0.6,

  /** Duration of pill background color fade (seconds) */
  PILL_BACKGROUND_FADE_DURATION: 0.8,

  /** Duration of label (nameplate/designation) fade in (seconds) */
  LABEL_FADE_DURATION: 0.65,

  /** Stagger delay between label animations (seconds) */
  LABEL_STAGGER: 0.08,

  /** Delay offset for label reveal relative to timeline (seconds) */
  LABEL_REVEAL_OFFSET: 0.05,
} as const;

/**
 * Timing values for scroll-triggered animations.
 *
 * These animations are driven by scroll position and include:
 * - Pill shrinking to navigation button
 * - Video fade out
 * - Navigation row reveal
 * - Border and styling transitions
 */
export const SCROLL_TIMING = {
  /** Scrub smoothing factor for scroll-driven animations (0 = instant, 1 = 1 second lag) */
  SCRUB_SMOOTHING: 0.6,

  /** Duration of navigation row fade in (seconds) */
  NAV_FADE_DURATION: 0.45,

  /** Duration of pill border appearance (seconds) */
  PILL_BORDER_DURATION: 0.25,

  /** Duration of pill content color/shadow transition (seconds) */
  PILL_CONTENT_DURATION: 0.35,

  /** Duration of pill content fade in (seconds) */
  PILL_CONTENT_FADE_DURATION: 0.4,

  /** Duration of pill skin fade in (seconds) */
  PILL_SKIN_FADE_DURATION: 0.4,

  /** Duration of video overlay fade transition during scroll (seconds) */
  OVERLAY_FADE_DURATION: 0.4,

  /** Duration of video fade out (seconds) */
  VIDEO_FADE_OUT_DURATION: 0.35,

  /** Duration of pill snap animation when aligning to nav (seconds) */
  PILL_SNAP_DURATION: 0.3,

  /** Navigation row vertical offset animation start position (seconds) */
  NAV_ROW_START_OFFSET: 0.55,

  /** Scrub smoothing for label exit timeline (boolean: true = smooth scroll-linked) */
  LABEL_EXIT_SCRUB: true,

  /** Scrub smoothing for cover fill scale animation (boolean: true = smooth scroll-linked) */
  COVER_FILL_SCRUB: true,

  /** Scrub smoothing for cover content parallax (boolean: true = smooth scroll-linked) */
  COVER_CONTENT_SCRUB: true,

  /** Scrub smoothing for skills entrance animation (boolean: true = smooth scroll-linked) */
  SKILLS_ENTRANCE_SCRUB: true,
} as const;

/**
 * Overlay opacity values for different animation states.
 *
 * These values control the video overlay opacity during various animation phases.
 */
export const OVERLAY_OPACITY = {
  /** Initial overlay opacity during intro animation (0-1 range) */
  INITIAL: 0.55,

  /** Peak overlay opacity during scroll animation (0-1 range) */
  PEAK: 0.85,
} as const;

/**
 * Timing values for skills section entrance animation.
 *
 * The skills section animates in as the user scrolls, with staggered reveals
 * for heading and skill rows.
 */
export const SKILLS_TIMING = {
  /** Duration of skills heading fade/scale animation (seconds) */
  HEADING_DURATION: 0.6,

  /** Stagger delay between skill row animations (seconds) */
  ROW_STAGGER: 0.12,

  /** Delay before "below" rows start animating (seconds) */
  BELOW_DELAY: 0.25,

  /** Delay offset for heading animation (seconds) */
  HEADING_DELAY: 0.12,
} as const;

/**
 * Scroll progress thresholds and tolerances.
 *
 * These values control when certain animations trigger or how precisely
 * elements need to align during scroll-driven animations.
 */
export const SCROLL_THRESHOLDS = {
  /** Minimum scroll progress before pill alignment begins (0-1 range) */
  MIN_ALIGNMENT_PROGRESS: 0.05,

  /** Tolerance for pill position changes before re-snapping (pixels) */
  PILL_POSITION_TOLERANCE: 0.5,
} as const;

/**
 * ScrollTrigger start and end positions for scroll-driven animations.
 *
 * These values define when scroll-triggered animations begin and end
 * relative to the viewport and trigger elements.
 */
export const SCROLL_TRIGGER_POSITIONS = {
  /** Skills section animation trigger start position */
  SKILLS_START: "top 80%",

  /** Skills section animation trigger end position */
  SKILLS_END: "bottom center",

  /** Cover section fill animation start position */
  COVER_FILL_START: "top bottom",

  /** Cover section fill animation end position */
  COVER_FILL_END: "top top",

  /** Cover content parallax start position */
  COVER_CONTENT_START: "top top",
} as const;

/**
 * Initial Y-percent values for label animations.
 *
 * These values control the starting position of labels before they animate in.
 */
export const LABEL_INITIAL_STATE = {
  /** Initial Y-percent offset for labels during intro (percent) */
  Y_PERCENT: 35,
} as const;

/**
 * Navigation row initial state values.
 */
export const NAV_INITIAL_STATE = {
  /** Initial Y-percent offset for navigation row (percent) */
  Y_PERCENT: 18,
} as const;

/**
 * Skills section initial state values for animations.
 */
export const SKILLS_INITIAL_STATE = {
  /** Initial Y-percent offset for heading (percent) */
  HEADING_Y_PERCENT: 12,

  /** Initial scale for heading (0-1 range) */
  HEADING_SCALE: 0.88,

  /** Initial X-percent offset for "above" rows (percent) */
  ABOVE_X_PERCENT: 18,

  /** Initial X-percent offset for "below" rows (percent) */
  BELOW_X_PERCENT: -18,
} as const;

/**
 * Cover section animation timing values.
 */
export const COVER_TIMING = {
  /** Scroll distance multiplier for cover content parallax (viewport heights) */
  PARALLAX_DISTANCE: 0.9,

  /** Y-percent range for cover label parallax (percent) */
  LABEL_Y_RANGE: { from: -12, to: 12 },

  /** Y-percent range for cover body parallax (percent) */
  BODY_Y_RANGE: { from: 12, to: -12 },
} as const;
