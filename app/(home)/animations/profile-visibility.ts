import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PROFILE_BASE_Z_INDEX,
  PROFILE_COVER_Z_INDEX,
} from "../components/config";

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

  let rectHeight = 1;
  let viewHeight = 1;

  const clamp01 = gsap.utils.clamp(0, 1);
  const trigger = ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onRefresh: () => {
      rectHeight = section.getBoundingClientRect().height || 1;
      viewHeight = window.innerHeight || 1;
    },
    onUpdate: (self) => {
      // Approximate rect.top and rect.bottom using scroll progress to avoid forced reflows.
      // self.start is when top hits bottom of viewport. self.end is when bottom hits top.
      const totalScrollDistance = self.end - self.start;
      const currentScroll = self.start + self.progress * totalScrollDistance;
      // We can directly calculate visibleRatio without DOM read!
      // In GSAP ScrollTrigger, the distance scrolled past start is (currentScroll - self.start).
      // Since it starts at "top bottom", at self.start, the top is exactly at viewHeight.
      const rectTop = viewHeight - (currentScroll - self.start);
      const rectBottom = rectTop + rectHeight;

      const intersection = Math.max(0, Math.min(rectBottom, viewHeight) - Math.max(rectTop, 0));
      const visibleRatio = rectHeight ? intersection / rectHeight : 0;
      
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
