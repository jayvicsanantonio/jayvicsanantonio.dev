/**
 * Hero Animation Helper Functions
 *
 * This module contains pure helper functions for creating GSAP animations
 * used in the hero section. These functions are extracted from the main
 * animation hooks to improve maintainability and testability.
 *
 * All functions are pure (no side effects) and return either animation
 * instances or cleanup functions.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FINAL_PANEL_STATE,
  HERO_SCROLL_DISTANCE,
  LABEL_EXIT_SCROLL_DISTANCE,
  LABEL_EXIT_Y_PERCENT,
  PILL_SHRINK_BACKGROUND,
  PILL_SHRINK_BORDER,
  PILL_SHRINK_BOX_SHADOW,
  PROFILE_BASE_Z_INDEX,
  PROFILE_COVER_Z_INDEX,
  PROFILE_SCROLL_CONFIG,
} from "../components/Hero/hero.constants";
import {
  SCROLL_THRESHOLDS,
  SCROLL_TIMING,
  SKILLS_TIMING,
  SCROLL_TRIGGER_POSITIONS,
  NAV_INITIAL_STATE,
  SKILLS_INITIAL_STATE,
  COVER_TIMING,
  OVERLAY_OPACITY,
} from "../components/Hero/hero-animation-timing";
import { CFG } from "../components/config";

// ============================================================================
// Type Definitions
// ============================================================================

export type ReducedMotionArgs = {
  pill: HTMLDivElement;
  pillContent: HTMLDivElement;
  video: HTMLVideoElement;
  overlay: HTMLDivElement | null;
  pillSkin: HTMLDivElement | null;
  profile: HTMLDivElement | null;
  navRow: HTMLDivElement | null;
  nameplate: HTMLDivElement | null;
  designation: HTMLDivElement | null;
};

export type NavMeasurementArgs = {
  navRow: HTMLDivElement;
  pill: HTMLDivElement;
  navSpacerEl: HTMLDivElement | null;
  firstNavButton: HTMLElement | null;
};

export type NavMeasurementHelpers = {
  getTargetPillWidth: () => number;
  getTargetPillHeight: () => number;
  getNavRowYOffset: () => number;
  getPillCenterOffset: () => { x: number; y: number };
};

export type SkillsEntranceArgs = {
  section: HTMLElement | null;
  rowsAbove?: Array<HTMLDivElement | null>;
  rowsBelow?: Array<HTMLDivElement | null>;
  heading?: HTMLHeadingElement | null;
};

export type PillShrinkTimelineArgs = NavMeasurementHelpers & {
  heroSection: HTMLDivElement;
  navRow: HTMLDivElement;
  pill: HTMLDivElement;
  pillContent: HTMLDivElement;
  pillSkin: HTMLDivElement | null;
  video: HTMLVideoElement;
  overlay: HTMLDivElement | null;
};

export type PillShrinkTimelineResult = {
  timeline: gsap.core.Timeline;
  cleanup: () => void;
};

export type LabelExitTimelineArgs = {
  heroSection: HTMLDivElement;
  nameplate: HTMLDivElement | null;
  designation: HTMLDivElement | null;
};

export type CoverAnimationArgs = {
  profile: HTMLDivElement | null;
  coverSection: HTMLDivElement | null;
  coverFill: HTMLDivElement | null;
  coverLabel: HTMLDivElement | null;
  coverBody: HTMLDivElement | null;
};

// ============================================================================
// Reduced Motion Helpers
// ============================================================================

/**
 * Applies the final animation state immediately for users who prefer reduced motion.
 *
 * Sets all elements to their post-animation state without any transitions,
 * ensuring accessibility compliance while maintaining visual design.
 *
 * @param args - Collection of element refs to set to final state
 *
 * @example
 * ```typescript
 * applyReducedMotionState({
 *   pill,
 *   pillContent,
 *   video,
 *   overlay,
 *   pillSkin,
 *   profile,
 *   navRow,
 *   nameplate,
 *   designation,
 * });
 * ```
 */
