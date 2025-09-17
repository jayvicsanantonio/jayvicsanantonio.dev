// Cross-browser visual consistency and user experience validation tests
import { test, expect, type Page } from '@playwright/test';

/**
 * Cross-browser consistency tests to ensure Safari matches Chrome behavior
 */
test.describe('Cross-Browser Visual Consistency', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Hero section layout is consistent across browsers', async ({ page, browserName }) => {
    // Take screenshot for visual comparison
    const heroSection = page.locator('main').first();
    await expect(heroSection).toBeVisible();

    // Test key hero elements
    const title = page.locator('h1').first();
    const description = page.locator('p').first();

    await expect(title).toBeVisible();
    await expect(description).toBeVisible();

    // Measure layout consistency
    const titleBounds = await title.boundingBox();
    const descBounds = await description.boundingBox();

    expect(titleBounds!.width).toBeGreaterThan(200);
    expect(descBounds!.width).toBeGreaterThan(200);

    // Store browser-specific screenshots for comparison
    await page.screenshot({
      path: `test-results/hero-${browserName}.png`,
      fullPage: false,
      clip: titleBounds!,
    });
  });

  test('Typography renders consistently', async ({ page, browserName }) => {
    const textElements = page.locator('h1, h2, h3, p').filter({ hasText: /.{10,}/ });
    const elementCount = Math.min(5, await textElements.count());

    for (let i = 0; i < elementCount; i++) {
      const element = textElements.nth(i);
      await expect(element).toBeVisible();

      // Check text doesn't overflow or wrap unexpectedly
      const bounds = await element.boundingBox();
      expect(bounds!.width).toBeLessThan(page.viewportSize()!.width);

      // Text should not be clipped
      expect(bounds!.height).toBeGreaterThan(10);
    }
  });

  test('Interactive elements behave consistently', async ({ page, browserName }) => {
    // Test buttons and links
    const interactiveElements = page.locator('button, a[href], [role="button"]');
    const elementCount = Math.min(3, await interactiveElements.count());

    for (let i = 0; i < elementCount; i++) {
      const element = interactiveElements.nth(i);

      if (await element.isVisible()) {
        // Test hover behavior (should work consistently)
        await element.hover();
        await page.waitForTimeout(100);

        // Element should remain visible and interactive
        await expect(element).toBeVisible();

        // Test click behavior
        const href = await element.getAttribute('href');
        if (!href || href.startsWith('#')) {
          await element.click();
          await page.waitForTimeout(100);
        }
      }
    }
  });

  test('Animation performance is consistent', async ({ page, browserName }) => {
    // Monitor animation performance
    let animationFrames = 0;

    await page.evaluate(() => {
      let frames = 0;
      function countFrames() {
        frames++;
        requestAnimationFrame(countFrames);
      }
      requestAnimationFrame(countFrames);
      (window as any).getAnimationFrames = () => frames;
    });

    // Trigger animations by scrolling
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    });

    await page.waitForTimeout(1000);

    // Check frame rate
    const frameCount = await page.evaluate(() => (window as any).getAnimationFrames());
    expect(frameCount).toBeGreaterThan(30); // At least 30fps equivalent

    // Animations should not cause layout shifts
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(500);
  });

  test('Glass effects render with appropriate fallbacks', async ({ page, browserName }) => {
    const glassElements = page.locator('[class*="backdrop-blur"], [class*="glass"]');

    if (await glassElements.count() > 0) {
      const element = glassElements.first();
      await expect(element).toBeVisible();

      // Check if element has either backdrop-filter or solid background
      const hasVisualEffect = await element.evaluate((el) => {
        const styles = getComputedStyle(el);
        const hasBackdrop = styles.backdropFilter && styles.backdropFilter !== 'none';
        const hasBackground = styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
        return hasBackdrop || hasBackground;
      });

      expect(hasVisualEffect).toBeTruthy();
    }
  });

  test('Container queries vs viewport queries consistency', async ({ page, browserName }) => {
    // Test responsive components
    const containers = page.locator('[class*="[@container"], [class*="cq"]');

    if (await containers.count() > 0) {
      const container = containers.first();
      const initialBounds = await container.boundingBox();

      // Resize viewport to test responsiveness
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(300);

      const tabletBounds = await container.boundingBox();

      // Component should adapt to viewport change
      expect(tabletBounds!.width).not.toBe(initialBounds!.width);

      // Restore viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.waitForTimeout(300);
    }
  });

  test('Navigation works consistently across browsers', async ({ page, browserName }) => {
    // Test navigation elements
    const navLinks = page.locator('nav a[href^="/"]');

    if (await navLinks.count() > 0) {
      const firstLink = navLinks.first();
      const href = await firstLink.getAttribute('href');

      if (href && href !== '/' && !href.includes('#')) {
        // Test navigation
        await firstLink.click();
        await page.waitForLoadState('networkidle');

        // Should navigate successfully
        expect(page.url()).toContain(href);

        // Navigation should be smooth (no broken layouts)
        const mainContent = page.locator('main');
        await expect(mainContent).toBeVisible();

        // Return to home
        await page.goto('/');
        await page.waitForLoadState('networkidle');
      }
    }
  });

  test('Form elements and inputs work consistently', async ({ page, browserName }) => {
    // Look for form elements
    const formElements = page.locator('input, textarea, select, [contenteditable]');

    if (await formElements.count() > 0) {
      const input = formElements.first();

      if (await input.isVisible() && await input.isEnabled()) {
        // Test input functionality
        await input.click();
        await input.fill('Test input');

        const value = await input.inputValue();
        expect(value).toBe('Test input');

        // Clear input
        await input.clear();
      }
    }
  });

  test('Media elements load and display correctly', async ({ page, browserName }) => {
    // Test images
    const images = page.locator('img');
    const imageCount = Math.min(3, await images.count());

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      if (await img.isVisible()) {
        // Image should load successfully
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }

    // Test videos
    const videos = page.locator('video');
    if (await videos.count() > 0) {
      const video = videos.first();
      await expect(video).toBeVisible();

      // Video should have proper attributes for Safari
      if (browserName === 'webkit') {
        await expect(video).toHaveAttribute('playsInline');
        await expect(video).toHaveAttribute('muted');
      }
    }
  });

  test('Accessibility features work consistently', async ({ page, browserName }) => {
    // Test ARIA attributes
    const elementsWithAria = page.locator('[aria-label], [aria-describedby], [role]');

    if (await elementsWithAria.count() > 0) {
      const element = elementsWithAria.first();
      await expect(element).toBeVisible();

      // ARIA attributes should be present
      const hasAriaLabel = await element.getAttribute('aria-label');
      const hasRole = await element.getAttribute('role');
      const hasAriaDescribedBy = await element.getAttribute('aria-describedby');

      expect(hasAriaLabel || hasRole || hasAriaDescribedBy).toBeTruthy();
    }

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');

    if (await focusedElement.count() > 0) {
      await expect(focusedElement).toBeVisible();
    }
  });
});