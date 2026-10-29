import Link from 'next/link';
import { CategoryImages } from '@/components/sections/CategoryImages';
import { notFound } from 'next/navigation';
import { products } from '@/content/products';
import { images } from '@/content/images';
import { LinkButton } from '@/components/ui/LinkButton';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { SectionCTA } from '@/components/sections/Shared';
import { CheckList, CircleHero, SplitFeature } from '@/components/sections/Feature';
import { pageMetadata } from '@/lib/metadata';
export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = products.find(p => p.slug === slug); return p ? pageMetadata(p.name, p.seo, `/blinds/${slug}`) : {}; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const product = products.find(p => p.slug === slug); if (!product) notFound();
  const asset = images.products[product.style];
  return <>
    <CircleHero image={asset.main} label={`The collection / ${product.index}`} title={<>{product.name}</>} copy={product.description} breadcrumb={<nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/blinds">Our Blinds</Link><span aria-hidden="true">/</span><span>{product.name}</span></nav>}><LinkButton href={`/contact?product=${product.slug}`}>Enquire About {product.name}</LinkButton></CircleHero>
    <SplitFeature image={asset.details[0]} label={product.teaser} title={<>Why choose <span className="accent">{product.name}</span></>}><p className="lead">{product.intro}</p><CheckList items={[...product.features, ['Ideas for your space', product.spaces.join(', ')]]} /><p className="image-note">Room inspiration; ask about materials and suitability for your window.</p><LinkButton href={`/contact?product=${product.slug}`}>Enquire About {product.name}</LinkButton></SplitFeature>
    <section className="product-study wrap section-space"><CategoryImages name={product.name} assets={asset.details} /></section>
    <section className="related wrap"><span className="eyebrow">Keep exploring</span><h2>A different perspective.</h2><div className="related-grid">{products.filter(p => p.slug !== slug).map(p => <Link href={`/blinds/${p.slug}`} key={p.slug} className="related-card" data-reveal><div className="related-thumb"><ImagePlaceholder asset={images.products[p.style].main} sizes="(max-width: 767px) 50vw, 25vw" /></div><div><small>{p.index} / {p.group}</small><h3>{p.name}</h3><span className="text-link">Explore <span className="arrow" aria-hidden="true">→</span></span></div></Link>)}</div></section>
    <SectionCTA href={`/contact?product=${product.slug}`} label={`Enquire About ${product.name}`} />
  </>;
}
