'use client';
import { useEffect, useRef, useState } from 'react';
/** Sticky category tabs for a collection page: highlights the group in view and slides the active tab into sight. */
export function CollectionNav({ label, groups }: { label: string; groups: { id: string; name: string }[] }) {
  const [active, setActive] = useState(groups[0]?.id);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = (nav.current?.getBoundingClientRect().bottom ?? 0) + 120;
        let current = groups[0]?.id;
        for (const { id } of groups) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= line) current = id; }
        setActive(current);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [groups]);
  useEffect(() => {
    const bar = nav.current; const tab = bar?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!bar || !tab) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    bar.scrollTo({ left: tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
  }, [active]);
  return <nav ref={nav} className="collection-index" aria-label={label}><div className="collection-index-track">{groups.map(group => <a key={group.id} href={`#${group.id}`} aria-current={group.id === active ? 'true' : undefined}>{group.name}</a>)}</div></nav>;
}
