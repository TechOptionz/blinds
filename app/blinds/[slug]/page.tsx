import Link from 'next/link';
import { CategoryImages } from '@/components/sections/CategoryImages';
import { notFound } from 'next/navigation';
import { products } from '@/content/products';
import { images } from '@/content/images';
import { blindGuidance } from '@/content/blinds-guide';
import { LinkButton } from '@/components/ui/LinkButton';
import { RelatedStyles, SectionCTA } from '@/components/sections/Shared';
import { PageHero, ProductOverview, Tags } from '@/components/sections/Feature';
import { pageMetadata } from '@/lib/metadata';
export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = products.find(p => p.slug === slug); return p ? pageMetadata(p.name, p.seo, `/blinds/${slug}`) : {}; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const product = products.find(p => p.slug === slug); if (!product) notFound();
  const asset = images.products[product.style]; const guide = blindGuidance[product.style];
  return <>
    <PageHero image={asset.main} label={`Our blinds · ${product.index}`} title={<>{product.name}</>} copy={product.description} breadcrumb={<nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/blinds">Our Blinds</Link><span aria-hidden="true">/</span><span>{product.name}</span></nav>}><LinkButton href={`/contact?product=${product.slug}`}>Enquire About {product.name}</LinkButton></PageHero>
    <ProductOverview label={product.teaser} title={product.headline} intro={product.intro} features={product.features} image={asset.details[2]} facts={[['Ideas for your space', <Tags key="spaces" items={product.spaces} />], ['Options to discuss', guide.discuss]]}><LinkButton href={`/contact?product=${product.slug}`} variant="light">Enquire About {product.name}</LinkButton></ProductOverview>
    <section className="product-study wrap section-space"><CategoryImages name={product.name} assets={asset.details} /></section>
    <RelatedStyles title="A different perspective." items={products.filter(p => p.slug !== slug).map(p => ({ href: `/blinds/${p.slug}`, name: p.name, meta: `${p.index} · ${p.group}`, image: images.products[p.style].main }))} />
    <SectionCTA href={`/contact?product=${product.slug}`} label={`Enquire About ${product.name}`} />
  </>;
}
