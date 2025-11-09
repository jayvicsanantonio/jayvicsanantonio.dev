import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import {
  FINAL_GEOMETRY_STATE,
  FINAL_PANEL_STATE,
  HERO_SCROLL_DISTANCE,
  PANEL_BORDER_RADIUS,
  PILL_SHRINK_BACKGROUND,
  PILL_SHRINK_BORDER,
  PILL_SHRINK_BOX_SHADOW,
  PROFILE_SCROLL_CONFIG,
  SCROLL_SMOOTHER_CONFIG,
  TARGET_PILL_HEIGHT,
  TARGET_PILL_WIDTH,
} from "../_components/hero.constants";
import type { HeroAnimationRefs } from "../_components/hero.types";

export type UseHeroAnimationArgs = {
  refs: HeroAnimationRefs;
  prefersReducedMotion: boolean;
};

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function useHeroAnimations(args: UseHeroAnimationArgs) {
  useHeroIntroAnimation(args);
  useHeroScrollAnimation(args);
}

function useHeroIntroAnimation({ refs, prefersReducedMotion }: UseHeroAnimationArgs) {
  useGSAP(
    () => {
      const pill = refs.pillRef.current;
      const pillContent = refs.pillContentRef.current;
      const video = refs.videoRef.current;

      if (!pill || !pillContent || !video) {
        return;
      }

      const navRow = refs.navRowRef.current;
      const overlay = refs.videoOverlayRef.current;
      const pillSkin = refs.pillSkinRef.current;
      const profile = refs.profileRef.current;

      if (prefersReducedMotion) {
        applyReducedMotionState({
          pill,
          pillContent,
          video,
          overlay,
          pillSkin,
          profile,
          navRow,
        });
        video.play().catch(() => {});
        return;
      }

      const timeline = gsap.timeline();

      if (navRow) {
        timeline.set(navRow, { autoAlpha: 0 });
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
        .to(
          overlay,
          {
            autoAlpha: 0.55,
            duration: 0.6,
            ease: "power1.out",
          },
          ">-0.1",
        );

      return () => {
        timeline.kill();
      };
    },
    { scope: refs.containerRef, dependencies: [prefersReducedMotion] },
  );
}

function useHeroScrollAnimation({ refs, prefersReducedMotion }: UseHeroAnimationArgs) {
  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const wrapper = refs.smoothWrapperRef.current;
      const content = refs.smoothContentRef.current;
      const heroSection = refs.heroSectionRef.current;
      const profile = refs.profileRef.current;
      const pill = refs.pillRef.current;
      const pillContent = refs.pillContentRef.current;
      const video = refs.videoRef.current;
      const overlay = refs.videoOverlayRef.current;
      const pillSkin = refs.pillSkinRef.current;
      const navRow = refs.navRowRef.current;

      if (
        !wrapper ||
        !content ||
        !heroSection ||
        !profile ||
        !pill ||
        !pillContent ||
        !video ||
        !navRow
      ) {
        return;
      }

      ScrollSmoother.get()?.kill();

      const smoother = ScrollSmoother.create({
        wrapper,
        content,
        ...SCROLL_SMOOTHER_CONFIG,
      });

      const scrollTween = gsap.to(profile, {
        ...PROFILE_SCROLL_CONFIG,
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: () => "+=" + window.innerHeight * HERO_SCROLL_DISTANCE,
          scrub: true,
        },
      });

      const pillShrinkCompleteLabel = "pillShrinkComplete";

      const videoShrinkTimeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: () => "+=" + window.innerHeight,
            scrub: true,
          },
        })
        .to(
          pill,
          {
            width: TARGET_PILL_WIDTH,
            height: TARGET_PILL_HEIGHT,
            borderRadius: "384px",
            backgroundColor: PILL_SHRINK_BACKGROUND,
            borderColor: PILL_SHRINK_BORDER,
            boxShadow: PILL_SHRINK_BOX_SHADOW,
            ease: "none",
          },
          0,
        )
        .addLabel(pillShrinkCompleteLabel)
        .to(
          pillContent,
          {
            color: "#ffffff",
            textShadow: "0 6px 18px rgba(0,0,0,0.55)",
            duration: 0.35,
            ease: "power1.out",
          },
          pillShrinkCompleteLabel,
        )
        .to(
          pillContent,
          {
            autoAlpha: 1,
            duration: 0.4,
            ease: "power1.out",
          },
          pillShrinkCompleteLabel,
        );

      if (pillSkin) {
        videoShrinkTimeline.to(
          pillSkin,
          {
            autoAlpha: 1,
            duration: 0.4,
            ease: "power1.out",
          },
          0.05,
        );
      }

      if (overlay) {
        videoShrinkTimeline.fromTo(
          overlay,
          { autoAlpha: 0.55 },
          {
            autoAlpha: 0.85,
            duration: 0.4,
            ease: "none",
            immediateRender: false,
          },
          0,
        );
      }

      videoShrinkTimeline.fromTo(
        navRow,
        {
          autoAlpha: 0,
          yPercent: 18,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          y: () => calculateNavYOffset(navRow, pill),
          duration: 0.45,
          ease: "power2.out",
        },
        0.55,
      );

      const heroPin = ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: () => "+=" + window.innerHeight,
        pin: true,
        anticipatePin: 1,
      });

      ScrollTrigger.refresh();

      return () => {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
        smoother.kill();
        videoShrinkTimeline.scrollTrigger?.kill();
        videoShrinkTimeline.kill();
        heroPin.kill();
      };
    },
    { dependencies: [prefersReducedMotion] },
  );
}

type ReducedMotionArgs = {
  pill: HTMLDivElement;
  pillContent: HTMLDivElement;
  video: HTMLVideoElement;
  overlay: HTMLDivElement | null;
  pillSkin: HTMLDivElement | null;
  profile: HTMLDivElement | null;
  navRow: HTMLDivElement | null;
};

function applyReducedMotionState({
  pill,
  pillContent,
  video,
  overlay,
  pillSkin,
  profile,
  navRow,
}: ReducedMotionArgs) {
  gsap.set(pill, { ...FINAL_PANEL_STATE, backgroundColor: "transparent" });
  gsap.set(pillContent, { autoAlpha: 0 });
  gsap.set(video, { autoAlpha: 1 });

  if (overlay) {
    gsap.set(overlay, { autoAlpha: 0.55 });
  }

  if (pillSkin) {
    gsap.set(pillSkin, { autoAlpha: 0 });
  }

  if (profile) {
    gsap.set(profile, { autoAlpha: 1 });
  }

  if (navRow) {
    gsap.set(navRow, { autoAlpha: 1 });
  }
}

function calculateNavYOffset(navRow: HTMLDivElement, pill: HTMLDivElement) {
  const pillHeight = pill.getBoundingClientRect().height || pill.offsetHeight || 0;
  const navHeight = navRow.getBoundingClientRect().height || navRow.offsetHeight || 0;
  return -(navHeight - pillHeight) / 2;
}
