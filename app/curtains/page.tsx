import Link from 'next/link';
import { curtainDetails, curtains, curtainCategories, curtainHeadings, curtainFaqs } from '@/content/curtains';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
import { SectionCTA } from '@/components/sections/Shared';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Curtains | Soft Texture & Considered Interiors', 'Explore curtain inspiration, soft fabrics and layered window treatments. Enquire about curtains for your space with Just Blinds.', '/curtains');

export default function CurtainsPage() {
  return <>
    <section className="curtains-hero wrap">
      <div className="curtains-hero-copy" data-reveal>
        <span className="eyebrow">Curtains / A softer perspective</span>
        <h1>Softness.<br />From ceiling<br /><span className="soft-text">to floor.</span></h1>
        <p>{curtains.intro}</p>
        <LinkButton href="/contact?product=curtains">Enquire About Curtains</LinkButton>
      </div>
      <div className="curtains-hero-visual" data-mask><ImagePlaceholder asset={curtains.hero} priority sizes="(max-width: 767px) 100vw, 55vw" /><span className="curtains-image-caption">Light, framed beautifully.</span></div>
    </section>
    <section className="curtains-edit wrap" aria-labelledby="curtains-edit-title">
      <div className="curtains-section-heading" data-reveal><span className="eyebrow">Find your feeling</span><h2 id="curtains-edit-title">One window.<br />So many possibilities.</h2><p>Start with the atmosphere you want to create. These design directions are a starting point for your enquiry.</p></div>
      <nav className="collection-index" aria-label="Curtain categories">{curtainCategories.map(category => <a href={`#${category.slug}`} key={category.slug}><span>{category.number}</span>{category.name}<span aria-hidden="true">↓</span></a>)}</nav>
      <p className="image-note">Explore the styles below, then ask about available fabrics, linings and finishes.</p>
    </section>
    <section className="curtain-category-list wrap" aria-label="Explore curtain types">{curtainCategories.map(category => <article className="curtain-category" id={category.slug} key={category.slug}><Link href={`/curtains/${category.slug}`} className="curtain-category-image" aria-label={`Explore ${category.name}`} data-mask><ImagePlaceholder asset={category.image} sizes="(max-width: 767px) 100vw, 50vw" /><span className="curtain-study-label">{category.name} / Illustrated inspiration</span></Link><div className="curtain-category-copy" data-reveal><span className="eyebrow">{category.number} / {category.mood}</span><h2>{category.name}</h2><h3>{category.headline}</h3><p>{curtainDetails[category.slug].teaser}</p><LinkButton href={`/curtains/${category.slug}`} variant="text">Explore {category.name}</LinkButton></div></article>)}</section>
    <section className="curtain-heading-guide wrap"><div className="curtains-section-heading" data-reveal><span className="eyebrow">Choose the finishing detail</span><h2>The shape<br />of the fold.</h2><p>A heading changes how fabric falls and how the curtain feels. Explore these styles as options to discuss for your space.</p></div><div className="curtains-directions">{curtainHeadings.map(heading => <article key={heading.name} data-reveal><div className={`fabric-motif ${heading.motif}`} aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <span key={i} />)}</div><h3>{heading.name}</h3><p>{heading.description}</p></article>)}</div></section>
    <section className="curtains-details"><div className="wrap curtains-details-grid"><div className="curtains-detail-image" data-mask><ImagePlaceholder asset={curtains.detail} sizes="(max-width: 767px) 100vw, 45vw" /></div><div className="curtains-detail-copy"><span className="eyebrow" data-reveal>It’s all in the details</span><h2 data-reveal>A beautiful finish<br />starts here.</h2><div>{curtains.details.map(([title, text]) => <article key={title} data-reveal><h3>{title}</h3><p>{text}</p></article>)}</div><LinkButton href="/contact?product=curtains" variant="text">Tell Us About Your Space</LinkButton></div></div></section>
    <section className="curtains-pairing wrap" data-reveal><div><span className="eyebrow">A considered combination</span><h2>Soft folds.<br />Clean lines.</h2></div><div><p>Discover how the structure of a blind can sit alongside the softer presence of curtains. Explore the collection to find your starting point.</p><LinkButton href="/blinds" variant="text">Explore Our Blinds</LinkButton></div></section>
    <section className="curtain-faq wrap"><div data-reveal><span className="eyebrow">A little guidance</span><h2>Before you<br />choose.</h2></div><div>{curtainFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <SectionCTA title="Make room for a softer view." copy="Tell us about your windows, the light and the look you have in mind. Ask about fabrics, finishes and options for your space." label="Enquire About Curtains" href="/contact?product=curtains" />
  </>;
}
