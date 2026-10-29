'use client';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { ImageAsset } from '@/content/images';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

const INTERVAL = 3500;
const REDUCE = '(prefers-reduced-motion: reduce)';
const subscribeReduce = (cb: () => void) => { const m = window.matchMedia(REDUCE); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb); };

/** Crossfading full-bleed hero background. Pauses on hover/focus, when the tab is hidden, and via the pause button. */
export function HeroSlideshow({ slides }: { slides: ImageAsset[] }) {
  const [active, setActive] = useState(0);
  // null = follow the reduced-motion setting; true/false = the visitor pressed pause/play.
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const reduceMotion = useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE).matches, () => false);
  const paused = userPaused ?? reduceMotion;
  const [hovered, setHovered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const go = useCallback((i: number) => setActive((i + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || hovered || slides.length < 2) return;
    const id = window.setInterval(() => { if (!document.hidden) setActive(a => (a + 1) % slides.length); }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, hovered, slides.length]);

  // The hero section is the hover target, so text and buttons also pause the show.
  useEffect(() => {
    const section = rootRef.current?.closest('section');
    if (!section) return;
    const on = () => setHovered(true), off = () => setHovered(false);
    section.addEventListener('mouseenter', on); section.addEventListener('mouseleave', off);
    section.addEventListener('focusin', on); section.addEventListener('focusout', off);
    return () => { section.removeEventListener('mouseenter', on); section.removeEventListener('mouseleave', off); section.removeEventListener('focusin', on); section.removeEventListener('focusout', off); };
  }, []);

  return <>
    <div ref={rootRef} className="hero-background hero-slides" data-parallax aria-roledescription="carousel" aria-label="Featured window furnishings">
      {slides.map((slide, i) => (
        <div key={slide.path} className={`hero-slide${i === active ? ' is-active' : ''}`} aria-hidden={i !== active} aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
          <ImagePlaceholder asset={slide} priority={i === 0} sizes="100vw" />
        </div>
      ))}
    </div>
    {slides.length > 1 && <div className="hero-slide-controls">
      <div className="hero-slide-dots">
        {slides.map((slide, i) => <button key={slide.path} type="button" className={i === active ? 'is-active' : ''} aria-label={`Show slide ${i + 1}: ${slide.alt}`} aria-current={i === active} onClick={() => go(i)} />)}
      </div>
      <button type="button" className="hero-slide-toggle" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} onClick={() => setUserPaused(!paused)}>
        {paused
          ? <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          : <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" /></svg>}
      </button>
    </div>}
  </>;
}
