import Link from 'next/link';
import { notFound } from 'next/navigation';
import { curtainCategories, curtainHeadings, curtainDetails } from '@/content/curtains';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
import { SectionCTA } from '@/components/sections/Shared';
import { pageMetadata } from '@/lib/metadata';
import { CategoryImages } from '@/components/sections/CategoryImages';
import { curtainGallery } from '@/content/curtain-images';

export function generateStaticParams() { return curtainCategories.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = curtainCategories.find(item => item.slug === slug);
  return category ? pageMetadata(category.name, curtainDetails[slug].teaser, `/curtains/${slug}`) : {};
}
export default async function CurtainDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = curtainCategories.find(item => item.slug === slug);
  if (!category) notFound();
  const detail = curtainDetails[slug];
  return <>
    <section className="product-hero wrap"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/curtains">Curtains</Link><span aria-hidden="true">/</span><span>{category.name}</span></nav><div className="product-title"><div><span className="eyebrow">The curtain collection / {category.number}</span><h1>{category.name}</h1></div><p>{category.mood}</p></div><ImagePlaceholder asset={category.image} priority sizes="100vw" className="product-hero-image" /><p className="image-note">Illustrated inspiration / {category.name}</p></section>
    <section className="curtain-detail-intro wrap"><div data-reveal><span className="eyebrow">A closer look</span><h2>{category.headline}</h2><p>{category.description}</p><LinkButton href={`/contact?product=${slug}`}>Enquire About {category.name}</LinkButton></div><div className="curtain-detail-notes" data-reveal><article><h3>Spaces to consider</h3><p>{category.spaces}.</p></article><article><h3>Before you choose</h3><p>{category.consideration}</p></article></div></section>
    <section className="curtain-detail-guide wrap"><span className="eyebrow">Shape the details around your room</span><div className="curtains-directions">{detail.features.map(([title, description]) => <article key={title} data-reveal><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="curtains-details"><div className="wrap curtains-details-grid"><div className="curtains-detail-image" data-mask><ImagePlaceholder asset={{ ...category.image, path: `/images/curtains/${slug}-detail.webp`, position: '85% center', mobilePosition: '85% center' }} sizes="(max-width: 767px) 100vw, 45vw" /></div><div className="curtains-detail-copy"><span className="eyebrow">The finishing touch</span><h2>Consider the fold.<br />Then the finish.</h2>{curtainHeadings.map(heading => <article key={heading.name}><h3>{heading.name}</h3><p>{heading.description}</p></article>)}<p className="curtain-detail-availability">Ask about compatible headings, tracks and fabrics for your chosen style.</p></div></div></section>
    <section className="curtain-gallery-section wrap"><CategoryImages name={category.name} assets={curtainGallery[slug]} /></section>
    <section className="related wrap section-space"><span className="eyebrow">Explore another perspective</span><h2>Find your own balance.</h2>{curtainCategories.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/curtains/${item.slug}`}><span>{item.number}</span><h3>{item.name}</h3><span aria-hidden="true">↗</span></Link>)}</section>
    <SectionCTA title={`Let’s talk ${category.name.toLowerCase()}.`} copy="Share your room, approximate window dimensions and what matters most to you. Ask about suitable fabrics, linings and finishing details." href={`/contact?product=${slug}`} label={`Enquire About ${category.name}`} />
  </>;
}
