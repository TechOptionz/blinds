import Link from 'next/link';
import { notFound } from 'next/navigation';
import { curtainCategories, curtainHeadings, curtainDetails } from '@/content/curtains';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
import { RelatedStyles, SectionCTA, SectionIntro } from '@/components/sections/Shared';
import { PageHero, ProductOverview } from '@/components/sections/Feature';
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
    <PageHero image={category.image} label={`Curtains · ${category.number}`} title={<>{category.name}</>} copy={detail.teaser} breadcrumb={<nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/curtains">Curtains</Link><span aria-hidden="true">/</span><span>{category.name}</span></nav>}><LinkButton href={`/contact?product=${slug}`}>Enquire About {category.name}</LinkButton></PageHero>
    <ProductOverview label={category.mood} title={category.headline} intro={category.description} features={detail.features} image={withCredit({ ...category.image, path: `/images/curtains/${slug}-detail.webp`, position: '85% center', mobilePosition: '85% center' })} facts={[['Spaces to consider', category.spaces], ['Before you choose', category.consideration]]}><LinkButton href={`/contact?product=${slug}`} variant="light">Enquire About {category.name}</LinkButton></ProductOverview>
    <section className="curtain-heading-guide"><div className="wrap section-space">
      <SectionIntro label="The finishing touch" title={<>Consider the fold. <span className="accent">Then the finish.</span></>} copy="Ask about compatible headings, tracks and fabrics for your chosen style." />
      <div className="curtains-directions">{curtainHeadings.map((heading, i) => <article key={heading.name} data-reveal><div className="heading-image" data-mask><ImagePlaceholder asset={heading.image} sizes="(max-width: 767px) 100vw, 30vw" /></div><span className="feature-num">0{i + 1}</span><h3>{heading.name}</h3><p>{heading.description}</p></article>)}</div>
    </div></section>
    <section className="curtain-gallery-section wrap section-space"><CategoryImages name={category.name} assets={curtainGallery[slug]} /></section>
    <RelatedStyles label="Explore another perspective" title="Find your own balance." items={curtainCategories.filter(item => item.slug !== slug).map(item => ({ href: `/curtains/${item.slug}`, name: item.name, meta: `${item.number} · ${item.mood.split(' · ')[0]}`, image: item.image }))} />
    <SectionCTA title={`Let’s talk ${category.name.toLowerCase()}.`} copy="Share your room, approximate window dimensions and what matters most to you. Ask about suitable fabrics, linings and finishing details." href={`/contact?product=${slug}`} label={`Enquire About ${category.name}`} />
  </>;
}