export function applyReducedMotionState({
  pill,
  pillContent,
  video,
  overlay,
  pillSkin,
  profile,
  navRow,
  nameplate,
  designation,
}: ReducedMotionArgs): void {
  gsap.set(pill, {
    ...FINAL_PANEL_STATE,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: PILL_SHRINK_BORDER,
    boxShadow: PILL_SHRINK_BOX_SHADOW,
  });
  gsap.set(pillContent, { autoAlpha: 0 });
  gsap.set(video, { autoAlpha: 1 });

  if (overlay) {
    gsap.set(overlay, { autoAlpha: OVERLAY_OPACITY.INITIAL });
  }

  if (pillSkin) {
    gsap.set(pillSkin, { autoAlpha: 0 });
  }

  if (profile) {
    gsap.set(profile, { autoAlpha: 1, yPercent: 0 });
  }

  if (navRow) {
    gsap.set(navRow, { autoAlpha: 1 });
  }

  if (nameplate) {
    gsap.set(nameplate, { autoAlpha: 1, yPercent: 0 });
  }

  if (designation) {
    gsap.set(designation, { autoAlpha: 1, yPercent: 0 });
  }
}

// ============================================================================
// Navigation Measurement Helpers
// ============================================================================

/**
 * Calculates the vertical offset needed to center the navigation row within the pill.
 *
 * This helper computes the Y-offset required to vertically center the navigation
 * row inside the pill container, accounting for their respective heights.
 *
 * @param navRow - The navigation row element
 * @param pill - The pill container element
 * @param targetPillHeight - Optional target height (uses measured height if not provided)
 * @returns Vertical offset in pixels to center nav within pill
 *
 * @example
 * ```typescript
 * const offset = calculateNavYOffset(navRowElement, pillElement);
 * gsap.to(navRow, { y: offset });
 * ```
 */
export function calculateNavYOffset(
  navRow: HTMLDivElement,
  pill: HTMLDivElement,
  targetPillHeight?: number,
): number {
  const measuredPillHeight = pill.getBoundingClientRect().height || pill.offsetHeight || 0;
  const pillHeight = typeof targetPillHeight === "number" ? targetPillHeight : measuredPillHeight;
  const navHeight = navRow.getBoundingClientRect().height || navRow.offsetHeight || 0;
  if (!navHeight || !pillHeight) {
    return 0;
  }
  // Calculate vertical centering: (container_height - content_height) / 2.
  // This positions the nav row exactly in the middle of the pill container.
  return (pillHeight - navHeight) / 2;
}

/**
 * Creates helper functions for measuring and calculating pill-to-nav alignment.
 *
 * These helpers dynamically measure DOM elements to calculate the target dimensions
 * and positions for the pill shrink animation, ensuring the pill morphs precisely
 * to match the navigation row layout.
 *
 * The returned helpers are designed to be called during animation updates to handle
 * responsive layout changes.
 *
 * @param args - Navigation and pill element references
 * @returns Object containing measurement helper functions
 *
 * @example
 * ```typescript
 * const helpers = createNavMeasurementHelpers({
 *   navRow,
 *   pill,
 *   navSpacerEl,
 *   firstNavButton,
 * });
 *
 * // Use in animation
 * gsap.to(pill, {
 *   width: helpers.getTargetPillWidth(),
 *   height: helpers.getTargetPillHeight(),
 * });
 * ```
 */
