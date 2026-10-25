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
    if (window.location.hash) return;
    const reset = () => {
      if (window.location.hash) return;
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      document.body.scrollTop = 0;
      html.style.scrollBehavior = prev;
    };
    reset();
    const timer = setTimeout(reset, 10);
    const frame = requestAnimationFrame(reset);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [route]);
  return null;
}
