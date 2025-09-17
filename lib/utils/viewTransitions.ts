// View Transitions API detection and safe usage utilities
// Provides fallbacks for browsers that don't support View Transitions

/**
 * Detects if the browser supports the View Transitions API
 * @returns {boolean} True if View Transitions API is supported
 */
export function supportsViewTransitions(): boolean {
  return (
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    typeof document.startViewTransition === 'function'
  );
}

/**
 * Safely executes a view transition with fallback for unsupported browsers
 * @param {() => void | Promise<void>} updateCallback - Function that updates the DOM
 * @returns {Promise<void>} Promise that resolves when transition completes
 */
export async function safeViewTransition(
  updateCallback: () => void | Promise<void>,
): Promise<void> {
  if (!supportsViewTransitions()) {
    // Fallback: execute callback directly without view transition
    await updateCallback();
    return;
  }

  try {
    // Use View Transitions API
    const transition = document.startViewTransition(async () => {
      await updateCallback();
    });

    await transition.finished;
  } catch (error) {
    // Fallback if view transition fails
    console.warn('View transition failed, falling back to direct update:', error);
    await updateCallback();
  }
}

/**
 * Type guard to check if we're in a browser environment
 * @returns {boolean} True if running in browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
