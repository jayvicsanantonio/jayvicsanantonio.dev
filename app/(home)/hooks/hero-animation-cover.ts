import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PROFILE_COVER_Z_INDEX,
  PROFILE_BASE_Z_INDEX,
} from "../components/Hero/hero.constants";
import {
  SCROLL_TRIGGER_POSITIONS,
  SCROLL_TIMING,
  COVER_TIMING,
} from "../components/Hero/hero-animation-timing";
import { killTween, killTimeline } from "./animation-utils";
import type { CoverAnimationArgs, ProfileSectionVisibilityArgs } from "./animation-types";

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
// Profile Visibility Around About Section
// ============================================================================

/**
 * Slides the fixed profile downward as a target section enters the viewport.
 *
 * This keeps the floating profile from overlapping the next section while
 * preserving its visibility (no fade out) when scrolling back up.
 */
export function createProfileHideOnSection({
  profile,
  section,
}: ProfileSectionVisibilityArgs): () => void {
  if (!profile || !section) {
    return () => {};
  }

  const clamp01 = gsap.utils.clamp(0, 1);
  const trigger = ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onUpdate: () => {
      const rect = section.getBoundingClientRect();
      const viewHeight = window.innerHeight || 1;
      const intersection = Math.max(0, Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0));
      const visibleRatio = rect.height ? intersection / rect.height : 0;
      
      // Start moving when 10% of the About section is visible.
      // We want it to hide relatively quickly as the About section comes up.
      // Let's finish hiding by 25% visibility to ensure it's gone before it overlaps content.
      const startThreshold = 0.1;
      const endThreshold = 0.25;
      const progress = clamp01((visibleRatio - startThreshold) / (endThreshold - startThreshold));
      
      gsap.set(profile, {
        yPercent: 140 * progress,
        zIndex: progress > 0 ? PROFILE_COVER_Z_INDEX : PROFILE_BASE_Z_INDEX,
      });
    },
  });

  return () => {
    trigger.kill();
    gsap.set(profile, { yPercent: 0, zIndex: PROFILE_BASE_Z_INDEX });
  };
}
