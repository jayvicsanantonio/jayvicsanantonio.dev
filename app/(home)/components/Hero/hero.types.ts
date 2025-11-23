import type { CSSProperties, MutableRefObject } from "react";

export type HeroAnimationRefs = {
  smoothWrapperRef: MutableRefObject<HTMLDivElement | null>;
  smoothContentRef: MutableRefObject<HTMLDivElement | null>;
  heroSectionRef: MutableRefObject<HTMLDivElement | null>;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  nameplateRef: MutableRefObject<HTMLDivElement | null>;
  designationRef: MutableRefObject<HTMLDivElement | null>;
  coverSectionRef: MutableRefObject<HTMLDivElement | null>;
  coverFillRef: MutableRefObject<HTMLDivElement | null>;
  coverLabelRef: MutableRefObject<HTMLDivElement | null>;
  coverBodyRef: MutableRefObject<HTMLDivElement | null>;
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  videoOverlayRef: MutableRefObject<HTMLDivElement | null>;
  videoWatermarkMaskRef: MutableRefObject<HTMLDivElement | null>;
  pillRef: MutableRefObject<HTMLDivElement | null>;
  pillContentRef: MutableRefObject<HTMLDivElement | null>;
  pillSkinRef: MutableRefObject<HTMLDivElement | null>;
  profileRef: MutableRefObject<HTMLDivElement | null>;
  navRowRef: MutableRefObject<HTMLDivElement | null>;
  aboutSectionRef: MutableRefObject<HTMLElement | null>;
  skillsSectionRef: MutableRefObject<HTMLElement | null>;
  skillsRowsAboveRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  skillsRowsBelowRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  skillsHeadingRef: MutableRefObject<HTMLHeadingElement | null>;
};

export type StageProps = Pick<
  HeroAnimationRefs,
  | "containerRef"
  | "navRowRef"
  | "pillRef"
  | "videoRef"
  | "videoOverlayRef"
  | "videoWatermarkMaskRef"
  | "pillContentRef"
  | "pillSkinRef"
> & {
  navRowBaseStyle: CSSProperties;
};

export type PillProps = Pick<
  HeroAnimationRefs,
  | "pillRef"
  | "videoRef"
  | "videoOverlayRef"
  | "videoWatermarkMaskRef"
  | "pillContentRef"
  | "pillSkinRef"
>;

export type ProfileProps = Pick<HeroAnimationRefs, "profileRef"> & {
  prefersReducedMotion: boolean;
};
