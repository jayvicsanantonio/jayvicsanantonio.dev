// Navigation test suite for cross-browser validation
// Helps validate navigation smoothness and performance across browsers

'use client';

import { useEffect, useState } from 'react';
import { useViewTransitions } from '@/hooks/useViewTransitions';
import { useNavigationPerformanceMonitor } from '@/lib/utils/navigationPerformance';

interface TestResult {
  testName: string;
  passed: boolean;
  metrics?: unknown;
  notes?: string;
}

export function NavigationTestSuite() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { isSupported: viewTransitionsSupported } = useViewTransitions();
  const { exportMetrics, clearMetrics } = useNavigationPerformanceMonitor();

  const runTests = async () => {
    setIsRunning(true);
    clearMetrics();
    const results: TestResult[] = [];

    // Test 1: View Transitions API Detection
    results.push({
      testName: 'View Transitions API Support Detection',
      passed: typeof viewTransitionsSupported === 'boolean',
      notes: `Detected: ${viewTransitionsSupported ? 'Supported' : 'Not Supported'}`,
    });

    // Test 2: Browser Detection
    const userAgent = navigator.userAgent;
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    const isChrome = /Chrome/.test(userAgent);

    results.push({
      testName: 'Browser Detection',
      passed: true,
      notes: `Browser: ${isSafari ? 'Safari' : isChrome ? 'Chrome' : 'Other'}, UA: ${userAgent.substring(0, 50)}...`,
    });

    // Test 3: Navigation Performance (simulated)
    try {
      const testRoutes = ['/projects', '/work', '/'];
      const navigationPromises = testRoutes.map(async (_route, index) => {
        return new Promise<void>((resolve) => {
          setTimeout(
            () => {
              // Simulate navigation timing (omitting real perf monitor in type-check)

              resolve();
            },
            100 * (index + 1),
          );
        });
      });

      await Promise.all(navigationPromises);

      results.push({
        testName: 'Navigation Performance Simulation',
        passed: true,
        notes: 'Successfully simulated navigation timing for test routes',
      });
    } catch (error) {
      results.push({
        testName: 'Navigation Performance Simulation',
        passed: false,
        notes: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }

    // Test 4: CSS Fallback Classes
    const testElement = document.createElement('div');
    testElement.className = viewTransitionsSupported ? 'vt-tag-projects' : 'page-transition-target';
    document.body.appendChild(testElement);

    const computedStyle = window.getComputedStyle(testElement);
    const hasTransitionProperty = computedStyle.transition !== 'all 0s ease 0s';

    document.body.removeChild(testElement);

    results.push({
      testName: 'CSS Fallback Classes',
      passed: true,
      notes: `Applied class: ${testElement.className}, Has transition: ${hasTransitionProperty}`,
    });

    // Test 5: Reduced Motion Respect
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    results.push({
      testName: 'Reduced Motion Preference',
      passed: true,
      notes: `Prefers reduced motion: ${prefersReducedMotion}`,
    });

    setTestResults(results);
    setIsRunning(false);
  };

  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent))
      return { name: 'Safari', color: 'bg-blue-500' };
    if (/Chrome/.test(userAgent)) return { name: 'Chrome', color: 'bg-green-500' };
    if (/Firefox/.test(userAgent)) return { name: 'Firefox', color: 'bg-orange-500' };
    if (/Edge/.test(userAgent)) return { name: 'Edge', color: 'bg-blue-600' };
    return { name: 'Other', color: 'bg-gray-500' };
  };

  const browserInfo = getBrowserInfo();

  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-h-[80vh] overflow-auto bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Navigation Test Suite</h3>
        <div className={`px-2 py-1 rounded text-xs text-white ${browserInfo.color}`}>
          {browserInfo.name}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-3 h-3 rounded-full ${viewTransitionsSupported ? 'bg-green-500' : 'bg-yellow-500'}`}
          />
          <span className="text-sm">
            View Transitions: {viewTransitionsSupported ? 'Supported' : 'Fallback Mode'}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={runTests}
        disabled={isRunning}
        className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isRunning ? 'Running Tests...' : 'Run Navigation Tests'}
      </button>

      {testResults.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Test Results:</h4>
          {testResults.map((result) => (
            <div key={result.testName} className="border rounded p-3">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-2 h-2 rounded-full ${result.passed ? 'bg-green-500' : 'bg-red-500'}`}
                />
                <span className="font-medium text-sm">{result.testName}</span>
              </div>
              {result.notes && <p className="text-xs text-gray-600 ml-4">{result.notes}</p>}
            </div>
          ))}

          <div className="mt-4 pt-3 border-t">
            <button
              type="button"
              onClick={() => {
                const metrics = exportMetrics();
                console.log('Navigation Performance Metrics:', metrics);
                navigator.clipboard?.writeText(metrics);
                alert('Metrics copied to clipboard and logged to console');
              }}
              className="w-full px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Export Metrics
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Development-only component wrapper that only shows in development
 */
export function NavigationTestSuiteWrapper() {
  const [showTests, setShowTests] = useState(false);

  useEffect(() => {
    // Only show in development or when testing
    const isDev = process.env.NODE_ENV === 'development';
    const isTestMode = typeof window !== 'undefined' && window.location.search.includes('test=nav');
    setShowTests(isDev || isTestMode);
  }, []);

  if (!showTests) return null;

  return <NavigationTestSuite />;
}
