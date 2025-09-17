// Performance monitoring dashboard for Safari optimization analytics
// Integrates with various analytics services to track Safari performance

import { getRUM, type RUMMetrics, type PerformanceEvent } from './realUserMonitoring';
import { getFeatureFlags } from './featureFlags';
import { getBrowserCapabilities } from './browserUtils';

export interface DashboardMetrics {
  // Performance metrics
  averageScrollFPS: number;
  p95ScrollFPS: number;
  glassEffectRenderTime: number;
  videoLoadTime: number;
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
  };

  // User context
  totalUsers: number;
  safariUsers: number;
  mobileUsers: number;
  safariUserPercentage: number;

  // Feature adoption
  featureFlagAdoption: Record<string, number>;
  optimizationEffectiveness: number;

  // Comparison metrics
  safariVsChrome: {
    scrollFPSDiff: number;
    lcpDiff: number;
    performanceScore: number;
  };

  // Time series data
  timeRange: string;
  timestamp: number;
}

export interface PerformanceAlert {
  type: 'performance_regression' | 'safari_specific_issue' | 'feature_flag_impact';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  metrics: Record<string, number>;
  timestamp: number;
  affectedUsers: number;
}

/**
 * Performance dashboard manager for Safari optimization analytics
 */
export class PerformanceDashboard {
  private metrics: DashboardMetrics;
  private alerts: PerformanceAlert[] = [];
  private capabilities: any;

  constructor() {
    this.capabilities = getBrowserCapabilities();
    this.metrics = this.initializeMetrics();
  }

  /**
   * Initialize performance monitoring dashboard
   */
  async initialize(): Promise<void> {
    if (typeof window === 'undefined') return;

    // Set up analytics integrations
    this.setupVercelAnalytics();
    this.setupGoogleAnalytics();
    this.setupCustomAnalytics();

    // Start collecting metrics
    this.startMetricsCollection();

    // Set up alerts
    this.setupPerformanceAlerts();
  }

  /**
   * Get current dashboard metrics
   */
  getMetrics(): DashboardMetrics {
    return this.metrics;
  }

  /**
   * Get performance alerts
   */
  getAlerts(): PerformanceAlert[] {
    return this.alerts;
  }

  /**
   * Track Safari-specific performance event
   */
  trackSafariEvent(event: PerformanceEvent): void {
    // Send to analytics services
    this.sendToAnalytics('safari_performance_event', {
      eventType: event.eventType,
      value: event.value,
      browser: this.capabilities.isSafari ? 'Safari' : 'Other',
      mobile: this.capabilities.isMobile,
      ...event.metadata,
    });

    // Check for performance regressions
    this.checkPerformanceThresholds(event);
  }

  /**
   * Generate performance report
   */
  generateReport(timeRange: string = '24h'): DashboardMetrics {
    const rum = getRUM();
    const currentMetrics = rum.getMetrics();

    // Calculate aggregated metrics (in a real implementation, this would query your analytics service)
    this.metrics = {
      ...this.metrics,
      timeRange,
      timestamp: Date.now(),
      // Update with current session metrics
      ...(currentMetrics.scrollFPS && { averageScrollFPS: currentMetrics.scrollFPS }),
      ...(currentMetrics.glassEffectRenderTime && { glassEffectRenderTime: currentMetrics.glassEffectRenderTime }),
      ...(currentMetrics.videoLoadTime && { videoLoadTime: currentMetrics.videoLoadTime }),
      coreWebVitals: {
        lcp: currentMetrics.lcp || this.metrics.coreWebVitals.lcp,
        fid: currentMetrics.fid || this.metrics.coreWebVitals.fid,
        cls: currentMetrics.cls || this.metrics.coreWebVitals.cls,
      },
    };

    return this.metrics;
  }

