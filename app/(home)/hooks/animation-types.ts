

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
};

export type NavMeasurementArgs = {
  navRow: HTMLDivElement;
  pill: HTMLDivElement;
  navSpacerEl: HTMLDivElement | null;
  firstNavButton: HTMLElement | null;
};

export type NavMeasurementHelpers = {
  getTargetPillWidth: () => number;
  getTargetPillHeight: () => number;
  getNavRowYOffset: () => number;
  getPillCenterOffset: () => { x: number; y: number };
};

export type SkillsEntranceArgs = {
  section: HTMLElement | null;
  rowsAbove?: Array<HTMLDivElement | null>;
  rowsBelow?: Array<HTMLDivElement | null>;
  heading?: HTMLHeadingElement | null;
  heroSection?: HTMLDivElement | null;
};

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

export type LabelExitTimelineArgs = {
  heroSection: HTMLDivElement;
  nameplate: HTMLDivElement | null;
  designation: HTMLDivElement | null;
};

export type CoverAnimationArgs = {
  profile: HTMLDivElement | null;
  coverSection: HTMLDivElement | null;
  coverFill: HTMLDivElement | null;
  coverLabel: HTMLDivElement | null;
  coverBody: HTMLDivElement | null;
};

export type ProfileSectionVisibilityArgs = {
  profile: HTMLDivElement | null;
  section: HTMLElement | null;
};
