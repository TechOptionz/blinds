'use client';
import { useLayoutEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function resetScroll() {
  if (window.location.hash) return;
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = prev;
}

/**
 * Keeps page-to-page navigation starting at the top.
 * - Client navigations: reset after the destination commits, retrying briefly in case late content or the router's own
 *   scroll handling lands after the first reset, but never fighting a user who has scrolled since.
 * - Fresh document loads of a plain navigation (not a reload or back/forward): if the browser has restored an old
 *   scroll position by the time the app mounts or the load event fires, return to the top. This covers the router
 *   falling back to a full page load of the same URL. Only those two moments are checked, so scrolling done by the
 *   user or by scripts afterwards is left alone.
 */
export function NavigationScroll() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const route = `${pathname}?${search}`;
  const previous = useRef(route);
  useLayoutEffect(() => {
    if (window.location.hash) return;
    const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (entry && entry.type !== 'navigate') return;
    if (window.scrollY > 0) resetScroll();
    if (document.readyState === 'complete') return;
    let userInput = false;
    const markInput = () => { userInput = true; };
    const inputs: (keyof WindowEventMap)[] = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
    inputs.forEach(name => window.addEventListener(name, markInput, { passive: true }));
    const onLoad = () => { if (!userInput && window.scrollY > 0) resetScroll(); cleanup(); };
    const cleanup = () => { window.removeEventListener('load', onLoad); inputs.forEach(name => window.removeEventListener(name, markInput)); };
    window.addEventListener('load', onLoad);
    return cleanup;
  }, []);
  useLayoutEffect(() => {
    if (previous.current === route) return;
    previous.current = route;
    if (window.location.hash) return;
    const startY = window.scrollY;
    resetScroll();
    const frame = requestAnimationFrame(resetScroll);
    const timers = [10, 80, 200, 450, 900].map(ms => setTimeout(() => { if (ms <= 10 || window.scrollY === startY) resetScroll(); }, ms));
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frame);
    };
  }, [route]);
  return null;
}
