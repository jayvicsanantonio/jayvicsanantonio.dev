// Touch interaction optimization utilities for Safari
// Handles mobile Safari-specific touch behaviors and hover state management

import { getBrowserCapabilities } from './browserUtils';
import { getIOSCapabilities } from './iosSafariUtils';

export interface TouchOptimizationConfig {
  preventZoom: boolean;
  disableHover: boolean;
  fastTap: boolean;
  smoothScroll: boolean;
  preventCallout: boolean;
  preventSelection: boolean;
}

/**
 * Gets optimized touch interaction classes based on device capabilities
 */
export const getTouchOptimizedClasses = (config: Partial<TouchOptimizationConfig> = {}): string => {
  const capabilities = getBrowserCapabilities();
  const iosCapabilities = getIOSCapabilities();

  const {
    preventZoom = true,
    disableHover = capabilities.isMobile,
    fastTap = true,
    smoothScroll = iosCapabilities.isIOSSafari,
    preventCallout = iosCapabilities.isIOSSafari,
    preventSelection = iosCapabilities.isIOSSafari,
  } = config;

  const classes = [];

  // Base touch optimization
  if (fastTap) {
    classes.push('touch-manipulation');
  }

  // iOS-specific optimizations
  if (iosCapabilities.isIOSSafari) {
    classes.push('ios-touch-optimized');

    if (smoothScroll) {
      classes.push('ios-scroll-smooth');
    }

    if (preventZoom) {
      classes.push('ios-no-zoom');
    }
  }

  // Mobile hover state handling
  if (disableHover && capabilities.isMobile) {
    classes.push('mobile-no-hover');
  }

  return classes.join(' ');
};

/**
 * Gets hover-aware CSS classes that adapt to mobile Safari
 */
export const getHoverOptimizedClasses = (
  hoverClasses: string,
  fallbackClasses: string = '',
): string => {
  const capabilities = getBrowserCapabilities();

  if (capabilities.isMobile) {
    // On mobile, replace hover states with touch-friendly alternatives
    return fallbackClasses || hoverClasses.replace(/hover:/g, 'active:');
  }

  return hoverClasses;
};

/**
 * Creates a touch-optimized event handler for mobile Safari
 */
export const createTouchOptimizedHandler = <T extends Event>(
  handler: (event: T) => void,
  options: {
    preventDefault?: boolean;
    stopPropagation?: boolean;
    passive?: boolean;
  } = {},
) => {
  const { preventDefault = false, stopPropagation = false, passive = true } = options;

  return (event: T) => {
    if (preventDefault && !passive) {
      event.preventDefault();
    }
    if (stopPropagation) {
      event.stopPropagation();
    }
    handler(event);
  };
};

/**
 * React hook for touch-optimized interactions
 */
export const useTouchOptimization = (elementRef: React.RefObject<HTMLElement>) => {
  const capabilities = getBrowserCapabilities();
  const iosCapabilities = getIOSCapabilities();

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element || !iosCapabilities.isIOSSafari) return;

    // Apply iOS-specific touch optimizations
    element.style.touchAction = 'manipulation';
    element.style.webkitTouchCallout = 'none';
    element.style.webkitUserSelect = 'none';
    element.style.webkitTapHighlightColor = 'transparent';

    // Handle active states for touch interactions
    const handleTouchStart = () => {
      element.classList.add('touch-active');
    };

    const handleTouchEnd = () => {
      element.classList.remove('touch-active');
    };

    const handleTouchCancel = () => {
      element.classList.remove('touch-active');
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [iosCapabilities.isIOSSafari]);

  return {
    touchClasses: getTouchOptimizedClasses(),
    isMobile: capabilities.isMobile,
    isIOSSafari: iosCapabilities.isIOSSafari,
    getHoverClasses: getHoverOptimizedClasses,
  };
};

/**
 * Optimizes an element for touch interactions
 */
export const optimizeForTouch = (element: HTMLElement, config: Partial<TouchOptimizationConfig> = {}) => {
  const iosCapabilities = getIOSCapabilities();

  if (!iosCapabilities.isIOSSafari) return;

  const {
    preventZoom = true,
    preventCallout = true,
    preventSelection = true,
    fastTap = true,
  } = config;

  if (fastTap) {
    element.style.touchAction = 'manipulation';
  }

  if (preventCallout) {
    element.style.webkitTouchCallout = 'none';
  }

  if (preventSelection) {
    element.style.webkitUserSelect = 'none';
    element.style.userSelect = 'none';
  }

  if (preventZoom) {
    element.style.touchAction = 'manipulation';
  }

  // Remove tap highlights
  element.style.webkitTapHighlightColor = 'transparent';
};

// React import
import React from 'react';