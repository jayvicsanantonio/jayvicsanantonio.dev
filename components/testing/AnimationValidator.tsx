// Animation validation component for testing fallback transitions
// Helps validate that Safari fallback animations feel natural and smooth

'use client';

import { useEffect, useRef, useState } from 'react';
import { useViewTransitions } from '@/hooks/useViewTransitions';
import { applyFallbackAnimation, type FALLBACK_ANIMATIONS } from '@/lib/utils/fallbackAnimations';

interface AnimationTest {
  name: string;
  animationType: keyof typeof FALLBACK_ANIMATIONS;
  direction: 'enter' | 'exit';
  description: string;
}

const ANIMATION_TESTS: AnimationTest[] = [
  {
    name: 'Fade In',
    animationType: 'fade',
    direction: 'enter',
    description: 'Element fades in smoothly',
  },
  {
    name: 'Fade Out',
    animationType: 'fade',
    direction: 'exit',
    description: 'Element fades out smoothly',
  },
  {
    name: 'Slide Up In',
    animationType: 'slideUp',
    direction: 'enter',
    description: 'Element slides up while fading in',
  },
  {
    name: 'Slide Up Out',
    animationType: 'slideUp',
    direction: 'exit',
    description: 'Element slides up while fading out',
  },
  {
    name: 'Scale In',
    animationType: 'scale',
    direction: 'enter',
    description: 'Element scales up while fading in',
  },
  {
    name: 'Scale Out',
    animationType: 'scale',
    direction: 'exit',
    description: 'Element scales down while fading out',
  },
];

export function AnimationValidator() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTest, setCurrentTest] = useState<AnimationTest | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationResults, setAnimationResults] = useState<Record<string, boolean>>({});
  const testElementRef = useRef<HTMLDivElement>(null);
  const { isSupported } = useViewTransitions();

  const runAnimationTest = async (test: AnimationTest) => {
    if (!testElementRef.current || isAnimating) return;

    setCurrentTest(test);
    setIsAnimating(true);

    try {
      // Reset element state
      const element = testElementRef.current;
      element.className = 'test-animation-element';
      element.style.opacity = test.direction === 'enter' ? '0' : '1';
      element.style.transform = '';

      // Apply the animation
      await applyFallbackAnimation(element, test.animationType, test.direction);

      // Mark test as successful
      setAnimationResults((prev) => ({
        ...prev,
        [test.name]: true,
      }));
    } catch (error) {
      console.error(`Animation test failed for ${test.name}:`, error);
      setAnimationResults((prev) => ({
        ...prev,
        [test.name]: false,
      }));
    } finally {
      setIsAnimating(false);
    }
  };

  const runAllTests = async () => {
    for (const test of ANIMATION_TESTS) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay between tests
      await runAnimationTest(test);
    }
  };

  const getBrowserInfo = () => {
    if (typeof navigator === 'undefined') return { name: 'Unknown', isSafari: false };

    const userAgent = navigator.userAgent;
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    const isChrome = /Chrome/.test(userAgent);

    return {
      name: isSafari ? 'Safari' : isChrome ? 'Chrome' : 'Other',
      isSafari,
    };
  };

  const browserInfo = getBrowserInfo();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-h-[60vh] overflow-auto bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Animation Validator</h3>
        <div
          className={`px-2 py-1 rounded text-xs text-white ${browserInfo.isSafari ? 'bg-blue-500' : 'bg-green-500'}`}
        >
          {browserInfo.name}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-3 h-3 rounded-full ${isSupported ? 'bg-green-500' : 'bg-yellow-500'}`}
          />
          <span className="text-sm">
            Mode: {isSupported ? 'View Transitions' : 'CSS Fallbacks'}
          </span>
        </div>
        {!isSupported && (
          <p className="text-xs text-gray-600">
            Testing fallback animations for Safari compatibility
          </p>
        )}
      </div>

      {/* Test Element */}
      <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-[100px] flex items-center justify-center">
        <div
          ref={testElementRef}
          className="test-animation-element w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"
        >
          Test
        </div>
      </div>

      {/* Current Test Info */}
      {currentTest && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="font-medium text-sm text-blue-900">{currentTest.name}</div>
          <div className="text-xs text-blue-700">{currentTest.description}</div>
          {isAnimating && <div className="mt-2 text-xs text-blue-600">⏳ Animating...</div>}
        </div>
      )}

      {/* Test Controls */}
      <div className="space-y-2 mb-4">
        <button
          type="button"
          onClick={runAllTests}
          disabled={isAnimating}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {isAnimating ? 'Testing...' : 'Run All Animation Tests'}
        </button>

        <div className="grid grid-cols-2 gap-1">
          {ANIMATION_TESTS.map((test) => (
            <button
              type="button"
              key={test.name}
              onClick={() => runAnimationTest(test)}
              disabled={isAnimating}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                animationResults[test.name] === true
                  ? 'bg-green-100 text-green-800'
                  : animationResults[test.name] === false
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {test.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      {Object.keys(animationResults).length > 0 && (
        <div className="border-t pt-3">
          <h4 className="font-medium text-sm text-gray-900 mb-2">Test Results:</h4>
          <div className="space-y-1">
            {Object.entries(animationResults).map(([testName, passed]) => (
              <div key={testName} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${passed ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs">{testName}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t">
            <div className="text-xs text-gray-600">
              {Object.values(animationResults).filter(Boolean).length}/
              {Object.keys(animationResults).length} tests passed
            </div>
          </div>
        </div>
      )}

      {/* Performance Notes */}
      <div className="mt-4 pt-3 border-t text-xs text-gray-600">
        <div className="font-medium mb-1">Performance Notes:</div>
        <ul className="space-y-1">
          <li>• Animations should be smooth (60fps)</li>
          <li>• No visual artifacts or stuttering</li>
          <li>• Consistent timing across all browsers</li>
          <li>• Proper respect for reduced motion</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Development-only wrapper for the animation validator
 */
export function AnimationValidatorWrapper() {
  const [showValidator, setShowValidator] = useState(false);

  useEffect(() => {
    // Only show in development or when testing animations
    const isDev = process.env.NODE_ENV === 'development';
    const isTestMode =
      typeof window !== 'undefined' && window.location.search.includes('test=animations');
    setShowValidator(isDev || isTestMode);
  }, []);

  if (!showValidator) return null;

  return <AnimationValidator />;
}
