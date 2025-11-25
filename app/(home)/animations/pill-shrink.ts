import { gsap } from "gsap";
import {
  PILL_SHRINK_BACKGROUND,
  PILL_SHRINK_BORDER,
  PILL_SHRINK_BOX_SHADOW,
  PROFILE_SCROLL_CONFIG,
  SCROLL_THRESHOLDS,
  SCROLL_TIMING,
  NAV_INITIAL_STATE,
  OVERLAY_OPACITY,
} from "../components/config";
import { NavMeasurementHelpers } from "./nav-measurement";

export type PillShrinkTimelineArgs = NavMeasurementHelpers & {
  heroSection: HTMLDivElement;
  navRow: HTMLDivElement;
  pill: HTMLDivElement;
  pillContent: HTMLDivElement;
  pillSkin: HTMLDivElement | null;
  video: HTMLVideoElement;
  overlay: HTMLDivElement | null;
  watermarkMask: HTMLDivElement | null;
  profile: HTMLDivElement;
};

export type PillShrinkTimelineResult = {
  timeline: gsap.core.Timeline;
  cleanup: () => void;
};

/**
 * Creates the main pill shrink animation that morphs the hero panel into a navigation button.
 *
 * This complex timeline coordinates multiple effects:
 * - Pill dimensions shrink to match nav button size
 * - Pill repositions to align with navigation row
 * - Video and overlay fade out
 * - Pill content (text) fades in
 * - Border and shadow effects appear
 * - Navigation row fades in
 *
 * The animation is scroll-driven with slight smoothing for elegant motion.
 * It also includes a snap mechanism to keep the pill aligned with the nav
 * row during resize events.
 *
 * @param args - Elements and measurement helpers for the animation
 * @returns Timeline and cleanup function
 */
