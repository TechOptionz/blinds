'use client';
import { useLayoutEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/** Reset after the destination commits, not while the previous page is visible. */
export function NavigationScroll() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const route = `${pathname}?${search}`;
  const previous = useRef(route);
  useLayoutEffect(() => {
    if (previous.current === route) return;
    previous.current = route;
    // Explicit section links retain their intended anchor navigation.
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Next's focus/scroll handling and layout effects finish in the same commit.
    const frame = requestAnimationFrame(() => {
      if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);
  return null;
}
