// Typography utilities with Safari optimizations
import { getBrowserCapabilities } from './browserUtils';

/**
 * Font rendering quality options
 */
export type FontRenderingQuality = 'speed' | 'quality' | 'legibility';

/**
 * Typography configuration for Safari optimization
 */
export interface TypographyConfig {
  fontSmoothing?: boolean;
  textRendering?: FontRenderingQuality;
  fontKerning?: boolean;
  ligatures?: boolean;
  optimizeForSafari?: boolean;
}

/**
 * Get optimized typography classes for Safari
 */
export const getTypographyClasses = (
  baseClasses: string = '',
  config: TypographyConfig = {},
): string => {
  const { fontSmoothing = true, textRendering = 'legibility', optimizeForSafari = true } = config;

  const capabilities = getBrowserCapabilities();
  const classes = [baseClasses];

  if (fontSmoothing) {
    classes.push('text-crisp');
  }

  if (textRendering === 'speed') {
    classes.push('text-optimize-speed');
  } else if (textRendering === 'quality') {
    classes.push('text-optimize-quality');
  }

  // Safari-specific optimizations
  if (capabilities.isSafari && optimizeForSafari) {
    // Use Safari-specific line height classes for better consistency
    if (baseClasses.includes('leading-tight')) {
      classes.push('leading-tight-safari');
    } else if (baseClasses.includes('leading-snug')) {
      classes.push('leading-snug-safari');
    } else if (baseClasses.includes('leading-normal')) {
      classes.push('leading-normal-safari');
    } else if (baseClasses.includes('leading-relaxed')) {
      classes.push('leading-relaxed-safari');
    }

    // Use Safari-specific tracking classes for better consistency
    if (baseClasses.includes('tracking-tighter')) {
      classes.push('tracking-tighter-safari');
    } else if (baseClasses.includes('tracking-tight')) {
      classes.push('tracking-tight-safari');
    } else if (baseClasses.includes('tracking-wide')) {
      classes.push('tracking-wide-safari');
    } else if (baseClasses.includes('tracking-wider')) {
      classes.push('tracking-wider-safari');
    } else if (baseClasses.includes('tracking-widest')) {
      classes.push('tracking-widest-safari');
    }
  }

  return classes.filter(Boolean).join(' ');
};

/**
 * Font loading optimization utility
 */
export const optimizeFontLoading = () => {
  if (typeof document === 'undefined') return;

  // Preload critical fonts
  const criticalFonts: string[] = [
    // Add your critical font URLs here
    // '/fonts/inter-var.woff2',
    // '/fonts/source-code-pro.woff2',
  ];

  criticalFonts.forEach((fontUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = fontUrl;
    document.head.appendChild(link);
  });
};

/**
 * Safari font rendering optimization styles
 */
export const getSafariTypographyStyles = (): React.CSSProperties => {
  const capabilities = getBrowserCapabilities();

  if (!capabilities.isSafari) {
    return {};
  }

  return {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
    fontKerning: 'normal',
    fontVariantLigatures: 'common-ligatures',
  };
};

/**
 * Responsive typography scaling for Safari
 */
export const getResponsiveTypographyClasses = (
  baseSize: string,
  responsiveSizes: Record<string, string> = {},
): string => {
  const capabilities = getBrowserCapabilities();
  const defaultResponsive = {
    sm: 'sm:text-lg',
    md: 'md:text-xl',
    lg: 'lg:text-2xl',
    xl: 'xl:text-3xl',
  };

  const responsive = { ...defaultResponsive, ...responsiveSizes };
  const classes = [baseSize];

  // Add responsive classes
  Object.values(responsive).forEach((className) => {
    classes.push(className);
  });

  // Safari-specific adjustments
  if (capabilities.isSafari) {
    classes.push('text-crisp');
  }

  return classes.join(' ');
};

/**
 * Text balance with typography optimization
 */
export const getOptimizedTextClasses = (
  baseClasses: string,
  includeTextBalance: boolean = true,
  typographyConfig: TypographyConfig = {},
): string => {
  const capabilities = getBrowserCapabilities();
  let classes = getTypographyClasses(baseClasses, typographyConfig);

  if (includeTextBalance) {
    if (CSS.supports?.('text-wrap: balance')) {
      classes += ' text-balance';
    } else if (capabilities.isSafari) {
      classes += ' text-balance-fallback';
    }
  }

  return classes;
};
