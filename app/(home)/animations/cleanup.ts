// GSAP teardown helpers.
// Safely kills a timeline and any ScrollTrigger attached to it.
/**
 * Safely kills a GSAP timeline and its associated ScrollTrigger.
 *
 * Handles null/undefined values gracefully, making it safe to use
 * in cleanup functions without additional checks.
 *
 * @param timeline - The timeline to kill (can be null/undefined)
 */
export function killTimeline(timeline: gsap.core.Timeline | null | undefined): void {
  timeline?.scrollTrigger?.kill();
  timeline?.kill();
}
