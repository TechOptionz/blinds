import Link from 'next/link';
import { curtains, curtainCategories, curtainHeadings, curtainFaqs } from '@/content/curtains';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
import { FaqSection, SectionCTA, SectionIntro } from '@/components/sections/Shared';
import { PageHero } from '@/components/sections/Feature';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Curtains | Soft Texture & Considered Interiors', 'Explore curtain inspiration, soft fabrics and layered window treatments. Enquire about curtains for your space with Screens N Blinds.', '/curtains');

export default function CurtainsPage() {
  return <>
    <PageHero image={curtains.hero} label="Curtains" title={<>Softness, from ceiling <span className="accent">to floor.</span></>} copy={curtains.intro}><LinkButton href="/contact?product=curtains">Enquire About Curtains</LinkButton><LinkButton href="#curtain-styles" variant="outline">Browse the Styles</LinkButton></PageHero>
    <section className="curtains-edit wrap section-space" id="curtain-styles" aria-labelledby="curtains-edit-title">
      <SectionIntro label="Find your feeling" title={<span id="curtains-edit-title">One window. <span className="accent">So many possibilities.</span></span>} copy="Start with the atmosphere you want to create, then ask about fabrics, linings and finishes for your space." />
      <div className="curtain-category-list">{curtainCategories.map(category => <article className="curtain-category" id={category.slug} key={category.slug} data-reveal>
        <Link href={`/curtains/${category.slug}`} className="curtain-category-image" tabIndex={-1} aria-hidden="true"><ImagePlaceholder asset={category.image} sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw" /><span className="style-card-index">{category.number}</span></Link>
        <div className="curtain-category-copy"><span className="style-card-headline">{category.headline}</span><h2>{category.name}</h2><LinkButton href={`/curtains/${category.slug}`} variant="text">Explore {category.name}</LinkButton></div>
      </article>)}</div>
    </section>
    <section className="curtain-heading-guide"><div className="wrap section-space">
      <SectionIntro label="Choose the finishing detail" title={<>The shape <span className="accent">of the fold.</span></>} copy="A heading changes how fabric falls and how the curtain feels. Explore these styles as options to discuss for your space." />
      <div className="curtains-directions">{curtainHeadings.map((heading, i) => <article key={heading.name} data-reveal><div className="heading-image" data-mask><ImagePlaceholder asset={heading.image} sizes="(max-width: 767px) 100vw, 30vw" /></div><span className="feature-num">0{i + 1}</span><h3>{heading.name}</h3><p>{heading.description}</p></article>)}</div>
    </div></section>
    <section className="curtains-details"><div className="wrap curtains-details-grid"><div className="curtains-detail-image" data-mask><ImagePlaceholder asset={curtains.detail} sizes="(max-width: 767px) 100vw, 45vw" /></div><div className="curtains-detail-copy"><span className="eyebrow" data-reveal>It’s all in the details</span><h2 data-reveal>A beautiful finish <span className="accent">starts here.</span></h2><div>{curtains.details.map(([title, text], i) => <article key={title} data-reveal><span className="feature-num">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><LinkButton href="/contact?product=curtains" variant="light">Tell Us About Your Space</LinkButton></div></div></section>
    <section className="curtains-pairing wrap section-space" data-reveal><div><span className="eyebrow">A considered combination</span><h2>Soft folds. <span className="accent">Clean lines.</span></h2></div><div><p className="lead">The structure of a blind sits beautifully alongside the softer presence of curtains. Explore the collection to find your starting point.</p><LinkButton href="/blinds" variant="outline">Explore Our Blinds</LinkButton></div></section>
    <FaqSection label="A little guidance" title={<>Before you <span className="accent">choose.</span></>} faqs={curtainFaqs} />
    <SectionCTA title="Make room for a softer view." copy="Tell us about your windows, the light and the look you have in mind. Ask about fabrics, finishes and options for your space." label="Enquire About Curtains" href="/contact?product=curtains" />
  </>;
}
