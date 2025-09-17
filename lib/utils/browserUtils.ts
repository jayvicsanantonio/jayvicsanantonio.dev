// Browser detection and capability utilities for Safari optimization
import React from 'react';

export const getBrowserCapabilities = () => {
  if (typeof window === 'undefined') {
    return {
      supportsBackdropFilter: false,
      supports3DTransforms: false,
      supportsWillChange: false,
      isSafari: false,
      isMobile: false,
    };
  }

  const userAgent = navigator.userAgent;
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

  return {
    supportsBackdropFilter: CSS.supports('backdrop-filter: blur(1px)'),
    supports3DTransforms: CSS.supports('transform: perspective(1px)'),
    supportsWillChange: CSS.supports('will-change: transform'),
    isSafari,
    isMobile,
  };
};

export const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent;
  return /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
};

export const isMobileSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent;
  return /iPhone|iPad|iPod/i.test(userAgent) && /Safari/.test(userAgent);
};

// Safari-optimized glass effect classes
export const getGlassClasses = (
  defaultClasses: string,
  safariClasses: string,
  isAnimating?: boolean,
): string => {
  const browser = getBrowserCapabilities();

  if (browser.isSafari && isAnimating) {
    // Use solid background during animations in Safari
    return safariClasses;
  }

  if (browser.isSafari && browser.isMobile) {
    // Reduced effects for mobile Safari
    return safariClasses;
  }

  return defaultClasses;
};

// Scroll state detection for disabling expensive effects during scroll
export const useScrollState = () => {
  const [isScrolling, setIsScrolling] = React.useState(false);
  const scrollTimeout = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return { isScrolling };
};
