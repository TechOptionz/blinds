import Link from 'next/link';
import { SectionCTA } from '@/components/sections/Shared';
import { CheckList, CircleHero, SplitFeature } from '@/components/sections/Feature';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
import { products } from '@/content/products';
import { images } from '@/content/images';
import { curtains } from '@/content/curtains';
import { blindGuidance, blindPriorities, blindFaqs } from '@/content/blinds-guide';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Our Blinds | Roller, Roman & Venetian', 'Discover the Screens N Blinds collection, with clean-lined roller blinds, soft Roman blinds and refined Venetian blinds.', '/blinds');
export default function Blinds() {
  return <>
    <CircleHero image={images.products.roller.main} label="Our collection" title={<>Blinds with <span className="accent">a point of view.</span></>} copy="Considered forms, practical details and finishes that work with your space. Start with the style that speaks to you, then explore what makes it special."><LinkButton href="#compare-styles" variant="outline">Compare the Styles</LinkButton></CircleHero>
    <section className="collection-index-section wrap"><nav className="collection-index" aria-label="Explore blind styles">{products.map(product => <a key={product.slug} href={`#${product.slug}`}><span>{product.index}</span>{product.name}<span aria-hidden="true">↓</span></a>)}</nav></section>
    <div className="blinds-range" aria-label="Our blind styles">{products.map((product, i) => <SplitFeature key={product.slug} id={product.slug} flip={i % 2 === 1} image={images.products[product.style].main} label={`The collection / ${product.index}`} title={<>Why choose <span className="accent">{product.name}</span></>}>
      <p className="lead">{product.description}</p>
      <CheckList items={[...product.features, ['The character', blindGuidance[product.style].character], ['Ideas for your space', product.spaces.join(', ')], ['Options to discuss', blindGuidance[product.style].discuss]]} />
      <div className="split-actions"><LinkButton href={`/blinds/${product.slug}`}>Explore This Style</LinkButton><Link href={`/contact?product=${product.slug}`} className="text-link">Enquire about {product.name} <span className="arrow" aria-hidden="true">→</span></Link></div>
    </SplitFeature>)}</div>
    <section className="blind-comparison wrap" id="compare-styles"><div className="curtains-section-heading" data-reveal><span className="eyebrow">The collection at a glance</span><h2>Different forms.<br />Your point of view.</h2><p>Compare the shape and feel of each style. Fabric, material and fit are part of the final conversation.</p></div><div className="blind-comparison-grid">{products.map(product => <article key={product.slug} data-reveal><div className="compare-image" data-mask><ImagePlaceholder asset={images.products[product.style].compare} sizes="(max-width: 767px) 100vw, 30vw" /></div><span className="eyebrow">{product.index} / Style notes</span><h3>{product.name}</h3><dl><div><dt>Look & feel</dt><dd>{blindGuidance[product.style].character}</dd></div><div><dt>Working with light</dt><dd>{blindGuidance[product.style].light}</dd></div></dl><LinkButton href={`/blinds/${product.slug}`} variant="text">Explore {product.name}</LinkButton></article>)}</div></section>
    <section className="blind-planning"><div className="wrap blind-planning-inner"><div data-reveal><span className="eyebrow">A considered starting point</span><h2>Choose for the way<br />you live.</h2><p>The best place to start is your own room. A few simple observations can make the next conversation more useful.</p><LinkButton href="/contact" variant="text">Tell Us About Your Space</LinkButton></div><ol>{blindPriorities.map(([title, copy], index) => <li key={title} data-reveal><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div></section>
    <section className="blind-layering wrap"><div className="blind-layering-image" data-mask><ImagePlaceholder asset={curtains.hero} sizes="(max-width: 767px) 100vw, 45vw" /></div><div data-reveal><span className="eyebrow">Complete the picture</span><h2>A softer<br />finishing touch.</h2><p>Pair the structure of a blind with the gentle folds of a curtain. Explore a layered approach that brings texture and a different rhythm to the window.</p><LinkButton href="/curtains" variant="text">Discover Curtains</LinkButton></div></section>
    <section className="curtain-faq wrap"><div data-reveal><span className="eyebrow">Before you choose</span><h2>A little clarity<br />goes a long way.</h2></div><div>{blindFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <SectionCTA title="Let’s find your kind of beautiful." copy="Tell us about your room, your windows and the style you have in mind. Start a conversation about the details that matter to you." label="Ask About Your Space" />
  </>;
}
