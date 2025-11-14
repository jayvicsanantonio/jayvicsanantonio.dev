import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FINAL_GEOMETRY_STATE,
  FINAL_PANEL_STATE,
  HERO_SCROLL_DISTANCE,
  LABEL_EXIT_SCROLL_DISTANCE,
  LABEL_EXIT_Y_PERCENT,
  PANEL_BORDER_RADIUS,
  PILL_SHRINK_BACKGROUND,
  PILL_SHRINK_BORDER,
  PILL_SHRINK_BOX_SHADOW,
  PROFILE_BASE_Z_INDEX,
  PROFILE_COVER_Z_INDEX,
  PROFILE_SCROLL_CONFIG,
} from "../components/Hero/hero.constants";
import { CFG } from "../components/config";
import type { HeroAnimationRefs } from "../components/Hero/hero.types";

export type UseHeroAnimationArgs = {
  refs: HeroAnimationRefs;
  prefersReducedMotion: boolean;
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PROFILE_PIN_HIDE_START = "top bottom";
const PROFILE_PIN_HIDE_END = "top 45%";
const PROFILE_PIN_HIDE_Y = 18;

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

      const timeline = gsap.timeline();

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
      const aboutSection = refs.aboutSectionRef.current;
      const skillsSection = refs.skillsSectionRef.current;

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

      if (
        !heroSection ||
        !profile ||
        !pill ||
        !pillContent ||
        !video ||
        !navRow
      ) {
        return;
      }

      const navSpacerEl = navRow.querySelector<HTMLDivElement>("[data-nav-spacer]");
      const firstNavButton = navRow.querySelector<HTMLAnchorElement>("a,button");

      const getTargetPillWidth = () => {
        const spacerWidth = navSpacerEl?.getBoundingClientRect().width ?? 0;
        if (spacerWidth > 0) {
          return spacerWidth;
        }
        const navWidth = navRow.getBoundingClientRect().width;
        return Math.max(navWidth * 0.35, CFG.nav.buttonSize.w * 3);
      };

      const getTargetPillHeight = () => {
        const candidate =
          firstNavButton?.getBoundingClientRect().height ?? navRow.getBoundingClientRect().height;
        if (candidate && candidate > 0) {
          return candidate;
        }
        return CFG.nav.buttonSize.h;
      };

      // Smooth Scrollbar will proxy ScrollTrigger globally via ScrollProvider.

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

      gsap.set(pill, { borderWidth: 0, borderColor: "transparent" });

      const videoShrinkTimeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: () => "+=" + window.innerHeight,
            // apply slight smoothing for more elegant motion
            scrub: 0.6,
            onEnter: () => {
              gsap.set([pill, video], { transformOrigin: "50% 50%" });
            },
            onEnterBack: () => {
              gsap.set([pill, video], { transformOrigin: "50% 50%" });
            },
            invalidateOnRefresh: true,
          },
        })
        .to(
          pill,
          {
            width: () => `${getTargetPillWidth()}px`,
            height: () => `${getTargetPillHeight()}px`,
            borderRadius: "384px",
            backgroundColor: PILL_SHRINK_BACKGROUND,
            ease: "none",
            force3D: true,
          },
          0,
        )
        // glide the pill's center toward the nav row center as it shrinks
        .to(
          pill,
          {
            x: () => {
              const pr = pill.getBoundingClientRect();
              const nr = navRow.getBoundingClientRect();
              return nr.left + nr.width / 2 - (pr.left + pr.width / 2);
            },
            y: () => {
              const pr = pill.getBoundingClientRect();
              const nr = navRow.getBoundingClientRect();
              return nr.top + nr.height / 2 - (pr.top + pr.height / 2);
            },
            ease: "power2.out",
          },
          0,
        )
        .addLabel(pillShrinkCompleteLabel)
        .to(
          pill,
          {
            borderWidth: 1,
            borderColor: PILL_SHRINK_BORDER,
            boxShadow: PILL_SHRINK_BOX_SHADOW,
            duration: 0.25,
            ease: "power1.out",
          },
          pillShrinkCompleteLabel,
        )
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
          pillShrinkCompleteLabel,
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
        videoShrinkTimeline.to(
          overlay,
          {
            autoAlpha: 0,
            duration: 0.35,
            ease: "power1.out",
          },
          pillShrinkCompleteLabel,
        );
      }

      videoShrinkTimeline.to(
        video,
        {
          autoAlpha: 0,
          duration: 0.35,
          ease: "power1.out",
        },
        pillShrinkCompleteLabel,
      );

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

      let labelExitTimeline: gsap.core.Timeline | null = null;

      if ((nameplate || designation) && heroSection) {
        const labelTargets = [nameplate, designation].filter(
          (node): node is HTMLDivElement => Boolean(node),
        );

        labelExitTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: () => "+=" + window.innerHeight * LABEL_EXIT_SCROLL_DISTANCE,
            scrub: true,
          },
        });

        labelExitTimeline.to(labelTargets, {
          autoAlpha: 0,
          yPercent: LABEL_EXIT_Y_PERCENT,
          ease: "power2.inOut",
        });
      }

      let coverTimeline: gsap.core.Tween | null = null;
      let coverContentTimeline: gsap.core.Timeline | null = null;
      let profileCoverTrigger: ScrollTrigger | null = null;
      let profileHideTimeline: gsap.core.Timeline | null = null;

      const coverStartTrigger = aboutSection ?? skillsSection;
      const coverEndTrigger = aboutSection ?? coverStartTrigger;

      if (profile && coverStartTrigger && coverEndTrigger) {
        const setProfileCoverage = (covered: boolean) => {
          gsap.set(profile, {
            zIndex: covered ? PROFILE_COVER_Z_INDEX : PROFILE_BASE_Z_INDEX,
          });
        };

        profileCoverTrigger = ScrollTrigger.create({
          trigger: coverStartTrigger,
          start: aboutSection ? "top bottom" : "bottom bottom",
          endTrigger: coverEndTrigger,
          end: aboutSection ? "bottom top" : "bottom top",
          onEnter: () => setProfileCoverage(true),
          onEnterBack: () => setProfileCoverage(true),
          onLeave: () => setProfileCoverage(false),
          onLeaveBack: () => setProfileCoverage(false),
        });
      }

      if (coverSection && coverFill) {
        gsap.set(coverFill, { transformOrigin: "50% 100%" });

        coverTimeline = gsap.fromTo(
          coverFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: coverSection,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          },
        );
      }

      const profileHideTrigger = aboutSection ?? skillsSection;

      if (profile && profileHideTrigger) {
        profileHideTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: profileHideTrigger,
              start: PROFILE_PIN_HIDE_START,
              end: PROFILE_PIN_HIDE_END,
              scrub: true,
            },
          })
          .fromTo(
            profile,
            { autoAlpha: 1, yPercent: 0 },
            {
              yPercent: PROFILE_PIN_HIDE_Y,
              ease: "power2.out",
            },
          );
      }

      if (coverSection && coverLabel && coverBody) {
        coverContentTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: coverSection,
              start: "top top",
              end: () => "+=" + window.innerHeight * 0.9,
              scrub: true,
              pin: true,
              pinSpacing: true,
            },
          })
          .fromTo(coverLabel, { yPercent: -12 }, { yPercent: 12, ease: "none" }, 0)
          .fromTo(coverBody, { yPercent: 12 }, { yPercent: -12, ease: "none" }, 0);
      }

      const heroPin = ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: () => "+=" + window.innerHeight,
        pin: true,
        pinReparent: true,
        anticipatePin: 1,
      });

      ScrollTrigger.refresh();

      return () => {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
        // Smooth Scrollbar lifecycle handled by ScrollProvider
        videoShrinkTimeline.scrollTrigger?.kill();
        videoShrinkTimeline.kill();
        coverTimeline?.scrollTrigger?.kill();
        coverTimeline?.kill();
        coverContentTimeline?.scrollTrigger?.kill();
        coverContentTimeline?.kill();
        labelExitTimeline?.scrollTrigger?.kill();
        labelExitTimeline?.kill();
        profileCoverTrigger?.kill();
        profileHideTimeline?.scrollTrigger?.kill();
        profileHideTimeline?.kill();
        if (profile) {
          gsap.set(profile, { zIndex: PROFILE_BASE_Z_INDEX });
        }
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
  nameplate: HTMLDivElement | null;
  designation: HTMLDivElement | null;
};

function applyReducedMotionState({
  pill,
  pillContent,
  video,
  overlay,
  pillSkin,
  profile,
  navRow,
  nameplate,
  designation,
}: ReducedMotionArgs) {
  gsap.set(pill, {
    ...FINAL_PANEL_STATE,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: PILL_SHRINK_BORDER,
    boxShadow: PILL_SHRINK_BOX_SHADOW,
  });
  gsap.set(pillContent, { autoAlpha: 0 });
  gsap.set(video, { autoAlpha: 1 });

  if (overlay) {
    gsap.set(overlay, { autoAlpha: 0.55 });
  }

  if (pillSkin) {
    gsap.set(pillSkin, { autoAlpha: 0 });
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
}

function calculateNavYOffset(navRow: HTMLDivElement, pill: HTMLDivElement) {
  const pillHeight = pill.getBoundingClientRect().height || pill.offsetHeight || 0;
  const navHeight = navRow.getBoundingClientRect().height || navRow.offsetHeight || 0;
  return -(navHeight - pillHeight) / 2;
}