export function createPillShrinkTimeline({
  heroSection,
  navRow,
  pill,
  pillContent,
  pillSkin,
  video,
  overlay,
  watermarkMask,
  profile,
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
  const isSmallScreen =
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
  const scrubSmoothing = isSmallScreen ? 0.9 : SCROLL_TIMING.SCRUB_SMOOTHING;

  const syncPillToNavRow = () => {
    if (!videoShrinkTimeline) {
      return;
    }
    const trigger = videoShrinkTimeline.scrollTrigger;
    if (!trigger) {
      return;
    }
    // Skip alignment if animation hasn't started (progress < 5%) and isn't currently active.
    // This prevents unnecessary calculations before the scroll animation begins.
    if (trigger.progress < SCROLL_THRESHOLDS.MIN_ALIGNMENT_PROGRESS && !trigger.isActive) {
      lastTargetOffset = null;
      return;
    }
    const offset = getPillCenterOffset();
    // Optimization: skip re-alignment if position change is negligible (< 0.5px).
    // This prevents excessive tweens during minor layout shifts or rounding errors.
    if (
      lastTargetOffset &&
      Math.abs(offset.x - lastTargetOffset.x) < SCROLL_THRESHOLDS.PILL_POSITION_TOLERANCE &&
      Math.abs(offset.y - lastTargetOffset.y) < SCROLL_THRESHOLDS.PILL_POSITION_TOLERANCE
    ) {
      return;
    }
    lastTargetOffset = offset;
    pillSnapTween?.kill();
    // Animate pill position to match nav row (instant if not actively scrolling).
    pillSnapTween = gsap.to(pill, {
      x: offset.x,
      y: offset.y,
      duration: trigger.isActive ? SCROLL_TIMING.PILL_SNAP_DURATION : 0,
      ease: "power2.out",
    });
  };

  videoShrinkTimeline = gsap
    .timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        // End position: exactly one viewport height of scrolling.
        // This gives the pill shrink animation a full viewport to complete.
        end: () => "+=" + window.innerHeight,
        scrub: scrubSmoothing,
        onEnter: () => {
          // Set transform origin to center for both pill and video.
          // This ensures scale/position animations transform from the center point.
          // Must be set on both enter and enterBack to handle bidirectional scrolling.
          gsap.set([pill, video], { transformOrigin: "50% 50%" });
          gsap.set(profile, { transformOrigin: PROFILE_SCROLL_CONFIG.transformOrigin });
        },
        onEnterBack: () => {
          // Re-apply transform origin when scrolling back up.
          gsap.set([pill, video], { transformOrigin: "50% 50%" });
          gsap.set(profile, { transformOrigin: PROFILE_SCROLL_CONFIG.transformOrigin });
        },
        invalidateOnRefresh: true,
        onUpdate: isSmallScreen ? undefined : () => syncPillToNavRow(),
        onRefresh: () => {
          lastTargetOffset = null;
          if (!isSmallScreen) {
            syncPillToNavRow();
          }
        },
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
        duration: SCROLL_TIMING.PILL_BORDER_DURATION,
        ease: "power1.out",
      },
      pillShrinkCompleteLabel,
    )
    .to(
      pillContent,
      {
        color: "#ffffff",
        textShadow: "0 6px 18px rgba(0,0,0,0.55)",
        duration: SCROLL_TIMING.PILL_CONTENT_DURATION,
        ease: "power1.out",
      },
      pillShrinkCompleteLabel,
    )
    .to(
      pillContent,
      {
        autoAlpha: 1,
        duration: SCROLL_TIMING.PILL_CONTENT_FADE_DURATION,
        ease: "power1.out",
      },
      pillShrinkCompleteLabel,
    );

  if (pillSkin) {
    videoShrinkTimeline.to(
      pillSkin,
      {
        autoAlpha: 1,
        duration: SCROLL_TIMING.PILL_SKIN_FADE_DURATION,
        ease: "power1.out",
      },
      pillShrinkCompleteLabel,
    );
  }

  if (overlay) {
    videoShrinkTimeline.fromTo(
      overlay,
      { autoAlpha: OVERLAY_OPACITY.INITIAL },
      {
        autoAlpha: OVERLAY_OPACITY.PEAK,
        duration: SCROLL_TIMING.OVERLAY_FADE_DURATION,
        ease: "none",
        immediateRender: false,
      },
      0,
    );
    videoShrinkTimeline.to(
      overlay,
      {
        autoAlpha: 0,
        duration: SCROLL_TIMING.VIDEO_FADE_OUT_DURATION,
        ease: "power1.out",
      },
      pillShrinkCompleteLabel,
    );
  }

  if (watermarkMask) {
    // Keep the watermark mask visible throughout scroll until the video fades out.
    videoShrinkTimeline.to(
      watermarkMask,
      {
        autoAlpha: 1,
        duration: SCROLL_TIMING.OVERLAY_FADE_DURATION,
        ease: "none",
      },
      0,
    );
    videoShrinkTimeline.to(
      watermarkMask,
      {
        autoAlpha: 0,
        duration: SCROLL_TIMING.VIDEO_FADE_OUT_DURATION,
        ease: "power1.out",
      },
      pillShrinkCompleteLabel,
    );
  }

  videoShrinkTimeline.to(
    video,
    {
      autoAlpha: 0,
      duration: SCROLL_TIMING.VIDEO_FADE_OUT_DURATION,
      ease: "power1.out",
    },
    pillShrinkCompleteLabel,
  );

  videoShrinkTimeline.fromTo(
    navRow,
    {
      autoAlpha: 0,
      yPercent: NAV_INITIAL_STATE.Y_PERCENT,
    },
    {
      autoAlpha: 1,
      yPercent: 0,
      y: () => getNavRowYOffset(),
      duration: SCROLL_TIMING.NAV_FADE_DURATION,
      ease: "power2.out",
    },
    SCROLL_TIMING.NAV_ROW_START_OFFSET,
  );

  // Keep the profile scale progression locked to the pill/video shrink timeline.
  // Finish slightly earlier than the full timeline so the profile is fully shrunk by the time
  // the pill/video morph completes.
  const profileTweenDuration = videoShrinkTimeline.duration() * 0.5;
  videoShrinkTimeline.to(
    profile,
    {
      scale: PROFILE_SCROLL_CONFIG.scale,
      transformOrigin: PROFILE_SCROLL_CONFIG.transformOrigin,
      ease: PROFILE_SCROLL_CONFIG.ease,
      duration: profileTweenDuration,
    },
    0,
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
