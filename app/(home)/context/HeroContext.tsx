"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import type { HeroAnimationRefs } from "../types";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useHeroAnimations from "../hooks/use-hero-animations";

const HeroContext = createContext<HeroAnimationRefs | null>(null);

export function useHeroContext() {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("useHeroContext must be used within a HeroProvider");
  }
  return context;
}

export function HeroProvider({ children }: { children: ReactNode }) {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameplateRef = useRef<HTMLDivElement>(null);
  const designationRef = useRef<HTMLDivElement>(null);
  const coverSectionRef = useRef<HTMLDivElement>(null);
  const coverFillRef = useRef<HTMLDivElement>(null);
  const coverLabelRef = useRef<HTMLDivElement>(null);
  const coverBodyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const videoWatermarkMaskRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillContentRef = useRef<HTMLDivElement>(null);
  const pillSkinRef = useRef<HTMLDivElement>(null);
  const navRowRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const skillsSectionRef = useRef<HTMLElement>(null);
  const skillsRowsAboveRefs = useRef<Array<HTMLDivElement | null>>([]);
  const skillsRowsBelowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const skillsHeadingRef = useRef<HTMLHeadingElement>(null);
  const mobileHeroTextRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  const refs: HeroAnimationRefs = {
    smoothWrapperRef,
    smoothContentRef,
    heroSectionRef,
    containerRef,
    nameplateRef,
    designationRef,
    coverSectionRef,
    coverFillRef,
    coverLabelRef,
    coverBodyRef,
    videoRef,
    videoOverlayRef,
    videoWatermarkMaskRef,
    pillRef,
    pillContentRef,
    pillSkinRef,
    profileRef,
    navRowRef,
    aboutSectionRef,
    skillsSectionRef,
    skillsRowsAboveRefs,
    skillsRowsBelowRefs,
    skillsHeadingRef,
    mobileHeroTextRef,
  };

  useHeroAnimations({ refs, prefersReducedMotion });

  return (
    <HeroContext.Provider value={refs}>
      <main ref={smoothWrapperRef} id="smooth-wrapper" className="relative z-10 w-full text-white">
        {children}
      </main>
    </HeroContext.Provider>
  );
}
