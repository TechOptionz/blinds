import { CompareRows, FaqSection, PlanningSteps, SectionCTA } from '@/components/sections/Shared';
import { PageHero, SplitFeature } from '@/components/sections/Feature';
import { StyleGrid } from '@/components/sections/Collection';
import { LinkButton } from '@/components/ui/LinkButton';
import { blindGroups, products } from '@/content/products';
import { images } from '@/content/images';
import { curtains } from '@/content/curtains';
import { blindGuidance, blindPriorities, blindFaqs } from '@/content/blinds-guide';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Our Blinds | Roller, Roman & Venetian', 'Discover the Screens N Blinds collection, with clean-lined roller blinds, soft Roman blinds and refined Venetian blinds.', '/blinds');
export default function Blinds() {
  return <>
    <PageHero image={images.products.roller.main} label="Our blinds" title={<>Blinds with <span className="accent">a point of view.</span></>} copy="Considered forms, practical details and finishes that work with your space. Start with the style that speaks to you, then explore what makes it special."><LinkButton href="/contact">Request a Quote</LinkButton><LinkButton href="#compare-styles" variant="outline">Compare the Styles</LinkButton></PageHero>
    <StyleGrid label="Our blind styles" groups={blindGroups} items={products.map(product => ({ ...product, image: images.products[product.style].main, href: `/blinds/${product.slug}`, enquire: `/contact?product=${product.slug}` }))} />
    <CompareRows id="compare-styles" label="The collection at a glance" title={<>Different forms. <span className="accent">Your point of view.</span></>} copy="Compare the shape and feel of each style. Fabric, material and fit are part of the final conversation." rows={products.map(product => ({ href: `/blinds/${product.slug}`, name: product.name, meta: `${product.index} · ${product.group}`, image: images.products[product.style].compare, cells: [['Look & feel', blindGuidance[product.style].character]] }))} />
    <PlanningSteps title={<>Choose for the way <span className="accent">you live.</span></>} copy="The best place to start is your own room. A few simple observations make the first conversation far more useful." steps={blindPriorities} />
    <SplitFeature image={curtains.hero} label="Complete the picture" title={<>A softer <span className="accent">finishing touch.</span></>}><p className="lead">Pair the structure of a blind with the gentle folds of a curtain. A layered window brings texture, warmth and a different rhythm to the room.</p><LinkButton href="/curtains" variant="text">Discover Curtains</LinkButton></SplitFeature>
    <FaqSection title={<>A little clarity <span className="accent">goes a long way.</span></>} faqs={blindFaqs} />
    <SectionCTA title="Let’s find your kind of beautiful." copy="Tell us about your room, your windows and the style you have in mind. Start a conversation about the details that matter to you." label="Ask About Your Space" />
  </>;
}
