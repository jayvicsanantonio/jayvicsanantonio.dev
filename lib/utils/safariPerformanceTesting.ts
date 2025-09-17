// Safari-specific performance testing and validation utilities
import { PerformanceMonitor, type PerformanceMetrics } from './performanceMonitor';
import { getBrowserCapabilities } from './browserUtils';

export interface SafariTestResult {
  testName: string;
  passed: boolean;
  metrics: PerformanceMetrics;
  recommendations: string[];
  timestamp: number;
}

export interface PerformanceTestSuite {
  scrollTest: SafariTestResult;
  animationTest: SafariTestResult;
  glassEffectTest: SafariTestResult;
  videoPlaybackTest: SafariTestResult;
  responsiveLayoutTest: SafariTestResult;
}

/**
 * Comprehensive Safari performance testing suite
 */
export class SafariPerformanceTester {
  private capabilities = getBrowserCapabilities();
  private results: Partial<PerformanceTestSuite> = {};

  /**
   * Test scroll performance with backdrop-filter elements
   */
  async testScrollPerformance(): Promise<SafariTestResult> {
    return new Promise((resolve) => {
      const monitor = new PerformanceMonitor();
      const testName = 'Scroll Performance with Backdrop Filters';

      // Start monitoring
      monitor.start();

      // Simulate scroll with backdrop-filter elements
      const scrollTest = () => {
        let scrollPos = 0;
        const maxScroll = window.innerHeight * 3;
        const scrollStep = 50;

        const scrollFrame = () => {
          if (scrollPos < maxScroll) {
            window.scrollTo(0, scrollPos);
            scrollPos += scrollStep;
            requestAnimationFrame(scrollFrame);
          } else {
            // Test complete
            setTimeout(() => {
              const metrics = monitor.stop();
              const passed = metrics.fps >= 55 && metrics.frameDrops / 60 < 0.15;

              resolve({
                testName,
                passed,
                metrics,
                recommendations: this.getScrollRecommendations(metrics),
                timestamp: Date.now(),
              });
            }, 500);
          }
        };

        requestAnimationFrame(scrollFrame);
      };

      // Start test
      window.scrollTo(0, 0);
      setTimeout(scrollTest, 100);
    });
  }

  /**
   * Test Framer Motion animation performance
   */
  async testAnimationPerformance(): Promise<SafariTestResult> {
    return new Promise((resolve) => {
      const monitor = new PerformanceMonitor();
      const testName = 'Framer Motion Animation Performance';

      monitor.start();

      // Simulate complex animations
      const animations = this.triggerTestAnimations();

      setTimeout(() => {
        const metrics = monitor.stop();
        const passed = metrics.fps >= 50 && metrics.frameDrops / 60 < 0.2;

        this.cleanupTestAnimations(animations);

        resolve({
          testName,
          passed,
          metrics,
          recommendations: this.getAnimationRecommendations(metrics),
          timestamp: Date.now(),
        });
      }, 3000);
    });
  }

  /**
   * Test glass morphism effect performance
   */
  async testGlassEffectPerformance(): Promise<SafariTestResult> {
    return new Promise((resolve) => {
      const monitor = new PerformanceMonitor();
      const testName = 'Glass Morphism Effect Performance';

      // Create test glass elements
      const testElements = this.createTestGlassElements();
      monitor.start();

      // Animate glass elements
      this.animateGlassElements(testElements);

      setTimeout(() => {
        const metrics = monitor.stop();
        const passed = metrics.fps >= 45; // Lower threshold for glass effects

        this.cleanupTestGlassElements(testElements);

        resolve({
          testName,
          passed,
          metrics,
          recommendations: this.getGlassEffectRecommendations(metrics),
          timestamp: Date.now(),
        });
      }, 2000);
    });
  }

  /**
   * Test video playback performance
   */
  async testVideoPlaybackPerformance(): Promise<SafariTestResult> {
    return new Promise((resolve) => {
      const testName = 'Safari Video Playback Performance';
      const video = document.querySelector('video') as HTMLVideoElement;

      if (!video) {
        resolve({
          testName,
          passed: true,
          metrics: {
            fps: 60,
            frameDrops: 0,
            averageFrameTime: 16.67,
            isPerformant: true,
            browser: this.capabilities.isSafari ? 'Safari' : 'Chrome',
          },
          recommendations: ['No video elements found to test'],
          timestamp: Date.now(),
        });
        return;
      }

      const monitor = new PerformanceMonitor();
      monitor.start();

      // Test video capabilities
      const canPlay = video.readyState >= 2;
      const hasCorrectAttributes = video.playsInline && video.muted;

      setTimeout(() => {
        const metrics = monitor.stop();
        const passed = canPlay && hasCorrectAttributes && metrics.fps >= 50;

        resolve({
          testName,
          passed,
          metrics,
          recommendations: this.getVideoRecommendations(video, metrics),
          timestamp: Date.now(),
        });
      }, 1500);
    });
  }

