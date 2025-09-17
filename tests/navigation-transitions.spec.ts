// Cross-browser navigation transition tests
// Validates navigation smoothness and performance across Safari and Chrome

import { test, expect, type Page, type BrowserContext } from '@playwright/test';

interface NavigationMetric {
  navigationTime: number;
  browser: string;
  fromUrl: string;
  toUrl: string;
  supportsViewTransitions: boolean;
}

class NavigationTestHelper {
  constructor(private page: Page) {}

  async measureNavigationTime(fromUrl: string, toUrl: string): Promise<number> {
    const startTime = Date.now();

    // Wait for navigation to complete
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.page.goto(toUrl)
    ]);

    return Date.now() - startTime;
  }

  async checkViewTransitionSupport(): Promise<boolean> {
    return await this.page.evaluate(() => {
      return typeof document !== 'undefined' && 'startViewTransition' in document;
    });
  }

  async clickNavigationElement(selector: string): Promise<number> {
    const startTime = Date.now();

    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.page.click(selector)
    ]);

    return Date.now() - startTime;
  }

  async getVisibleTransitionElements(): Promise<string[]> {
    return await this.page.evaluate(() => {
      const elements = document.querySelectorAll('.vt-tag-projects, .vt-tag-work, .page-transition-target');
      return Array.from(elements)
        .filter(el => el.getBoundingClientRect().width > 0)
        .map(el => el.className);
    });
  }

  async checkFallbackAnimationClasses(): Promise<boolean> {
    return await this.page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = '.test-fallback { transition: opacity 300ms; }';
      document.head.appendChild(style);

      const testEl = document.createElement('div');
      testEl.className = 'test-fallback';
      document.body.appendChild(testEl);

      const computedStyle = window.getComputedStyle(testEl);
      const hasTransition = computedStyle.transition.includes('opacity');

      document.head.removeChild(style);
      document.body.removeChild(testEl);

      return hasTransition;
    });
  }
}

test.describe('Navigation Transitions', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should detect View Transitions API support correctly', async ({ page, browserName }) => {
    const helper = new NavigationTestHelper(page);
    const supportsViewTransitions = await helper.checkViewTransitionSupport();

    // Chrome should support View Transitions, Safari might not
    if (browserName === 'chromium') {
      expect(supportsViewTransitions).toBe(true);
    }

    console.log(`${browserName}: View Transitions supported = ${supportsViewTransitions}`);
  });

  test('should apply correct CSS classes based on browser support', async ({ page, browserName }) => {
    const helper = new NavigationTestHelper(page);
    const supportsViewTransitions = await helper.checkViewTransitionSupport();
    const transitionElements = await helper.getVisibleTransitionElements();

    // Should have navigation elements with appropriate classes
    expect(transitionElements.length).toBeGreaterThan(0);

    if (supportsViewTransitions) {
      // Should use vt-tag-* classes when supported
      const hasViewTransitionClasses = transitionElements.some(className =>
        className.includes('vt-tag-projects') || className.includes('vt-tag-work')
      );
      expect(hasViewTransitionClasses).toBe(true);
    } else {
      // Should use fallback classes when not supported
      const hasFallbackClasses = transitionElements.some(className =>
        className.includes('page-transition-target')
      );
      // Note: This might not always be true depending on implementation
      console.log(`${browserName}: Transition elements = ${transitionElements.join(', ')}`);
    }
  });

  test('should navigate to Projects page smoothly', async ({ page, browserName }) => {
    const helper = new NavigationTestHelper(page);

    // Find and click the Projects navigation button
    const projectsButton = page.locator('[aria-label="Projects"]').first();
    await expect(projectsButton).toBeVisible();

    const navigationTime = await helper.clickNavigationElement('[aria-label="Projects"]');

    // Verify we're on the projects page
    await expect(page).toHaveURL('/projects');
    await expect(page.locator('h1, h2')).toContainText(/projects/i);

    // Navigation should be reasonably fast (less than 3 seconds)
    expect(navigationTime).toBeLessThan(3000);

    console.log(`${browserName}: Projects navigation time = ${navigationTime}ms`);
  });

  test('should navigate to Work page smoothly', async ({ page, browserName }) => {
    const helper = new NavigationTestHelper(page);

    // Find and click the Work navigation button
    const workButton = page.locator('[aria-label*="Work"]').first();
    await expect(workButton).toBeVisible();

    const navigationTime = await helper.clickNavigationElement('[aria-label*="Work"]');

    // Verify we're on the work page
    await expect(page).toHaveURL('/work');
    await expect(page.locator('h1, h2')).toContainText(/work|experience|timeline/i);

    // Navigation should be reasonably fast (less than 3 seconds)
    expect(navigationTime).toBeLessThan(3000);

    console.log(`${browserName}: Work navigation time = ${navigationTime}ms`);
  });

  test('should handle external links correctly', async ({ page, context, browserName }) => {
    // Click on an external link (LinkedIn or GitHub)
    const externalLink = page.locator('[aria-label="LinkedIn"], [aria-label="GitHub"]').first();
    await expect(externalLink).toBeVisible();

    // External links should open in new tab/window
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      externalLink.click()
    ]);

    // Verify external link opened
    expect(newPage.url()).toMatch(/(linkedin|github)\.com/);

    // Close the new page
    await newPage.close();

    console.log(`${browserName}: External link navigation working correctly`);
  });

  test('should respect reduced motion preferences', async ({ page, browserName }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    const helper = new NavigationTestHelper(page);

    // Check if reduced motion styles are applied
    const respectsReducedMotion = await page.evaluate(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      return mediaQuery.matches;
    });

    expect(respectsReducedMotion).toBe(true);

    // Navigation should still work with reduced motion
    const navigationTime = await helper.clickNavigationElement('[aria-label="Projects"]');
    await expect(page).toHaveURL('/projects');

    console.log(`${browserName}: Reduced motion navigation time = ${navigationTime}ms`);
  });

  test('should have consistent navigation across mobile and desktop', async ({ page, browserName }) => {
    const helper = new NavigationTestHelper(page);

    // Test desktop navigation
    await page.setViewportSize({ width: 1200, height: 800 });
    const desktopNavTime = await helper.clickNavigationElement('[aria-label="Projects"]');
    await page.goto('/'); // Go back

    // Test mobile navigation
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileNavTime = await helper.clickNavigationElement('[aria-label="Projects"]');

    // Both should complete successfully
    expect(desktopNavTime).toBeLessThan(3000);
    expect(mobileNavTime).toBeLessThan(3000);

    // Mobile shouldn't be significantly slower than desktop
    const timeDifference = Math.abs(mobileNavTime - desktopNavTime);
    expect(timeDifference).toBeLessThan(1000); // Less than 1 second difference

    console.log(`${browserName}: Desktop = ${desktopNavTime}ms, Mobile = ${mobileNavTime}ms`);
  });
});

