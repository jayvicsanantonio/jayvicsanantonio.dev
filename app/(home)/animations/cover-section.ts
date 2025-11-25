import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PROFILE_BASE_Z_INDEX,
  PROFILE_COVER_Z_INDEX,
  SCROLL_TRIGGER_POSITIONS,
  SCROLL_TIMING,
  COVER_TIMING,
} from "../components/config";
import { killTween, killTimeline } from "./cleanup";

export type CoverAnimationArgs = {
  profile: HTMLDivElement | null;
  coverSection: HTMLDivElement | null;
  coverFill: HTMLDivElement | null;
  coverLabel: HTMLDivElement | null;
  coverBody: HTMLDivElement | null;
};

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
          invalidateOnRefresh: true,
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
