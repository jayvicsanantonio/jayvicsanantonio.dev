// iOS Safari-specific utilities and optimizations
// Handles viewport quirks, touch behavior, and performance optimizations

export interface IOSCapabilities {
  isIOSSafari: boolean;
  supportsFillAvailable: boolean;
  supportsViewportUnits: boolean;
  hasNotch: boolean;
  screenHeight: number;
  viewportHeight: number;
}

/**
 * Detects iOS Safari and its specific capabilities
 */
export const getIOSCapabilities = (): IOSCapabilities => {
  if (typeof window === 'undefined') {
    return {
      isIOSSafari: false,
      supportsFillAvailable: false,
      supportsViewportUnits: false,
      hasNotch: false,
      screenHeight: 0,
      viewportHeight: 0,
    };
  }

  const userAgent = navigator.userAgent;
  const isIOSSafari = /iPad|iPhone|iPod/.test(userAgent) && /Safari/.test(userAgent) && !/CriOS/.test(userAgent);

  return {
    isIOSSafari,
    supportsFillAvailable: CSS.supports('min-height', '-webkit-fill-available'),
    supportsViewportUnits: CSS.supports('height', '100vh'),
    hasNotch: window.screen.height >= 812 && window.devicePixelRatio >= 2, // iPhone X and later
    screenHeight: window.screen.height,
    viewportHeight: window.innerHeight,
  };
};

/**
 * Calculates the actual viewport height accounting for iOS Safari's dynamic viewport
 */
export const getIOSViewportHeight = (): number => {
  if (typeof window === 'undefined') return 0;

  const capabilities = getIOSCapabilities();

  if (!capabilities.isIOSSafari) {
    return window.innerHeight;
  }

  // iOS Safari shrinks viewport when address bar is visible
  // Use the larger of the two to account for this behavior
  const documentHeight = document.documentElement.clientHeight;
  const windowHeight = window.innerHeight;

  return Math.max(documentHeight, windowHeight);
};

/**
 * Gets iOS-specific CSS classes for viewport handling
 */
export const getIOSViewportClasses = (): string => {
  const capabilities = getIOSCapabilities();

  if (!capabilities.isIOSSafari) {
    return 'min-h-screen';
  }

  const classes = ['min-h-screen'];

  if (capabilities.hasNotch) {
    classes.push('ios-notch');
  }

  if (capabilities.supportsFillAvailable) {
    classes.push('ios-viewport-available');
  }

  return classes.join(' ');
};

/**
 * Handles iOS Safari safe area insets
 */
export const getIOSSafeAreaInsets = () => {
  if (typeof window === 'undefined') return { top: 0, right: 0, bottom: 0, left: 0 };

  const computedStyle = getComputedStyle(document.documentElement);

  return {
    top: parseInt(computedStyle.getPropertyValue('--sat') || '0', 10),
    right: parseInt(computedStyle.getPropertyValue('--sar') || '0', 10),
    bottom: parseInt(computedStyle.getPropertyValue('--sab') || '0', 10),
    left: parseInt(computedStyle.getPropertyValue('--sal') || '0', 10),
  };
};

/**
 * Optimizes touch behavior for iOS Safari
 */
export const applyIOSTouchOptimizations = (element: HTMLElement) => {
  const capabilities = getIOSCapabilities();

  if (!capabilities.isIOSSafari) return;

  // Prevent touch delay and enable smooth scrolling
  element.style.touchAction = 'manipulation';
  element.style.webkitTouchCallout = 'none';
  element.style.webkitUserSelect = 'none';
  element.style.webkitTapHighlightColor = 'transparent';

  // Enable momentum scrolling if element is scrollable
  const isScrollable = element.scrollHeight > element.clientHeight ||
                      element.scrollWidth > element.clientWidth;

  if (isScrollable) {
    element.style.webkitOverflowScrolling = 'touch';
    element.style.overscrollBehavior = 'contain';
  }
};

/**
 * React hook for iOS Safari viewport handling
 */
export const useIOSViewport = () => {
  const [viewportHeight, setViewportHeight] = useState(getIOSViewportHeight());
  const [capabilities] = useState(getIOSCapabilities());

  useEffect(() => {
    if (!capabilities.isIOSSafari) return;

    const updateViewport = () => {
      setViewportHeight(getIOSViewportHeight());
    };

    // Listen for orientation changes and resize events
    window.addEventListener('resize', updateViewport, { passive: true });
    window.addEventListener('orientationchange', updateViewport, { passive: true });

    // iOS Safari specific: listen for visual viewport changes
    if ('visualViewport' in window) {
      window.visualViewport?.addEventListener('resize', updateViewport, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
      if ('visualViewport' in window) {
        window.visualViewport?.removeEventListener('resize', updateViewport);
      }
    };
  }, [capabilities.isIOSSafari]);

  return {
    viewportHeight,
    capabilities,
    safeAreaInsets: getIOSSafeAreaInsets(),
    viewportClasses: getIOSViewportClasses(),
  };
};

// React import for useState and useEffect
import { useState, useEffect } from 'react';