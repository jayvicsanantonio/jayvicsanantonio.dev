import { lockScroll } from "@/lib/scroll-lock";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { FINAL_GEOMETRY_STATE, PANEL_BORDER_RADIUS } from "../components/Hero/hero.constants";
import type { HeroAnimationRefs } from "../components/Hero/hero.types";
import {
  INTRO_TIMING,
  LABEL_INITIAL_STATE,
  OVERLAY_OPACITY,
} from "../components/Hero/hero-animation-timing";
import { applyReducedMotionState } from "./animations/reduced-motion";

export type UseHeroIntroAnimationArgs = {
  refs: HeroAnimationRefs;
  prefersReducedMotion: boolean;
};

/**
 * Manages the hero intro animation sequence that plays on page load.
 *
 * Creates a choreographed timeline that:
 * 1. Locks scroll to prevent user interaction during the animation
 * 2. Expands the pill from a small initial size to full viewport dimensions
 * 3. Rounds the pill corners from circular to the final border radius
 * 4. Fades out the initial pill content (loading indicator)
 * 5. Fades in the profile image
 * 6. Fades in the background video with overlay
 * 7. Reveals the nameplate and designation labels with stagger
 * 8. Unlocks scroll when the sequence completes
 *
 * The animation uses GSAP timelines with carefully choreographed timing to create
 * a smooth, elegant entrance effect. All timing values are imported from the
 * timing constants file for maintainability.
 *
 * Respects user motion preferences by skipping directly to the final state when
 * `prefers-reduced-motion` is enabled.
 *
 * @param args - Animation configuration
 * @param args.refs - Collection of React refs to all animated elements
 * @param args.prefersReducedMotion - Whether user prefers reduced motion
 *
 * @example
 * function HeroSection() {
 *   const refs = useHeroRefs();
 *   const prefersReducedMotion = usePrefersReducedMotion();
 *
 *   useHeroIntroAnimation({ refs, prefersReducedMotion });
 *
 *   return <div ref={refs.containerRef}>...</div>;
 * }
 */
