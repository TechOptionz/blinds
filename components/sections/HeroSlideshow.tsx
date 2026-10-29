'use client';
import { useCallback, useEffect, useState } from 'react';
import type { ImageAsset } from '@/content/images';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

const INTERVAL = 2500;

/** Crossfading full-bleed hero background that loops continuously. Pauses only while the tab is hidden or via the pause button. */
export function HeroSlideshow({ slides }: { slides: ImageAsset[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i: number) => setActive((i + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = window.setInterval(() => { if (!document.hidden) setActive(a => (a + 1) % slides.length); }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  return <>
    <div className="hero-background hero-slides" data-parallax aria-roledescription="carousel" aria-label="Featured window furnishings">
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
      <button type="button" className="hero-slide-toggle" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} onClick={() => setPaused(!paused)}>
        {paused
          ? <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          : <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" /></svg>}
      </button>
    </div>}
  </>;
}