export function createNavMeasurementHelpers({
  navRow,
  pill,
  navSpacerEl,
  firstNavButton,
}: NavMeasurementArgs): NavMeasurementHelpers {
  const getTargetPillWidth = () => {
    const spacerWidth = navSpacerEl?.getBoundingClientRect().width ?? 0;
    if (spacerWidth > 0) {
      return spacerWidth;
    }
    // Fallback calculation when spacer element is missing or has no width:
    // Use 35% of nav width OR minimum of 3 button widths, whichever is larger.
    // This ensures the pill is wide enough to contain nav buttons gracefully.
    const navWidth = navRow.getBoundingClientRect().width;
    return Math.max(navWidth * 0.35, CFG.nav.buttonSize.w * 3);
  };

  const getTargetPillHeight = () => {
    const candidate =
      firstNavButton?.getBoundingClientRect().height ?? navRow.getBoundingClientRect().height;
    if (candidate && candidate > 0) {
      return candidate;
    }
    return CFG.nav.buttonSize.h;
  };

  const getTargetCenter = () => {
    const spacerRect = navSpacerEl?.getBoundingClientRect();
    const buttonRect = firstNavButton?.getBoundingClientRect();
    const navRect = navRow.getBoundingClientRect();
    const xCenter = spacerRect
      ? spacerRect.left + spacerRect.width / 2
      : navRect.left + navRect.width / 2;
    const yCenter = buttonRect
      ? buttonRect.top + buttonRect.height / 2
      : navRect.top + navRect.height / 2;
    return { x: xCenter, y: yCenter };
  };

  const getNavRowYOffset = () => calculateNavYOffset(navRow, pill, getTargetPillHeight());

  const getPillCenterOffset = () => {
    const pr = pill.getBoundingClientRect();
    const target = getTargetCenter();
    // Calculate offset needed to move pill center to target position.
    // Formula: target_position - current_center_position.
    // For X: target.x - (pill.left + pill.width/2).
    // For Y: target.y + nav_offset - (pill.top + pill.height/2).
    // The nav offset accounts for vertical centering of nav within the pill.
    return {
      x: target.x - (pr.left + pr.width / 2),
      y: target.y + getNavRowYOffset() - (pr.top + pr.height / 2),
    };
  };

  return {
    getTargetPillWidth,
    getTargetPillHeight,
    getNavRowYOffset,
    getPillCenterOffset,
  };
}

// ============================================================================
// Skills Section Animation
// ============================================================================

/**
 * Creates a scroll-triggered entrance animation for the skills section.
 *
 * Animates skill rows with synchronized group reveals - all rows above the heading
 * fade in together, followed by all rows below the heading fading in together.
 * The heading also fades in with a scale effect. The animation is scroll-scrubbed
 * for smooth, controlled playback.
 *
 * @param args - Skills section elements to animate
 * @returns Cleanup function to kill the animation timeline
 *
 * @example
 * ```typescript
 * const cleanup = createSkillsEntranceAnimation({
 *   section: skillsSectionRef.current,
 *   rowsAbove: skillsRowsAboveRefs.current,
 *   rowsBelow: skillsRowsBelowRefs.current,
 *   heading: skillsHeadingRef.current,
 * });
 *
 * // Later, on cleanup
 * cleanup();
 * ```
 */
export function createSkillsEntranceAnimation({
  section,
  rowsAbove = [],
  rowsBelow = [],
  heading,
}: SkillsEntranceArgs): () => void {
  if (!section) {
    return () => {};
  }

  const aboveEls = rowsAbove.filter((row): row is HTMLDivElement => Boolean(row));
  const belowEls = rowsBelow.filter((row): row is HTMLDivElement => Boolean(row));
  const headingEl = heading ?? null;

  if (!aboveEls.length && !belowEls.length && !headingEl) {
    return () => {};
  }

  const timeline = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: section,
      start: SCROLL_TRIGGER_POSITIONS.SKILLS_START,
      end: SCROLL_TRIGGER_POSITIONS.SKILLS_END,
      scrub: SCROLL_TIMING.SKILLS_ENTRANCE_SCRUB,
    },
  });

  if (headingEl) {
    // Set transform origin to center (50% horizontal, 50% vertical).
    // This makes the scale animation expand from the center point.
    gsap.set(headingEl, { transformOrigin: "50% 50%" });
    timeline.fromTo(
      headingEl,
      {
        autoAlpha: 0,
        yPercent: SKILLS_INITIAL_STATE.HEADING_Y_PERCENT,
        scale: SKILLS_INITIAL_STATE.HEADING_SCALE,
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        scale: 1,
        duration: SKILLS_TIMING.HEADING_DURATION,
      },
      SKILLS_TIMING.HEADING_DELAY,
    );
  }

  // Animate all "above" rows simultaneously entering from right to left
  if (aboveEls.length) {
    // Set initial state: invisible and offset to the right
    gsap.set(aboveEls, { autoAlpha: 0, xPercent: SKILLS_INITIAL_STATE.ABOVE_X_PERCENT });

    timeline.to(
      aboveEls,
      {
        autoAlpha: 1,
        xPercent: 0,
        duration: SKILLS_TIMING.ROWS_FADE_DURATION,
        ease: "power2.out",
      },
      0, // Start at the beginning of the timeline
    );
  }

  // Animate all "below" rows simultaneously entering from left to right
  if (belowEls.length) {
    // Set initial state: invisible and offset to the left
    gsap.set(belowEls, { autoAlpha: 0, xPercent: SKILLS_INITIAL_STATE.BELOW_X_PERCENT });

    timeline.to(
      belowEls,
      {
        autoAlpha: 1,
        xPercent: 0,
        duration: SKILLS_TIMING.ROWS_FADE_DURATION,
        ease: "power2.out",
      },
      aboveEls.length ? SKILLS_TIMING.BELOW_DELAY : 0, // Delay after above rows complete
    );
  }

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };
}

