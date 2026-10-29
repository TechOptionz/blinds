import Link from 'next/link';
import type { ReactNode } from 'react';
import { home } from '@/content/site';
import { images } from '@/content/images';
import { products } from '@/content/products';
import { curtainCategories } from '@/content/curtains';
import { catalogue, catalogueImage } from '@/content/catalogue';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
export function PageHeading({ label, title, description }: { label: string; title: ReactNode; description?: string }) {
  return <section className="page-heading"><div className="wrap"><span className="eyebrow" data-reveal>{label}</span><h1 data-reveal>{title}</h1>{description && <p data-reveal>{description}</p>}</div></section>;
}
/** Centred section introduction used across the homepage and inner pages. */
export function SectionIntro({ label, title, copy }: { label: string; title: ReactNode; copy?: string }) {
  return <div className="section-intro center" data-reveal><span className="eyebrow">{label}</span><h2>{title}</h2>{copy && <p className="lead">{copy}</p>}</div>;
}
export function SectionCTA({ title = 'Your space deserves a better finish.', copy = home.cta, label = 'Request a Quote', href = '/contact' }: { title?: string; copy?: string; label?: string; href?: string }) {
  return <section className="section-cta"><div className="wrap"><div className="cta-inner" data-reveal><span className="eyebrow">Let’s start something beautiful</span><h2>{title}</h2><p>{copy}</p><LinkButton href={href}>{label}</LinkButton></div></div></section>;
}
/** The four ranges, each with a preview image and quick links to every style. */
export function ProductShowcase() {
  const ranges = [
    { href: '/blinds', name: 'Blinds', blurb: 'Roller, Roman, Venetian, honeycomb, vertical, panel and motorised styles for every window.', image: images.products.roller.main, items: products.map(product => ({ name: product.name, href: `/blinds/${product.slug}` })) },
    { href: '/curtains', name: 'Curtains', blurb: 'Sheer, linen, blockout, thermal and velvet fabrics with S-fold, pinch pleat and eyelet headings.', image: curtainCategories[0].image, items: curtainCategories.map(category => ({ name: category.name, href: `/curtains/${category.slug}` })) },
    { href: '/screens', name: 'Screens', blurb: 'Fly, pet, retractable, pleated and security screens, plus sliding screen doors.', image: catalogueImage('screens', catalogue.screens.items[0]), items: catalogue.screens.items.map(item => ({ name: item.name, href: `/screens/${item.slug}` })) },
    { href: '/shutters', name: 'Shutters', blurb: 'Plantation, timber, PVC and aluminium shutters for inside, outside and wide openings.', image: catalogueImage('shutters', catalogue.shutters.items[0]), items: catalogue.shutters.items.map(item => ({ name: item.name, href: `/shutters/${item.slug}` })) },
  ];
  return <div className="range-grid">{ranges.map(range => <article className="range-card" key={range.href} data-reveal><Link href={range.href} className="range-image" aria-label={`Explore ${range.name.toLowerCase()}`}><ImagePlaceholder asset={range.image} sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw" /></Link><div className="range-body"><h3><Link href={range.href}>{range.name}</Link></h3><p>{range.blurb}</p><ul className="range-links">{range.items.slice(0, 5).map(item => <li key={item.href}><Link href={item.href}>{item.name.replace(/ (Blinds|Curtains|Screens|Shutters)$/, '')}</Link></li>)}</ul><Link href={range.href} className="text-link range-all">All {range.items.length} {range.name.toLowerCase()} styles <span className="arrow" aria-hidden="true">→</span></Link></div></article>)}</div>;
}
