import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SKILLS_TIMING,
  SCROLL_TRIGGER_POSITIONS,
  SKILLS_INITIAL_STATE,
  SCROLL_TIMING,
} from "../../components/config";
import { killTimeline } from "./cleanup";

export type SkillsEntranceArgs = {
  section: HTMLElement | null;
  rowsAbove?: Array<HTMLDivElement | null>;
  rowsBelow?: Array<HTMLDivElement | null>;
  heading?: HTMLHeadingElement | null;
  heroSection?: HTMLDivElement | null;
};

/**
 * Creates a scroll-triggered entrance animation for the skills section.
 *
 * Animates skill rows with synchronized group reveals - all rows above the heading
 * fade in together, followed by all rows below the heading fading in together.
 * The heading also fades in with a scale effect. The animation plays once the
 * section enters the viewport and (if provided) the hero section has fully
 * left the viewport; it rewinds when scrolling back above the start.
 *
 * @param args - Skills section elements to animate
 * @returns Cleanup function to kill the animation timeline
 */
export function createSkillsEntranceAnimation({
  section,
  rowsAbove = [],
  rowsBelow = [],
  heading,
  heroSection,
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

  const timeline = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
  let skillsTrigger: ScrollTrigger | null = null;

  const setInitialState = () => {
    gsap.set(section, { autoAlpha: 0, pointerEvents: "none" });

    if (headingEl) {
      gsap.set(headingEl, {
        autoAlpha: 0,
        yPercent: SKILLS_INITIAL_STATE.HEADING_Y_PERCENT,
        scale: SKILLS_INITIAL_STATE.HEADING_SCALE,
        transformOrigin: "50% 50%",
      });
    }

    if (aboveEls.length) {
      gsap.set(aboveEls, { autoAlpha: 0, xPercent: SKILLS_INITIAL_STATE.ABOVE_X_PERCENT });
    }

    if (belowEls.length) {
      gsap.set(belowEls, { autoAlpha: 0, xPercent: SKILLS_INITIAL_STATE.BELOW_X_PERCENT });
    }

    timeline.progress(0);
  };

  setInitialState();

  if (headingEl) {
    timeline.to(
      headingEl,
      {
        autoAlpha: 1,
        yPercent: 0,
        scale: 1,
        duration: SKILLS_TIMING.HEADING_DURATION,
      },
      SKILLS_TIMING.HEADING_DELAY,
    );
  }

  if (aboveEls.length) {
    timeline.to(
      aboveEls,
      {
        autoAlpha: 1,
        xPercent: 0,
        duration: SKILLS_TIMING.ROWS_FADE_DURATION,
      },
      0,
    );
  }

  if (belowEls.length) {
    timeline.to(
      belowEls,
      {
        autoAlpha: 1,
        xPercent: 0,
        duration: SKILLS_TIMING.ROWS_FADE_DURATION,
      },
      aboveEls.length ? SKILLS_TIMING.BELOW_DELAY : 0,
    );
  }

  skillsTrigger = ScrollTrigger.create({
    id: "skillsEntrance",
    trigger: section,
    start: SCROLL_TRIGGER_POSITIONS.SKILLS_START,
    end: SCROLL_TRIGGER_POSITIONS.SKILLS_END,
    scrub: SCROLL_TIMING.SKILLS_ENTRANCE_SCRUB,
    onUpdate: (self) => {
      const progress = self.progress;
      if (progress <= 0) {
        timeline.pause(0);
        setInitialState();
        return;
      }
      gsap.set(section, { autoAlpha: 1, pointerEvents: "auto" });
      timeline.progress(progress);
    },
    onLeaveBack: () => {
      timeline.pause(0);
      setInitialState();
    },
  });

  return () => {
    skillsTrigger?.kill();
    gsap.set(section, { autoAlpha: 1, pointerEvents: "auto" });
    killTimeline(timeline);
  };
}
