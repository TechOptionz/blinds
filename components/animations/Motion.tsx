'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (document.querySelector('.page-hero')) gsap.from('.page-hero-media .image-frame', { scale: 1.06, duration: 1.4, ease: 'power2.out' });
      gsap.from('[data-entrance]', { y: 28, opacity: 0, duration: .9, stagger: .1, ease: 'power3.out', clearProps: 'all' });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        const siblings = el.parentElement ? Array.from(el.parentElement.children).filter(child => child.hasAttribute('data-reveal')) : [];
        const delay = Math.min(Math.max(siblings.indexOf(el), 0) * .07, .21);
        gsap.from(el, { y: 28, delay, duration: .9, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-mask]').forEach(el => {
        gsap.from(el, { clipPath: 'inset(0 0 18% 0)', duration: 1.15, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('.feature-cards li, .blind-planning li, .why-list li, .compare-row').forEach(el => {
        gsap.fromTo(el, { '--line-progress': 0 }, { '--line-progress': 1, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });
      gsap.fromTo('.reading-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 0, end: 'max', scrub: .15 } });
    });
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-parallax] img').forEach(el => gsap.fromTo(el, { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: 'none', scrollTrigger: { trigger: el.closest('[data-parallax]'), start: 'top bottom', end: 'bottom top', scrub: true } }));
      gsap.utils.toArray<HTMLElement>('.spec-media img, .cta-media img, .curtains-detail-image img').forEach(el => gsap.fromTo(el, { yPercent: -3, scale: 1.08 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: .6 } }));
    });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(frame); mm.revert(); };
  }, [path]);
  return <div className="reading-progress" aria-hidden="true" />;
}
