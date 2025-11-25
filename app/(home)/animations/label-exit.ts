import { gsap } from "gsap";
import {
  LABEL_EXIT_SCROLL_DISTANCE,
  LABEL_EXIT_Y_PERCENT,
  SCROLL_TIMING,
} from "../components/config";

export type LabelExitTimelineArgs = {
  heroSection: HTMLDivElement;
  nameplate: HTMLDivElement | null;
  designation: HTMLDivElement | null;
  mobileHeroText: HTMLDivElement | null;
};

/**
 * Creates a scroll-triggered animation that fades out and moves the name/designation labels.
 *
 * Labels fade out and move upward as the user scrolls, creating a smooth
 * transition before the pill shrink animation completes.
 *
 * @param args - Hero section and label elements
 * @returns Timeline instance or null if no labels exist
 */
export function createLabelExitTimeline({
  heroSection,
  nameplate,
  designation,
  mobileHeroText,
}: LabelExitTimelineArgs): gsap.core.Timeline | null {
  const isSmallScreen = typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
  const labelTargets = [nameplate, designation, mobileHeroText].filter((node): node is HTMLDivElement =>
    Boolean(node),
  );

  if (!labelTargets.length) {
    return null;
  }

  const mobileLabel = isSmallScreen && mobileHeroText ? mobileHeroText : null;
  const nonMobileTargets = mobileLabel
    ? labelTargets.filter((node) => node !== mobileLabel)
    : labelTargets;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      // End position: 50% of viewport height (0.5 * window.innerHeight)
      // Labels fade out during the first half of the hero scroll animation
      end: () => "+=" + window.innerHeight * LABEL_EXIT_SCROLL_DISTANCE,
      scrub: SCROLL_TIMING.LABEL_EXIT_SCRUB,
    },
  });

  if (nonMobileTargets.length) {
    timeline.to(nonMobileTargets, {
      autoAlpha: 0,
      yPercent: LABEL_EXIT_Y_PERCENT,
      ease: "power2.inOut",
    });
  }

  if (mobileLabel) {
    timeline.to(
      mobileLabel,
      {
        autoAlpha: 0,
        yPercent: 0,
        ease: "power2.inOut",
      },
      0,
    );
  }

  return timeline;
}