// ============================================================================
// Pill Shrink Animation
// ============================================================================

/**
 * Creates the main pill shrink animation that morphs the hero panel into a navigation button.
 *
 * This complex timeline coordinates multiple effects:
 * - Pill dimensions shrink to match nav button size
 * - Pill repositions to align with navigation row
 * - Video and overlay fade out
 * - Pill content (text) fades in
 * - Border and shadow effects appear
 * - Navigation row fades in
 *
 * The animation is scroll-driven with slight smoothing for elegant motion.
 * It also includes a snap mechanism to keep the pill aligned with the nav
 * row during resize events.
 *
 * @param args - Elements and measurement helpers for the animation
 * @returns Timeline and cleanup function
 *
 * @example
 * ```typescript
 * const { timeline, cleanup } = createPillShrinkTimeline({
 *   heroSection,
 *   navRow,
 *   pill,
 *   pillContent,
 *   pillSkin,
 *   video,
 *   overlay,
 *   ...measurementHelpers,
 * });
 *
 * // Later, on cleanup
 * cleanup();
 * ```
 */
export function createPillShrinkTimeline({
  heroSection,
  navRow,
  pill,
  pillContent,
  pillSkin,
  video,
  overlay,
  getTargetPillWidth,
  getTargetPillHeight,
  getNavRowYOffset,
  getPillCenterOffset,
}: PillShrinkTimelineArgs): PillShrinkTimelineResult {
  const pillShrinkCompleteLabel = "pillShrinkComplete";
  gsap.set(pill, { borderWidth: 0, borderColor: "transparent" });

  let pillSnapTween: gsap.core.Tween | null = null;
  let videoShrinkTimeline: gsap.core.Timeline;
  let lastTargetOffset: { x: number; y: number } | null = null;

  const syncPillToNavRow = () => {
    if (!videoShrinkTimeline) {
      return;
    }
    const trigger = videoShrinkTimeline.scrollTrigger;
    if (!trigger) {
      return;
    }
    // Skip alignment if animation hasn't started (progress < 5%) and isn't currently active.
    // This prevents unnecessary calculations before the scroll animation begins.
    if (trigger.progress < SCROLL_THRESHOLDS.MIN_ALIGNMENT_PROGRESS && !trigger.isActive) {
      lastTargetOffset = null;
      return;
    }
    const offset = getPillCenterOffset();
    // Optimization: skip re-alignment if position change is negligible (< 0.5px).
    // This prevents excessive tweens during minor layout shifts or rounding errors.
    if (
      lastTargetOffset &&
      Math.abs(offset.x - lastTargetOffset.x) < SCROLL_THRESHOLDS.PILL_POSITION_TOLERANCE &&
      Math.abs(offset.y - lastTargetOffset.y) < SCROLL_THRESHOLDS.PILL_POSITION_TOLERANCE
    ) {
      return;
    }
    lastTargetOffset = offset;
    pillSnapTween?.kill();
    // Animate pill position to match nav row (instant if not actively scrolling).
    pillSnapTween = gsap.to(pill, {
      x: offset.x,
      y: offset.y,
      duration: trigger.isActive ? SCROLL_TIMING.PILL_SNAP_DURATION : 0,
      ease: "power2.out",
    });
  };

  videoShrinkTimeline = gsap
    .timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        // End position: exactly one viewport height of scrolling.
        // This gives the pill shrink animation a full viewport to complete.
        end: () => "+=" + window.innerHeight,
        scrub: SCROLL_TIMING.SCRUB_SMOOTHING,
        onEnter: () => {
          // Set transform origin to center for both pill and video.
          // This ensures scale/position animations transform from the center point.
          // Must be set on both enter and enterBack to handle bidirectional scrolling.
          gsap.set([pill, video], { transformOrigin: "50% 50%" });
        },
        onEnterBack: () => {
          // Re-apply transform origin when scrolling back up.
          gsap.set([pill, video], { transformOrigin: "50% 50%" });
        },
        invalidateOnRefresh: true,
        onUpdate: () => syncPillToNavRow(),
        onRefresh: () => syncPillToNavRow(),
      },
    })
    .to(
      pill,
      {
        width: () => `${getTargetPillWidth()}px`,
        height: () => `${getTargetPillHeight()}px`,
        x: () => getPillCenterOffset().x,
        y: () => getPillCenterOffset().y,
        borderRadius: "384px",
        backgroundColor: PILL_SHRINK_BACKGROUND,
        ease: "none",
        force3D: true,
      },
      0,
    )
    .addLabel(pillShrinkCompleteLabel)
    .to(
      pill,
      {
        borderWidth: 1,
        borderColor: PILL_SHRINK_BORDER,
        boxShadow: PILL_SHRINK_BOX_SHADOW,
        duration: SCROLL_TIMING.PILL_BORDER_DURATION,
        ease: "power1.out",
      },
      pillShrinkCompleteLabel,
    )
    .to(
      pillContent,
      {
        color: "#ffffff",
        textShadow: "0 6px 18px rgba(0,0,0,0.55)",
        duration: SCROLL_TIMING.PILL_CONTENT_DURATION,
        ease: "power1.out",
      },
      pillShrinkCompleteLabel,
    )
    .to(
      pillContent,
      {
        autoAlpha: 1,
        duration: SCROLL_TIMING.PILL_CONTENT_FADE_DURATION,
        ease: "power1.out",
      },
      pillShrinkCompleteLabel,
    );

  if (pillSkin) {
    videoShrinkTimeline.to(
      pillSkin,
      {
        autoAlpha: 1,
        duration: SCROLL_TIMING.PILL_SKIN_FADE_DURATION,
        ease: "power1.out",
      },
      pillShrinkCompleteLabel,
    );
  }

  if (overlay) {
    videoShrinkTimeline.fromTo(
      overlay,
      { autoAlpha: OVERLAY_OPACITY.INITIAL },
      {
        autoAlpha: OVERLAY_OPACITY.PEAK,
        duration: SCROLL_TIMING.OVERLAY_FADE_DURATION,
        ease: "none",
        immediateRender: false,
      },
      0,
    );
    videoShrinkTimeline.to(
      overlay,
      {
        autoAlpha: 0,
        duration: SCROLL_TIMING.VIDEO_FADE_OUT_DURATION,
        ease: "power1.out",
      },
      pillShrinkCompleteLabel,
    );
  }

  videoShrinkTimeline.to(
    video,
    {
      autoAlpha: 0,
      duration: SCROLL_TIMING.VIDEO_FADE_OUT_DURATION,
      ease: "power1.out",
    },
    pillShrinkCompleteLabel,
  );

  videoShrinkTimeline.fromTo(
    navRow,
    {
      autoAlpha: 0,
      yPercent: NAV_INITIAL_STATE.Y_PERCENT,
    },
    {
      autoAlpha: 1,
      yPercent: 0,
      y: () => getNavRowYOffset(),
      duration: SCROLL_TIMING.NAV_FADE_DURATION,
      ease: "power2.out",
    },
    SCROLL_TIMING.NAV_ROW_START_OFFSET,
  );

  return {
    timeline: videoShrinkTimeline,
    cleanup: () => {
      videoShrinkTimeline.scrollTrigger?.kill();
      videoShrinkTimeline.kill();
      pillSnapTween?.kill();
    },
  };
}

