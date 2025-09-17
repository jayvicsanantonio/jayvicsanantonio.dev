// Visual regression testing utilities for Safari compatibility
import { getBrowserCapabilities } from './browserUtils';

export interface VisualTestResult {
  testName: string;
  passed: boolean;
  differences: string[];
  screenshot?: string;
  timestamp: number;
}

export interface LayoutMetrics {
  width: number;
  height: number;
  x: number;
  y: number;
  aspectRatio: number;
  isVisible: boolean;
}

/**
 * Visual regression testing for Safari compatibility
 */
export class VisualRegressionTester {
  private capabilities = getBrowserCapabilities();

  /**
   * Compare layout metrics between elements
   */
  async compareElementLayouts(
    selector: string,
    expectedMetrics?: Partial<LayoutMetrics>
  ): Promise<VisualTestResult> {
    const elements = document.querySelectorAll(selector);
    const differences: string[] = [];

    if (elements.length === 0) {
      return {
        testName: `Layout Test: ${selector}`,
        passed: false,
        differences: ['Element not found'],
        timestamp: Date.now(),
      };
    }

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      const rect = element.getBoundingClientRect();
      const computedStyle = getComputedStyle(element);

      const metrics: LayoutMetrics = {
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y,
        aspectRatio: rect.width / rect.height,
        isVisible: computedStyle.visibility !== 'hidden' && computedStyle.display !== 'none',
      };

      // Check against expected metrics
      if (expectedMetrics) {
        this.validateMetrics(metrics, expectedMetrics, differences, `Element ${i}`);
      }

      // Safari-specific checks
      this.validateSafariSpecificLayout(element, metrics, differences);
    }