  /**
   * Create performance alert
   */
  createAlert(alert: Omit<PerformanceAlert, 'timestamp'>): void {
    const newAlert: PerformanceAlert = {
      ...alert,
      timestamp: Date.now(),
    };

    this.alerts.unshift(newAlert);

    // Keep only last 50 alerts
    this.alerts = this.alerts.slice(0, 50);

    // Send to monitoring service
    this.sendAlertToMonitoring(newAlert);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Performance Alert:', newAlert);
    }
  }

  private initializeMetrics(): DashboardMetrics {
    return {
      averageScrollFPS: 60,
      p95ScrollFPS: 55,
      glassEffectRenderTime: 16,
      videoLoadTime: 1000,
      coreWebVitals: {
        lcp: 2000,
        fid: 50,
        cls: 0.05,
      },
      totalUsers: 0,
      safariUsers: 0,
      mobileUsers: 0,
      safariUserPercentage: 0,
      featureFlagAdoption: {},
      optimizationEffectiveness: 0,
      safariVsChrome: {
        scrollFPSDiff: 0,
        lcpDiff: 0,
        performanceScore: 0,
      },
      timeRange: '24h',
      timestamp: Date.now(),
    };
  }

  private setupVercelAnalytics(): void {
    // Vercel Analytics integration
    if (typeof window !== 'undefined' && (window as any).va) {
      const va = (window as any).va;

      // Track Safari users
      if (this.capabilities.isSafari) {
        va('track', 'Safari User', {
          mobile: this.capabilities.isMobile,
          featureFlags: this.getEnabledFeatureFlags(),
        });
      }

      // Track feature flag adoption
      const flags = getFeatureFlags().getFlags();
      Object.entries(flags).forEach(([flag, enabled]) => {
        if (enabled) {
          va('track', 'Feature Flag Enabled', { flag });
        }
      });
    }
  }

  private setupGoogleAnalytics(): void {
    // Google Analytics 4 integration
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const gtag = (window as any).gtag;

      // Set custom dimensions for Safari tracking
      gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        custom_map: {
          custom_dimension_1: 'browser_type',
          custom_dimension_2: 'safari_optimizations_enabled',
          custom_dimension_3: 'scroll_performance_tier',
        },
      });

      // Track Safari-specific metrics
      gtag('event', 'safari_optimization_loaded', {
        custom_dimension_1: this.capabilities.isSafari ? 'Safari' : 'Other',
        custom_dimension_2: getFeatureFlags().isEnabled('safariScrollOptimization'),
        custom_dimension_3: this.getPerformanceTier(),
      });
    }
  }

  private setupCustomAnalytics(): void {
    // Custom analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      this.sendToAnalytics('dashboard_initialized', {
        browser: this.capabilities.isSafari ? 'Safari' : 'Other',
        mobile: this.capabilities.isMobile,
        featureFlags: this.getEnabledFeatureFlags(),
        timestamp: Date.now(),
      });
    }
  }

  private startMetricsCollection(): void {
    // Collect metrics every 30 seconds
    setInterval(() => {
      const rum = getRUM();
      const currentMetrics = rum.getMetrics();

      this.sendToAnalytics('performance_metrics', {
        scrollFPS: currentMetrics.scrollFPS,
        lcp: currentMetrics.lcp,
        fid: currentMetrics.fid,
        cls: currentMetrics.cls,
        browser: currentMetrics.browser,
        mobile: currentMetrics.isMobile,
        timestamp: Date.now(),
      });
    }, 30000);
  }

  private setupPerformanceAlerts(): void {
    // Check for performance issues every minute
    setInterval(() => {
      this.checkSystemHealth();
    }, 60000);
  }

  private checkPerformanceThresholds(event: PerformanceEvent): void {
    const thresholds = {
      scroll_performance: { critical: 30, high: 45, medium: 55 },
      animation_lag: { critical: 100, high: 50, medium: 25 },
      glass_effect_render: { critical: 50, high: 30, medium: 20 },
      video_load: { critical: 10000, high: 5000, medium: 3000 },
    };

    const threshold = thresholds[event.eventType as keyof typeof thresholds];
    if (!threshold) return;

    let severity: PerformanceAlert['severity'] = 'low';
    if (event.value >= threshold.critical) severity = 'critical';
    else if (event.value >= threshold.high) severity = 'high';
    else if (event.value >= threshold.medium) severity = 'medium';

    if (severity !== 'low') {
      this.createAlert({
        type: 'performance_regression',
        severity,
        message: `${event.eventType} performance issue detected: ${event.value}ms`,
        metrics: { [event.eventType]: event.value },
        affectedUsers: 1, // In real implementation, this would be calculated
      });
    }
  }

  private checkSystemHealth(): void {
    const rum = getRUM();
    const metrics = rum.getMetrics();

    // Check for Safari-specific issues
    if (this.capabilities.isSafari) {
      if (metrics.scrollFPS && metrics.scrollFPS < 45) {
        this.createAlert({
          type: 'safari_specific_issue',
          severity: 'high',
          message: `Safari scroll performance below target: ${metrics.scrollFPS}fps`,
          metrics: { scrollFPS: metrics.scrollFPS },
          affectedUsers: this.estimateAffectedUsers(),
        });
      }

      if (metrics.cls && metrics.cls > 0.1) {
        this.createAlert({
          type: 'safari_specific_issue',
          severity: 'medium',
          message: `Safari layout shift detected: ${metrics.cls}`,
          metrics: { cls: metrics.cls },
          affectedUsers: this.estimateAffectedUsers(),
        });
      }
    }
  }

  private sendToAnalytics(eventName: string, data: Record<string, any>): void {
    // Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', eventName, data);
    }

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, data);
    }

    // Custom endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: eventName, data, timestamp: Date.now() }),
      }).catch(() => {
        // Ignore network errors
      });
    }
  }

  private sendAlertToMonitoring(alert: PerformanceAlert): void {
    // Send to monitoring service (e.g., Sentry, DataDog, custom webhook)
    if (process.env.NEXT_PUBLIC_MONITORING_WEBHOOK) {
      fetch(process.env.NEXT_PUBLIC_MONITORING_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert),
      }).catch(() => {
        // Ignore network errors
      });
    }

    // Send to Sentry if available
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureMessage(`Performance Alert: ${alert.message}`, {
        level: alert.severity === 'critical' ? 'error' : 'warning',
        extra: alert,
      });
    }
  }

  private getEnabledFeatureFlags(): string[] {
    const flags = getFeatureFlags().getFlags();
    return Object.entries(flags)
      .filter(([, enabled]) => enabled)
      .map(([flag]) => flag);
  }

  private getPerformanceTier(): string {
    const rum = getRUM();
    const metrics = rum.getMetrics();

    if (metrics.scrollFPS && metrics.scrollFPS >= 55) return 'high';
    if (metrics.scrollFPS && metrics.scrollFPS >= 45) return 'medium';
    return 'low';
  }

  private estimateAffectedUsers(): number {
    // In a real implementation, this would query your user analytics
    return this.capabilities.isSafari ? Math.floor(Math.random() * 100) + 1 : 1;
  }
}

