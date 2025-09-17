// Real User Monitoring (RUM) for Safari performance optimization
// Tracks actual user performance metrics and Safari-specific issues

import { getBrowserCapabilities } from './browserUtils';
import { getFeatureFlags } from './featureFlags';

export interface RUMMetrics {
  // Core Web Vitals
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte

  // Safari-specific metrics
  scrollFPS?: number;
  backdropFilterPerformance?: number;
  glassEffectRenderTime?: number;
  videoLoadTime?: number;
  safariOptimizationEffectiveness?: number;

  // User context
  browser: string;
  browserVersion: string;
  isMobile: boolean;
  viewportWidth: number;
  viewportHeight: number;
  connectionType?: string;
  featureFlags: string[];

  // Page context
  pageUrl: string;
  referrer: string;
  loadTime: number;
  timestamp: number;
  sessionId: string;
}

export interface PerformanceEvent {
  eventType: 'scroll_performance' | 'animation_lag' | 'glass_effect_render' | 'video_load' | 'layout_shift' | 'safari_optimization';
  value: number;
  metadata?: Record<string, any>;
  timestamp: number;
}

/**
 * Real User Monitoring manager for Safari performance
 */
export class RealUserMonitoring {
  private metrics: Partial<RUMMetrics> = {};
  private events: PerformanceEvent[] = [];
  private observer?: PerformanceObserver;
  private sessionId: string;
  private capabilities: any;
  private featureFlags: any;
  private isMonitoring = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.capabilities = getBrowserCapabilities();
    this.featureFlags = getFeatureFlags();
    this.initializeMetrics();
  }

  /**
   * Start monitoring performance
   */
  startMonitoring(): void {
    if (this.isMonitoring || typeof window === 'undefined') return;

    this.isMonitoring = true;

    // Only monitor if feature flag is enabled
    if (!this.featureFlags.isEnabled('safariPerformanceMonitoring')) {
      return;
    }

    this.setupWebVitalsMonitoring();
    this.setupSafariSpecificMonitoring();
    this.setupCustomEventListeners();

    // Send initial page load metrics
    setTimeout(() => this.collectAndSendMetrics(), 2000);
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    this.isMonitoring = false;

    if (this.observer) {
      this.observer.disconnect();
    }

    // Send final metrics before stopping
    this.collectAndSendMetrics();
  }

  /**
   * Track a custom performance event
   */
  trackEvent(event: PerformanceEvent): void {
    if (!this.isMonitoring) return;

    this.events.push(event);

    // Log Safari-specific performance issues
    if (this.capabilities.isSafari && event.value > this.getPerformanceThreshold(event.eventType)) {
      console.warn(`Safari Performance Issue: ${event.eventType} = ${event.value}ms`);
    }

    // Send events in batches
    if (this.events.length >= 10) {
      this.sendEvents();
    }
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): RUMMetrics {
    return {
      ...this.metrics,
      browser: this.capabilities.isSafari ? 'Safari' : 'Other',
      browserVersion: this.getBrowserVersion(),
      isMobile: this.capabilities.isMobile,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      connectionType: this.getConnectionType(),
      featureFlags: this.getEnabledFeatureFlags(),
      pageUrl: window.location.href,
      referrer: document.referrer,
      loadTime: performance.now(),
      timestamp: Date.now(),
      sessionId: this.sessionId,
    } as RUMMetrics;
  }

  private initializeMetrics(): void {
    if (typeof window === 'undefined') return;

    // Initialize with navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
    }
  }

  private setupWebVitalsMonitoring(): void {
    if (!('PerformanceObserver' in window)) return;

    // Monitor Core Web Vitals
    this.observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            this.metrics.lcp = entry.startTime;
            break;
          case 'first-input':
            this.metrics.fid = (entry as any).processingStart - entry.startTime;
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              this.metrics.cls = (this.metrics.cls || 0) + (entry as any).value;
            }
            break;
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime;
            }
            break;
        }
      });
    });

    // Observe different entry types
    try {
      this.observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'paint'] });
    } catch (e) {
      // Fallback for older browsers
      console.warn('Some performance monitoring features not supported');
    }
  }

  private setupSafariSpecificMonitoring(): void {
    if (!this.capabilities.isSafari) return;

    // Monitor scroll performance
    this.monitorScrollPerformance();

    // Monitor backdrop-filter performance
    this.monitorBackdropFilterPerformance();

    // Monitor video loading
    this.monitorVideoPerformance();

    // Monitor glass effect rendering
    this.monitorGlassEffectPerformance();
  }

  private monitorScrollPerformance(): void {
    let frameCount = 0;
    let lastTime = performance.now();
    let scrolling = false;

    const measureFPS = () => {
      if (scrolling) {
        frameCount++;
        requestAnimationFrame(measureFPS);
      } else if (frameCount > 0) {
        const duration = performance.now() - lastTime;
        const fps = (frameCount / duration) * 1000;

        this.metrics.scrollFPS = fps;
        this.trackEvent({
          eventType: 'scroll_performance',
          value: fps,
          metadata: { frameCount, duration },
          timestamp: Date.now(),
        });

        frameCount = 0;
      }
    };

    window.addEventListener('scroll', () => {
      if (!scrolling) {
        scrolling = true;
        lastTime = performance.now();
        frameCount = 0;
        requestAnimationFrame(measureFPS);
      }

      clearTimeout((window as any).scrollTimeout);
      (window as any).scrollTimeout = setTimeout(() => {
        scrolling = false;
      }, 150);
    }, { passive: true });
  }

  private monitorBackdropFilterPerformance(): void {
    // Monitor elements with backdrop-filter
    const backdropElements = document.querySelectorAll('[class*="backdrop-blur"]');

    backdropElements.forEach((element) => {
      const observer = new MutationObserver(() => {
        const startTime = performance.now();

        requestAnimationFrame(() => {
          const renderTime = performance.now() - startTime;

          if (renderTime > 16.67) { // Slower than 60fps
            this.trackEvent({
              eventType: 'glass_effect_render',
              value: renderTime,
              metadata: { elementClass: element.className },
              timestamp: Date.now(),
            });
          }
        });
      });

      observer.observe(element, { attributes: true, attributeFilter: ['class', 'style'] });
    });
  }

  private monitorVideoPerformance(): void {
    const videos = document.querySelectorAll('video');

    videos.forEach((video) => {
      const startTime = performance.now();

      const onLoadedData = () => {
        const loadTime = performance.now() - startTime;
        this.metrics.videoLoadTime = loadTime;

        this.trackEvent({
          eventType: 'video_load',
          value: loadTime,
          metadata: {
            videoSrc: video.src,
            playsInline: video.playsInline,
            muted: video.muted,
          },
          timestamp: Date.now(),
        });

        video.removeEventListener('loadeddata', onLoadedData);
      };

      video.addEventListener('loadeddata', onLoadedData);
    });
  }

  private monitorGlassEffectPerformance(): void {
    // Monitor paint timing for glass effect elements
    if ('PerformanceObserver' in window) {
      const glassObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'paint') {
            this.metrics.glassEffectRenderTime = entry.startTime;
          }
        });
      });

      try {
        glassObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        // Ignore if not supported
      }
    }
  }

  private setupCustomEventListeners(): void {
    // Listen for custom Safari optimization events
    window.addEventListener('safari-optimization-applied', (event: any) => {
      this.trackEvent({
        eventType: 'safari_optimization',
        value: event.detail.improvementPercentage || 0,
        metadata: event.detail,
        timestamp: Date.now(),
      });
    });

    // Listen for animation lag events
    window.addEventListener('animation-lag-detected', (event: any) => {
      this.trackEvent({
        eventType: 'animation_lag',
        value: event.detail.lagTime || 0,
        metadata: event.detail,
        timestamp: Date.now(),
      });
    });
  }

  private collectAndSendMetrics(): void {
    const metrics = this.getMetrics();

    // Send to analytics service
    this.sendMetrics(metrics);

    // Send any remaining events
    if (this.events.length > 0) {
      this.sendEvents();
    }
  }

  private sendMetrics(metrics: RUMMetrics): void {
    // Send to your analytics service (e.g., Vercel Analytics, Google Analytics, custom endpoint)
    if (typeof window !== 'undefined' && (window as any).va) {
      // Vercel Analytics
      (window as any).va('track', 'Safari Performance', {
        browser: metrics.browser,
        scrollFPS: metrics.scrollFPS,
        lcp: metrics.lcp,
        cls: metrics.cls,
        isMobile: metrics.isMobile,
      });
    }

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('RUM Metrics:', metrics);
    }

    // Send to custom endpoint if available
    if (process.env.NEXT_PUBLIC_RUM_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_RUM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metrics),
      }).catch(() => {
        // Ignore network errors
      });
    }
  }

  private sendEvents(): void {
    if (this.events.length === 0) return;

    const events = [...this.events];
    this.events = [];

    // Send events to analytics
    if (process.env.NODE_ENV === 'development') {
      console.log('RUM Events:', events);
    }

    if (process.env.NEXT_PUBLIC_RUM_ENDPOINT) {
      fetch(`${process.env.NEXT_PUBLIC_RUM_ENDPOINT}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(events),
      }).catch(() => {
        // Ignore network errors
      });
    }
  }

  private getPerformanceThreshold(eventType: string): number {
    const thresholds = {
      scroll_performance: 45, // FPS threshold
      animation_lag: 16.67, // 60fps frame time
      glass_effect_render: 20, // ms
      video_load: 3000, // ms
      layout_shift: 0.1, // CLS threshold
      safari_optimization: 10, // % improvement
    };

    return thresholds[eventType as keyof typeof thresholds] || 0;
  }

  private generateSessionId(): string {
    return `safari_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getBrowserVersion(): string {
    if (typeof navigator === 'undefined') return 'unknown';

    const match = navigator.userAgent.match(/Version\/([0-9.]+)/);
    return match ? match[1] : 'unknown';
  }

  private getConnectionType(): string {
    if (typeof navigator === 'undefined') return 'unknown';

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection ? connection.effectiveType || connection.type : 'unknown';
  }

  private getEnabledFeatureFlags(): string[] {
    const flags = this.featureFlags.getFlags();
    return Object.entries(flags)
      .filter(([, enabled]) => enabled)
      .map(([flag]) => flag);
  }
}

// Global RUM instance
let rumInstance: RealUserMonitoring | null = null;

/**
 * Get the global RUM instance
 */
export const getRUM = (): RealUserMonitoring => {
  if (!rumInstance) {
    rumInstance = new RealUserMonitoring();
  }
  return rumInstance;
};

/**
 * Initialize RUM monitoring (call this in your app)
 */
export const initializeRUM = (): void => {
  if (typeof window !== 'undefined') {
    const rum = getRUM();
    rum.startMonitoring();

    // Stop monitoring when the page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        rum.stopMonitoring();
      } else {
        rum.startMonitoring();
      }
    });

    // Send metrics before page unload
    window.addEventListener('beforeunload', () => {
      rum.stopMonitoring();
    });
  }
};

/**
 * Track a custom Safari performance event
 */
export const trackSafariPerformanceEvent = (
  eventType: PerformanceEvent['eventType'],
  value: number,
  metadata?: Record<string, any>
): void => {
  getRUM().trackEvent({
    eventType,
    value,
    metadata,
    timestamp: Date.now(),
  });
};

/**
 * React hook for RUM metrics
 */
export const useRUM = () => {
  const [metrics, setMetrics] = React.useState<RUMMetrics | null>(null);

  React.useEffect(() => {
    const rum = getRUM();

    // Update metrics periodically
    const interval = setInterval(() => {
      setMetrics(rum.getMetrics());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    trackEvent: trackSafariPerformanceEvent,
    startMonitoring: () => getRUM().startMonitoring(),
    stopMonitoring: () => getRUM().stopMonitoring(),
  };
};

// React import
import React from 'react';