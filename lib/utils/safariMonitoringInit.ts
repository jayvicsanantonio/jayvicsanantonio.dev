// Safari monitoring initialization
// Centralized initialization for all Safari optimization monitoring systems

import { initializeRUM } from './realUserMonitoring';
import { initializePerformanceDashboard } from './performanceDashboard';
import { getFeatureFlags } from './featureFlags';
import { getBrowserCapabilities } from './browserUtils';

export interface MonitoringConfig {
  enableRUM: boolean;
  enableDashboard: boolean;
  enableFeatureFlags: boolean;
  enablePerformanceAlerts: boolean;
  developmentMode: boolean;
}

/**
 * Initialize all Safari monitoring systems
 */
export const initializeSafariMonitoring = async (config?: Partial<MonitoringConfig>): Promise<void> => {
  if (typeof window === 'undefined') return;

  const finalConfig: MonitoringConfig = {
    enableRUM: true,
    enableDashboard: true,
    enableFeatureFlags: true,
    enablePerformanceAlerts: true,
    developmentMode: process.env.NODE_ENV === 'development',
    ...config,
  };

  try {
    // Initialize feature flags first
    if (finalConfig.enableFeatureFlags) {
      const featureFlags = getFeatureFlags();

      if (finalConfig.developmentMode) {
        console.log('Safari Feature Flags:', featureFlags.getFlags());
      }
    }

    // Initialize RUM monitoring
    if (finalConfig.enableRUM) {
      initializeRUM();

      if (finalConfig.developmentMode) {
        console.log('Safari RUM monitoring initialized');
      }
    }

    // Initialize performance dashboard
    if (finalConfig.enableDashboard) {
      await initializePerformanceDashboard();

      if (finalConfig.developmentMode) {
        console.log('Safari performance dashboard initialized');
      }
    }

    // Set up development utilities
    if (finalConfig.developmentMode) {
      setupDevelopmentUtilities();
    }

    // Log successful initialization
    const capabilities = getBrowserCapabilities();
    if (capabilities.isSafari) {
      console.log('🔍 Safari optimization monitoring active');

      if (finalConfig.developmentMode) {
        console.log('Available development tools:', {
          'window.SafariFeatureFlags': 'Feature flag management',
          'window.SafariPerformance': 'Performance monitoring',
          'window.SafariDashboard': 'Dashboard utilities',
        });
      }
    }

  } catch (error) {
    console.error('Failed to initialize Safari monitoring:', error);
  }
};

/**
 * Set up development utilities for Safari optimization
 */
