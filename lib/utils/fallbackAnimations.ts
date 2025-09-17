// Fallback animation utilities for browsers without View Transitions support
// Provides CSS-based animations as graceful degradation for Safari

/**
 * CSS classes for fallback animations when View Transitions aren't supported
 */
export const FALLBACK_ANIMATIONS = {
  /** Fade in/out transition */
  fade: {
    enter: 'transition-opacity duration-300 ease-in-out opacity-0',
    enterActive: 'opacity-100',
    exit: 'transition-opacity duration-300 ease-in-out opacity-100',
    exitActive: 'opacity-0',
  },
  /** Slide up transition */
  slideUp: {
    enter: 'transition-transform duration-300 ease-out translate-y-4 opacity-0',
    enterActive: 'translate-y-0 opacity-100',
    exit: 'transition-transform duration-300 ease-in translate-y-0 opacity-100',
    exitActive: '-translate-y-4 opacity-0',
  },
  /** Scale transition */
  scale: {
    enter: 'transition-transform duration-200 ease-out scale-95 opacity-0',
    enterActive: 'scale-100 opacity-100',
    exit: 'transition-transform duration-200 ease-in scale-100 opacity-100',
    exitActive: 'scale-95 opacity-0',
  },
} as const;

/**
 * Applies fallback animation classes to an element
 * @param {HTMLElement} element - Element to animate
 * @param {keyof typeof FALLBACK_ANIMATIONS} animation - Animation type
 * @param {'enter' | 'exit'} direction - Animation direction
 * @returns {Promise<void>} Promise that resolves when animation completes
 */
export function applyFallbackAnimation(
  element: HTMLElement,
  animation: keyof typeof FALLBACK_ANIMATIONS,
  direction: 'enter' | 'exit'
): Promise<void> {
  return new Promise((resolve) => {
    const config = FALLBACK_ANIMATIONS[animation];
    const initialClass = direction === 'enter' ? config.enter : config.exit;
    const activeClass = direction === 'enter' ? config.enterActive : config.exitActive;

    // Apply initial state
    element.className = `${element.className} ${initialClass}`;

    // Force reflow
    element.offsetHeight;

    // Apply transition
    element.className = element.className.replace(initialClass, activeClass);

    // Clean up after animation
    const cleanup = () => {
      element.className = element.className
        .replace(initialClass, '')
        .replace(activeClass, '')
        .trim();
      resolve();
    };

    // Listen for transition end
    element.addEventListener('transitionend', cleanup, { once: true });

    // Fallback timeout in case transitionend doesn't fire
    setTimeout(cleanup, 350);
  });
}

/**
 * Creates a simple crossfade between two elements for page transitions
 * @param {HTMLElement} exitElement - Element to fade out
 * @param {HTMLElement} enterElement - Element to fade in
 * @returns {Promise<void>} Promise that resolves when crossfade completes
 */
export async function crossfadeElements(
  exitElement: HTMLElement,
  enterElement: HTMLElement
): Promise<void> {
  await Promise.all([
    applyFallbackAnimation(exitElement, 'fade', 'exit'),
    applyFallbackAnimation(enterElement, 'fade', 'enter'),
  ]);
}