  /**
   * Test responsive layout performance
   */
  async testResponsiveLayoutPerformance(): Promise<SafariTestResult> {
    return new Promise((resolve) => {
      const monitor = new PerformanceMonitor();
      const testName = 'Responsive Layout Performance';

      monitor.start();

      // Test viewport changes
      const originalViewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      // Simulate responsive layout changes
      this.simulateViewportChanges();

      setTimeout(() => {
        const metrics = monitor.stop();
        const passed = metrics.fps >= 55;

        resolve({
          testName,
          passed,
          metrics,
          recommendations: this.getLayoutRecommendations(metrics),
          timestamp: Date.now(),
        });
      }, 2000);
    });
  }

  /**
   * Run complete Safari performance test suite
   */
  async runFullTestSuite(): Promise<PerformanceTestSuite> {
    console.log('🧪 Starting Safari Performance Test Suite...');

    const scrollTest = await this.testScrollPerformance();
    console.log(`✅ ${scrollTest.testName}: ${scrollTest.passed ? 'PASSED' : 'FAILED'}`);

    const animationTest = await this.testAnimationPerformance();
    console.log(`✅ ${animationTest.testName}: ${animationTest.passed ? 'PASSED' : 'FAILED'}`);

    const glassEffectTest = await this.testGlassEffectPerformance();
    console.log(`✅ ${glassEffectTest.testName}: ${glassEffectTest.passed ? 'PASSED' : 'FAILED'}`);

    const videoPlaybackTest = await this.testVideoPlaybackPerformance();
    console.log(`✅ ${videoPlaybackTest.testName}: ${videoPlaybackTest.passed ? 'PASSED' : 'FAILED'}`);

    const responsiveLayoutTest = await this.testResponsiveLayoutPerformance();
    console.log(`✅ ${responsiveLayoutTest.testName}: ${responsiveLayoutTest.passed ? 'PASSED' : 'FAILED'}`);

    const testSuite = {
      scrollTest,
      animationTest,
      glassEffectTest,
      videoPlaybackTest,
      responsiveLayoutTest,
    };

    this.generateTestReport(testSuite);

    return testSuite;
  }

  private triggerTestAnimations(): HTMLElement[] {
    const elements: HTMLElement[] = [];

    // Create test animation elements
    for (let i = 0; i < 5; i++) {
      const element = document.createElement('div');
      element.style.cssText = `
        position: fixed;
        top: ${i * 100}px;
        left: ${i * 100}px;
        width: 50px;
        height: 50px;
        background: rgba(59, 130, 246, 0.5);
        border-radius: 8px;
        transform: translateZ(0);
        transition: transform 0.3s ease;
        pointer-events: none;
        z-index: 9999;
      `;

      document.body.appendChild(element);
      elements.push(element);

      // Trigger animations
      setTimeout(() => {
        element.style.transform = `translateZ(0) translateX(200px) rotateY(180deg)`;
      }, i * 100);
    }

    return elements;
  }

  private cleanupTestAnimations(elements: HTMLElement[]): void {
    elements.forEach(el => el.remove());
  }

  private createTestGlassElements(): HTMLElement[] {
    const elements: HTMLElement[] = [];

    for (let i = 0; i < 3; i++) {
      const element = document.createElement('div');
      element.style.cssText = `
        position: fixed;
        top: ${i * 150 + 50}px;
        right: 50px;
        width: 120px;
        height: 80px;
        backdrop-filter: blur(16px);
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 12px;
        pointer-events: none;
        z-index: 9999;
      `;

      document.body.appendChild(element);
      elements.push(element);
    }

    return elements;
  }

  private animateGlassElements(elements: HTMLElement[]): void {
    elements.forEach((element, index) => {
      setInterval(() => {
        const scale = 0.8 + Math.sin(Date.now() / 1000 + index) * 0.2;
        element.style.transform = `scale(${scale})`;
      }, 16);
    });
  }

