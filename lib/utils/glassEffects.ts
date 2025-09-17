// Safari-optimized glass effect utilities for scroll performance
import { getBrowserCapabilities } from './browserUtils';
import { getFeatureFlags } from './featureFlags';

export type GlassEffectConfig = {
  // Chrome/modern browser effects
  default: {
    backdrop: string;
    background: string;
    border: string;
  };
  // Safari fallback effects
  safari: {
    backdrop: string;
    background: string;
    border: string;
  };
  // Safari mobile (most reduced)
  safariMobile: {
    backdrop: string;
    background: string;
    border: string;
  };
};

// Predefined glass effect configurations for common use cases
export const glassConfigs = {
  // Navigation buttons and pills
  navigation: {
    default: {
      backdrop: 'backdrop-blur-[24px] backdrop-saturate-200',
      background: 'bg-white/20',
      border: 'border-white/55 hover:border-white/60',
    },
    safari: {
      backdrop: 'backdrop-blur-[12px]',
      background: 'bg-white/30',
      border: 'border-white/60 hover:border-white/70',
    },
    safariMobile: {
      backdrop: '',
      background: 'bg-white/40',
      border: 'border-white/70 hover:border-white/80',
    },
  },

  // Glass buttons
  button: {
    default: {
      backdrop: 'backdrop-blur-[16px] backdrop-saturate-150',
      background: 'bg-gradient-to-b from-white/20 to-white/15',
      border: 'border-white/10 hover:border-white/50',
    },
    safari: {
      backdrop: 'backdrop-blur-[8px]',
      background: 'bg-white/25',
      border: 'border-white/20 hover:border-white/60',
    },
    safariMobile: {
      backdrop: '',
      background: 'bg-white/35',
      border: 'border-white/30 hover:border-white/70',
    },
  },

  // Cards and containers (most expensive)
  card: {
    default: {
      backdrop: 'backdrop-blur-[24px] backdrop-saturate-140',
      background: 'bg-gray-950/50',
      border: 'border-white/8',
    },
    safari: {
      backdrop: 'backdrop-blur-[12px]',
      background: 'bg-gray-900/60',
      border: 'border-white/12',
    },
    safariMobile: {
      backdrop: '',
      background: 'bg-gray-900/70',
      border: 'border-white/15',
    },
  },

  // Hero/overlay effects (critical for scroll performance)
  hero: {
    default: {
      backdrop: 'backdrop-blur-[16px] backdrop-saturate-160',
      background: 'bg-gradient-to-b from-cyan-400/28 to-cyan-600/20',
      border: 'border-white/30',
    },
    safari: {
      backdrop: '', // No backdrop-filter during scroll
      background: 'bg-cyan-500/35',
      border: 'border-white/40',
    },
    safariMobile: {
      backdrop: '',
      background: 'bg-cyan-500/45',
      border: 'border-white/50',
    },
  },
} as const;

export type GlassConfigKey = keyof typeof glassConfigs;

/**
 * Get optimized glass effect classes based on browser capabilities and scroll state
 */
export const getOptimizedGlassClasses = (
  configKey: GlassConfigKey,
  isScrolling: boolean = false,
  isAnimating: boolean = false,
): string => {
  const capabilities = getBrowserCapabilities();
  const featureFlags = getFeatureFlags();
  const config = glassConfigs[configKey];

  // Check if glass effects optimization is enabled
  if (!featureFlags.isEnabled('safariGlassEffectsOptimization')) {
    // Return default configuration without Safari optimizations
    const { backdrop, background, border } = config.default;
    return [backdrop, background, border].filter(Boolean).join(' ');
  }

  // Safari mobile gets most reduced effects
  if (capabilities.isSafari && capabilities.isMobile) {
    const { backdrop, background, border } = config.safariMobile;
    return [backdrop, background, border].filter(Boolean).join(' ');
  }

  // Safari desktop gets reduced effects, especially during scroll/animation
  if (capabilities.isSafari && (isScrolling || isAnimating)) {
    const { backdrop, background, border } = config.safari;
    return [backdrop, background, border].filter(Boolean).join(' ');
  }

  // Safari desktop static state can use some backdrop-filter
  if (capabilities.isSafari && !isScrolling && !isAnimating) {
    const { backdrop, background, border } = config.safari;
    return [backdrop, background, border].filter(Boolean).join(' ');
  }

  // Chrome and other modern browsers get full effects
  const { backdrop, background, border } = config.default;
  return [backdrop, background, border].filter(Boolean).join(' ');
};

/**
 * Get scroll-aware backdrop-filter classes
 * Returns empty string during scroll in Safari to eliminate performance bottleneck
 */
export const getScrollAwareBackdrop = (
  defaultBackdrop: string,
  isScrolling: boolean = false,
): string => {
  const capabilities = getBrowserCapabilities();

  // Disable all backdrop-filters during scroll in Safari
  if (capabilities.isSafari && isScrolling) {
    return '';
  }

  // Reduce backdrop-filter intensity in Safari even when not scrolling
  if (capabilities.isSafari) {
    // Convert backdrop-blur-[24px] to backdrop-blur-[12px], etc.
    return defaultBackdrop.replace(/backdrop-blur-\[(\d+)px\]/g, (_match, pixels) => {
      const reducedPixels = Math.max(Math.floor(parseInt(pixels, 10) / 2), 4);
      return `backdrop-blur-[${reducedPixels}px]`;
    });
  }

  return defaultBackdrop;
};

/**
 * Create hardware acceleration classes for glass components
 */
export const getHardwareAcceleration = (isScrolling: boolean = false): string => {
  const baseClasses = 'transform-gpu will-change-transform';

  if (isScrolling) {
    // Add specific GPU hints during scroll
    return `${baseClasses} translate3d(0,0,0)`;
  }

  return baseClasses;
};
