import { about } from '@/content/site';
import { images } from '@/content/images';
import { SectionCTA } from '@/components/sections/Shared';
import { CheckList, CircleHero, SplitFeature } from '@/components/sections/Feature';
import { LinkButton } from '@/components/ui/LinkButton';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('About Screens N Blinds | Thoughtful Window Coverings', 'Discover the design-led thinking behind Screens N Blinds and our approach to simple, considered interiors.', '/about');
export default function About() {
  return <>
    <CircleHero image={images.about} label="About Screens N Blinds" title={<>Simple choices. <span className="accent">Beautiful spaces.</span></>} copy={about.lead}><LinkButton href="/blinds">Explore Our Blinds</LinkButton></CircleHero>
    <SplitFeature image={images.intro} label="Our story" title={<><span className="accent">We love</span> what we do.</>}><p className="lead">{about.detail}</p><h3>Our goal</h3><p>{about.goal}</p><h3>Our purpose</h3><p>{about.purpose}</p><LinkButton href="/blinds">See Our Blinds</LinkButton></SplitFeature>
    <SplitFeature flip image={images.products.roman.main} label="A personal perspective" title={<>Style that <span className="accent">feels like you.</span></>}><p className="lead">{about.style}</p><CheckList items={about.values} /><LinkButton href="/contact" variant="outline">Tell Us About Your Space</LinkButton></SplitFeature>
    <SectionCTA title="Let’s find your starting point." label="Contact Screens N Blinds" />
  </>;
}
