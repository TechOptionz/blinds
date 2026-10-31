import Link from 'next/link';
import { notFound } from 'next/navigation';
import { catalogue, catalogueDetails, catalogueImage, type CatalogueCategory } from '@/content/catalogue';
import { LinkButton } from '@/components/ui/LinkButton';
import { CompareRows, FaqSection, PlanningSteps, RelatedStyles, SectionCTA } from '@/components/sections/Shared';
import { CategoryImages } from '@/components/sections/CategoryImages';
import { StyleGrid } from '@/components/sections/Collection';
import { PageHero, ProductOverview, Tags } from '@/components/sections/Feature';
/** Collection page shared by the screens and shutters ranges. */
export function CategoryPage({ category: slug }: { category: CatalogueCategory['slug'] }) {
  const category = catalogue[slug]; if (!category) notFound();
  const hero = catalogueImage(category.slug, category.items[0]);
  return <>
    <PageHero image={hero} label={category.eyebrow} title={<>{category.titleLead} <span className="accent">{category.titleAccent}</span></>} copy={category.intro}><LinkButton href={`/contact?product=${category.slug}`}>Request a Quote</LinkButton><LinkButton href={`#compare-${category.slug}`} variant="outline">Compare the Styles</LinkButton></PageHero>
    <StyleGrid label={`Our ${category.name.toLowerCase()} styles`} groups={category.groups} items={category.items.map(item => ({ ...item, image: catalogueImage(category.slug, item), href: `/${category.slug}/${item.slug}`, enquire: `/contact?product=${item.slug}` }))} />
    <CompareRows id={`compare-${category.slug}`} label="The range at a glance" title={<>Different needs. <span className="accent">One range.</span></>} copy="Compare each style side by side. Sizes, finishes and fitting details are part of the final conversation." rows={category.items.map(item => ({ href: `/${category.slug}/${item.slug}`, name: item.name, meta: `${item.index} · ${item.group}`, image: catalogueImage(category.slug, item), cells: [['Best for', item.spaces.join(', ')]] }))} />
    <PlanningSteps title={category.planning.title} copy={category.planning.copy} steps={category.planning.steps} />
    <FaqSection title={<>Questions, <span className="accent">answered.</span></>} faqs={category.faqs} />
    <SectionCTA title={category.cta.title} copy={category.cta.copy} label={category.cta.label} href={`/contact?product=${category.slug}`} />
  </>;
}
/** Detail page shared by every screen and shutter style. */
export function CategoryItemPage({ category: categorySlug, slug }: { category: CatalogueCategory['slug']; slug: string }) {
  const category = catalogue[categorySlug]; const item = category?.items.find(entry => entry.slug === slug); if (!category || !item) notFound();
  const details = catalogueDetails(category.slug, item);
  return <>
    <PageHero image={catalogueImage(category.slug, item)} label={`${category.name} · ${item.index}`} title={<>{item.name}</>} copy={item.description} breadcrumb={<nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={`/${category.slug}`}>{category.name}</Link><span aria-hidden="true">/</span><span>{item.name}</span></nav>}><LinkButton href={`/contact?product=${item.slug}`}>Enquire About {item.name}</LinkButton></PageHero>
    <ProductOverview label={item.teaser} title={item.headline} intro={item.intro} features={item.features} image={details[2]} facts={[['Ideas for your space', <Tags key="spaces" items={item.spaces} />], ['Options to discuss', item.discuss]]}><LinkButton href={`/contact?product=${item.slug}`} variant="light">Enquire About {item.name}</LinkButton></ProductOverview>
    <section className="product-study wrap section-space"><CategoryImages name={item.name} assets={details} /></section>
    <RelatedStyles title={`More ${category.name.toLowerCase()} to consider.`} items={category.items.filter(entry => entry.slug !== slug).map(entry => ({ href: `/${category.slug}/${entry.slug}`, name: entry.name, meta: `${entry.index} · ${entry.group}`, image: catalogueImage(category.slug, entry) }))} />
    <SectionCTA href={`/contact?product=${item.slug}`} label={`Enquire About ${item.name}`} />
  </>;
}