export function useHeroIntroAnimation({ refs, prefersReducedMotion }: UseHeroIntroAnimationArgs) {
  useGSAP(
    () => {
      // Extract required refs.
      const pill = refs.pillRef.current;
      const pillContent = refs.pillContentRef.current;
      const video = refs.videoRef.current;
      let releaseScrollLock: (() => void) | null = null;

      // Early return if critical elements are missing.
      if (!pill || !pillContent || !video) {
        return;
      }

      // Extract optional refs.
      const navRow = refs.navRowRef.current;
      const overlay = refs.videoOverlayRef.current;
      const watermarkMask = refs.videoWatermarkMaskRef.current;
      const pillSkin = refs.pillSkinRef.current;
      const profile = refs.profileRef.current;
      const nameplate = refs.nameplateRef.current;
      const designation = refs.designationRef.current;

      // Handle reduced motion preference.
      if (prefersReducedMotion) {
        applyReducedMotionState({
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
        });
        // Start video playback immediately.
        video.play().catch(() => {
          // Silently handle autoplay restrictions.
        });
        return;
      }

      // Lock scroll during intro animation.
      releaseScrollLock = lockScroll();

      // Create main intro timeline.
      const timeline = gsap.timeline();

      // Helper to safely release scroll lock.
      const releaseScrollLockIfNeeded = () => {
        if (!releaseScrollLock) return;
        releaseScrollLock();
        releaseScrollLock = null;
      };

      // Set initial states for elements that will animate in.
      if (navRow) {
        timeline.set(navRow, { autoAlpha: 0 });
      }
      if (nameplate) {
        timeline.set(nameplate, {
          autoAlpha: 0,
          yPercent: LABEL_INITIAL_STATE.Y_PERCENT,
        });
      }
      if (designation) {
        timeline.set(designation, {
          autoAlpha: 0,
          yPercent: LABEL_INITIAL_STATE.Y_PERCENT,
        });
      }

      // Build the intro animation sequence.
      timeline
        // Set initial hidden states.
        .set(video, { autoAlpha: 0 })
        .set(overlay, { autoAlpha: 0 })
        .set(watermarkMask, { autoAlpha: 0 })
        .set(profile, { autoAlpha: 0 })
        .set(pillSkin, { autoAlpha: 0 })
        .set(pill, { backgroundColor: "#ffffff" })
        // Animate pill expansion and rounding.
        .to(
          pill,
          {
            delay: INTRO_TIMING.DELAY,
            keyframes: [
              {
                duration: INTRO_TIMING.PILL_EXPAND_DURATION,
                ...FINAL_GEOMETRY_STATE,
                borderRadius: "160px",
                ease: "power3.in",
              },
              {
                duration: INTRO_TIMING.PILL_ROUND_DURATION,
                borderRadius: PANEL_BORDER_RADIUS,
                ease: "power1.inOut",
              },
            ],
          },
          0,
        )
        // Fade out pill content (loading indicator).
        .to(
          pillContent,
          {
            autoAlpha: 0,
            duration: INTRO_TIMING.CONTENT_FADE_DURATION,
            ease: "power2.out",
          },
          "<+=0.6",
        )
        // Fade in profile image.
        .to(
          profile,
          {
            autoAlpha: 1,
            duration: INTRO_TIMING.PROFILE_FADE_DURATION,
            ease: "power2.out",
          },
          ">",
        )
        // Add label for label reveal timing.
        .addLabel("labelReveal")
        // Fade out pill background to reveal video.
        .to(
          pill,
          {
            backgroundColor: "rgba(255,255,255,0)",
            duration: INTRO_TIMING.PILL_BACKGROUND_FADE_DURATION,
            ease: "power2.out",
          },
          "-=0.6",
        )
        // Fade in video, overlay, and watermark mask.
        .to(
          [video, overlay, watermarkMask],
          {
            autoAlpha: 1,
            duration: INTRO_TIMING.VIDEO_FADE_DURATION,
            ease: "power2.out",
            onStart: () => {
              // Start video playback when it becomes visible.
              video.play().catch(() => {
                // Silently handle autoplay restrictions.
              });
            },
          },
          "-=0.2",
        )
        // Release scroll lock slightly before animation completes for smoother UX.
        .add(releaseScrollLockIfNeeded, ">-0.25")
        // Adjust overlay opacity to final state.
        .to(
          overlay,
          {
            autoAlpha: OVERLAY_OPACITY.INITIAL,
            duration: INTRO_TIMING.OVERLAY_FADE_DURATION,
            ease: "power1.out",
          },
          ">-0.1",
        );

      // Animate nameplate label if present.
      if (nameplate) {
        timeline.to(
          nameplate,
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: INTRO_TIMING.LABEL_FADE_DURATION,
            ease: "power2.out",
          },
          // Position syntax: "labelReveal+=" means start at the "labelReveal" label plus offset.
          `labelReveal+=${INTRO_TIMING.LABEL_REVEAL_OFFSET}`,
        );
      }

      // Animate designation label if present (staggered after nameplate).
      if (designation) {
        timeline.to(
          designation,
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: INTRO_TIMING.LABEL_FADE_DURATION,
            ease: "power2.out",
          },
          // Position syntax: "<" means start at end of previous animation.
          // If nameplate exists, use "<" (relative to nameplate end) with stagger offset.
          // Otherwise, use absolute position relative to "labelReveal" label.
          nameplate
            ? `<${INTRO_TIMING.LABEL_STAGGER}`
            : `labelReveal+=${INTRO_TIMING.LABEL_STAGGER}`,
        );
      }

      // Ensure scroll lock is released at the end.
      timeline.add(releaseScrollLockIfNeeded);

      // Cleanup function.
      return () => {
        releaseScrollLockIfNeeded();
        timeline.kill();
      };
    },
    { scope: refs.containerRef, dependencies: [prefersReducedMotion] },
  );
}
