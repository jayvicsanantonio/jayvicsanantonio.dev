import { gsap } from "gsap";
import {
  LABEL_EXIT_SCROLL_DISTANCE,
  LABEL_EXIT_Y_PERCENT,
} from "../../components/Hero/hero.constants";
import { SCROLL_TIMING } from "../../components/Hero/hero-animation-timing";

export type LabelExitTimelineArgs = {
  heroSection: HTMLDivElement;
  nameplate: HTMLDivElement | null;
  designation: HTMLDivElement | null;
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
