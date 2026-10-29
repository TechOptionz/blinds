'use client';
import { useRef, useState } from 'react';
import { gallery } from '@/content/gallery';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { trapDialogFocus } from '@/lib/focus-trap';
export function Gallery() {
  const [filter, setFilter] = useState('all');
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<number | null>(null);
  const items = gallery.filter(item => filter === 'all' || item.category === filter);
  function open(i: number, button: HTMLButtonElement) { origin.current = button; setIndex(i); dialog.current?.showModal(); }
  function close() { dialog.current?.close(); origin.current?.focus(); }
  function move(direction: number) { setIndex(current => (current + direction + items.length) % items.length); }
  return <div className="wrap gallery-area"><div className="gallery-filter" aria-label="Filter inspiration">{['all', 'roller', 'roman', 'venetian'].map(value => <button aria-pressed={filter === value} key={value} onClick={() => { setFilter(value); setIndex(0); }}>{value === 'all' ? 'All Inspiration' : value}<span>{value === 'all' ? '06' : '02'}</span></button>)}</div><p className="image-note">Interior inspiration from licensed photography, not completed Screens N Blinds projects.</p><div className="gallery-grid">{items.map((item, i) => <button key={item.id} className="gallery-tile" onClick={e => open(i, e.currentTarget)} aria-label={`Open ${item.caption}`}><ImagePlaceholder asset={item.image} /><span className="gallery-caption"><span>{item.caption}</span><span aria-hidden="true">→</span></span><span className="gallery-category">{item.category} / Design study</span></button>)}</div><dialog ref={dialog} className="lightbox" aria-label="Inspiration image viewer" onCancel={e => { e.preventDefault(); close(); }} onKeyDown={e => { trapDialogFocus(e); if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}><div className="lightbox-top"><span className="eyebrow">The inspiration edit</span><button onClick={close} autoFocus aria-label="Close image viewer">Close <span aria-hidden="true">×</span></button></div><div className="lightbox-image" onTouchStart={e => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touchStart.current !== null) { const difference = touchStart.current - e.changedTouches[0].clientX; if (Math.abs(difference) > 50) move(difference > 0 ? 1 : -1); } touchStart.current = null; }}><ImagePlaceholder asset={items[index].image} sizes="100vw" /></div><div className="lightbox-bottom"><button onClick={() => move(-1)} aria-label="Previous image">←</button><div aria-live="polite"><p>{items[index].caption}</p><span>{index + 1} / {items.length} · Illustrated inspiration</span></div><button onClick={() => move(1)} aria-label="Next image">→</button></div></dialog></div>;
}
