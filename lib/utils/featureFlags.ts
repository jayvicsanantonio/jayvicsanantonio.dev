// Feature flag system for Safari optimizations
// Enables gradual rollout and A/B testing of Safari-specific features

export interface FeatureFlags {
  safariScrollOptimization: boolean;
  safariBackdropFilterOptimization: boolean;
  safariMotionOptimization: boolean;
  safariGlassEffectsOptimization: boolean;
  safariVideoOptimization: boolean;
  safariTouchOptimization: boolean;
  safariPerformanceMonitoring: boolean;
  experimentalSafariFeatures: boolean;
}

export interface FeatureFlagConfig {
  defaultEnabled: boolean;
  enabledForSafari: boolean;
  enabledForMobile: boolean;
  rolloutPercentage: number;
  experimentGroup?: string;
}

/**
 * Default feature flag configurations
 */
const defaultFeatureFlags: Record<keyof FeatureFlags, FeatureFlagConfig> = {
  safariScrollOptimization: {
    defaultEnabled: true,
    enabledForSafari: true,
    enabledForMobile: true,
    rolloutPercentage: 100,
  },
  safariBackdropFilterOptimization: {
    defaultEnabled: true,
    enabledForSafari: true,
    enabledForMobile: true,
    rolloutPercentage: 100,
  },
  safariMotionOptimization: {
    defaultEnabled: true,
    enabledForSafari: true,
    enabledForMobile: true,
    rolloutPercentage: 100,
  },
  safariGlassEffectsOptimization: {
    defaultEnabled: true,
    enabledForSafari: true,
    enabledForMobile: true,
    rolloutPercentage: 100,
  },
  safariVideoOptimization: {
    defaultEnabled: true,
    enabledForSafari: true,
    enabledForMobile: true,
    rolloutPercentage: 100,
  },
  safariTouchOptimization: {
    defaultEnabled: true,
    enabledForSafari: false, // Desktop Safari doesn't need touch optimization
    enabledForMobile: true,
    rolloutPercentage: 100,
  },
  safariPerformanceMonitoring: {
    defaultEnabled: process.env.NODE_ENV === 'development',
    enabledForSafari: true,
    enabledForMobile: true,
    rolloutPercentage: 10, // Only monitor 10% of users to avoid performance impact
  },
  experimentalSafariFeatures: {
    defaultEnabled: false,
    enabledForSafari: true,
    enabledForMobile: false,
    rolloutPercentage: 5, // Only 5% for experimental features
    experimentGroup: 'safari_experimental_2024',
  },
};

/**
 * Feature flag manager with rollout and A/B testing capabilities
 */
export class FeatureFlagManager {
  private flags: FeatureFlags;
  private userHash: string;
  private capabilities: any;

  constructor() {
    this.userHash = this.generateUserHash();
    this.capabilities = this.getBrowserCapabilities();
    this.flags = this.initializeFlags();
  }

  /**
   * Get current feature flags
   */
  getFlags(): FeatureFlags {
    return this.flags;
  }

  /**
   * Check if a specific feature is enabled
   */
  isEnabled(feature: keyof FeatureFlags): boolean {
    return this.flags[feature];
  }

  /**
   * Enable a feature flag (for development/testing)
   */
  enableFeature(feature: keyof FeatureFlags): void {
    this.flags[feature] = true;
    this.storeFlags();
  }

  /**
   * Disable a feature flag (for development/testing)
   */
  disableFeature(feature: keyof FeatureFlags): void {
    this.flags[feature] = false;
    this.storeFlags();
  }

  /**
   * Reset all flags to defaults
   */
  resetToDefaults(): void {
    this.flags = this.initializeFlags();
    this.storeFlags();
  }

  /**
   * Get rollout status for analytics
   */
  getRolloutStatus(): Record<string, any> {
    return {
      userHash: this.userHash,
      browser: this.capabilities.isSafari ? 'Safari' : 'Other',
      mobile: this.capabilities.isMobile,
      flags: this.flags,
      timestamp: Date.now(),
    };
  }

