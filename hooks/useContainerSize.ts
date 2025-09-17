// Container Size Hook - Provides ResizeObserver fallback for Safari container query compatibility
// Detects container width changes for responsive behavior in older Safari versions

import { useEffect, useRef, useState } from 'react';
import { shouldUseContainerQueries } from '@/lib/utils/containerQueries';

interface ContainerSizeHook {
  containerRef: React.RefObject<HTMLElement | null>;
  containerWidth: number;
  isContainerSize: {
    sm: boolean; // >= 384px (24rem)
    md: boolean; // >= 512px (32rem)
    lg: boolean; // >= 672px (42rem)
    '28rem': boolean; // >= 448px (28rem) - WorkTimeline specific
    '34rem': boolean; // >= 544px (34rem) - WorkTimeline specific
    '36rem': boolean; // >= 576px (36rem) - Grid layouts
  };
}

/**
 * Hook that provides container-aware responsive behavior
 * Falls back to ResizeObserver for Safari versions without container query support
 * @returns Container size information and breakpoint flags
 */
export function useContainerSize(): ContainerSizeHook {
  const containerRef = useRef<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const supportsContainerQueries = shouldUseContainerQueries();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || supportsContainerQueries) {
      // If container queries are supported, we don't need to track manually
      return;
    }

    // ResizeObserver fallback for older Safari
    const updateContainerWidth = () => {
      if (container) {
        setContainerWidth(container.offsetWidth);
      }
    };

    // Initial measurement
    updateContainerWidth();

    // Use ResizeObserver if available, otherwise fall back to window resize
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width } = entry.contentRect;
          setContainerWidth(width);
        }
      });

      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
      };
    } else {
      // Fallback for very old browsers
      const handleResize = () => {
        updateContainerWidth();
      };

      window.addEventListener('resize', handleResize, { passive: true });

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [supportsContainerQueries]);

  // Convert pixel widths to rem equivalents (assuming 16px base font size)
  const remToPx = (rem: number) => rem * 16;

  const isContainerSize = {
    sm: containerWidth >= remToPx(24), // 384px
    md: containerWidth >= remToPx(32), // 512px
    lg: containerWidth >= remToPx(42), // 672px
    '28rem': containerWidth >= remToPx(28), // 448px - WorkTimeline text sizing
    '34rem': containerWidth >= remToPx(34), // 544px - WorkTimeline spacing
    '36rem': containerWidth >= remToPx(36), // 576px - Grid layouts
  };

  return {
    containerRef,
    containerWidth,
    isContainerSize,
  };
}

/**
 * Helper hook specifically for WorkTimeline component
 * Returns appropriate classes based on container size or viewport fallbacks
 */
export function useWorkTimelineClasses() {
  const { containerRef, isContainerSize } = useContainerSize();
  const supportsContainerQueries = shouldUseContainerQueries();

  const getResponsiveClasses = () => {
    if (supportsContainerQueries) {
      // Use container queries where supported
      return {
        panelPadding: '[@container(min-width:36rem)]:p-6',
        titleSize: '[@container(min-width:28rem)]:text-2xl',
        listSpacing: '[@container(min-width:34rem)]:space-y-4',
      };
    } else {
      // Use container size detection for Safari fallback
      return {
        panelPadding: isContainerSize['36rem'] ? 'p-6' : '',
        titleSize: isContainerSize['28rem'] ? 'text-2xl' : '',
        listSpacing: isContainerSize['34rem'] ? 'space-y-4' : '',
      };
    }
  };

  return {
    containerRef,
    classes: getResponsiveClasses(),
    isContainerSize,
  };
}

/**
 * Utility to combine container-aware classes with base classes
 * @param baseClasses - Base CSS classes
 * @param containerClasses - Container-specific classes
 * @param condition - Whether container condition is met
 * @returns Combined class string
 */
export function combineContainerClasses(
  baseClasses: string,
  containerClasses: string,
  condition: boolean,
): string {
  return condition ? `${baseClasses} ${containerClasses}`.trim() : baseClasses;
}

/**
 * Debug utility for development - logs container size information
 * @param containerWidth - Current container width
 * @param isContainerSize - Container size flags
 */
export function debugContainerSize(
  containerWidth: number,
  isContainerSize: ContainerSizeHook['isContainerSize'],
) {
  if (process.env.NODE_ENV === 'development') {
    console.group('🔍 Container Size Debug');
    console.log('Width:', `${containerWidth}px`);
    console.log('Breakpoints:', isContainerSize);
    console.groupEnd();
  }
}
