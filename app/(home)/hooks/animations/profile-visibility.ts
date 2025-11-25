import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PROFILE_BASE_Z_INDEX,
  PROFILE_COVER_Z_INDEX,
} from "../../components/Hero/hero.constants";

export type ProfileSectionVisibilityArgs = {
  profile: HTMLDivElement | null;
  section: HTMLElement | null;
};

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