  private initializeFlags(): FeatureFlags {
    // Check for stored overrides first (for development)
    const storedFlags = this.getStoredFlags();
    if (storedFlags) {
      return storedFlags;
    }

    // Initialize based on environment and rollout
    const flags = {} as FeatureFlags;

    for (const [featureName, config] of Object.entries(defaultFeatureFlags)) {
      const feature = featureName as keyof FeatureFlags;
      flags[feature] = this.shouldEnableFeature(config);
    }

    return flags;
  }

  private shouldEnableFeature(config: FeatureFlagConfig): boolean {
    // Check environment override
    const envVar = `NEXT_PUBLIC_FEATURE_${config.experimentGroup?.toUpperCase()}`;
    if (process.env[envVar] !== undefined) {
      return process.env[envVar] === 'true';
    }

    // Check browser-specific rules
    if (this.capabilities.isSafari && !config.enabledForSafari) {
      return false;
    }

    if (this.capabilities.isMobile && !config.enabledForMobile) {
      return false;
    }

    // Check rollout percentage
    const userPercentile = this.getUserPercentile();
    if (userPercentile > config.rolloutPercentage) {
      return false;
    }

    return config.defaultEnabled;
  }

  private getUserPercentile(): number {
    // Convert user hash to percentile (0-100)
    const hash = parseInt(this.userHash.slice(-8), 16);
    return (hash % 100) + 1;
  }

  private generateUserHash(): string {
    // Generate consistent user hash for rollout consistency
    if (typeof window === 'undefined') return 'server';

    let hash = localStorage.getItem('safari_optimization_user_hash');
    if (!hash) {
      hash = this.simpleHash(
        navigator.userAgent +
        screen.width +
        screen.height +
        Date.now().toString(36)
      );
      localStorage.setItem('safari_optimization_user_hash', hash);
    }

    return hash;
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  private getBrowserCapabilities() {
    if (typeof window === 'undefined') {
      return { isSafari: false, isMobile: false };
    }

    const userAgent = navigator.userAgent;
    return {
      isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
      isMobile: /iPhone|iPad|iPod|Android/i.test(userAgent),
    };
  }

  private getStoredFlags(): FeatureFlags | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem('safari_optimization_feature_flags');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private storeFlags(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('safari_optimization_feature_flags', JSON.stringify(this.flags));
    } catch {
      // Ignore storage errors
    }
  }
}

// Global feature flag manager instance
let featureFlagManager: FeatureFlagManager | null = null;

/**
 * Get the global feature flag manager
 */
export const getFeatureFlags = (): FeatureFlagManager => {
  if (!featureFlagManager) {
    featureFlagManager = new FeatureFlagManager();
  }
  return featureFlagManager;
};

/**
 * React hook for using feature flags
 */
export const useFeatureFlags = () => {
  const [flags, setFlags] = React.useState<FeatureFlags>(() =>
    getFeatureFlags().getFlags()
  );

  const manager = getFeatureFlags();

  const enableFeature = (feature: keyof FeatureFlags) => {
    manager.enableFeature(feature);
    setFlags(manager.getFlags());
  };

  const disableFeature = (feature: keyof FeatureFlags) => {
    manager.disableFeature(feature);
    setFlags(manager.getFlags());
  };

  const resetToDefaults = () => {
    manager.resetToDefaults();
    setFlags(manager.getFlags());
  };

  return {
    flags,
    isEnabled: (feature: keyof FeatureFlags) => flags[feature],
    enableFeature,
    disableFeature,
    resetToDefaults,
    getRolloutStatus: () => manager.getRolloutStatus(),
  };
};

/**
 * Conditional Safari optimization wrapper
 */
export const withSafariOptimization = <T,>(
  feature: keyof FeatureFlags,
  optimizedValue: T,
  fallbackValue: T
): T => {
  const manager = getFeatureFlags();
  return manager.isEnabled(feature) ? optimizedValue : fallbackValue;
};

/**
 * Development utilities for testing feature flags
 */
export const FeatureFlagDebug = {
  enable: (feature: keyof FeatureFlags) => getFeatureFlags().enableFeature(feature),
  disable: (feature: keyof FeatureFlags) => getFeatureFlags().disableFeature(feature),
  reset: () => getFeatureFlags().resetToDefaults(),
  status: () => getFeatureFlags().getRolloutStatus(),
  all: () => getFeatureFlags().getFlags(),
};

// Make debug utilities available in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).SafariFeatureFlags = FeatureFlagDebug;
}

// React import
import React from 'react';