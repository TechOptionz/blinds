'use client';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { gallery, galleryCategories, galleryGroups, type GalleryGroup } from '@/content/gallery';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { trapDialogFocus } from '@/lib/focus-trap';

const PAGE = 18;
const groupLabel = (group: GalleryGroup) => galleryGroups.find(g => g.slug === group)?.name ?? group;

export function Gallery() {
  const [group, setGroup] = useState<GalleryGroup | 'all'>('all');
  const [category, setCategory] = useState('all');
  const [limit, setLimit] = useState(PAGE);
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => gallery.filter(item => (group === 'all' || item.group === group) && (category === 'all' || item.category === category)), [group, category]);
  const categories = group === 'all' ? [] : galleryCategories(group);
  const visible = items.slice(0, limit);
  const current = items[index] ?? items[0];

  function pick(nextGroup: GalleryGroup | 'all', nextCategory = 'all') { setGroup(nextGroup); setCategory(nextCategory); setLimit(PAGE); setIndex(0); }
  function open(i: number, button: HTMLButtonElement) { origin.current = button; setIndex(i); dialog.current?.showModal(); }
  function close() { dialog.current?.close(); origin.current?.focus(); }
  function move(direction: number) { setIndex(current => (current + direction + items.length) % items.length); }
  function showMore() { const first = gridRef.current?.querySelectorAll<HTMLButtonElement>('.gallery-tile').length ?? 0; setLimit(l => l + PAGE); requestAnimationFrame(() => gridRef.current?.querySelectorAll<HTMLButtonElement>('.gallery-tile')[first]?.focus({ preventScroll: true })); }


  return <div className="wrap gallery-area">
    <div className="gallery-toolbar">
      <div className="gallery-tabs" role="tablist" aria-label="Browse the collection">
        {galleryGroups.map(tab => { const count = tab.slug === 'all' ? gallery.length : gallery.filter(item => item.group === tab.slug).length; return <button key={tab.slug} role="tab" aria-selected={group === tab.slug} onClick={() => pick(tab.slug)}>{tab.name}<span>{count}</span></button>; })}
      </div>
      {categories.length > 0 && <div className="gallery-chips" aria-label={`Filter ${groupLabel(group as GalleryGroup).toLowerCase()} by style`}>
        <button aria-pressed={category === 'all'} onClick={() => pick(group, 'all')}>All {groupLabel(group as GalleryGroup).toLowerCase()}</button>
        {categories.map(option => <button key={option.slug} aria-pressed={category === option.slug} onClick={() => pick(group, option.slug)}>{option.name}</button>)}
      </div>}
      <div className="gallery-meta">
        <p aria-live="polite"><strong>{items.length}</strong> {items.length === 1 ? 'image' : 'images'}{group !== 'all' && <> in {category === 'all' ? groupLabel(group as GalleryGroup).toLowerCase() : categories.find(option => option.slug === category)?.name}</>}</p>
        <p className="image-note">Interior inspiration from licensed photography, not completed Screens N Blinds projects.</p>
      </div>
    </div>

    <div className="gallery-grid" ref={gridRef}>
      {visible.map((item, i) => <button key={item.id} className={`gallery-tile${item.featured && items.length >= 6 ? ' is-featured' : ''}`} onClick={e => open(i, e.currentTarget)} aria-label={`Open ${item.caption} (${item.label})`}>
        <span className="gallery-media">
          <ImagePlaceholder asset={item.image} sizes={item.featured && items.length >= 6 ? '(max-width: 640px) 100vw, (max-width: 1100px) 66vw, 900px' : '(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 460px'} />
          <span className="gallery-zoom" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg></span>
        </span>
        <span className="gallery-tile-body">
          <span className="gallery-category">{item.label}</span>
          <span className="gallery-caption">{item.caption}</span>
        </span>
      </button>)}
    </div>

    {items.length > visible.length && <div className="gallery-more">
      <span className="gallery-progress" aria-hidden="true"><span style={{ width: `${(visible.length / items.length) * 100}%` }} /></span>
      <p>Showing {visible.length} of {items.length}</p>
      <button className="link-button outline" onClick={showMore}>Show more inspiration</button>
    </div>}

    <dialog ref={dialog} className="lightbox" aria-label="Inspiration image viewer" onCancel={e => { e.preventDefault(); close(); }} onKeyDown={e => { trapDialogFocus(e); if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}>
      {current && <>
        <div className="lightbox-top">
          <div><span className="eyebrow">{groupLabel(current.group)} · {current.label}</span><span className="lightbox-count">{index + 1} / {items.length}</span></div>
          <button onClick={close} autoFocus aria-label="Close image viewer">Close <span aria-hidden="true">×</span></button>
        </div>
        <div className="lightbox-stage">
          <button className="lightbox-arrow" onClick={() => move(-1)} aria-label="Previous image">←</button>
          <div className="lightbox-image" onTouchStart={e => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touchStart.current !== null) { const difference = touchStart.current - e.changedTouches[0].clientX; if (Math.abs(difference) > 50) move(difference > 0 ? 1 : -1); } touchStart.current = null; }}>
            <ImagePlaceholder key={current.id} asset={current.image} sizes="100vw" />
          </div>
          <button className="lightbox-arrow" onClick={() => move(1)} aria-label="Next image">→</button>
        </div>
        <div className="lightbox-bottom">
          <div aria-live="polite"><p>{current.caption}</p><span>Licensed inspiration photography · Styles shown are indicative</span></div>
          <div className="lightbox-actions">
            <button onClick={() => move(-1)} aria-label="Previous image" className="lightbox-arrow mobile-only">←</button>
            <Link href={current.href} className="link-button lightbox-link" onClick={close}>Explore {current.label}<span aria-hidden="true">→</span></Link>
            <button onClick={() => move(1)} aria-label="Next image" className="lightbox-arrow mobile-only">→</button>
          </div>
        </div>
      </>}
    </dialog>
  </div>;
}
