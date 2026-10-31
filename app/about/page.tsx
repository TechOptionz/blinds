import { about, home } from '@/content/site';
import { images } from '@/content/images';
import { SectionCTA, SectionIntro } from '@/components/sections/Shared';
import { PageHero, SplitFeature } from '@/components/sections/Feature';
import { LinkButton } from '@/components/ui/LinkButton';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('About Screens N Blinds | Thoughtful Window Coverings', 'Discover the design-led thinking behind Screens N Blinds and our approach to simple, considered interiors.', '/about');
export default function About() {
  return <>
    <PageHero image={images.about} label="About Screens N Blinds" title={<>Simple choices. <span className="accent">Beautiful spaces.</span></>} copy={about.lead}><LinkButton href="/blinds">Explore Our Blinds</LinkButton><LinkButton href="/contact" variant="outline">Get in Touch</LinkButton></PageHero>
    <section className="statement wrap section-space"><span className="eyebrow" data-reveal>Our story</span><p className="statement-text" data-reveal>{about.detail}</p></section>
    <section className="about-pillars"><div className="wrap section-space"><SectionIntro label="What guides us" title={<>Three ideas behind <span className="accent">every window.</span></>} />
      <ol className="feature-cards">{about.values.map(([title, text], i) => <li key={title} data-reveal><span className="feature-num">0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </div></section>
    <SplitFeature image={images.intro} label="Goal & purpose" title={<><span className="accent">We love</span> what we do.</>}><div className="about-goals"><div><h3>Our goal</h3><p>{about.goal}</p></div><div><h3>Our purpose</h3><p>{about.purpose}</p></div></div><LinkButton href="/blinds" variant="outline">See Our Blinds</LinkButton></SplitFeature>
    <section className="banner-quote" data-parallax><ImagePlaceholder asset={images.cta} sizes="100vw" /><div className="banner-quote-inner wrap" data-reveal><span className="eyebrow">What we believe</span><blockquote>There isn’t one perfect look for every window. <span className="accent">There’s the one that fits yours.</span></blockquote></div></section>
    <SplitFeature flip image={images.products.roman.main} label="A personal perspective" title={<>Style that <span className="accent">feels like you.</span></>}><p className="lead">{about.style}</p><ul className="about-reasons">{home.reasons.slice(0, 3).map(([title, text]) => <li key={title}><strong>{title}</strong><span>{text}</span></li>)}</ul><LinkButton href="/contact">Tell Us About Your Space</LinkButton></SplitFeature>
    <SectionCTA title="Let’s find your starting point." label="Contact Screens N Blinds" />
  </>;
}