// ============================================================================
// Label Exit Animation
// ============================================================================

/**
 * Creates a scroll-triggered animation that fades out and moves the name/designation labels.
 *
 * Labels fade out and move upward as the user scrolls, creating a smooth
 * transition before the pill shrink animation completes.
 *
 * @param args - Hero section and label elements
 * @returns Timeline instance or null if no labels exist
 *
 * @example
 * ```typescript
 * const timeline = createLabelExitTimeline({
 *   heroSection,
 *   nameplate: nameplateRef.current,
 *   designation: designationRef.current,
 * });
 *
 * // Later, on cleanup
 * if (timeline) {
 *   timeline.scrollTrigger?.kill();
 *   timeline.kill();
 * }
 * ```
 */
export function createLabelExitTimeline({
  heroSection,
  nameplate,
  designation,
}: LabelExitTimelineArgs): gsap.core.Timeline | null {
  const labelTargets = [nameplate, designation].filter((node): node is HTMLDivElement =>
    Boolean(node),
  );

  if (!labelTargets.length) {
    return null;
  }

  return gsap
    .timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        // End position: 50% of viewport height (0.5 * window.innerHeight)
        // Labels fade out during the first half of the hero scroll animation
        end: () => "+=" + window.innerHeight * LABEL_EXIT_SCROLL_DISTANCE,
        scrub: SCROLL_TIMING.LABEL_EXIT_SCRUB,
      },
    })
    .to(labelTargets, {
      autoAlpha: 0,
      yPercent: LABEL_EXIT_Y_PERCENT,
      ease: "power2.inOut",
    });
}

