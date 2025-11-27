import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import type { HeroAnimationRefs } from "../types";
import { createNavMeasurementHelpers } from "../animations/nav-measurement";
import { createPillShrinkTimeline } from "../animations/pill-shrink";
import { createLabelExitTimeline } from "../animations/label-exit";
import { createCoverAnimations } from "../animations/cover-section";
import { createHeroPin, createSkillsPin } from "../animations/pins";
import { createSkillsEntranceAnimation } from "../animations/skills-entrance";
import { createProfileHideOnSection } from "../animations/profile-visibility";
import { killTimeline } from "../animations/cleanup";

export type UseHeroScrollAnimationArgs = {
  refs: HeroAnimationRefs;
  prefersReducedMotion: boolean;
};

export function useHeroScrollAnimation({
  refs,
  prefersReducedMotion,
}: UseHeroScrollAnimationArgs): void {
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
      const watermarkMask = refs.videoWatermarkMaskRef.current;
      const pillSkin = refs.pillSkinRef.current;
      const navRow = refs.navRowRef.current;
      const nameplate = refs.nameplateRef.current;
      const designation = refs.designationRef.current;
      const mobileHeroText = refs.mobileHeroTextRef.current;
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

      if (!heroSection || !profile || !pill || !pillContent || !video || !navRow) {
        return () => {
          cleanupFns.forEach((cleanup) => cleanup());
        };
      }

      if (window.getComputedStyle(navRow).visibility === "hidden") {
        gsap.set(navRow, { visibility: "visible" });
      }

      const navMeasurements = createNavMeasurementHelpers({
        navRow,
        pill,
      });

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

      const labelExitTimeline = createLabelExitTimeline({
        heroSection,
        nameplate,
        designation,
        mobileHeroText,
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
        heroSection,
      });
      cleanupFns.push(skillsCleanup);

      if (skillsSection) {
        const skillsPin = createSkillsPin(skillsSection);
        cleanupFns.push(() => skillsPin.kill());
      }

      return () => {
        cleanupFns.forEach((cleanup) => cleanup());
      };
    },
    { dependencies: [prefersReducedMotion] },
  );
}
