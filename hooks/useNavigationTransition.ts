// Hook for navigation with view transitions and Safari fallbacks
// Provides smooth navigation experience across all browsers

'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useViewTransitions } from '@/hooks/useViewTransitions';

interface UseNavigationTransitionOptions {
  /** Whether this is an external link */
  external?: boolean;
  /** Target for external links */
  target?: React.HTMLAttributeAnchorTarget;
  /** Rel for external links */
  rel?: string;
}

interface UseNavigationTransitionReturn {
  /** Whether view transitions are supported */
  isSupported: boolean;
  /** Whether currently transitioning */
  isTransitioning: boolean;
  /** Navigate with transition support */
  navigate: (href: string, options?: UseNavigationTransitionOptions) => Promise<void>;
  /** Get the appropriate click handler for links */
  getClickHandler: (href: string, options?: UseNavigationTransitionOptions) => React.MouseEventHandler<HTMLAnchorElement>;
}

/**
 * Hook for handling navigation with view transitions and Safari fallbacks
 * @returns {UseNavigationTransitionReturn} Navigation utilities with transition support
 */
export function useNavigationTransition(): UseNavigationTransitionReturn {
  const router = useRouter();
  const { isSupported, isTransitioning, startTransition } = useViewTransitions();

  const navigate = useCallback(async (href: string, options: UseNavigationTransitionOptions = {}) => {
    if (options.external) {
      // Handle external links normally
      window.open(href, options.target || '_blank', 'noopener,noreferrer');
      return;
    }

    // Internal navigation with view transition support
    await startTransition(() => {
      router.push(href);
    });
  }, [router, startTransition]);

  const getClickHandler = useCallback((href: string, options: UseNavigationTransitionOptions = {}) => {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Let browser handle Cmd/Ctrl clicks, middle clicks, etc.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
        return;
      }

      // For external links, let the browser handle it
      if (options.external) {
        return;
      }

      // Prevent default navigation and use our transition system
      e.preventDefault();
      navigate(href, options);
    };
  }, [navigate]);

  return {
    isSupported,
    isTransitioning,
    navigate,
    getClickHandler,
  };
}