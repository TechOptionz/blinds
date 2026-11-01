'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
/** Horizontal card row with previous/next buttons beside the heading and a slim progress line underneath. */
export function Carousel({ label, head, children }: { label: string; head: ReactNode; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ start: true, end: false, progress: 0, ratio: 1 });
  useEffect(() => {
    const el = track.current; if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setState({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4, progress: max > 0 ? el.scrollLeft / max : 0, ratio: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1 });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  const move = (direction: number) => {
    const el = track.current; if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * el.clientWidth * .85, behavior: reduce ? 'auto' : 'smooth' });
  };
  const scrollable = state.ratio < .99;
  return <div className="carousel">
    <div className="carousel-head">{head}{scrollable && <div className="carousel-controls">
      <button type="button" onClick={() => move(-1)} disabled={state.start} aria-label={`Previous ${label}`}><span aria-hidden="true">←</span></button>
      <button type="button" onClick={() => move(1)} disabled={state.end} aria-label={`Next ${label}`}><span aria-hidden="true">→</span></button>
    </div>}</div>
    <div className="related-grid" ref={track}>{children}</div>
    {scrollable && <div className="carousel-progress" aria-hidden="true"><span style={{ width: `${state.ratio * 100}%`, transform: `translateX(${state.progress * (1 / state.ratio - 1) * 100}%)` }} /></div>}
  </div>;
}
