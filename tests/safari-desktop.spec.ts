// Safari Desktop compatibility and performance tests
import { test, expect, type Page } from '@playwright/test';

/**
 * Safari Desktop-specific tests for compatibility and performance
 */
test.describe('Safari Desktop Compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Wait for initial load and hydration
    await page.waitForLoadState('networkidle');
  });

  test('Hero section renders correctly with Safari optimizations', async ({ page }) => {
    // Test MorphingVideo component with Safari video optimizations
    const videoElement = page.locator('video[data-safari-video-optimized]');

    if (await videoElement.count() > 0) {
      await expect(videoElement).toBeVisible();

      // Verify Safari video attributes
      await expect(videoElement).toHaveAttribute('playsInline', 'true');
      await expect(videoElement).toHaveAttribute('muted', 'true');
      await expect(videoElement).toHaveAttribute('webkit-playsinline', 'true');
    }

    // Test text-balance fallbacks
    const textBalanceElements = page.locator('.text-balance');
    await expect(textBalanceElements.first()).toBeVisible();

    // Verify text wrapping is consistent
    const textElement = textBalanceElements.first();
    const textContent = await textElement.textContent();
    expect(textContent).toBeTruthy();
  });

  test('Scroll performance with backdrop-filter optimizations', async ({ page }) => {
    // Monitor frame rate during scroll
    let frameCount = 0;
    let startTime = 0;

    await page.evaluate(() => {
      // Setup FPS monitoring
      window.scrollTo(0, 0);
    });

    // Start monitoring frames
    await page.evaluate(() => {
      let frames = 0;
      const start = performance.now();

      function countFrames() {
        frames++;
        requestAnimationFrame(countFrames);
      }

      requestAnimationFrame(countFrames);

      // Store in global for later access
      (window as any).getFrameCount = () => ({
        frames: frames,
        duration: performance.now() - start
      });
    });

    // Perform scroll test
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
    });

    // Wait for scroll to complete
    await page.waitForTimeout(2000);

    // Get frame rate
    const frameData = await page.evaluate(() => (window as any).getFrameCount());
    const fps = (frameData.frames / frameData.duration) * 1000;

    // Expect reasonable frame rate (at least 30fps)
    expect(fps).toBeGreaterThan(30);
  });

  test('Glass morphism components load with Safari fallbacks', async ({ page }) => {
    // Test GlassButton components
    const glassButtons = page.locator('[class*="backdrop-blur"], .ios-touch-optimized');

    if (await glassButtons.count() > 0) {
      await expect(glassButtons.first()).toBeVisible();

      // Test hover state (should convert to active on mobile)
      await glassButtons.first().hover();
      await page.waitForTimeout(100);

      // Button should be interactive
      await expect(glassButtons.first()).toBeVisible();
    }
  });

  test('Container queries fallback to viewport queries', async ({ page }) => {
    // Test components that use container queries
    const timelineCards = page.locator('[class*="[@container"]');

    if (await timelineCards.count() > 0) {
      // Verify cards are properly sized with fallback classes
      const cardBounds = await timelineCards.first().boundingBox();
      expect(cardBounds).toBeTruthy();
      expect(cardBounds!.width).toBeGreaterThan(0);
      expect(cardBounds!.height).toBeGreaterThan(0);
    }
  });

  test('Typography rendering with text-balance fallbacks', async ({ page }) => {
    // Check for consistent typography rendering
    const headings = page.locator('h1, h2, h3').filter({ hasText: /.{20,}/ });

    for (let i = 0; i < Math.min(3, await headings.count()); i++) {
      const heading = headings.nth(i);
      await expect(heading).toBeVisible();

      // Verify text is properly wrapped and readable
      const bounds = await heading.boundingBox();
      expect(bounds!.height).toBeGreaterThan(0);
    }
  });

  test('CSS performance - no complex nesting issues', async ({ page }) => {
    // Monitor for CSS parsing errors or warnings
    const consoleLogs: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'warning' || msg.type() === 'error') {
        consoleLogs.push(msg.text());
      }
    });

    // Navigate and interact to trigger CSS parsing
    await page.reload();
    await page.hover('nav');
    await page.click('body');

    // Should not have CSS-related errors
    const cssErrors = consoleLogs.filter(log =>
      log.includes('CSS') || log.includes('style') || log.includes('parse')
    );

    expect(cssErrors.length).toBe(0);
  });

  test('Framer Motion animations work smoothly', async ({ page }) => {
    // Test if animations are enabled and working
    const animatedElements = page.locator('[data-framer-motion]');

    if (await animatedElements.count() > 0) {
      // Trigger animation by hovering
      await animatedElements.first().hover();
      await page.waitForTimeout(500);

      // Animation should complete without errors
      await expect(animatedElements.first()).toBeVisible();
    }

    // Test timeline animations if present
    const timelineElements = page.locator('[class*="motion-"]');
    if (await timelineElements.count() > 0) {
      await expect(timelineElements.first()).toBeVisible();
    }
  });

  test('Navigation and routing work consistently', async ({ page }) => {
    // Test main navigation links
    const navLinks = page.locator('nav a[href^="/"]');

    if (await navLinks.count() > 0) {
      const firstLink = navLinks.first();
      const href = await firstLink.getAttribute('href');

      if (href && href !== '/') {
        await firstLink.click();
        await page.waitForLoadState('networkidle');

        // Should navigate successfully
        expect(page.url()).toContain(href);

        // Navigate back
        await page.goBack();
        await page.waitForLoadState('networkidle');
      }
    }
  });
});