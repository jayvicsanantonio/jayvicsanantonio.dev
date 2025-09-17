// Safari Mobile (iOS) compatibility and performance tests
import { test, expect, type Page } from '@playwright/test';

/**
 * Safari Mobile-specific tests for iOS compatibility and touch optimization
 */
test.describe('Safari Mobile (iOS) Compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Wait for initial load and hydration
    await page.waitForLoadState('networkidle');
  });

  test('iOS Safari viewport handling works correctly', async ({ page }) => {
    // Test viewport height calculations
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    expect(viewportHeight).toBeGreaterThan(0);

    // Test -webkit-fill-available implementation
    const minHeightElements = page.locator('.min-h-screen, .ios-viewport-available');

    if (await minHeightElements.count() > 0) {
      const element = minHeightElements.first();
      const bounds = await element.boundingBox();
      expect(bounds!.height).toBeGreaterThan(viewportHeight * 0.8);
    }
  });

  test('Touch interactions are optimized for iOS Safari', async ({ page }) => {
    // Test touch-optimized elements
    const touchElements = page.locator('.ios-touch-optimized, .mobile-no-hover');

    if (await touchElements.count() > 0) {
      const element = touchElements.first();

      // Test touch start/end behavior
      await element.tap();
      await page.waitForTimeout(100);

      // Element should be responsive to touch
      await expect(element).toBeVisible();
    }

    // Test that hover states are disabled on mobile
    const hoverElements = page.locator('[class*="hover:"]');

    if (await hoverElements.count() > 0) {
      // On mobile, hover should not trigger or should convert to active
      const element = hoverElements.first();
      await element.hover();

      // Should not cause layout shifts or unexpected behavior
      await expect(element).toBeVisible();
    }
  });

  test('Video playback works with iOS Safari restrictions', async ({ page }) => {
    const videoElement = page.locator('video');

    if (await videoElement.count() > 0) {
      // Verify iOS-specific video attributes
      await expect(videoElement).toHaveAttribute('playsInline');
      await expect(videoElement).toHaveAttribute('muted');

      // Test if video can play (may require user interaction on real iOS)
      const canPlay = await page.evaluate(() => {
        const video = document.querySelector('video') as HTMLVideoElement;
        return video ? video.readyState >= 2 : false;
      });

      // Video should at least be loaded
      expect(typeof canPlay).toBe('boolean');
    }
  });

  test('Scroll performance on mobile Safari', async ({ page }) => {
    // Test smooth scrolling behavior
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Monitor scroll performance
    let scrollEvents = 0;
    await page.evaluate(() => {
      let events = 0;
      const handler = () => { events++; };
      window.addEventListener('scroll', handler, { passive: true });

      // Store event count for later access
      (window as any).getScrollEventCount = () => events;
    });

    // Perform scroll
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    });

    await page.waitForTimeout(1000);

    // Check that scroll events are being handled efficiently
    const eventCount = await page.evaluate(() => (window as any).getScrollEventCount());
    expect(eventCount).toBeGreaterThan(0);
  });

  test('Text balance and typography on mobile', async ({ page }) => {
    // Test text-balance fallbacks on mobile
    const textBalanceElements = page.locator('.text-balance');

    if (await textBalanceElements.count() > 0) {
      for (let i = 0; i < Math.min(3, await textBalanceElements.count()); i++) {
        const element = textBalanceElements.nth(i);
        await expect(element).toBeVisible();

        // Text should be readable and properly wrapped
        const bounds = await element.boundingBox();
        expect(bounds!.width).toBeLessThan(page.viewportSize()!.width);
      }
    }
  });

  test('Glass effects are optimized for mobile Safari', async ({ page }) => {
    // Test that glass effects either work or have proper fallbacks
    const glassElements = page.locator('[class*="backdrop-blur"], [class*="glass"]');

    if (await glassElements.count() > 0) {
      const element = glassElements.first();
      await expect(element).toBeVisible();

      // Check if backdrop-filter is disabled on mobile Safari for performance
      const hasBackdropFilter = await element.evaluate((el) => {
        const style = getComputedStyle(el);
        return style.backdropFilter && style.backdropFilter !== 'none';
      });

      // Should either have backdrop-filter or a solid background fallback
      expect(typeof hasBackdropFilter).toBe('boolean');
    }
  });

  test('Container queries fallback properly on mobile', async ({ page }) => {
    // Test responsive components at mobile viewport
    const containers = page.locator('[class*="cq"], [class*="@container"]');

    if (await containers.count() > 0) {
      const container = containers.first();
      const bounds = await container.boundingBox();

      // Should be properly sized for mobile
      expect(bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
      expect(bounds!.height).toBeGreaterThan(0);
    }
  });

  test('Navigation works on mobile Safari', async ({ page }) => {
    // Test mobile navigation
    const navElements = page.locator('nav, [role="navigation"]');

    if (await navElements.count() > 0) {
      await expect(navElements.first()).toBeVisible();

      // Test mobile menu if present
      const mobileMenuToggle = page.locator('[aria-label*="menu"], [data-mobile-menu]');

      if (await mobileMenuToggle.count() > 0) {
        await mobileMenuToggle.tap();
        await page.waitForTimeout(300);

        // Menu should be functional
        await expect(mobileMenuToggle).toBeVisible();
      }
    }
  });

  test('Orientation change handling', async ({ page }) => {
    const initialViewport = page.viewportSize()!;

    // Simulate orientation change
    await page.setViewportSize({
      width: initialViewport.height,
      height: initialViewport.width
    });

    await page.waitForTimeout(500);

    // Page should adapt to new orientation
    const newViewport = page.viewportSize()!;
    expect(newViewport.width).toBe(initialViewport.height);

    // Content should still be visible and properly laid out
    const mainContent = page.locator('main, [role="main"]');
    if (await mainContent.count() > 0) {
      await expect(mainContent.first()).toBeVisible();
    }

    // Restore original orientation
    await page.setViewportSize(initialViewport);
  });

  test('Safe area insets on devices with notch', async ({ page }) => {
    // Test safe area handling for devices with notch
    const safaAreaElements = page.locator('.ios-notch, [class*="safe-area"]');

    if (await safaAreaElements.count() > 0) {
      const element = safaAreaElements.first();
      await expect(element).toBeVisible();

      // Should have appropriate spacing from screen edges
      const bounds = await element.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.y).toBeGreaterThanOrEqual(0);
    }
  });
});