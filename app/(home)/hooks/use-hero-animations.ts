import { lockScroll } from "@/lib/scroll-lock";
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

function calculateNavYOffset(
  navRow: HTMLDivElement,
  pill: HTMLDivElement,
  targetPillHeight?: number,
) {
  const measuredPillHeight = pill.getBoundingClientRect().height || pill.offsetHeight || 0;
  const pillHeight = typeof targetPillHeight === "number" ? targetPillHeight : measuredPillHeight;
  const navHeight = navRow.getBoundingClientRect().height || navRow.offsetHeight || 0;
  if (!navHeight || !pillHeight) {
    return 0;
  }
  return (pillHeight - navHeight) / 2;
}

type NavMeasurementArgs = {
  navRow: HTMLDivElement;
  pill: HTMLDivElement;
  navSpacerEl: HTMLDivElement | null;
  firstNavButton: HTMLElement | null;
};

type NavMeasurementHelpers = {
  getTargetPillWidth: () => number;
  getTargetPillHeight: () => number;
  getNavRowYOffset: () => number;
  getPillCenterOffset: () => { x: number; y: number };
};

function createNavMeasurementHelpers({
  navRow,
  pill,
  navSpacerEl,
  firstNavButton,
}: NavMeasurementArgs): NavMeasurementHelpers {
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

  const getTargetCenter = () => {
    const spacerRect = navSpacerEl?.getBoundingClientRect();
    const buttonRect = firstNavButton?.getBoundingClientRect();
    const navRect = navRow.getBoundingClientRect();
    const xCenter = spacerRect
      ? spacerRect.left + spacerRect.width / 2
      : navRect.left + navRect.width / 2;
    const yCenter = buttonRect
      ? buttonRect.top + buttonRect.height / 2
      : navRect.top + navRect.height / 2;
    return { x: xCenter, y: yCenter };
  };

  const getNavRowYOffset = () => calculateNavYOffset(navRow, pill, getTargetPillHeight());

  const getPillCenterOffset = () => {
    const pr = pill.getBoundingClientRect();
    const target = getTargetCenter();
    return {
      x: target.x - (pr.left + pr.width / 2),
      y: target.y + getNavRowYOffset() - (pr.top + pr.height / 2),
    };
  };

  return {
    getTargetPillWidth,
    getTargetPillHeight,
    getNavRowYOffset,
    getPillCenterOffset,
  };
}

type SkillsEntranceArgs = {
  section: HTMLElement | null;
  rowsAbove?: Array<HTMLDivElement | null>;
  rowsBelow?: Array<HTMLDivElement | null>;
  heading?: HTMLHeadingElement | null;
};

function createSkillsEntranceAnimation({
  section,
  rowsAbove = [],
  rowsBelow = [],
  heading,
}: SkillsEntranceArgs) {
  if (!section) {
    return () => {};
  }

  const aboveEls = rowsAbove.filter((row): row is HTMLDivElement => Boolean(row));
  const belowEls = rowsBelow.filter((row): row is HTMLDivElement => Boolean(row));
  const headingEl = heading ?? null;

  if (!aboveEls.length && !belowEls.length && !headingEl) {
    return () => {};
  }

  const timeline = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "bottom center",
      scrub: true,
    },
  });

  if (headingEl) {
    gsap.set(headingEl, { transformOrigin: "50% 50%" });
    timeline.fromTo(
      headingEl,
      { autoAlpha: 0, yPercent: 12, scale: 0.88 },
      { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.6 },
      0.12,
    );
  }

  if (aboveEls.length) {
    timeline.fromTo(
      aboveEls,
      { autoAlpha: 0, xPercent: 18 },
      { autoAlpha: 1, xPercent: 0, stagger: 0.12 },
      0,
    );
  }

  if (belowEls.length) {
    timeline.fromTo(
      belowEls,
      { autoAlpha: 0, xPercent: -18 },
      { autoAlpha: 1, xPercent: 0, stagger: 0.12 },
      aboveEls.length ? 0.25 : 0,
    );
  }

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };
}

type PillShrinkTimelineArgs = NavMeasurementHelpers & {
  heroSection: HTMLDivElement;
  navRow: HTMLDivElement;
  pill: HTMLDivElement;
  pillContent: HTMLDivElement;
  pillSkin: HTMLDivElement | null;
  video: HTMLVideoElement;
  overlay: HTMLDivElement | null;
};

type PillShrinkTimelineResult = {
  timeline: gsap.core.Timeline;
  cleanup: () => void;
};

