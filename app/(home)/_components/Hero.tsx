"use client";

import { useRef, type ReactNode } from "react";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import HeroProfile from "./HeroProfile";
import HeroStage from "./HeroStage";
import useHeroAnimations from "../hooks/use-hero-animations";
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
  const coverSectionRef = useRef<HTMLDivElement>(null);
  const coverFillRef = useRef<HTMLDivElement>(null);
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
    coverSectionRef,
    coverFillRef,
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
          <section
            ref={coverSectionRef}
            className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-16"
            aria-label="Closing call to action"
          >
            <div
              ref={coverFillRef}
              className="absolute inset-0 origin-bottom scale-y-0 bg-cyan-950"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-3xl text-center text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.36em] text-cyan-200 sm:text-base">
                Thanks for scrolling
              </p>
              <p className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl">
                Let&apos;s build the next standout experience together.
              </p>
            </div>
          </section>
        </>
      </div>

      <HeroProfile profileRef={profileRef} prefersReducedMotion={prefersReducedMotion} />
    </div>
  );
}