// ============================================================================
// Cover Section Animations
// ============================================================================

/**
 * Creates animations for the cover section including profile z-index management,
 * fill scale effect, and parallax content movement.
 *
 * Coordinates multiple scroll-triggered effects:
 * - Profile z-index changes to appear behind/in-front of cover
 * - Cover fill scales up from bottom
 * - Cover content moves with parallax effect while pinned
 *
 * @param args - Cover section elements to animate
 * @returns Cleanup function to kill all animations and reset z-index
 *
 * @example
 * ```typescript
 * const cleanup = createCoverAnimations({
 *   profile: profileRef.current,
 *   coverSection: coverSectionRef.current,
 *   coverFill: coverFillRef.current,
 *   coverLabel: coverLabelRef.current,
 *   coverBody: coverBodyRef.current,
 * });
 *
 * // Later, on cleanup
 * cleanup();
 * ```
 */
export function createCoverAnimations({
  profile,
  coverSection,
  coverFill,
  coverLabel,
  coverBody,
}: CoverAnimationArgs): () => void {
  const cleanupFns: Array<() => void> = [];

  const coverStartTrigger = coverSection;
  const coverEndTrigger = coverSection;
  const coverStartPosition = "bottom bottom";
  const coverEndPosition = "bottom bottom";

  if (profile && coverStartTrigger && coverEndTrigger) {
    const setProfileCoverage = (covered: boolean) => {
      gsap.set(profile, {
        zIndex: covered ? PROFILE_COVER_Z_INDEX : PROFILE_BASE_Z_INDEX,
      });
    };

    const profileCoverTrigger = ScrollTrigger.create({
      trigger: coverStartTrigger,
      start: coverStartPosition,
      endTrigger: coverEndTrigger,
      end: coverEndPosition,
      onEnter: () => setProfileCoverage(true),
      onEnterBack: () => setProfileCoverage(true),
      onLeave: () => setProfileCoverage(false),
      onLeaveBack: () => setProfileCoverage(false),
    });

    cleanupFns.push(() => profileCoverTrigger.kill());
  }

  if (coverSection && coverFill) {
    // Set transform origin to bottom center (50% horizontal, 100% vertical).
    // This makes the scaleY animation expand upward from the bottom edge.
    gsap.set(coverFill, { transformOrigin: "50% 100%" });

    const coverTimeline = gsap.fromTo(
      coverFill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: coverSection,
          start: SCROLL_TRIGGER_POSITIONS.COVER_FILL_START,
          end: SCROLL_TRIGGER_POSITIONS.COVER_FILL_END,
          scrub: SCROLL_TIMING.COVER_FILL_SCRUB,
        },
      },
    );

    cleanupFns.push(() => killTween(coverTimeline));
  }

  if (coverSection && coverLabel && coverBody) {
    const coverContentTimeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: coverSection,
          start: SCROLL_TRIGGER_POSITIONS.COVER_CONTENT_START,
          // End position: 90% of viewport height (0.9 * window.innerHeight).
          // This creates a parallax effect over nearly a full viewport scroll.
          end: () => "+=" + window.innerHeight * COVER_TIMING.PARALLAX_DISTANCE,
          scrub: SCROLL_TIMING.COVER_CONTENT_SCRUB,
          pin: true,
          pinSpacing: true,
        },
      })
      .fromTo(
        coverLabel,
        { yPercent: COVER_TIMING.LABEL_Y_RANGE.from },
        { yPercent: COVER_TIMING.LABEL_Y_RANGE.to, ease: "none" },
        0,
      )
      .fromTo(
        coverBody,
        { yPercent: COVER_TIMING.BODY_Y_RANGE.from },
        { yPercent: COVER_TIMING.BODY_Y_RANGE.to, ease: "none" },
        0,
      );

    cleanupFns.push(() => killTimeline(coverContentTimeline));
  }

  return () => {
    cleanupFns.forEach((cleanup) => cleanup());
    if (profile) {
      gsap.set(profile, { zIndex: PROFILE_BASE_Z_INDEX });
    }
  };
}

