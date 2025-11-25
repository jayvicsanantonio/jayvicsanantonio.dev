import { ScrollTrigger } from "gsap/ScrollTrigger";

// ============================================================================
// Hero Pin
// ============================================================================

/**
 * Creates a ScrollTrigger that pins the hero section during scroll animations.
 *
 * Keeps the hero section fixed in viewport while scroll-driven animations play,
 * creating the illusion of elements transforming in place.
 *
 * @param heroSection - The hero section element to pin
 * @returns ScrollTrigger instance
 */
export function createHeroPin(heroSection: HTMLDivElement): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: heroSection,
    start: "top top",
    // Pin duration: one full viewport height of scrolling.
    // Keeps hero section fixed while scroll animations play.
    end: () => "+=" + window.innerHeight,
    pin: true,
    pinReparent: true,
    anticipatePin: 1,
  });
}
