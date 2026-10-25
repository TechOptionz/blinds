import Link from 'next/link';
import { home } from '@/content/site';
import { images } from '@/content/images';
import { products } from '@/content/products';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
export function PageHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return <section className="page-heading wrap"><span className="eyebrow" data-reveal>{label}</span><h1 data-reveal>{title}</h1>{description && <p data-reveal>{description}</p>}</section>;
}
export function SectionCTA({ title = 'Your space deserves a better finish.', copy = home.cta, label = 'Request a Quote', href = '/contact' }: { title?: string; copy?: string; label?: string; href?: string }) {
  return <section className="section-cta"><div className="wrap cta-inner" data-reveal><div><span className="eyebrow">Let’s start something beautiful</span><h2>{title}</h2></div><div><p>{copy}</p><LinkButton href={href}>{label}</LinkButton></div></div><div className="cta-lines" aria-hidden="true" /></section>;
}
export function ProductShowcase() {
  return <div className="product-showcase wrap">{products.map((product, i) => <article id={product.slug} className={`product-feature product-${i + 1}`} key={product.slug}><Link href={`/blinds/${product.slug}`} className="product-image-link" aria-label={`Explore ${product.name}`} data-mask><ImagePlaceholder asset={images.products[product.style].main} className="product-image" /></Link><div className="product-copy" data-reveal><span className="eyebrow">{product.index} <span className="muted">/ 03</span></span><p className="product-teaser">{product.teaser}</p><h2>{product.name}</h2><p>{product.description}</p><div className="product-tags">{product.spaces.map(space => <span key={space} className="product-tag">{space}</span>)}</div><LinkButton href={`/blinds/${product.slug}`} variant="text">Explore {product.name}</LinkButton></div></article>)}</div>;
}
