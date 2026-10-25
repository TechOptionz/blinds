import Link from 'next/link';
import { CategoryImages } from '@/components/sections/CategoryImages';
import { notFound } from 'next/navigation';
import { products } from '@/content/products';
import { images } from '@/content/images';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
import { SectionCTA } from '@/components/sections/Shared';
import { pageMetadata } from '@/lib/metadata';
export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = products.find(p => p.slug === slug); return p ? pageMetadata(p.name, p.seo, `/blinds/${slug}`) : {}; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const product = products.find(p => p.slug === slug); if (!product) notFound();
  const asset = images.products[product.style];
  return <><section className="product-hero wrap"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/blinds">Our Blinds</Link><span aria-hidden="true">/</span><span>{product.name}</span></nav><div className="product-title"><div><span className="eyebrow">The collection / {product.index}</span><h1>{product.name}</h1></div><p>{product.teaser}</p></div><div data-mask><ImagePlaceholder asset={asset.main} className="product-hero-image" priority sizes="100vw" /></div><span className="image-note">Architectural study · {product.name}</span></section><section className="product-details wrap section-space"><div data-reveal><span className="eyebrow">The details</span><h2>{product.headline}</h2><p>{product.intro}</p><LinkButton href={`/contact?product=${product.slug}`}>Enquire About {product.name}</LinkButton></div><div className="feature-list"><h3 className="eyebrow">Why consider this style</h3>{product.features.map(([title, body], i) => <article key={title} data-reveal><span>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section><section className="product-study wrap"><CategoryImages name={product.name} assets={asset.details} /><div className="spaces-row" data-reveal><span className="eyebrow">Ideas for your space</span><p>{product.spaces.join(' / ')}</p><small>Room inspiration; ask about materials and suitability for your window.</small></div></section><section className="related wrap section-space"><span className="eyebrow">Keep exploring</span><h2>A different perspective.</h2>{products.filter(p => p.slug !== slug).map(p => <Link href={`/blinds/${p.slug}`} key={p.slug}><span>{p.index}</span><h3>{p.name}</h3><span aria-hidden="true">↗</span></Link>)}</section><SectionCTA href={`/contact?product=${product.slug}`} label={`Enquire About ${product.name}`} /></>;
}
