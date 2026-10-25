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
      const hero = document.querySelector('.hero');
      if (hero) {
        gsap.from('.hero .image-frame', { scale: 1.035, duration: 1.3, ease: 'power2.out' });
        gsap.from('.hero [data-entrance]', { y: 24, opacity: 0, duration: .8, stagger: .11, ease: 'power3.out', clearProps: 'all' });
      }
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        const siblings = el.parentElement ? Array.from(el.parentElement.children).filter(child => child.hasAttribute('data-reveal')) : [];
        const delay = Math.min(Math.max(siblings.indexOf(el), 0) * .07, .21);
        gsap.from(el, { y: 24, delay, duration: .85, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-mask]').forEach(el => {
        gsap.from(el, { clipPath: 'inset(0 0 18% 0)', duration: 1.15, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('.dark-editorial').forEach(el => gsap.fromTo(el, { backgroundColor: '#363b34' }, { backgroundColor: '#1d211f', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 25%', scrub: true } }));
      gsap.utils.toArray<HTMLElement>('.collection-index a, .feature-list article, .blind-planning li, .journey li, .curtain-detail-notes article').forEach(el => {
        gsap.fromTo(el, { '--line-progress': 0 }, { '--line-progress': 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });
      gsap.fromTo('.reading-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 0, end: 'max', scrub: .15 } });
    });
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-parallax] img').forEach(el => gsap.fromTo(el, { yPercent: -3, scale: 1.08 }, { yPercent: 3, scale: 1.08, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
      gsap.utils.toArray<HTMLElement>('.curtains-hero-visual img, .product-hero-image img, .manifesto-image img, .blind-layering-image img').forEach(el => gsap.fromTo(el, { yPercent: -2, scale: 1.06 }, { yPercent: 2, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: .6 } }));
      gsap.utils.toArray<HTMLElement>('.section-cta').forEach(section => {
        const lines = section.querySelector('.cta-lines');
        if (lines) gsap.fromTo(lines, { y: -25 }, { y: 25, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: .6 } });
      });
    });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(frame); mm.revert(); };
  }, [path]);
  return <div className="reading-progress" aria-hidden="true" />;
}
