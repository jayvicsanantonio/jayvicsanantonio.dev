import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    anticipatePin: 1,
  });
}

/**
 * Creates a ScrollTrigger that pins the skills section when it reaches the bottom.
 *
 * This allows the About section to slide up over the Skills section.
 *
 * @param skillsSection - The skills section element to pin
 * @returns ScrollTrigger instance
 */
export function createSkillsPin(skillsSection: HTMLElement): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: skillsSection,
    start: "bottom bottom",
    end: () => "+=" + window.innerHeight,
    pin: true,
    pinSpacing: false,
    anticipatePin: 1,
  });
}
