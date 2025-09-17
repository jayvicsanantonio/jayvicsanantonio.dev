// Playwright configuration for Safari compatibility testing
import { defineConfig, devices } from '@playwright/test';

/**
 * Safari-focused cross-browser testing configuration
 * Tests critical Safari compatibility features and performance
 */
export default defineConfig({
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Take screenshot on failure
    screenshot: 'only-on-failure',

    // Record video on failure
    video: 'retain-on-failure',
  },

  // Configure projects for major browsers with Safari focus
  projects: [
    // Desktop Safari (Primary focus)
    {
      name: 'Desktop Safari',
      use: {
        ...devices['Desktop Safari'],
        // Safari-specific viewport for testing
        viewport: { width: 1280, height: 720 },
      },
      testMatch: ['**/safari-desktop.spec.ts', '**/cross-browser.spec.ts'],
    },

    // Mobile Safari (iOS)
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 14'],
        // Test both orientations
        viewport: { width: 390, height: 844 },
      },
      testMatch: ['**/safari-mobile.spec.ts', '**/cross-browser.spec.ts'],
    },

    // iPad Safari
    {
      name: 'iPad Safari',
      use: {
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 1366 },
      },
      testMatch: ['**/safari-tablet.spec.ts', '**/cross-browser.spec.ts'],
    },

    // Chrome for comparison
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
      testMatch: ['**/performance-comparison.spec.ts', '**/cross-browser.spec.ts'],
    },

    // Firefox for broader compatibility testing
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
      testMatch: ['**/cross-browser.spec.ts'],
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  // Global test timeout
  timeout: 30000,

  // Expect timeout
  expect: {
    timeout: 10000,
  },

  // Output directories
  outputDir: 'test-results',
});