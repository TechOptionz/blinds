'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export function CursorFeedback() {
  const path = usePathname();
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      let activeButton: HTMLElement | null = null;
      const resetButton = () => { activeButton?.style.removeProperty('--pointer-x'); activeButton?.style.removeProperty('--pointer-y'); activeButton = null; };
      const hide = resetButton;
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') { hide(); return; }
        const target = event.target instanceof Element ? event.target : null;
        if (target?.closest('dialog, input, textarea, select') || document.querySelector('dialog[open]')) { hide(); return; }
        const button = target?.closest<HTMLElement>('.link-button, .header-quote') || null;
        if (button !== activeButton) { resetButton(); activeButton = button; }
        if (activeButton) {
          const bounds = activeButton.getBoundingClientRect();
          activeButton.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 5}px`);
          activeButton.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 4}px`);
        }
      };
      const key = (event: KeyboardEvent) => { if (event.key === 'Tab' || event.key === 'Escape') hide(); };
      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('blur', hide);
      window.addEventListener('scroll', resetButton, { passive: true });
      window.addEventListener('keydown', key);
      document.documentElement.addEventListener('pointerleave', hide);
      return () => { hide(); window.removeEventListener('pointermove', move); window.removeEventListener('blur', hide); window.removeEventListener('scroll', resetButton); window.removeEventListener('keydown', key); document.documentElement.removeEventListener('pointerleave', hide); };
    });
    return () => media.revert();
  }, [path]);
  return null;
}
