import type { MutableRefObject } from "react";

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
  mobileHeroTextRef: MutableRefObject<HTMLDivElement | null>;
};

export type MarqueeRowConfig = {
  items: string[];
  duration?: number;
  direction?: "left" | "right";
};