const setupDevelopmentUtilities = (): void => {
  if (typeof window === 'undefined') return;

  // Feature flags debug utilities (already set up in featureFlags.ts)

  // Performance monitoring utilities
  (window as any).SafariPerformance = {
    startRUM: () => {
      const { getRUM } = require('./realUserMonitoring');
      getRUM().startMonitoring();
      console.log('✅ RUM monitoring started');
    },

    stopRUM: () => {
      const { getRUM } = require('./realUserMonitoring');
      getRUM().stopMonitoring();
      console.log('⏹️ RUM monitoring stopped');
    },

    getMetrics: () => {
      const { getRUM } = require('./realUserMonitoring');
      const metrics = getRUM().getMetrics();
      console.table(metrics);
      return metrics;
    },

    trackEvent: (eventType: string, value: number, metadata?: any) => {
      const { trackSafariPerformanceEvent } = require('./realUserMonitoring');
      trackSafariPerformanceEvent(eventType as any, value, metadata);
      console.log(`📊 Tracked event: ${eventType} = ${value}`);
    },
  };

  // Dashboard utilities
  (window as any).SafariDashboard = {
    getMetrics: () => {
      const { getPerformanceDashboard } = require('./performanceDashboard');
      const metrics = getPerformanceDashboard().getMetrics();
      console.table(metrics);
      return metrics;
    },

    getAlerts: () => {
      const { getPerformanceDashboard } = require('./performanceDashboard');
      const alerts = getPerformanceDashboard().getAlerts();
      console.log('📢 Performance Alerts:', alerts);
      return alerts;
    },

    generateReport: (timeRange = '24h') => {
      const { getPerformanceDashboard } = require('./performanceDashboard');
      const report = getPerformanceDashboard().generateReport(timeRange);
      console.log(`📊 Performance Report (${timeRange}):`, report);
      return report;
    },
  };

  // Testing utilities
  (window as any).SafariTesting = {
    runPerformanceTest: async () => {
      console.log('🧪 Running Safari performance test...');

      try {
        const { SafariPerformanceTester } = await import('./safariPerformanceTesting');
        const tester = new SafariPerformanceTester();
        const results = await tester.runFullTestSuite();

        console.log('✅ Performance test completed:', results);
        return results;
      } catch (error) {
        console.error('❌ Performance test failed:', error);
      }
    },

    runVisualTest: async () => {
      console.log('👁️ Running Safari visual regression test...');

      try {
        const { VisualRegressionTester } = await import('./visualRegressionTesting');
        const tester = new VisualRegressionTester();
        const results = await tester.runVisualTestSuite();

        console.log('✅ Visual test completed:', results);
        return results;
      } catch (error) {
        console.error('❌ Visual test failed:', error);
      }
    },

    quickCheck: async () => {
      console.log('⚡ Running quick Safari compatibility check...');

      try {
        const [performanceResult, visualResult] = await Promise.all([
          import('./safariPerformanceTesting').then(m => m.quickSafariPerformanceCheck()),
          import('./visualRegressionTesting').then(m => m.quickVisualCheck()),
        ]);

        const passed = performanceResult && visualResult;
        console.log(`${passed ? '✅' : '❌'} Quick check ${passed ? 'passed' : 'failed'}`);

        return { performance: performanceResult, visual: visualResult, overall: passed };
      } catch (error) {
        console.error('❌ Quick check failed:', error);
        return { performance: false, visual: false, overall: false };
      }
    },
  };

  // Browser capability utilities
  (window as any).SafariBrowser = {
    getCapabilities: () => {
      const capabilities = getBrowserCapabilities();
      console.table(capabilities);
      return capabilities;
    },

    checkFeatureSupport: () => {
      const capabilities = getBrowserCapabilities();
      const features = {
        textBalance: CSS.supports('text-wrap: balance'),
        containerQueries: CSS.supports('container-type: inline-size'),
        backdropFilter: CSS.supports('backdrop-filter: blur(1px)'),
        viewportUnits: CSS.supports('height: 100vh'),
        willChange: CSS.supports('will-change: transform'),
        transform3d: CSS.supports('transform: perspective(1px)'),
      };

      console.table({ ...capabilities, ...features });
      return { ...capabilities, ...features };
    },
  };

  console.log('🛠️ Safari development utilities loaded');
  console.log('Available commands:');
  console.log('- window.SafariFeatureFlags: Feature flag management');
  console.log('- window.SafariPerformance: Performance monitoring');
  console.log('- window.SafariDashboard: Dashboard utilities');
  console.log('- window.SafariTesting: Testing utilities');
  console.log('- window.SafariBrowser: Browser capability utilities');
};

/**
 * Quick Safari monitoring health check
 */
export const safariMonitoringHealthCheck = (): boolean => {
  try {
    const capabilities = getBrowserCapabilities();
    const featureFlags = getFeatureFlags();

    const checks = {
      browserDetection: capabilities !== null,
      featureFlags: featureFlags !== null,
      performanceAPI: 'performance' in window,
      localStorage: 'localStorage' in window,
      requestAnimationFrame: 'requestAnimationFrame' in window,
    };

    const allPassed = Object.values(checks).every(Boolean);

    if (process.env.NODE_ENV === 'development') {
      console.log('Safari Monitoring Health Check:', checks);
      console.log(`Overall Status: ${allPassed ? '✅ Healthy' : '❌ Issues Detected'}`);
    }

    return allPassed;
  } catch (error) {
    console.error('Safari monitoring health check failed:', error);
    return false;
  }
};

/**
 * React hook for Safari monitoring initialization
 */
export const useSafariMonitoring = (config?: Partial<MonitoringConfig>) => {
  const [initialized, setInitialized] = React.useState(false);
  const [healthy, setHealthy] = React.useState(false);

  React.useEffect(() => {
    const initialize = async () => {
      try {
        await initializeSafariMonitoring(config);
        const healthStatus = safariMonitoringHealthCheck();

        setHealthy(healthStatus);
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Safari monitoring:', error);
        setInitialized(true);
        setHealthy(false);
      }
    };

    initialize();
  }, []);

  return {
    initialized,
    healthy,
    healthCheck: safariMonitoringHealthCheck,
  };
};

// React import
import React from 'react';