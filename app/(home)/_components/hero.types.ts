import type { CSSProperties, MutableRefObject } from "react";

export type HeroAnimationRefs = {
  smoothWrapperRef: MutableRefObject<HTMLDivElement | null>;
  smoothContentRef: MutableRefObject<HTMLDivElement | null>;
  heroSectionRef: MutableRefObject<HTMLDivElement | null>;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  coverSectionRef: MutableRefObject<HTMLDivElement | null>;
  coverFillRef: MutableRefObject<HTMLDivElement | null>;
  coverLabelRef: MutableRefObject<HTMLDivElement | null>;
  coverBodyRef: MutableRefObject<HTMLDivElement | null>;
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  videoOverlayRef: MutableRefObject<HTMLDivElement | null>;
  pillRef: MutableRefObject<HTMLDivElement | null>;
  pillContentRef: MutableRefObject<HTMLDivElement | null>;
  pillSkinRef: MutableRefObject<HTMLDivElement | null>;
  profileRef: MutableRefObject<HTMLDivElement | null>;
  navRowRef: MutableRefObject<HTMLDivElement | null>;
};

export type HeroStageProps = Pick<
  HeroAnimationRefs,
  "containerRef" | "navRowRef" | "pillRef" | "videoRef" | "videoOverlayRef" | "pillContentRef" | "pillSkinRef"
> & {
  navRowBaseStyle: CSSProperties;
};

export type HeroPillProps = Pick<
  HeroAnimationRefs,
  "pillRef" | "videoRef" | "videoOverlayRef" | "pillContentRef" | "pillSkinRef"
>;

export type HeroProfileProps = Pick<HeroAnimationRefs, "profileRef"> & {
  prefersReducedMotion: boolean;
};
