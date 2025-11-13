"use client";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { RefObject, useRef } from "react";
import Profile from "./Hero/Profile";
import Hero, { HeroProps } from "./Hero";
import type { HeroAnimationRefs } from "./Hero/hero.types";
import useHeroAnimations from "../hooks/use-hero-animations";
import Skills from "./Skills";
import About from "./About";

export default function HomePageContent({ children }: { children: React.ReactNode }) {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameplateRef = useRef<HTMLDivElement>(null);
  const coverSectionRef = useRef<HTMLDivElement>(null);
  const coverFillRef = useRef<HTMLDivElement>(null);
  const coverLabelRef = useRef<HTMLDivElement>(null);
  const coverBodyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillContentRef = useRef<HTMLDivElement>(null);
  const pillSkinRef = useRef<HTMLDivElement>(null);
  const navRowRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRefs: HeroAnimationRefs = {
    smoothWrapperRef,
    smoothContentRef,
    heroSectionRef,
    containerRef,
    nameplateRef,
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
    aboutSectionRef,
    skillsSectionRef,
  };
  useHeroAnimations({ refs: heroRefs, prefersReducedMotion });

  return (
    <main ref={smoothWrapperRef} id="smooth-wrapper" className="relative w-full text-white  ">
      {children}
      <div
        ref={smoothContentRef}
        id="smooth-content"
        className="w-full z-10"
        style={{ willChange: prefersReducedMotion ? undefined : "transform" }}
      >
        <Hero {...(heroRefs as unknown as HeroProps)} />
        <Skills sectionRef={skillsSectionRef} aboutSectionRef={aboutSectionRef} />
        <About aboutRef={aboutSectionRef as RefObject<HTMLDivElement>} />
      </div>
      <Profile profileRef={profileRef} prefersReducedMotion={prefersReducedMotion} />
    </main>
  );
}
