import type { ReactNode } from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import type { ImageAsset } from '@/content/images';
import { TickIcon } from '@/components/ui/Icons';
/** Title-and-detail pairs set as hairline-separated rows. */
export function CheckList({ items }: { items: string[][] }) {
  return <ul className="check-list">{items.map(([title, body]) => <li key={title}><span className="check-mark"><TickIcon /></span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ul>;
}
/** Small rounded labels, e.g. the rooms a style suits. */
export function Tags({ items }: { items: string[] }) {
  return <ul className="tag-list">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
/** Inset photograph on one side, copy on the other. */
export function SplitFeature({ image, label, title, flip = false, id, children }: { image: ImageAsset; label?: string; title: ReactNode; flip?: boolean; id?: string; children?: ReactNode }) {
  return <section className={`split-feature wrap${flip ? ' flip' : ''}`} id={id}><div className="split-media" data-mask><ImagePlaceholder asset={image} sizes="(max-width: 950px) 100vw, 50vw" /></div><div className="split-copy" data-reveal>{label && <span className="eyebrow">{label}</span>}<h2>{title}</h2>{children}</div></section>;
}
/** Editorial page opening: copy and key facts beside a tall photograph. Renders the page's h1. */
export function PageHero({ image, label, title, copy, breadcrumb, facts, children }: { image: ImageAsset; label?: string; title: ReactNode; copy?: string; breadcrumb?: ReactNode; facts?: [string, ReactNode][]; children?: ReactNode }) {
  return <section className="page-hero"><div className="wrap page-hero-grid">
    <div className="page-hero-copy">{breadcrumb}{label && <span className="eyebrow" data-entrance>{label}</span>}<h1 data-entrance>{title}</h1>{copy && <p className="lead" data-entrance>{copy}</p>}{children && <div className="hero-actions" data-entrance>{children}</div>}
      {facts && <dl className="page-hero-facts" data-entrance>{facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>}</div>
    <div className="page-hero-media"><ImagePlaceholder asset={image} priority sizes="(max-width: 950px) 100vw, 55vw" /></div>
  </div></section>;
}
/** Detail-page overview: headline and intro, numbered feature cards, then a dark spec band with photograph and actions. */
export function ProductOverview({ label = 'Overview', title, intro, features, image, facts, note, children }: { label?: string; title: ReactNode; intro: string; features: string[][]; image: ImageAsset; facts: [string, ReactNode][]; note?: string; children?: ReactNode }) {
  return <>
    <section className="overview wrap section-space">
      <div className="overview-head" data-reveal><span className="eyebrow">{label}</span><h2>{title}</h2></div>
      <p className="lead overview-intro" data-reveal>{intro}</p>
      <ol className="feature-cards">{features.map(([heading, body], i) => <li key={heading} data-reveal><span className="feature-num">0{i + 1}</span><h3>{heading}</h3><p>{body}</p></li>)}</ol>
    </section>
    <section className="spec-band"><div className="spec-media" data-mask><ImagePlaceholder asset={image} sizes="(max-width: 950px) 100vw, 50vw" /></div><div className="spec-panel" data-reveal>
      <span className="eyebrow">At a glance</span>
      <dl className="spec-list">{facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
      {note && <p className="spec-note">{note}</p>}
      {children && <div className="spec-actions">{children}</div>}
    </div></section>
  </>;
}
