

/**
 * Safely kills a GSAP tween and its associated ScrollTrigger.
 *
 * Handles null/undefined values gracefully, making it safe to use
 * in cleanup functions without additional checks.
 *
 * @param tween - The tween to kill (can be null/undefined)
 */
export function killTween(tween: gsap.core.Tween | null | undefined): void {
  tween?.scrollTrigger?.kill();
  tween?.kill();
}

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
