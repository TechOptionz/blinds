import Link from 'next/link';
import { notFound } from 'next/navigation';
import { catalogue, catalogueDetails, catalogueImage, type CatalogueCategory } from '@/content/catalogue';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
import { SectionCTA } from '@/components/sections/Shared';
import { CategoryImages } from '@/components/sections/CategoryImages';
import { CheckList, CircleHero, SplitFeature } from '@/components/sections/Feature';
/** Collection page shared by the screens and shutters ranges. */
export function CategoryPage({ category: slug }: { category: CatalogueCategory['slug'] }) {
  const category = catalogue[slug]; if (!category) notFound();
  const hero = catalogueImage(category.slug, category.items[0]);
  return <>
    <CircleHero image={hero} label={category.eyebrow} title={<>{category.titleLead} <span className="accent">{category.titleAccent}</span></>} copy={category.intro}><LinkButton href={`#compare-${category.slug}`} variant="outline">Compare the Styles</LinkButton></CircleHero>
    <section className="collection-index-section wrap"><nav className="collection-index" aria-label={`Explore ${category.name.toLowerCase()} styles`}>{category.items.map(item => <a key={item.slug} href={`#${item.slug}`}><span>{item.index}</span>{item.name}<span aria-hidden="true">↓</span></a>)}</nav></section>
    <div aria-label={`Our ${category.name.toLowerCase()} styles`}>{category.items.map((item, i) => <SplitFeature key={item.slug} id={item.slug} flip={i % 2 === 1} image={catalogueImage(category.slug, item)} label={`${category.name} / ${item.index}`} title={<>Why choose <span className="accent">{item.name}</span></>}>
      <p className="lead">{item.description}</p>
      <CheckList items={[...item.features, ['Ideas for your space', item.spaces.join(', ')], ['Options to discuss', item.discuss]]} />
      <div className="split-actions"><LinkButton href={`/${category.slug}/${item.slug}`}>Explore This Style</LinkButton><Link href={`/contact?product=${item.slug}`} className="text-link">Enquire about {item.name} <span className="arrow" aria-hidden="true">→</span></Link></div>
    </SplitFeature>)}</div>
    <section className="blind-comparison wrap" id={`compare-${category.slug}`}><div className="curtains-section-heading" data-reveal><span className="eyebrow">The range at a glance</span><h2>Different needs.<br />One considered range.</h2><p>Compare each style side by side. Sizes, finishes and fitting details are part of the final conversation.</p></div><div className="blind-comparison-grid">{category.items.map(item => <article key={item.slug} data-reveal><span className="eyebrow">{item.index} / {item.group}</span><h3>{item.name}</h3><dl><div><dt>Best for</dt><dd>{item.spaces.join(' · ')}</dd></div><div><dt>Worth discussing</dt><dd>{item.discuss}</dd></div></dl><LinkButton href={`/${category.slug}/${item.slug}`} variant="text">Explore {item.name}</LinkButton></article>)}</div></section>
    <section className="blind-planning"><div className="wrap blind-planning-inner"><div data-reveal><span className="eyebrow">A considered starting point</span><h2>{category.planning.title}</h2><p>{category.planning.copy}</p><LinkButton href="/contact" variant="text">Tell Us About Your Space</LinkButton></div><ol>{category.planning.steps.map(([title, copy], index) => <li key={title} data-reveal><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div></section>
    <section className="curtain-faq wrap"><div data-reveal><span className="eyebrow">Before you choose</span><h2>A little clarity<br />goes a long way.</h2></div><div>{category.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <SectionCTA title={category.cta.title} copy={category.cta.copy} label={category.cta.label} href={`/contact?product=${category.slug}`} />
  </>;
}
/** Detail page shared by every screen and shutter style. */
export function CategoryItemPage({ category: categorySlug, slug }: { category: CatalogueCategory['slug']; slug: string }) {
  const category = catalogue[categorySlug]; const item = category?.items.find(entry => entry.slug === slug); if (!category || !item) notFound();
  const details = catalogueDetails(category.slug, item);
  return <>
    <CircleHero image={catalogueImage(category.slug, item)} label={`${category.name} / ${item.index}`} title={<>{item.name}</>} copy={item.description} breadcrumb={<nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={`/${category.slug}`}>{category.name}</Link><span aria-hidden="true">/</span><span>{item.name}</span></nav>}><LinkButton href={`/contact?product=${item.slug}`}>Enquire About {item.name}</LinkButton></CircleHero>
    <SplitFeature image={details[0]} label={item.teaser} title={<>Why choose <span className="accent">{item.name}</span></>}><p className="lead">{item.intro}</p><CheckList items={[...item.features, ['Ideas for your space', item.spaces.join(', ')], ['Options to discuss', item.discuss]]} /><LinkButton href={`/contact?product=${item.slug}`}>Enquire About {item.name}</LinkButton></SplitFeature>
    <section className="product-study wrap section-space"><CategoryImages name={item.name} assets={details} /></section>
    <section className="related wrap"><span className="eyebrow">Keep exploring</span><h2>More {category.name.toLowerCase()} to consider.</h2><div className="related-grid">{category.items.filter(entry => entry.slug !== slug).map(entry => <Link href={`/${category.slug}/${entry.slug}`} key={entry.slug} className="related-card" data-reveal><div className="related-thumb"><ImagePlaceholder asset={catalogueImage(category.slug, entry)} sizes="(max-width: 767px) 50vw, 25vw" /></div><div><small>{entry.index} / {entry.group}</small><h3>{entry.name}</h3><span className="text-link">Explore <span className="arrow" aria-hidden="true">→</span></span></div></Link>)}</div></section>
    <SectionCTA href={`/contact?product=${item.slug}`} label={`Enquire About ${item.name}`} />
  </>;
}
