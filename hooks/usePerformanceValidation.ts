// Development hook for validating Safari animation performance
import { useEffect, useRef } from 'react';

import { PerformanceMonitor } from '@/lib/utils/performanceMonitor';

export interface UsePerformanceValidationOptions {
  componentName?: string;
  enableInProduction?: boolean;
  logMetrics?: boolean;
  validationDuration?: number;
}

/**
 * Development hook to validate component animation performance
 * Only runs in development mode unless explicitly enabled for production
 */
export const usePerformanceValidation = ({
  componentName = 'Component',
  enableInProduction = false,
  logMetrics = true,
  validationDuration = 5000,
}: UsePerformanceValidationOptions = {}) => {
  const monitorRef = useRef<PerformanceMonitor | null>(null);
  const isEnabled = process.env.NODE_ENV === 'development' || enableInProduction;

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;

    // Initialize performance monitor
    monitorRef.current = new PerformanceMonitor();

    // Start monitoring after component mounts
    const startTimeout = setTimeout(() => {
      if (monitorRef.current) {
        monitorRef.current.start();
      }
    }, 100);

    // Stop monitoring and log results after validation duration
    const stopTimeout = setTimeout(() => {
      if (monitorRef.current) {
        const metrics = monitorRef.current.stop();

        if (logMetrics) {
          console.group(`🎯 Performance Validation: ${componentName}`);
          console.log('Metrics:', metrics);

          if (metrics.isPerformant) {
            console.log(`✅ PASS: ${componentName} achieves ${metrics.fps}fps performance`);
          } else {
            console.warn(
              `⚠️ FAIL: ${componentName} performance below target (${metrics.fps}fps, ${metrics.frameDrops} frame drops)`,
            );
          }

          // Safari-specific recommendations
          if (metrics.browser === 'Safari' && !metrics.isPerformant) {
            console.warn('Safari Performance Tips:');
            console.warn('- Reduce backdrop-filter complexity during animations');
            console.warn('- Use simpler transforms (avoid 3D when possible)');
            console.warn('- Add hardware acceleration hints (transform3d, will-change)');
            console.warn('- Disable expensive effects during scroll');
          }

          console.groupEnd();
        }
      }
    }, validationDuration);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(stopTimeout);
      if (monitorRef.current) {
        monitorRef.current.stop();
      }
    };
  }, [componentName, logMetrics, validationDuration, isEnabled]);

  const getCurrentMetrics = () => {
    return monitorRef.current?.getMetrics() || null;
  };

  const getInstantFPS = () => {
    return monitorRef.current?.getInstantFPS() || 0;
  };

  return {
    getCurrentMetrics,
    getInstantFPS,
    isMonitoring: !!monitorRef.current,
  };
};

/**
 * Hook specifically for scroll performance validation
 * Monitors FPS during scroll events
 */
export const useScrollPerformanceValidation = (componentName = 'ScrollComponent') => {
  const monitorRef = useRef<PerformanceMonitor | null>(null);
  const isEnabled = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;

    monitorRef.current = new PerformanceMonitor();
    let isScrolling = false;
    let scrollTimeout: number;

    const handleScrollStart = () => {
      if (!isScrolling && monitorRef.current) {
        isScrolling = true;
        monitorRef.current.start();
      }
    };

    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        if (isScrolling && monitorRef.current) {
          isScrolling = false;
          const metrics = monitorRef.current.stop();

          console.group(`📊 Scroll Performance: ${componentName}`);
          console.log('Scroll metrics:', metrics);

          if (metrics.isPerformant) {
            console.log(`✅ Smooth scrolling: ${metrics.fps}fps`);
          } else {
            console.warn(`⚠️ Scroll performance issue: ${metrics.fps}fps`);
            console.warn('Consider Safari optimizations for scroll events');
          }

          console.groupEnd();
        }
      }, 150);
    };

    const handleScroll = () => {
      handleScrollStart();
      handleScrollEnd();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      if (monitorRef.current) {
        monitorRef.current.stop();
      }
    };
  }, [componentName, isEnabled]);

  return {
    getCurrentMetrics: () => monitorRef.current?.getMetrics() || null,
    getInstantFPS: () => monitorRef.current?.getInstantFPS() || 0,
  };
};