// ============================================================================
// Hero Pin
// ============================================================================

/**
 * Creates a ScrollTrigger that pins the hero section during scroll animations.
 *
 * Keeps the hero section fixed in viewport while scroll-driven animations play,
 * creating the illusion of elements transforming in place.
 *
 * @param heroSection - The hero section element to pin
 * @returns ScrollTrigger instance
 *
 * @example
 * ```typescript
 * const heroPin = createHeroPin(heroSectionRef.current);
 *
 * // Later, on cleanup
 * heroPin.kill();
 * ```
 */
export function createHeroPin(heroSection: HTMLDivElement): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: heroSection,
    start: "top top",
    // Pin duration: one full viewport height of scrolling.
    // Keeps hero section fixed while scroll animations play.
    end: () => "+=" + window.innerHeight,
    pin: true,
    pinReparent: true,
    anticipatePin: 1,
  });
}

// ============================================================================
// Profile Scroll Animation
// ============================================================================

/**
 * Creates a scroll-driven tween that scales down the profile image.
 *
 * As the user scrolls, the profile image smoothly scales down and adjusts
 * its vertical position, coordinating with the pill shrink animation.
 *
 * @param heroSection - The hero section trigger element
 * @param profile - The profile image element to animate
 * @returns GSAP tween instance
 *
 * @example
 * ```typescript
 * const scrollTween = createProfileScrollTween(
 *   heroSectionRef.current,
 *   profileRef.current
 * );
 *
 * // Later, on cleanup
 * scrollTween.scrollTrigger?.kill();
 * scrollTween.kill();
 * ```
 */
export function createProfileScrollTween(
  heroSection: HTMLDivElement,
  profile: HTMLDivElement,
): gsap.core.Tween {
  return gsap.to(profile, {
    ...PROFILE_SCROLL_CONFIG,
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      // End position: 20% of viewport height (0.2 * window.innerHeight).
      // Profile scales down quickly during the initial scroll phase.
      end: () => "+=" + window.innerHeight * HERO_SCROLL_DISTANCE,
      scrub: true,
    },
  });
}

// ============================================================================
// Cleanup Utilities
// ============================================================================

/**
 * Safely kills a GSAP tween and its associated ScrollTrigger.
 *
 * Handles null/undefined values gracefully, making it safe to use
 * in cleanup functions without additional checks.
 *
 * @param tween - The tween to kill (can be null/undefined)
 *
 * @example
 * ```typescript
 * const tween = gsap.to(element, { x: 100 });
 * // Later...
 * killTween(tween);
 * ```
 */
export function killTween(tween: gsap.core.Tween | null | undefined): void {
  tween?.scrollTrigger?.kill();
  tween?.kill();
}

/**
 * Safely kills a GSAP timeline and its associated ScrollTrigger.
 *
 * Handles null/undefined values gracefully, making it safe to use
 * in cleanup functions without additional checks.
 *
 * @param timeline - The timeline to kill (can be null/undefined)
 *
 * @example
 * ```typescript
 * const timeline = gsap.timeline();
 * // Later...
 * killTimeline(timeline);
 * ```
 */
export function killTimeline(timeline: gsap.core.Timeline | null | undefined): void {
  timeline?.scrollTrigger?.kill();
  timeline?.kill();
}