  private cleanupTestGlassElements(elements: HTMLElement[]): void {
    elements.forEach(el => el.remove());
  }

  private simulateViewportChanges(): void {
    // Trigger resize events to test responsive layout
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);

    // Simulate orientation change
    const orientationEvent = new Event('orientationchange');
    window.dispatchEvent(orientationEvent);
  }

  private getScrollRecommendations(metrics: PerformanceMetrics): string[] {
    const recommendations: string[] = [];

    if (!metrics.isPerformant) {
      recommendations.push('Disable backdrop-filter during scroll events');
      recommendations.push('Use scroll-aware state management to pause animations');
      recommendations.push('Implement RAF throttling for scroll handlers');
    }

    if (metrics.fps < 50) {
      recommendations.push('Consider removing glass effects during scroll');
      recommendations.push('Simplify scroll-driven animations');
    }

    return recommendations.length > 0 ? recommendations : ['Scroll performance is optimal'];
  }

  private getAnimationRecommendations(metrics: PerformanceMetrics): string[] {
    const recommendations: string[] = [];

    if (!metrics.isPerformant) {
      recommendations.push('Replace 3D transforms with 2D transforms for Safari');
      recommendations.push('Use Safari-specific animation variants');
      recommendations.push('Reduce animation complexity during scroll');
    }

    return recommendations.length > 0 ? recommendations : ['Animation performance is optimal'];
  }

  private getGlassEffectRecommendations(metrics: PerformanceMetrics): string[] {
    const recommendations: string[] = [];

    if (metrics.fps < 45) {
      recommendations.push('Reduce backdrop-filter blur intensity');
      recommendations.push('Use solid background fallbacks for Safari');
      recommendations.push('Limit number of glass elements on screen');
    }

    return recommendations.length > 0 ? recommendations : ['Glass effect performance is acceptable'];
  }

  private getVideoRecommendations(video: HTMLVideoElement, metrics: PerformanceMetrics): string[] {
    const recommendations: string[] = [];

    if (!video.playsInline) {
      recommendations.push('Add playsInline attribute for iOS Safari');
    }

    if (!video.muted) {
      recommendations.push('Add muted attribute for autoplay compliance');
    }

    if (video.readyState < 2) {
      recommendations.push('Optimize video loading strategy');
    }

    return recommendations.length > 0 ? recommendations : ['Video playback is optimized'];
  }

  private getLayoutRecommendations(metrics: PerformanceMetrics): string[] {
    const recommendations: string[] = [];

    if (!metrics.isPerformant) {
      recommendations.push('Use CSS containment for isolated layout updates');
      recommendations.push('Optimize container query fallbacks');
      recommendations.push('Reduce layout-triggering CSS properties');
    }

    return recommendations.length > 0 ? recommendations : ['Layout performance is optimal'];
  }

  private generateTestReport(testSuite: PerformanceTestSuite): void {
    const passed = Object.values(testSuite).every(test => test.passed);
    const averageFPS = Object.values(testSuite).reduce((sum, test) => sum + test.metrics.fps, 0) / 5;

    console.log('\n📊 Safari Performance Test Report');
    console.log('================================');
    console.log(`Overall Status: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`Average FPS: ${averageFPS.toFixed(1)}`);
    console.log(`Browser: ${this.capabilities.isSafari ? 'Safari' : 'Other'}`);
    console.log('\n📝 Individual Test Results:');

    Object.values(testSuite).forEach(test => {
      console.log(`• ${test.testName}: ${test.passed ? '✅' : '❌'} (${test.metrics.fps}fps)`);
      if (test.recommendations.length > 0) {
        test.recommendations.forEach(rec => console.log(`  - ${rec}`));
      }
    });

    // Store results for potential CI/CD integration
    if (typeof window !== 'undefined') {
      (window as any).safariTestResults = testSuite;
    }
  }
}

/**
 * Quick Safari performance check for development
 */
export const quickSafariPerformanceCheck = async (): Promise<boolean> => {
  const tester = new SafariPerformanceTester();
  const scrollResult = await tester.testScrollPerformance();

  console.log(`Quick Safari Check: ${scrollResult.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Scroll FPS: ${scrollResult.metrics.fps}`);

  return scrollResult.passed;
};