// Global dashboard instance
let dashboardInstance: PerformanceDashboard | null = null;

/**
 * Get the global performance dashboard
 */
export const getPerformanceDashboard = (): PerformanceDashboard => {
  if (!dashboardInstance) {
    dashboardInstance = new PerformanceDashboard();
  }
  return dashboardInstance;
};

/**
 * Initialize performance dashboard (call this in your app)
 */
export const initializePerformanceDashboard = async (): Promise<void> => {
  if (typeof window !== 'undefined') {
    const dashboard = getPerformanceDashboard();
    await dashboard.initialize();
  }
};

/**
 * React hook for performance dashboard
 */
export const usePerformanceDashboard = () => {
  const [metrics, setMetrics] = React.useState<DashboardMetrics | null>(null);
  const [alerts, setAlerts] = React.useState<PerformanceAlert[]>([]);

  React.useEffect(() => {
    const dashboard = getPerformanceDashboard();

    // Update metrics and alerts periodically
    const updateData = () => {
      setMetrics(dashboard.getMetrics());
      setAlerts(dashboard.getAlerts());
    };

    updateData();
    const interval = setInterval(updateData, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    alerts,
    generateReport: (timeRange?: string) => getPerformanceDashboard().generateReport(timeRange),
    trackEvent: (event: PerformanceEvent) => getPerformanceDashboard().trackSafariEvent(event),
  };
};

// React import
import React from 'react';