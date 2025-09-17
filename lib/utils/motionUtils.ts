// Safari-optimized Framer Motion utilities for improved animation performance
import type { MotionProps, Variants } from 'framer-motion';
import { getBrowserCapabilities } from './browserUtils';

export interface MotionConfig {
  transition: MotionProps['transition'];
  variants: Variants;
  shouldAnimate: boolean;
}

/**
 * Get Safari-optimized motion configuration based on browser capabilities
 */
export const getMotionConfig = (
  prefersReducedMotion: boolean = false,
  isScrolling: boolean = false,
): MotionConfig => {
  const capabilities = getBrowserCapabilities();

  // No animation for reduced motion preference
  if (prefersReducedMotion) {
    return {
      transition: {},
      variants: {
        initial: {},
        animate: {},
        hover: {},
      },
      shouldAnimate: false,
    };
  }

  // Safari gets simpler, more performant animations
  if (capabilities.isSafari) {
    return {
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: isScrolling ? 0.2 : 0.3,
      },
      variants: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        hover: {
          y: -4, // Simple vertical translation instead of 3D transforms
          transition: { duration: 0.2, ease: 'easeOut' },
        },
      },
      shouldAnimate: !isScrolling, // Disable animations during scroll in Safari
    };
  }

  // Chrome and other modern browsers get full animations
  return {
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
    variants: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      hover: {
        rotateX: 0.6,
        rotateY: -0.6,
        y: -4,
        transition: {
          duration: 0.2,
          type: 'spring',
          damping: 15,
        },
      },
    },
    shouldAnimate: true,
  };
};

/**
 * Safari-optimized reveal animation props
 */
export const getSafariOptimizedReveal = (
  prefersReducedMotion: boolean = false,
  delay: number = 0,
): MotionProps => {
  const capabilities = getBrowserCapabilities();

  if (prefersReducedMotion) {
    return {
      initial: {},
      whileInView: {},
      viewport: {},
      transition: {},
    };
  }

  // Safari gets simpler animations
  if (capabilities.isSafari) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, amount: 0.3 },
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        delay,
      },
    };
  }

  // Chrome gets full animation
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  };
};

/**
 * Get Safari-optimized stagger configuration for timeline animations
 */
export const getStaggerConfig = (_itemCount: number) => {
  const capabilities = getBrowserCapabilities();

  // Safari gets reduced stagger delay for better performance
  if (capabilities.isSafari) {
    return {
      delayChildren: 0.1,
      staggerChildren: 0.08,
    };
  }

  // Chrome gets full stagger effect
  return {
    delayChildren: 0.2,
    staggerChildren: 0.12,
  };
};

/**
 * Get hardware acceleration classes for motion components
 */
export const getMotionAcceleration = (isAnimating: boolean = false): string => {
  const baseClasses = 'transform-gpu';

  if (isAnimating) {
    return `${baseClasses} will-change-transform translate3d(0,0,0)`;
  }

  return baseClasses;
};

/**
 * Safari-optimized card hover animation variants
 */
export const getCardHoverVariants = (): Variants => {
  const capabilities = getBrowserCapabilities();

  if (capabilities.isSafari) {
    // Simple, performant animations for Safari
    return {
      initial: { y: 0 },
      hover: {
        y: -2,
        transition: { duration: 0.2, ease: 'easeOut' },
      },
    };
  }

  // Full 3D transforms for Chrome
  return {
    initial: { rotateX: 0, rotateY: 0, y: 0 },
    hover: {
      rotateX: 0.6,
      rotateY: -0.6,
      y: -4,
      transition: {
        duration: 0.2,
        type: 'spring',
        damping: 15,
      },
    },
  };
};

/**
 * Scroll-aware animation configuration
 */
export const getScrollAwareAnimation = (
  isScrolling: boolean,
  defaultAnimation: MotionProps,
): MotionProps => {
  const capabilities = getBrowserCapabilities();

  // Disable complex animations during scroll in Safari
  if (capabilities.isSafari && isScrolling) {
    return {
      initial: {},
      animate: {},
      transition: {},
    };
  }

  return defaultAnimation;
};
