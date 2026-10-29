import type { ReactNode } from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import type { ImageAsset } from '@/content/images';
import { TickIcon } from '@/components/ui/Icons';
/** Tick-marked list of "label: detail" pairs. */
export function CheckList({ items }: { items: string[][] }) {
  return <ul className="check-list">{items.map(([title, body]) => <li key={title}><TickIcon /><span><strong>{title}:</strong> {body}</span></li>)}</ul>;
}
/** Edge-to-edge photograph on one side, copy on the other. */
export function SplitFeature({ image, label, title, flip = false, id, children }: { image: ImageAsset; label?: string; title: ReactNode; flip?: boolean; id?: string; children?: ReactNode }) {
  return <section className={`split-feature${flip ? ' flip' : ''}`} id={id}><div className="split-media" data-mask><ImagePlaceholder asset={image} sizes="(max-width: 950px) 100vw, 50vw" /></div><div className="split-copy" data-reveal>{label && <span className="eyebrow">{label}</span>}<h2>{title}</h2>{children}</div></section>;
}
/** Full-bleed photograph with a circular copy card over it. Renders the page's h1. */
export function CircleHero({ image, label, title, copy, breadcrumb, children }: { image: ImageAsset; label?: string; title: ReactNode; copy?: string; breadcrumb?: ReactNode; children?: ReactNode }) {
  return <section className="circle-hero"><ImagePlaceholder asset={image} priority sizes="100vw" /><div className="circle-hero-card" data-reveal>{breadcrumb}{label && <span className="eyebrow">{label}</span>}<h1>{title}</h1>{copy && <p>{copy}</p>}{children && <div className="hero-actions">{children}</div>}</div></section>;
}
