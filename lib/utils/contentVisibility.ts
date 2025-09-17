// Content visibility utilities with Safari fallbacks
import { getBrowserCapabilities } from './browserUtils';

/**
 * Check if content-visibility is supported
 */
export const supportsContentVisibility = (): boolean => {
  if (typeof window === 'undefined') return false;
  return CSS.supports('content-visibility: auto');
};

/**
 * Content visibility manager for Safari fallbacks
 */
export class ContentVisibilityManager {
  private observer: IntersectionObserver | null = null;
  private elements = new Set<Element>();
  private capabilities = getBrowserCapabilities();

  constructor() {
    // Only set up intersection observer if content-visibility is not supported
    if (!supportsContentVisibility() && typeof window !== 'undefined') {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            // Element is visible, ensure it's rendered
            element.style.visibility = 'visible';
            element.style.position = '';
            element.style.clip = '';
            element.dataset.contentVisible = 'true';
          } else {
            // Element is not visible, can optimize rendering
            if (this.capabilities.isSafari) {
              // More aggressive optimization for Safari
              element.style.visibility = 'hidden';
              element.style.position = 'absolute';
              element.style.clip = 'rect(0, 0, 0, 0)';
            }
            element.dataset.contentVisible = 'false';
          }
        });
      },
      {
        // Use larger root margin for better performance
        rootMargin: '100px',
        threshold: [0, 0.1],
      },
    );
  }

  /**
   * Observe an element for content visibility optimization
   */
  observe(element: Element): void {
    if (supportsContentVisibility()) {
      // Native support, just add the class
      element.classList.add('content-visibility-auto');
      return;
    }

    // Fallback to intersection observer
    if (this.observer) {
      this.observer.observe(element);
      this.elements.add(element);
    }
  }

  /**
   * Stop observing an element
   */
  unobserve(element: Element): void {
    if (this.observer) {
      this.observer.unobserve(element);
      this.elements.delete(element);
    }
  }

  /**
   * Cleanup all observers
   */
  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.elements.clear();
    }
  }
}

// Global instance for reuse
let globalManager: ContentVisibilityManager | null = null;

/**
 * Get the global content visibility manager
 */
export const getContentVisibilityManager = (): ContentVisibilityManager => {
  if (!globalManager) {
    globalManager = new ContentVisibilityManager();
  }
  return globalManager;
};

/**
 * React hook for content visibility optimization
 */
export const useContentVisibility = () => {
  const manager = getContentVisibilityManager();

  const observeElement = (element: Element | null) => {
    if (element) {
      manager.observe(element);
    }
  };

  const unobserveElement = (element: Element | null) => {
    if (element) {
      manager.unobserve(element);
    }
  };

  return {
    observeElement,
    unobserveElement,
    supportsNative: supportsContentVisibility(),
  };
};

/**
 * Utility to apply content visibility classes with feature detection
 */
export const getContentVisibilityClasses = (baseClasses: string = ''): string => {
  const classes = [baseClasses];

  if (supportsContentVisibility()) {
    classes.push('content-visibility-auto');
  } else {
    // Add fallback classes for Safari and older browsers
    classes.push('contain-layout-style-paint');
  }

  return classes.filter(Boolean).join(' ');
};
