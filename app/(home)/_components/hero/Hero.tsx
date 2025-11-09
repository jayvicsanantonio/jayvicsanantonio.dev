"use client";

import { useRef, type ReactNode } from "react";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import HeroProfile from "./components/HeroProfile";
import HeroStage from "./components/HeroStage";
import useHeroAnimations from "./hooks/use-hero-animations";
import { INITIAL_NAV_ROW_STYLE } from "./hero.constants";
import type { HeroAnimationRefs } from "./hero.types";

type HeroProps = {
  children?: ReactNode;
};

export default function Hero({ children }: HeroProps) {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillContentRef = useRef<HTMLDivElement>(null);
  const pillSkinRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navRowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const heroRefs: HeroAnimationRefs = {
    smoothWrapperRef,
    smoothContentRef,
    heroSectionRef,
    containerRef,
    videoRef,
    videoOverlayRef,
    pillRef,
    pillContentRef,
    pillSkinRef,
    profileRef,
    navRowRef,
  };

  useHeroAnimations({ refs: heroRefs, prefersReducedMotion });

  return (
    <div ref={smoothWrapperRef} id="smooth-wrapper" className="relative w-full text-white">
      <div
        ref={smoothContentRef}
        id="smooth-content"
        className="w-full"
        style={{ willChange: prefersReducedMotion ? undefined : "transform" }}
      >
        <section ref={heroSectionRef} className="relative min-h-screen overflow-hidden">
          <HeroStage
            {...{
              containerRef,
              navRowRef,
              navRowBaseStyle: INITIAL_NAV_ROW_STYLE,
              pillRef,
              videoRef,
              videoOverlayRef,
              pillContentRef,
              pillSkinRef,
            }}
          />
        </section>

        <>
          {children}
          <section aria-hidden className="h-[140vh]" />
        </>
      </div>

      <HeroProfile profileRef={profileRef} prefersReducedMotion={prefersReducedMotion} />
    </div>
  );
}
