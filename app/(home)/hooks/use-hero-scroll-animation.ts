/**
 * Hero Scroll Animation Hook
 *
 * Manages all scroll-driven animations for the hero section.
 *
 * This hook orchestrates multiple coordinated scroll effects:
 * - Profile image scaling as user scrolls
 * - Pill shrinking and morphing into navigation button
 * - Label (nameplate/designation) fade-out
 * - Cover section reveal with parallax effects
 * - Skills section entrance animation
 * - Hero section pinning during scroll
 *
 * All animations are scroll-scrubbed for smooth, controlled playback.
 * Respects reduced motion preferences by applying final states immediately.
 *
 * @module use-hero-scroll-animation
 */

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import type { HeroAnimationRefs } from "../components/Hero/hero.types";
import {
  createNavMeasurementHelpers,
  createPillShrinkTimeline,
  createLabelExitTimeline,
  createCoverAnimations,
  createHeroPin,
  createSkillsEntranceAnimation,
  createProfileHideOnSection,
  createSkillsPin,
  killTimeline,
} from "./hero-animation-helpers";
// Timing constants are used by helper functions imported above
// and may be needed for future enhancements

/**
 * Arguments for the hero scroll animation hook.
 */
export type UseHeroScrollAnimationArgs = {
  /** Collection of React refs to animated elements */
  refs: HeroAnimationRefs;
  /** Whether user prefers reduced motion */
  prefersReducedMotion: boolean;
};

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
 *
 * @example
 * ```tsx
 * function HeroSection() {
 *   const refs = useHeroRefs();
 *   const prefersReducedMotion = usePrefersReducedMotion();
 *
 *   useHeroScrollAnimation({ refs, prefersReducedMotion });
 *
 *   return <div ref={refs.containerRef}>...</div>;
 * }
 * ```
 */
export function useHeroScrollAnimation({
  refs,
  prefersReducedMotion,
}: UseHeroScrollAnimationArgs): void {
  useGSAP(
    () => {
      // Extract all required refs.
      const coverFill = refs.coverFillRef.current;
      const heroSection = refs.heroSectionRef.current;
      const coverSection = refs.coverSectionRef.current;
      const profile = refs.profileRef.current;
      const pill = refs.pillRef.current;
      const pillContent = refs.pillContentRef.current;
      const video = refs.videoRef.current;
      const overlay = refs.videoOverlayRef.current;
      const watermarkMask = refs.videoWatermarkMaskRef.current;
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
      const aboutSection = refs.aboutSectionRef.current;
      const cleanupFns: Array<() => void> = [];

      if (profile && aboutSection) {
        cleanupFns.push(
          createProfileHideOnSection({
            profile,
            section: aboutSection,
          }),
        );
      }

      // Handle reduced motion: apply final states immediately.
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
        return () => {
          cleanupFns.forEach((cleanup) => cleanup());
        };
      }

      // Early return if required refs are missing.
      if (!heroSection || !profile || !pill || !pillContent || !video || !navRow) {
        return () => {
          cleanupFns.forEach((cleanup) => cleanup());
        };
      }

      // Ensure nav row is visible for measurements.
      if (window.getComputedStyle(navRow).visibility === "hidden") {
        gsap.set(navRow, { visibility: "visible" });
      }

      // Get navigation measurement elements.
      const navSpacerEl = navRow.querySelector<HTMLDivElement>("[data-nav-spacer]");
      const firstNavButton = navRow.querySelector<HTMLElement>("a,button");

      // Create navigation measurement helpers.
      const navMeasurements = createNavMeasurementHelpers({
        navRow,
        pill,
        navSpacerEl,
        firstNavButton,
      });

      // Create pill shrink timeline (morphs pill into nav button).
      const { cleanup: pillCleanup } = createPillShrinkTimeline({
        heroSection,
        navRow,
        pill,
        pillContent,
        pillSkin,
        video,
        overlay,
        watermarkMask,
        profile,
        getTargetPillWidth: navMeasurements.getTargetPillWidth,
        getTargetPillHeight: navMeasurements.getTargetPillHeight,
        getNavRowYOffset: navMeasurements.getNavRowYOffset,
        getPillCenterOffset: navMeasurements.getPillCenterOffset,
      });
      cleanupFns.push(pillCleanup);

      // Create label exit timeline (fades out nameplate and designation).
      const labelExitTimeline = createLabelExitTimeline({
        heroSection,
        nameplate,
        designation,
      });
      if (labelExitTimeline) {
        cleanupFns.push(() => killTimeline(labelExitTimeline));
      }

      // Create cover animations (reveal and parallax effects).
      const coverCleanup = createCoverAnimations({
        profile,
        coverSection,
        coverFill,
        coverLabel,
        coverBody,
      });
      cleanupFns.push(coverCleanup);

      // Create hero pin (keeps hero section in view during scroll).
      const heroPin = createHeroPin(heroSection);
      cleanupFns.push(() => heroPin.kill());

      // Create skills entrance animation (staggered reveal of skills).
      const skillsCleanup = createSkillsEntranceAnimation({
        section: skillsSection,
        rowsAbove: skillsRowsAbove,
        rowsBelow: skillsRowsBelow,
        heading: skillsHeading,
        heroSection,
      });
      cleanupFns.push(skillsCleanup);

      // Create skills pin (keeps skills section in place while about section slides over).
      if (skillsSection) {
        const skillsPin = createSkillsPin(skillsSection);
        cleanupFns.push(() => skillsPin.kill());
      }

      // Return cleanup function to kill all animations on unmount.
      return () => {
        cleanupFns.forEach((cleanup) => cleanup());
      };
    },
    { dependencies: [prefersReducedMotion] },
  );
}
