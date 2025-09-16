// Container Query Feature Detection Utilities
// Provides fallback strategies for Safari compatibility with container queries

/**
 * Detects if the browser supports CSS container queries
 * @returns {boolean} True if container queries are supported
 */
export const supportsContainerQueries = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    return CSS.supports('container-type: inline-size');
  } catch {
    return false;
  }
};

/**
 * Detects specific container query features
 * @returns {object} Object with container query feature support flags
 */
export const getContainerQuerySupport = () => {
  if (typeof window === 'undefined') {
    return {
      containerType: false,
      containerName: false,
      containerQuery: false,
    };
  }

  try {
    return {
      containerType: CSS.supports('container-type: inline-size'),
      containerName: CSS.supports('container-name: test'),
      containerQuery: CSS.supports('width', '100cqw'),
    };
  } catch {
    return {
      containerType: false,
      containerName: false,
      containerQuery: false,
    };
  }
};

/**
 * Container query breakpoint mapping for fallbacks
 * Maps container query sizes to viewport-based equivalents
 */
export const CONTAINER_BREAKPOINTS = {
  sm: '24rem', // 384px - equivalent to [@container(min-width:24rem)]
  md: '32rem', // 512px - equivalent to [@container(min-width:32rem)]
  lg: '42rem', // 672px - equivalent to [@container(min-width:42rem)]
  xl: '56rem', // 896px - equivalent to [@container(min-width:56rem)]
  '2xl': '72rem', // 1152px - equivalent to [@container(min-width:72rem)]

  // Project-specific breakpoints from the current codebase
  '28rem': '28rem', // Used in WorkTimeline text sizing
  '34rem': '34rem', // Used in WorkTimeline spacing
  '36rem': '36rem', // Used in grid layouts
} as const;

/**
 * Generates fallback class names for container queries
 * @param containerSize - The container breakpoint size
 * @param properties - CSS classes to apply at the breakpoint
 * @returns Object with container query and fallback classes
 */
export const getResponsiveClasses = (
  containerSize: keyof typeof CONTAINER_BREAKPOINTS,
  properties: string,
) => {
  const breakpointValue = CONTAINER_BREAKPOINTS[containerSize];

  return {
    // Container query version (for supporting browsers)
    containerQuery: `[@container(min-width:${breakpointValue})]:${properties}`,

    // Viewport fallback (for non-supporting browsers)
    viewportFallback: getViewportFallback(containerSize, properties),
  };
};

/**
 * Maps container breakpoints to appropriate viewport breakpoints
 * @param containerSize - Container breakpoint
 * @param properties - CSS classes to apply
 * @returns Viewport-based responsive classes
 */
function getViewportFallback(
  containerSize: keyof typeof CONTAINER_BREAKPOINTS,
  properties: string,
): string {
  // Map container sizes to Tailwind viewport breakpoints
  const viewportMapping = {
    sm: 'sm', // 24rem container → sm viewport (640px)
    md: 'md', // 32rem container → md viewport (768px)
    lg: 'lg', // 42rem container → lg viewport (1024px)
    xl: 'xl', // 56rem container → xl viewport (1280px)
    '2xl': '2xl', // 72rem container → 2xl viewport (1536px)

    // Project-specific mappings
    '28rem': 'sm', // 28rem container → sm viewport
    '34rem': 'md', // 34rem container → md viewport
    '36rem': 'lg', // 36rem container → lg viewport
  } as const;

  const viewportBreakpoint = viewportMapping[containerSize] || 'lg';
  return `${viewportBreakpoint}:${properties}`;
}

/**
 * React hook for container query support detection
 * @returns {boolean} Container query support status
 */
export const useContainerQueries = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Memoize the result since CSS.supports is synchronous and won't change
  return supportsContainerQueries();
};

/**
 * Gets appropriate CSS classes based on container query support
 * @param containerClasses - Classes that use container queries
 * @param fallbackClasses - Fallback classes for non-supporting browsers
 * @returns Appropriate CSS classes for the current browser
 */
export const getAdaptiveClasses = (containerClasses: string, fallbackClasses: string): string => {
  return supportsContainerQueries() ? containerClasses : fallbackClasses;
};

/**
 * Browser detection utilities for Safari-specific handling
 */
export const getBrowserInfo = () => {
  if (typeof navigator === 'undefined') {
    return {
      isSafari: false,
      isIOSSafari: false,
      safariVersion: null,
    };
  }

  const userAgent = navigator.userAgent;
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isIOSSafari = /iPhone|iPad|iPod/.test(userAgent) && /Safari/.test(userAgent);

  // Extract Safari version for version-specific handling
  const safariVersionMatch = userAgent.match(/Version\/(\d+)/);
  const safariVersion = safariVersionMatch?.[1] ? parseInt(safariVersionMatch[1], 10) : null;

  return {
    isSafari,
    isIOSSafari,
    safariVersion,
  };
};

/**
 * Determines if container queries should be used based on browser support
 * @returns {boolean} Whether to use container queries or fallbacks
 */
export const shouldUseContainerQueries = (): boolean => {
  const { isSafari, safariVersion } = getBrowserInfo();

  // Safari 16+ supports container queries
  if (isSafari && safariVersion !== null && safariVersion < 16) {
    return false;
  }

  return supportsContainerQueries();
};