function createPillShrinkTimeline({
  heroSection,
  navRow,
  pill,
  pillContent,
  pillSkin,
  video,
  overlay,
  getTargetPillWidth,
  getTargetPillHeight,
  getNavRowYOffset,
  getPillCenterOffset,
}: PillShrinkTimelineArgs): PillShrinkTimelineResult {
  const pillShrinkCompleteLabel = "pillShrinkComplete";
  gsap.set(pill, { borderWidth: 0, borderColor: "transparent" });

  let pillSnapTween: gsap.core.Tween | null = null;
  let videoShrinkTimeline: gsap.core.Timeline;
  let lastTargetOffset: { x: number; y: number } | null = null;

  const MIN_SCROLL_PROGRESS_FOR_ALIGNMENT = 0.05;
  const syncPillToNavRow = () => {
    if (!videoShrinkTimeline) {
      return;
    }
    const trigger = videoShrinkTimeline.scrollTrigger;
    if (!trigger) {
      return;
    }
    if (trigger.progress < MIN_SCROLL_PROGRESS_FOR_ALIGNMENT && !trigger.isActive) {
      lastTargetOffset = null;
      return;
    }
    const offset = getPillCenterOffset();
    if (
      lastTargetOffset &&
      Math.abs(offset.x - lastTargetOffset.x) < 0.5 &&
      Math.abs(offset.y - lastTargetOffset.y) < 0.5
    ) {
      return;
    }
    lastTargetOffset = offset;
    pillSnapTween?.kill();
    pillSnapTween = gsap.to(pill, {
      x: offset.x,
      y: offset.y,
      duration: trigger.isActive ? 0.3 : 0,
      ease: "power2.out",
    });
  };

  videoShrinkTimeline = gsap
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
        onUpdate: () => syncPillToNavRow(),
        onRefresh: () => syncPillToNavRow(),
      },
    })
    .to(
      pill,
      {
        width: () => `${getTargetPillWidth()}px`,
        height: () => `${getTargetPillHeight()}px`,
        x: () => getPillCenterOffset().x,
        y: () => getPillCenterOffset().y,
        borderRadius: "384px",
        backgroundColor: PILL_SHRINK_BACKGROUND,
        ease: "none",
        force3D: true,
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
        y: () => getNavRowYOffset(),
        duration: 0.45,
        ease: "power2.out",
      },
    0.55,
  );

  return {
    timeline: videoShrinkTimeline,
    cleanup: () => {
      videoShrinkTimeline.scrollTrigger?.kill();
      videoShrinkTimeline.kill();
      pillSnapTween?.kill();
    },
  };
}

type LabelExitTimelineArgs = {
  heroSection: HTMLDivElement;
  nameplate: HTMLDivElement | null;
  designation: HTMLDivElement | null;
};

function createLabelExitTimeline({
  heroSection,
  nameplate,
  designation,
}: LabelExitTimelineArgs) {
  const labelTargets = [nameplate, designation].filter(
    (node): node is HTMLDivElement => Boolean(node),
  );

  if (!labelTargets.length) {
    return null;
  }

  return gsap
    .timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: () => "+=" + window.innerHeight * LABEL_EXIT_SCROLL_DISTANCE,
        scrub: true,
      },
    })
    .to(labelTargets, {
      autoAlpha: 0,
      yPercent: LABEL_EXIT_Y_PERCENT,
      ease: "power2.inOut",
    });
}

type CoverAnimationArgs = {
  profile: HTMLDivElement | null;
  coverSection: HTMLDivElement | null;
  coverFill: HTMLDivElement | null;
  coverLabel: HTMLDivElement | null;
  coverBody: HTMLDivElement | null;
};

function createCoverAnimations({
  profile,
  coverSection,
  coverFill,
  coverLabel,
  coverBody,
}: CoverAnimationArgs) {
  const cleanupFns: Array<() => void> = [];

  const coverStartTrigger = coverSection;
  const coverEndTrigger = coverSection;
  const coverStartPosition = "bottom bottom";
  const coverEndPosition = "bottom bottom";

  if (profile && coverStartTrigger && coverEndTrigger) {
    const setProfileCoverage = (covered: boolean) => {
      gsap.set(profile, {
        zIndex: covered ? PROFILE_COVER_Z_INDEX : PROFILE_BASE_Z_INDEX,
      });
    };

    const profileCoverTrigger = ScrollTrigger.create({
      trigger: coverStartTrigger,
      start: coverStartPosition,
      endTrigger: coverEndTrigger,
      end: coverEndPosition,
      onEnter: () => setProfileCoverage(true),
      onEnterBack: () => setProfileCoverage(true),
      onLeave: () => setProfileCoverage(false),
      onLeaveBack: () => setProfileCoverage(false),
    });

    cleanupFns.push(() => profileCoverTrigger.kill());
  }

  if (coverSection && coverFill) {
    gsap.set(coverFill, { transformOrigin: "50% 100%" });

    const coverTimeline = gsap.fromTo(
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

    cleanupFns.push(() => killTween(coverTimeline));
  }

  if (coverSection && coverLabel && coverBody) {
    const coverContentTimeline = gsap
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

    cleanupFns.push(() => killTimeline(coverContentTimeline));
  }

  return () => {
    cleanupFns.forEach((cleanup) => cleanup());
    if (profile) {
      gsap.set(profile, { zIndex: PROFILE_BASE_Z_INDEX });
    }
  };
}

function createHeroPin(heroSection: HTMLDivElement) {
  return ScrollTrigger.create({
    trigger: heroSection,
    start: "top top",
    end: () => "+=" + window.innerHeight,
    pin: true,
    pinReparent: true,
    anticipatePin: 1,
  });
}

function createProfileScrollTween(heroSection: HTMLDivElement, profile: HTMLDivElement) {
  return gsap.to(profile, {
    ...PROFILE_SCROLL_CONFIG,
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: () => "+=" + window.innerHeight * HERO_SCROLL_DISTANCE,
      scrub: true,
    },
  });
}

function killTween(tween: gsap.core.Tween | null | undefined) {
  tween?.scrollTrigger?.kill();
  tween?.kill();
}

function killTimeline(timeline: gsap.core.Timeline | null | undefined) {
  timeline?.scrollTrigger?.kill();
  timeline?.kill();
}
