import Link from 'next/link';
import type { ReactNode } from 'react';
import { home } from '@/content/site';
import { images, type ImageAsset } from '@/content/images';
import { products } from '@/content/products';
import { curtainCategories } from '@/content/curtains';
import { catalogue, catalogueImage } from '@/content/catalogue';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
import { Carousel } from '@/components/sections/Carousel';
export function PageHeading({ label, title, description, children }: { label: string; title: ReactNode; description?: string; children?: ReactNode }) {
  return <section className="page-heading"><div className="wrap page-heading-inner"><div><span className="eyebrow" data-entrance>{label}</span><h1 data-entrance>{title}</h1></div>{(description || children) && <div className="page-heading-aside" data-entrance>{description && <p className="lead">{description}</p>}{children}</div>}</div></section>;
}
/** Section introduction: eyebrow and title, with the supporting copy beside it (split) or beneath it (center). */
export function SectionIntro({ label, title, copy, align = 'split', children }: { label: string; title: ReactNode; copy?: string; align?: 'split' | 'center'; children?: ReactNode }) {
  return <div className={`section-intro ${align}`} data-reveal><div><span className="eyebrow">{label}</span><h2>{title}</h2></div>{(copy || children) && <div className="section-intro-aside">{copy && <p className="lead">{copy}</p>}{children}</div>}</div>;
}
export function SectionCTA({ title = 'Your windows, beautifully finished.', copy = home.cta, label = 'Request a Quote', href = '/contact' }: { title?: string; copy?: string; label?: string; href?: string }) {
  return <section className="section-cta">
    <div className="cta-media" aria-hidden="true"><ImagePlaceholder asset={images.cta} sizes="100vw" /></div>
    <div className="wrap cta-inner" data-reveal>
      <div><span className="eyebrow">Free, no-obligation quote</span><h2>{title}</h2></div>
      <div className="cta-body"><p>{copy}</p><LinkButton href={href} variant="light">{label}</LinkButton><ul className="cta-notes"><li>No obligation</li><li>Advice on styles and fabrics</li><li>Measure and quote when you’re ready</li></ul></div>
    </div>
  </section>;
}
/** The four ranges as full-height photographic cards; the whole card links to the range, with quick links to its styles. */
export function ProductShowcase() {
  const ranges = [
    { href: '/blinds', name: 'Blinds', image: images.products.roller.main, items: products.map(product => ({ name: product.name, href: `/blinds/${product.slug}` })) },
    { href: '/curtains', name: 'Curtains', image: curtainCategories[0].image, items: curtainCategories.map(category => ({ name: category.name, href: `/curtains/${category.slug}` })) },
    { href: '/screens', name: 'Screens', image: catalogueImage('screens', catalogue.screens.items[0]), items: catalogue.screens.items.map(item => ({ name: item.name, href: `/screens/${item.slug}` })) },
    { href: '/shutters', name: 'Shutters', image: catalogueImage('shutters', catalogue.shutters.items[0]), items: catalogue.shutters.items.map(item => ({ name: item.name, href: `/shutters/${item.slug}` })) },
  ];
  return <div className="range-grid">{ranges.map((range, i) => <article className="range-card" key={range.href} data-reveal>
    <ImagePlaceholder asset={range.image} sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw" />
    <div className="range-overlay">
      <span className="range-count">0{i + 1} · {range.items.length} styles</span>
      <h3><Link href={range.href} className="range-link">{range.name}</Link></h3>
      <ul className="range-links">{range.items.slice(0, 4).map(item => <li key={item.href}><Link href={item.href}>{item.name.replace(/ (Blinds|Curtains|Screens|Shutters)$/, '')}</Link></li>)}</ul>
      <span className="range-cta" aria-hidden="true">Explore {range.name.toLowerCase()} <span className="arrow">→</span></span>
    </div>
  </article>)}</div>;
}
export type RelatedItem = { href: string; name: string; meta: string; image: ImageAsset };
export function RelatedStyles({ label = 'Keep exploring', title, items }: { label?: string; title: string; items: RelatedItem[] }) {
  return <section className="related wrap section-space"><Carousel label="styles" head={<SectionIntro label={label} title={title} />}>{items.map(item => <Link href={item.href} key={item.href} className="related-card" data-reveal><div className="related-thumb"><ImagePlaceholder asset={item.image} sizes="(max-width: 767px) 70vw, 22vw" /></div><small>{item.meta}</small><h3>{item.name} <span className="arrow" aria-hidden="true">→</span></h3></Link>)}</Carousel></section>;
}
export function FaqSection({ label = 'Before you choose', title, faqs }: { label?: string; title: ReactNode; faqs: string[][] }) {
  return <section className="curtain-faq wrap section-space"><div className="faq-head" data-reveal><span className="eyebrow">{label}</span><h2>{title}</h2><p>Still unsure? <Link href="/contact" className="text-link">Ask us directly <span className="arrow" aria-hidden="true">→</span></Link></p></div><div className="faq-list">{faqs.map(([question, answer], i) => <details key={question}><summary><span className="faq-index">0{i + 1}</span>{question}<span className="faq-toggle" aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>;
}
/** Dark band of numbered planning prompts. */
export function PlanningSteps({ label = 'A considered starting point', title, copy, steps }: { label?: string; title: ReactNode; copy: string; steps: string[][] }) {
  return <section className="blind-planning"><div className="wrap blind-planning-inner"><div data-reveal><span className="eyebrow">{label}</span><h2>{title}</h2><p>{copy}</p><LinkButton href="/contact" variant="light">Tell Us About Your Space</LinkButton></div><ol>{steps.map(([heading, body], index) => <li key={heading} data-reveal><span>0{index + 1}</span><div><h3>{heading}</h3><p>{body}</p></div></li>)}</ol></div></section>;
}
export type CompareRow = { href: string; name: string; meta: string; image?: ImageAsset; cells: [string, string][] };
/** Side-by-side style notes, set as table-like rows. */
export function CompareRows({ id, label, title, copy, rows }: { id: string; label: string; title: ReactNode; copy: string; rows: CompareRow[] }) {
  return <section className="compare wrap section-space" id={id}><SectionIntro label={label} title={title} copy={copy} />
    <div className="compare-table" role="list">{rows.map(row => <article className="compare-row" role="listitem" key={row.href} data-reveal>
      <div className="compare-name">{row.image && <div className="compare-thumb"><ImagePlaceholder asset={row.image} sizes="96px" /></div>}<div><small>{row.meta}</small><h3>{row.name}</h3></div></div>
      {row.cells.map(([term, value]) => <dl key={term}><dt>{term}</dt><dd>{value}</dd></dl>)}
      <Link href={row.href} className="compare-link" aria-label={`Explore ${row.name}`}><span className="arrow" aria-hidden="true">→</span></Link>
    </article>)}</div>
  </section>;
}