    return {
      testName: `Layout Test: ${selector}`,
      passed: differences.length === 0,
      differences,
      timestamp: Date.now(),
    };
  }

  /**
   * Test text rendering consistency
   */
  async testTextRendering(selector: string = 'h1, h2, h3, p'): Promise<VisualTestResult> {
    const elements = document.querySelectorAll(selector);
    const differences: string[] = [];

    for (const element of elements) {
      const htmlElement = element as HTMLElement;
      const computedStyle = getComputedStyle(htmlElement);
      const rect = htmlElement.getBoundingClientRect();

      // Check for text overflow
      if (htmlElement.scrollWidth > rect.width + 2) {
        differences.push(`Text overflow detected in ${element.tagName}`);
      }

      // Check for Safari font rendering issues
      if (this.capabilities.isSafari) {
        const fontSmoothing = computedStyle.webkitFontSmoothing;
        if (!fontSmoothing || fontSmoothing === 'auto') {
          differences.push(`Missing -webkit-font-smoothing optimization for ${element.tagName}`);
        }
      }

      // Check text-balance implementation
      const textWrap = computedStyle.textWrap || (computedStyle as any).textBalance;
      if (textWrap === 'balance' && !this.supportsTextBalance()) {
        // Should have fallback styles
        const wordSpacing = computedStyle.wordSpacing;
        const lineHeight = computedStyle.lineHeight;

        if (wordSpacing === 'normal' && lineHeight === 'normal') {
          differences.push(`Missing text-balance fallback styles for ${element.tagName}`);
        }
      }
    }

    return {
      testName: 'Text Rendering Consistency',
      passed: differences.length === 0,
      differences,
      timestamp: Date.now(),
    };
  }

  /**
   * Test glass morphism effect rendering
   */
  async testGlassEffects(selector: string = '[class*="backdrop-blur"], [class*="glass"]'): Promise<VisualTestResult> {
    const elements = document.querySelectorAll(selector);
    const differences: string[] = [];

    for (const element of elements) {
      const htmlElement = element as HTMLElement;
      const computedStyle = getComputedStyle(htmlElement);

      const hasBackdropFilter = computedStyle.backdropFilter && computedStyle.backdropFilter !== 'none';
      const hasBackground = computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)';

      // Safari should either have backdrop-filter or fallback background
      if (this.capabilities.isSafari && !hasBackdropFilter && !hasBackground) {
        differences.push(`Glass element missing both backdrop-filter and fallback background`);
      }

      // Check for performance-optimized classes on Safari
      if (this.capabilities.isSafari && hasBackdropFilter) {
        const transform = computedStyle.transform;
        const willChange = computedStyle.willChange;

        if (transform === 'none' && willChange === 'auto') {
          differences.push(`Glass element missing GPU acceleration hints for Safari`);
        }
      }
    }

    return {
      testName: 'Glass Effects Rendering',
      passed: differences.length === 0,
      differences,
      timestamp: Date.now(),
    };
  }

  /**
   * Test responsive layout consistency
   */
  async testResponsiveLayout(): Promise<VisualTestResult> {
    const differences: string[] = [];
    const originalViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Test container query elements
    const containerElements = document.querySelectorAll('[class*="[@container"], [class*="cq"]');

    for (const element of containerElements) {
      const htmlElement = element as HTMLElement;
      const initialRect = htmlElement.getBoundingClientRect();

      // Check if element has fallback classes for Safari
      const classList = htmlElement.className;
      const hasContainerQuery = classList.includes('[@container');
      const hasViewportFallback = /\b(sm:|md:|lg:|xl:)/.test(classList);

      if (hasContainerQuery && !hasViewportFallback && !this.supportsContainerQueries()) {
        differences.push(`Container query element missing viewport fallback classes`);
      }
    }

    return {
      testName: 'Responsive Layout Consistency',
      passed: differences.length === 0,
      differences,
      timestamp: Date.now(),
    };
  }

  /**
   * Test animation performance consistency
   */
  async testAnimationConsistency(): Promise<VisualTestResult> {
    const differences: string[] = [];

    // Find elements with animations
    const animatedElements = document.querySelectorAll('[class*="transition"], [class*="animate"], [data-motion]');

    for (const element of animatedElements) {
      const htmlElement = element as HTMLElement;
      const computedStyle = getComputedStyle(htmlElement);

      // Check for Safari-optimized animations
      if (this.capabilities.isSafari) {
        const transform = computedStyle.transform;
        const willChange = computedStyle.willChange;
        const backfaceVisibility = computedStyle.backfaceVisibility;

        // Check for 3D transforms that should be simplified for Safari
        if (transform.includes('matrix3d') || transform.includes('perspective')) {
          differences.push(`Complex 3D transform detected that may cause Safari performance issues`);
        }

        // Check for GPU acceleration hints
        if (willChange === 'auto' && !transform.includes('translateZ')) {
          differences.push(`Animated element missing GPU acceleration hints for Safari`);
        }
      }
    }

    return {
      testName: 'Animation Consistency',
      passed: differences.length === 0,
      differences,
      timestamp: Date.now(),
    };
  }

  /**
   * Run comprehensive visual regression test suite
   */
  async runVisualTestSuite(): Promise<VisualTestResult[]> {
    const results: VisualTestResult[] = [];

    console.log('🔍 Running Visual Regression Test Suite...');

    // Test text rendering
    const textTest = await this.testTextRendering();
    results.push(textTest);
    console.log(`📝 ${textTest.testName}: ${textTest.passed ? '✅ PASSED' : '❌ FAILED'}`);

    // Test glass effects
    const glassTest = await this.testGlassEffects();
    results.push(glassTest);
    console.log(`🪟 ${glassTest.testName}: ${glassTest.passed ? '✅ PASSED' : '❌ FAILED'}`);

    // Test responsive layout
    const responsiveTest = await this.testResponsiveLayout();
    results.push(responsiveTest);
    console.log(`📱 ${responsiveTest.testName}: ${responsiveTest.passed ? '✅ PASSED' : '❌ FAILED'}`);

    // Test animations
    const animationTest = await this.testAnimationConsistency();
    results.push(animationTest);
    console.log(`🎬 ${animationTest.testName}: ${animationTest.passed ? '✅ PASSED' : '❌ FAILED'}`);

    this.generateVisualTestReport(results);

    return results;
  }

  private validateMetrics(
    actual: LayoutMetrics,
    expected: Partial<LayoutMetrics>,
    differences: string[],
    elementName: string
  ): void {
    if (expected.width && Math.abs(actual.width - expected.width) > 5) {
      differences.push(`${elementName}: Width mismatch. Expected: ${expected.width}, Actual: ${actual.width}`);
    }

    if (expected.height && Math.abs(actual.height - expected.height) > 5) {
      differences.push(`${elementName}: Height mismatch. Expected: ${expected.height}, Actual: ${actual.height}`);
    }

    if (expected.isVisible !== undefined && actual.isVisible !== expected.isVisible) {
      differences.push(`${elementName}: Visibility mismatch. Expected: ${expected.isVisible}, Actual: ${actual.isVisible}`);
    }
  }

  private validateSafariSpecificLayout(
    element: HTMLElement,
    metrics: LayoutMetrics,
    differences: string[]
  ): void {
    if (!this.capabilities.isSafari) return;

    // Check for common Safari layout issues
    if (metrics.width === 0 && metrics.isVisible) {
      differences.push(`Element has zero width but is visible - possible Safari layout bug`);
    }

    // Check for iOS-specific viewport issues
    if (this.capabilities.isMobile && element.classList.contains('min-h-screen')) {
      const hasWebkitFill = getComputedStyle(element).minHeight.includes('fill-available');
      if (!hasWebkitFill) {
        differences.push(`iOS Safari: min-h-screen element missing -webkit-fill-available fallback`);
      }
    }
  }

  private supportsTextBalance(): boolean {
    if (typeof CSS === 'undefined') return false;
    return CSS.supports('text-wrap: balance') || CSS.supports('text-wrap', 'balance');
  }

  private supportsContainerQueries(): boolean {
    if (typeof CSS === 'undefined') return false;
    return CSS.supports('container-type: inline-size');
  }

  private generateVisualTestReport(results: VisualTestResult[]): void {
    const passedTests = results.filter(r => r.passed).length;
    const totalTests = results.length;

    console.log('\n📊 Visual Regression Test Report');
    console.log('================================');
    console.log(`Tests Passed: ${passedTests}/${totalTests}`);
    console.log(`Browser: ${this.capabilities.isSafari ? 'Safari' : 'Other'}`);
    console.log(`Mobile: ${this.capabilities.isMobile ? 'Yes' : 'No'}`);

    console.log('\n🔍 Test Details:');
    results.forEach(result => {
      console.log(`\n• ${result.testName}: ${result.passed ? '✅' : '❌'}`);
      if (result.differences.length > 0) {
        result.differences.forEach(diff => console.log(`  - ${diff}`));
      }
    });

    // Store results for CI/CD integration
    if (typeof window !== 'undefined') {
      (window as any).visualTestResults = results;
    }
  }
}

/**
 * Quick visual consistency check for development
 */
export const quickVisualCheck = async (): Promise<boolean> => {
  const tester = new VisualRegressionTester();
  const textResult = await tester.testTextRendering();
  const glassResult = await tester.testGlassEffects();

  const passed = textResult.passed && glassResult.passed;
  console.log(`Quick Visual Check: ${passed ? '✅ PASSED' : '❌ FAILED'}`);

  return passed;
};