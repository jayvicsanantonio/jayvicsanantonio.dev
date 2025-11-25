import { gsap } from "gsap";
import {
  FINAL_PANEL_STATE,
  PILL_SHRINK_BORDER,
  PILL_SHRINK_BOX_SHADOW,
  OVERLAY_OPACITY,
} from "../components/Hero/hero.constants";

import { CFG } from "../components/Hero/hero.constants";
import type { ReducedMotionArgs, NavMeasurementArgs, NavMeasurementHelpers } from "./animation-types";

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
 */
export function applyReducedMotionState({
  pill,
  pillContent,
  video,
  overlay,
  watermarkMask,
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

  if (watermarkMask) {
    gsap.set(watermarkMask, { autoAlpha: 1 });
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
// Cleanup Utilities
// ============================================================================

/**
 * Safely kills a GSAP tween and its associated ScrollTrigger.
 *
 * Handles null/undefined values gracefully, making it safe to use
 * in cleanup functions without additional checks.
 *
 * @param tween - The tween to kill (can be null/undefined)
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
 */
export function killTimeline(timeline: gsap.core.Timeline | null | undefined): void {
  timeline?.scrollTrigger?.kill();
  timeline?.kill();
}
