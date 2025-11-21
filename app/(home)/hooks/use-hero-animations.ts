import { lockScroll } from "@/lib/scroll-lock";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FINAL_GEOMETRY_STATE, PANEL_BORDER_RADIUS } from "../components/Hero/hero.constants";
import type { HeroAnimationRefs } from "../components/Hero/hero.types";
import {
  applyReducedMotionState,
  createNavMeasurementHelpers,
  createSkillsEntranceAnimation,
  createPillShrinkTimeline,
  createLabelExitTimeline,
  createCoverAnimations,
  createHeroPin,
  createProfileScrollTween,
  killTween,
  killTimeline,
} from "./hero-animation-helpers";

export type UseHeroAnimationArgs = {
  refs: HeroAnimationRefs;
  prefersReducedMotion: boolean;
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Orchestrates all hero section animations including intro sequence and scroll-driven effects.
 *
 * This hook manages two main animation phases:
 * 1. Intro animation: Page load sequence with scroll locking
 * 2. Scroll animation: Parallax and morphing effects triggered by scroll
 *
 * Automatically respects user's motion preferences and handles cleanup on unmount.
 *
 * @param args - Animation configuration
 * @param args.refs - Collection of React refs to animated elements
 * @param args.prefersReducedMotion - Whether user prefers reduced motion
 *
 * @example
 * function HeroSection() {
 *   const refs = useHeroRefs();
 *   const prefersReducedMotion = usePrefersReducedMotion();
 *
 *   useHeroAnimations({ refs, prefersReducedMotion });
 *
 *   return <div ref={refs.containerRef}>...</div>;
 * }
 */
export default function useHeroAnimations(args: UseHeroAnimationArgs) {
  useHeroIntroAnimation(args);
  useHeroScrollAnimation(args);
}

/**
 * Manages the hero intro animation sequence that plays on page load.
 *
 * Creates a choreographed timeline that:
 * 1. Locks scroll to prevent user interaction
 * 2. Expands the pill from small to full size
 * 3. Rounds the corners
 * 4. Fades in profile, video, and text labels
 * 5. Unlocks scroll when complete
 *
 * Respects reduced motion preferences by skipping to final state.
 *
 * @param args - Animation configuration with refs and motion preferences
 */
function useHeroIntroAnimation({ refs, prefersReducedMotion }: UseHeroAnimationArgs) {
  useGSAP(
    () => {
      const pill = refs.pillRef.current;
      const pillContent = refs.pillContentRef.current;
      const video = refs.videoRef.current;
      let releaseScrollLock: (() => void) | null = null;

      if (!pill || !pillContent || !video) {
        return;
      }

      const navRow = refs.navRowRef.current;
      const overlay = refs.videoOverlayRef.current;
      const pillSkin = refs.pillSkinRef.current;
      const profile = refs.profileRef.current;
      const nameplate = refs.nameplateRef.current;
      const designation = refs.designationRef.current;

      if (prefersReducedMotion) {
        applyReducedMotionState({
          pill,
          pillContent,
          video,
          overlay,
          pillSkin,
          profile,
          navRow,
          nameplate,
          designation,
        });
        video.play().catch(() => {});
        return;
      }

      releaseScrollLock = lockScroll();
      const timeline = gsap.timeline();
      const releaseScrollLockIfNeeded = () => {
        if (!releaseScrollLock) return;
        releaseScrollLock();
        releaseScrollLock = null;
      };

      if (navRow) {
        timeline.set(navRow, { autoAlpha: 0 });
      }
      if (nameplate) {
        timeline.set(nameplate, { autoAlpha: 0, yPercent: 35 });
      }
      if (designation) {
        timeline.set(designation, { autoAlpha: 0, yPercent: 35 });
      }

      timeline
        .set(video, { autoAlpha: 0 })
        .set(overlay, { autoAlpha: 0 })
        .set(profile, { autoAlpha: 0 })
        .set(pillSkin, { autoAlpha: 0 })
        .set(pill, { backgroundColor: "#ffffff" })
        .to(
          pill,
          {
            delay: 1,
            keyframes: [
              {
                duration: 2,
                ...FINAL_GEOMETRY_STATE,
                borderRadius: "160px",
                ease: "power3.in",
              },
              {
                duration: 0.8,
                borderRadius: PANEL_BORDER_RADIUS,
                ease: "power1.inOut",
              },
            ],
          },
          0,
        )
        .to(
          pillContent,
          {
            autoAlpha: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "<+=0.6",
        )
        .to(
          profile,
          {
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          ">",
        )
        .addLabel("labelReveal")
        .to(
          pill,
          {
            backgroundColor: "rgba(255,255,255,0)",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .to(
          [video, overlay],
          {
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
            onStart: () => {
              video.play().catch(() => {});
            },
          },
          "-=0.2",
        )
        .add(releaseScrollLockIfNeeded, ">-0.25")
        .to(
          overlay,
          {
            autoAlpha: 0.55,
            duration: 0.6,
            ease: "power1.out",
          },
          ">-0.1",
        );

      if (nameplate) {
        timeline.to(
          nameplate,
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.65,
            ease: "power2.out",
          },
          "labelReveal+=0.05",
        );
      }

      if (designation) {
        timeline.to(
          designation,
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.65,
            ease: "power2.out",
          },
          nameplate ? "<0.08" : "labelReveal+=0.08",
        );
      }

      timeline.add(releaseScrollLockIfNeeded);

      return () => {
        releaseScrollLockIfNeeded();
        timeline.kill();
      };
    },
    { scope: refs.containerRef, dependencies: [prefersReducedMotion] },
  );
}

/**
 * Manages all scroll-driven animations for the hero section.
 *
 * Orchestrates multiple coordinated scroll effects:
 * - Profile image scaling
 * - Pill shrinking and morphing into nav button
 * - Label fade-out
 * - Cover section reveal and parallax
 * - Skills section entrance
 * - Hero section pinning
 *
 * All animations are scroll-scrubbed for smooth, controlled playback.
 * Respects reduced motion preferences by applying final states immediately.
 *
 * @param args - Animation configuration with refs and motion preferences
 */
function useHeroScrollAnimation({ refs, prefersReducedMotion }: UseHeroAnimationArgs) {
  useGSAP(
    () => {
      const coverFill = refs.coverFillRef.current;
      const heroSection = refs.heroSectionRef.current;
      const coverSection = refs.coverSectionRef.current;
      const profile = refs.profileRef.current;
      const pill = refs.pillRef.current;
      const pillContent = refs.pillContentRef.current;
      const video = refs.videoRef.current;
      const overlay = refs.videoOverlayRef.current;
      const pillSkin = refs.pillSkinRef.current;
      const navRow = refs.navRowRef.current;
      const nameplate = refs.nameplateRef.current;
      const designation = refs.designationRef.current;
      const coverLabel = refs.coverLabelRef.current;
      const coverBody = refs.coverBodyRef.current;
      const skillsSection = refs.skillsSectionRef.current;
      const skillsRowsAbove = refs.skillsRowsAboveRefs.current;
      const skillsRowsBelow = refs.skillsRowsBelowRefs.current;
      const skillsHeading = refs.skillsHeadingRef.current;

      if (prefersReducedMotion) {
        if (coverFill) {
          gsap.set(coverFill, { scaleY: 1 });
        }
        if (coverLabel) {
          gsap.set(coverLabel, { yPercent: 0 });
        }
        if (coverBody) {
          gsap.set(coverBody, { yPercent: 0 });
        }
        return;
      }

      if (!heroSection || !profile || !pill || !pillContent || !video || !navRow) {
        return;
      }

      if (window.getComputedStyle(navRow).visibility === "hidden") {
        gsap.set(navRow, { visibility: "visible" });
      }

      const navSpacerEl = navRow.querySelector<HTMLDivElement>("[data-nav-spacer]");
      const firstNavButton = navRow.querySelector<HTMLElement>("a,button");
      const navMeasurements = createNavMeasurementHelpers({
        navRow,
        pill,
        navSpacerEl,
        firstNavButton,
      });

      const cleanupFns: Array<() => void> = [];

      const scrollTween = createProfileScrollTween(heroSection, profile);
      cleanupFns.push(() => killTween(scrollTween));

      const { cleanup: pillCleanup } = createPillShrinkTimeline({
        heroSection,
        navRow,
        pill,
        pillContent,
        pillSkin,
        video,
        overlay,
        getTargetPillWidth: navMeasurements.getTargetPillWidth,
        getTargetPillHeight: navMeasurements.getTargetPillHeight,
        getNavRowYOffset: navMeasurements.getNavRowYOffset,
        getPillCenterOffset: navMeasurements.getPillCenterOffset,
      });
      cleanupFns.push(pillCleanup);

      const labelExitTimeline = createLabelExitTimeline({
        heroSection,
        nameplate,
        designation,
      });
      if (labelExitTimeline) {
        cleanupFns.push(() => killTimeline(labelExitTimeline));
      }

      const coverCleanup = createCoverAnimations({
        profile,
        coverSection,
        coverFill,
        coverLabel,
        coverBody,
      });
      cleanupFns.push(coverCleanup);

      const heroPin = createHeroPin(heroSection);
      cleanupFns.push(() => heroPin.kill());

      const skillsCleanup = createSkillsEntranceAnimation({
        section: skillsSection,
        rowsAbove: skillsRowsAbove,
        rowsBelow: skillsRowsBelow,
        heading: skillsHeading,
      });
      cleanupFns.push(skillsCleanup);

      return () => {
        cleanupFns.forEach((cleanup) => cleanup());
      };
    },
    { dependencies: [prefersReducedMotion] },
  );
}