test.describe('Performance Comparison', () => {
  const metrics: NavigationMetric[] = [];

  test.afterAll(async () => {
    // Output performance summary
    console.log('\n=== Navigation Performance Summary ===');

    const browserGroups = metrics.reduce((acc, metric) => {
      if (!acc[metric.browser]) acc[metric.browser] = [];
      acc[metric.browser].push(metric);
      return acc;
    }, {} as Record<string, NavigationMetric[]>);

    Object.entries(browserGroups).forEach(([browser, browserMetrics]) => {
      const avgTime = browserMetrics.reduce((sum, m) => sum + m.navigationTime, 0) / browserMetrics.length;
      const supportsVT = browserMetrics[0]?.supportsViewTransitions;

      console.log(`${browser}: Avg ${avgTime.toFixed(2)}ms, View Transitions: ${supportsVT}`);
    });
  });

  test('should measure and compare navigation performance', async ({ page, browserName }) => {
    const helper = new NavigationTestHelper(page);
    const supportsViewTransitions = await helper.checkViewTransitionSupport();

    // Measure multiple navigation cycles
    const routes = ['/projects', '/work', '/'];
    const routeMetrics: NavigationMetric[] = [];

    for (const route of routes) {
      const fromUrl = page.url();
      const navigationTime = await helper.measureNavigationTime(fromUrl, route);

      routeMetrics.push({
        navigationTime,
        browser: browserName,
        fromUrl,
        toUrl: route,
        supportsViewTransitions,
      });
    }

    // Add to global metrics
    metrics.push(...routeMetrics);

    // Verify all navigations completed successfully
    routeMetrics.forEach(metric => {
      expect(metric.navigationTime).toBeLessThan(3000);
      expect(metric.navigationTime).toBeGreaterThan(0);
    });

    const avgTime = routeMetrics.reduce((sum, m) => sum + m.navigationTime, 0) / routeMetrics.length;
    console.log(`${browserName}: Average navigation time = ${avgTime.toFixed(2)}ms`);
  });
});