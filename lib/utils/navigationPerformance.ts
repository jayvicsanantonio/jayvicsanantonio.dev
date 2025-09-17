// Navigation performance measurement utilities
// Provides metrics for testing cross-browser navigation consistency

export interface NavigationMetrics {
  /** Total navigation time in milliseconds */
  navigationTime: number;
  /** Whether view transitions were used */
  usedViewTransitions: boolean;
  /** Browser user agent */
  userAgent: string;
  /** Whether the browser supports view transitions */
  supportsViewTransitions: boolean;
  /** Start time of navigation */
  startTime: number;
  /** End time of navigation */
  endTime: number;
  /** From URL */
  fromUrl: string;
  /** To URL */
  toUrl: string;
}

/**
 * Performance measurement utility for navigation transitions
 */
export class NavigationPerformanceMonitor {
  private metrics: NavigationMetrics[] = [];
  private currentNavigation: Partial<NavigationMetrics> | null = null;

  /**
   * Start measuring a navigation
   * @param fromUrl - The URL being navigated from
   * @param toUrl - The URL being navigated to
   * @param usedViewTransitions - Whether view transitions are being used
   */
  startNavigation(fromUrl: string, toUrl: string, usedViewTransitions: boolean): void {
    this.currentNavigation = {
      startTime: performance.now(),
      fromUrl,
      toUrl,
      usedViewTransitions,
      userAgent: navigator.userAgent,
      supportsViewTransitions: this.checkViewTransitionSupport(),
    };
  }

  /**
   * End measuring the current navigation
   */
  endNavigation(): NavigationMetrics | null {
    if (!this.currentNavigation || this.currentNavigation.startTime === undefined) {
      console.warn('NavigationPerformanceMonitor: No navigation in progress');
      return null;
    }

    const endTime = performance.now();
    const navigationTime = endTime - this.currentNavigation.startTime;

    const metric: NavigationMetrics = {
      ...this.currentNavigation,
      endTime,
      navigationTime,
    } as NavigationMetrics;

    this.metrics.push(metric);
    this.currentNavigation = null;

    return metric;
  }

  /**
   * Get all collected metrics
   */
  getMetrics(): NavigationMetrics[] {
    return [...this.metrics];
  }

  /**
   * Get metrics filtered by browser type
   */
  getMetricsByBrowser(browserPattern: RegExp): NavigationMetrics[] {
    return this.metrics.filter(metric => browserPattern.test(metric.userAgent));
  }

  /**
   * Get average navigation time
   */
  getAverageNavigationTime(filter?: (metric: NavigationMetrics) => boolean): number {
    const filteredMetrics = filter ? this.metrics.filter(filter) : this.metrics;
    if (filteredMetrics.length === 0) return 0;

    const total = filteredMetrics.reduce((sum, metric) => sum + metric.navigationTime, 0);
    return total / filteredMetrics.length;
  }

  /**
   * Compare performance between view transitions and fallbacks
   */
  getPerformanceComparison(): {
    viewTransitions: { count: number; averageTime: number };
    fallbacks: { count: number; averageTime: number };
  } {
    const viewTransitionMetrics = this.metrics.filter(m => m.usedViewTransitions);
    const fallbackMetrics = this.metrics.filter(m => !m.usedViewTransitions);

    return {
      viewTransitions: {
        count: viewTransitionMetrics.length,
        averageTime: this.getAverageNavigationTime(m => m.usedViewTransitions),
      },
      fallbacks: {
        count: fallbackMetrics.length,
        averageTime: this.getAverageNavigationTime(m => !m.usedViewTransitions),
      },
    };
  }

  /**
   * Export metrics as JSON for analysis
   */
  exportMetrics(): string {
    return JSON.stringify({
      metrics: this.metrics,
      summary: {
        totalNavigations: this.metrics.length,
        averageTime: this.getAverageNavigationTime(),
        performance: this.getPerformanceComparison(),
        browsers: this.getBrowserSummary(),
      },
    }, null, 2);
  }

  /**
   * Clear all collected metrics
   */
  clearMetrics(): void {
    this.metrics = [];
    this.currentNavigation = null;
  }

  private checkViewTransitionSupport(): boolean {
    return typeof document !== 'undefined' && 'startViewTransition' in document;
  }

  private getBrowserSummary(): Record<string, number> {
    const browserCounts: Record<string, number> = {};

    this.metrics.forEach(metric => {
      const browser = this.getBrowserName(metric.userAgent);
      browserCounts[browser] = (browserCounts[browser] || 0) + 1;
    });

    return browserCounts;
  }

  private getBrowserName(userAgent: string): string {
    if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) return 'Safari';
    if (/Chrome/.test(userAgent)) return 'Chrome';
    if (/Firefox/.test(userAgent)) return 'Firefox';
    if (/Edge/.test(userAgent)) return 'Edge';
    return 'Other';
  }
}

// Global instance for easy access
export const navigationPerformanceMonitor = new NavigationPerformanceMonitor();

/**
 * Hook for measuring navigation performance
 */
export function useNavigationPerformanceMonitor() {
  return {
    startNavigation: navigationPerformanceMonitor.startNavigation.bind(navigationPerformanceMonitor),
    endNavigation: navigationPerformanceMonitor.endNavigation.bind(navigationPerformanceMonitor),
    getMetrics: navigationPerformanceMonitor.getMetrics.bind(navigationPerformanceMonitor),
    getAverageTime: navigationPerformanceMonitor.getAverageNavigationTime.bind(navigationPerformanceMonitor),
    exportMetrics: navigationPerformanceMonitor.exportMetrics.bind(navigationPerformanceMonitor),
    clearMetrics: navigationPerformanceMonitor.clearMetrics.bind(navigationPerformanceMonitor),
  };
}