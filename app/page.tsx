import Link from 'next/link';
import { about, home } from '@/content/site';
import { images } from '@/content/images';
import { HeroSlideshow } from '@/components/sections/HeroSlideshow';
import { gallery } from '@/content/gallery';
import { products } from '@/content/products';
import { curtainCategories } from '@/content/curtains';
import { catalogue } from '@/content/catalogue';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LinkButton } from '@/components/ui/LinkButton';
import { ProductShowcase, SectionCTA, SectionIntro } from '@/components/sections/Shared';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Beautiful Blinds for Considered Spaces', 'Explore timeless roller, Roman and Venetian blinds, discover interior inspiration and enquire about a look that suits your space.', '/');
const ranges = [
  { href: '/blinds', name: 'Blinds', count: products.length },
  { href: '/curtains', name: 'Curtains', count: curtainCategories.length },
  { href: '/screens', name: 'Screens', count: catalogue.screens.items.length },
  { href: '/shutters', name: 'Shutters', count: catalogue.shutters.items.length },
];
const stepLinks = [['/contact', 'Tell us about your space'], ['/blinds', 'Browse the styles'], ['/contact', 'Send an enquiry']];
const stepImages = [images.products.roller.details[0], images.products.roman.details[0], images.products.venetian.details[0]];
const inspiration = [gallery[0], ...gallery.filter(item => item.group !== gallery[0].group).filter((item, i, list) => list.findIndex(other => other.group === item.group) === i), gallery[1]].slice(0, 5);
export default function Home() {
  return <>
    <section className="hero">
      <HeroSlideshow slides={images.heroSlides} />
      <div className="hero-scrim" />
      <div className="hero-content wrap">
        <span className="eyebrow" data-entrance>Blinds · Curtains · Screens · Shutters</span>
        <h1 data-entrance>Light, shaped <span className="accent">beautifully.</span></h1>
        <p data-entrance>{home.hero}</p>
        <div className="hero-actions" data-entrance><LinkButton href="/contact" variant="light">Request a Free Quote</LinkButton><LinkButton href="#collections" variant="ghost">Explore the Collections</LinkButton></div>
      </div>
      <nav className="hero-ranges" aria-label="Browse by range"><div className="wrap hero-ranges-inner">{ranges.map((range, i) => <Link href={range.href} key={range.href}><span className="hero-range-index">0{i + 1}</span><strong>{range.name}</strong><small>{range.count} styles</small><span className="arrow" aria-hidden="true">→</span></Link>)}</div></nav>
    </section>

    <section className="statement wrap section-space" id="approach">
      <span className="eyebrow" data-reveal>The Screens N Blinds approach</span>
      <p className="statement-text" data-reveal>{home.introduction}</p>
      <div className="statement-foot" data-reveal>
        <dl className="stats">{ranges.map(range => <div key={range.href}><dt>{range.name}</dt><dd>{range.count}</dd></div>)}</dl>
        <Link href="/about" className="text-link">More about us <span className="arrow" aria-hidden="true">→</span></Link>
      </div>
    </section>

    <section className="collections wrap section-space" id="collections"><SectionIntro label="The collections" title={<>Find your kind <span className="accent">of beautiful.</span></>} copy="Blinds, curtains, screens and shutters, each made to fit your windows and doors. Start with a range, then explore the styles inside it." /><ProductShowcase /></section>

    <section className="why-section"><div className="wrap why-grid section-space">
      <div className="why-intro" data-reveal>
        <span className="eyebrow">Why Screens N Blinds</span>
        <h2>Every window, <span className="accent">one conversation.</span></h2>
        <p className="lead">{about.lead}</p>
        <LinkButton href="/contact" variant="light">Request a Quote</LinkButton>
      </div>
      <ol className="why-list">{home.reasons.map(([title], i) => <li key={title} data-reveal><span>0{i + 1}</span><h3>{title}</h3></li>)}</ol>
    </div></section>

    <section className="steps-section wrap section-space"><SectionIntro label="How it works" title={<>From first idea <span className="accent">to final choice.</span></>} copy="A simple, unhurried path from a window you want to change to a finish you love." />
      <ol className="steps-grid">{home.steps.map(([title, text], i) => <li className="step-card" key={title} data-reveal><div className="step-media"><ImagePlaceholder asset={stepImages[i]} sizes="(max-width: 950px) 100vw, 30vw" /></div><span className="step-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p><Link href={stepLinks[i][0]} className="text-link">{stepLinks[i][1]} <span className="arrow" aria-hidden="true">→</span></Link></li>)}</ol>
    </section>

    <section className="banner-quote" data-parallax><ImagePlaceholder asset={images.hero} sizes="100vw" /><div className="banner-quote-inner wrap" data-reveal><span className="eyebrow">Designed around the way you live</span><blockquote>The right window covering does more than cover a window. <span className="accent">It shapes the whole room.</span></blockquote><p>{home.manifesto}</p></div></section>

    <section className="approach wrap section-space" aria-labelledby="approach-title">
      <div className="approach-media"><div className="approach-media-main" data-mask><ImagePlaceholder asset={images.about} sizes="(max-width: 950px) 100vw, 50vw" /></div><div className="approach-media-inset" data-mask><ImagePlaceholder asset={images.intro} sizes="(max-width: 950px) 50vw, 22vw" /></div></div>
      <div className="approach-copy" data-reveal><span className="eyebrow">Our approach</span><h2 id="approach-title">A little detail goes <span className="accent">a long way.</span></h2><p className="lead">{about.detail}</p><ul className="approach-points">{about.values.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ul><LinkButton href="/about" variant="outline">More About Us</LinkButton></div>
    </section>

    <section className="inspo-section wrap section-space" aria-labelledby="inspo-title"><SectionIntro label="Interiors & inspiration" title={<span id="inspo-title">A little <span className="accent">inspiration.</span></span>} copy={home.gallery}><LinkButton href="/gallery" variant="outline">Explore the Gallery</LinkButton></SectionIntro>
      <div className="inspo-grid">{inspiration.map((item, i) => <Link href={item.href} className="inspo-card" key={item.id} data-reveal><ImagePlaceholder asset={item.image} sizes={i === 0 ? '(max-width: 950px) 100vw, 50vw' : '(max-width: 950px) 50vw, 25vw'} /><div className="inspo-card-body"><span>{item.label}</span><h3>{item.caption}</h3></div></Link>)}</div>
      <p className="image-note">Licensed interior photography for inspiration, not completed Screens N Blinds projects.</p>
    </section>
    <SectionCTA />
  </>;
}
