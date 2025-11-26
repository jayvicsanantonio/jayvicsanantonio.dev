import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { HeroAnimationRefs } from "../types";
import { useHeroIntroAnimation } from "./use-hero-intro-animation";
import { useHeroScrollAnimation } from "./use-hero-scroll-animation";

export type UseHeroAnimationArgs = {
  refs: HeroAnimationRefs;
  prefersReducedMotion: boolean;
};

gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.clearScrollMemory();

/**
 * Orchestrates all hero section animations including intro sequence and scroll-driven effects.
 *
 * This hook manages two main animation phases:
 * 1. Intro animation: Page load sequence with scroll locking
 * 2. Scroll animation: Parallax and morphing effects triggered by scroll
 *
 * Automatically respects user's motion preferences and handles cleanup on unmount.
 *
 * @param args - Animation configuration
 * @param args.refs - Collection of React refs to animated elements
 * @param args.prefersReducedMotion - Whether user prefers reduced motion
 *
 * @example
 * function HeroSection() {
 *   const refs = useHeroRefs();
 *   const prefersReducedMotion = usePrefersReducedMotion();
 *
 *   useHeroAnimations({ refs, prefersReducedMotion });
 *
 *   return <div ref={refs.containerRef}>...</div>;
 * }
 */
export default function useHeroAnimations(args: UseHeroAnimationArgs): void {
  useHeroIntroAnimation(args);
  useHeroScrollAnimation(args);
}
