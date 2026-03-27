import { gsap } from "gsap";
import {
  FINAL_PANEL_STATE,
  PILL_SHRINK_BORDER,
  PILL_SHRINK_BOX_SHADOW,
  OVERLAY_OPACITY,
} from "../components/config";

export type ReducedMotionArgs = {
  pill: HTMLDivElement;
  pillContent: HTMLDivElement;
  video: HTMLVideoElement;
  overlay: HTMLDivElement | null;
  watermarkMask: HTMLDivElement | null;
  pillSkin: HTMLDivElement | null;
  profile: HTMLDivElement | null;
  navRow: HTMLDivElement | null;
  nameplate: HTMLDivElement | null;
  designation: HTMLDivElement | null;
  mobileHeroText: HTMLDivElement | null;
  shouldLoadHeroVideo: boolean;
};

/**
 * Applies the final animation state immediately for users who prefer reduced motion.
 *
 * Sets all elements to their post-animation state without any transitions,
 * ensuring accessibility compliance while maintaining visual design.
 *
 * @param args - Collection of element refs to set to final state
 */
export function applyReducedMotionState({
  pill,
  pillContent,
  video,
  overlay,
  watermarkMask,
  pillSkin,
  profile,
  navRow,
  nameplate,
  designation,
  mobileHeroText,
  shouldLoadHeroVideo,
}: ReducedMotionArgs): void {
  gsap.set(pill, {
    ...FINAL_PANEL_STATE,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: PILL_SHRINK_BORDER,
    boxShadow: PILL_SHRINK_BOX_SHADOW,
  });
  gsap.set(pillContent, { autoAlpha: 0 });
  gsap.set(video, { autoAlpha: shouldLoadHeroVideo ? 1 : 0 });

  if (overlay) {
    gsap.set(overlay, { autoAlpha: shouldLoadHeroVideo ? OVERLAY_OPACITY.INITIAL : 0 });
  }

  if (watermarkMask) {
    gsap.set(watermarkMask, { autoAlpha: shouldLoadHeroVideo ? 1 : 0 });
  }

  if (pillSkin) {
    gsap.set(pillSkin, { autoAlpha: shouldLoadHeroVideo ? 0 : 1 });
  }

  if (profile) {
    gsap.set(profile, { autoAlpha: 1, yPercent: 0 });
  }

  if (navRow) {
    gsap.set(navRow, { autoAlpha: 1 });
  }

  if (nameplate) {
    gsap.set(nameplate, { autoAlpha: 1, yPercent: 0 });
  }

  if (designation) {
    gsap.set(designation, { autoAlpha: 1, yPercent: 0 });
  }

  if (mobileHeroText) {
    gsap.set(mobileHeroText, { autoAlpha: 1, yPercent: 0 });
  }
}
