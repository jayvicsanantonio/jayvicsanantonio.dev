'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export type UseScrollToTopOptions = {
  // Optional: selectors or elements of custom scrollable containers to also reset
  containers?: Array<string | HTMLElement>;
  // Optional: scroll behavior. Default 'auto' to avoid smooth scrolling during route changes
  behavior?: ScrollBehavior;
};

export function useScrollToTop(options?: UseScrollToTopOptions) {
  const pathname = usePathname();
  const behavior = options?.behavior ?? 'auto';
  const containers = options?.containers ?? [];

  // Avoid interfering with React View Transitions; scrolling during capture can abort.
  if (typeof document !== 'undefined' && 'startViewTransition' in document) {
    return;
  }

  const resolvedContainers = useMemo(() => {
    if (typeof document === 'undefined') return [] as HTMLElement[];
    const els: HTMLElement[] = [];
    for (const c of containers) {
      if (typeof c === 'string') {
        document.querySelectorAll<HTMLElement>(c).forEach((el) => els.push(el));
      } else if (c instanceof HTMLElement) {
        els.push(c);
      }
    }
    return els;
  }, [containers]);

  const scrollAllToTop = () => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior });
    } catch {
      window.scrollTo(0, 0);
    }
    for (const el of resolvedContainers) {
      try {
        el.scrollTo({ top: 0, left: 0, behavior });
      } catch {
        el.scrollTop = 0;
        el.scrollLeft = 0;
      }
    }
  };

  // Defer until after Next.js and the browser perform their own restoration
  const deferScroll = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollAllToTop);
    });
  };

  // On mount: disable browser scroll restoration and ensure top.
  // Also handle back/forward and bfcache restores.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let prev: ScrollRestoration | undefined;
    if ('scrollRestoration' in history) {
      prev = history.scrollRestoration;
      history.scrollRestoration = 'manual';
    }

    // Initial load after potential browser/Next restoration
    deferScroll();

    const onPopState = () => deferScroll();
    const onPageShow = () => deferScroll(); // includes bfcache restores
    const onHashChange = () => deferScroll();

    window.addEventListener('popstate', onPopState);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      if (prev) history.scrollRestoration = prev;
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  // On route changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    deferScroll();
  }, [pathname, resolvedContainers, behavior]);
}
