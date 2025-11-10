"use client";

import { Children, cloneElement, isValidElement, useRef, type ReactNode } from "react";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

import HeroProfile from "./HeroProfile";
import HeroStage from "./HeroStage";
import { HERO_ABOUT_SECTION_ID } from "./About";
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
  const coverLabelRef = useRef<HTMLDivElement>(null);
  const coverBodyRef = useRef<HTMLDivElement>(null);
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
    coverLabelRef,
    coverBodyRef,
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

        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return child;
          }

          const childType = child.type as { heroSectionId?: string };
          if (childType?.heroSectionId === HERO_ABOUT_SECTION_ID) {
            return cloneElement(child, {
              sectionRef: coverSectionRef,
              labelRef: coverLabelRef,
              bodyRef: coverBodyRef,
            } as Record<string, unknown>);
          }

          return child;
        })}
      </div>

      <HeroProfile profileRef={profileRef} prefersReducedMotion={prefersReducedMotion} />
      <div
        ref={coverFillRef}
        className="pointer-events-none fixed inset-0 z-[60] origin-bottom scale-y-0 bg-cyan-950"
        aria-hidden="true"
      />
    </div>
  );
}
