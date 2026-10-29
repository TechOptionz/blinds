import Link from 'next/link';
import { notFound } from 'next/navigation';
import { curtainCategories, curtainHeadings, curtainDetails } from '@/content/curtains';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
import { SectionCTA } from '@/components/sections/Shared';
import { CheckList, CircleHero, SplitFeature } from '@/components/sections/Feature';
import { pageMetadata } from '@/lib/metadata';
import { CategoryImages } from '@/components/sections/CategoryImages';
import { curtainGallery } from '@/content/curtain-images';
import { withCredit } from '@/content/image-credits';

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
    <CircleHero image={category.image} label={`The curtain collection / ${category.number}`} title={<>{category.name}</>} copy={detail.teaser} breadcrumb={<nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/curtains">Curtains</Link><span aria-hidden="true">/</span><span>{category.name}</span></nav>}><LinkButton href={`/contact?product=${slug}`}>Enquire About {category.name}</LinkButton></CircleHero>
    <SplitFeature image={curtainGallery[slug][0]} label={category.mood} title={<>Why choose <span className="accent">{category.name}</span></>}><p className="lead">{category.description}</p><CheckList items={[...detail.features, ['Spaces to consider', category.spaces], ['Before you choose', category.consideration]]} /><LinkButton href={`/contact?product=${slug}`}>Enquire About {category.name}</LinkButton></SplitFeature>
    <section className="curtains-details"><div className="wrap curtains-details-grid"><div className="curtains-detail-image" data-mask><ImagePlaceholder asset={withCredit({ ...category.image, path: `/images/curtains/${slug}-detail.webp`, position: '85% center', mobilePosition: '85% center' })} sizes="(max-width: 767px) 100vw, 45vw" /></div><div className="curtains-detail-copy"><span className="eyebrow">The finishing touch</span><h2>Consider the fold.<br />Then the finish.</h2>{curtainHeadings.map(heading => <article key={heading.name} className="heading-row"><div className="heading-thumb" data-mask><ImagePlaceholder asset={heading.image} sizes="120px" /></div><div><h3>{heading.name}</h3><p>{heading.description}</p></div></article>)}<p className="curtain-detail-availability">Ask about compatible headings, tracks and fabrics for your chosen style.</p></div></div></section>
    <section className="curtain-gallery-section wrap"><CategoryImages name={category.name} assets={curtainGallery[slug]} /></section>
    <section className="related wrap"><span className="eyebrow">Explore another perspective</span><h2>Find your own balance.</h2><div className="related-grid">{curtainCategories.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/curtains/${item.slug}`} className="related-card" data-reveal><div className="related-thumb"><ImagePlaceholder asset={item.image} sizes="(max-width: 767px) 50vw, 25vw" /></div><div><small>{item.number} / {item.mood.split(' · ')[0]}</small><h3>{item.name}</h3><span className="text-link">Explore <span className="arrow" aria-hidden="true">→</span></span></div></Link>)}</div></section>
    <SectionCTA title={`Let’s talk ${category.name.toLowerCase()}.`} copy="Share your room, approximate window dimensions and what matters most to you. Ask about suitable fabrics, linings and finishing details." href={`/contact?product=${slug}`} label={`Enquire About ${category.name}`} />
  </>;
}
