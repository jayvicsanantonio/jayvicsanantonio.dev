// Lighthouse CI configuration for Safari performance monitoring
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/projects',
        'http://localhost:3000/work',
      ],
      numberOfRuns: 3,
      settings: {
        // Safari-specific configurations
        preset: 'desktop',
        throttlingMethod: 'simulate',
        throttling: {
          // Simulate Safari performance characteristics
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        // Enable specific audits for Safari compatibility
        onlyAudits: [
          'first-contentful-paint',
          'largest-contentful-paint',
          'speed-index',
          'cumulative-layout-shift',
          'first-input-delay',
          'total-blocking-time',
          'interactive',
          'metrics',
          'screenshot-thumbnails',
          'final-screenshot',
          // Safari-specific performance audits
          'efficient-animated-content',
          'no-unload-listeners',
          'non-composited-animations',
          'unsized-images',
          'unused-css-rules',
          'uses-responsive-images',
          'uses-optimized-images',
          'modern-image-formats',
          'offscreen-images',
          'render-blocking-resources',
          'unminified-css',
          'unminified-javascript',
          'unused-javascript',
          'uses-webp-images',
          'uses-text-compression',
          'critical-request-chains',
          'user-timings',
          'bootup-time',
          'mainthread-work-breakdown',
          'diagnostics',
        ],
        // Custom headers for Safari testing
        extraHeaders: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
        },
      },
    },
    assert: {
      assertions: {
        // Core Web Vitals thresholds for Safari
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],

        // Safari-specific performance thresholds
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],

        // Safari scroll performance (custom metric)
        'interactive': ['error', { maxNumericValue: 3500 }],

        // Resource optimization for Safari
        'unused-css-rules': ['warn', { maxNumericValue: 20000 }],
        'unused-javascript': ['warn', { maxNumericValue: 50000 }],
        'render-blocking-resources': ['warn', { maxNumericValue: 500 }],
        'efficient-animated-content': ['error', { minScore: 0.8 }],
        'non-composited-animations': ['error', { minScore: 0.9 }],

        // Image optimization for Safari
        'uses-optimized-images': ['warn', { maxNumericValue: 10000 }],
        'modern-image-formats': ['warn', { maxNumericValue: 10000 }],
        'uses-responsive-images': ['warn', { maxNumericValue: 10000 }],
        'offscreen-images': ['warn', { maxNumericValue: 10000 }],

        // Safari-specific best practices
        'uses-text-compression': ['warn', { maxNumericValue: 1000 }],
        'unminified-css': ['error', { maxNumericValue: 1000 }],
        'unminified-javascript': ['error', { maxNumericValue: 1000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
      reportFilenamePattern: 'safari-performance-%%PATHNAME%%-%%DATETIME%%.report.html',
    },
    server: {
      port: 9009,
      storage: {
        storageMethod: 'filesystem',
        storagePath: './.lighthouseci',
      },
    },
  },
};