import { PageHeading } from '@/components/sections/Shared';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { ChatIcon, RulerIcon, SparkIcon } from '@/components/ui/Icons';
import { images } from '@/content/images';
import { enquiryOptions } from '@/content/enquiry-options';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Contact Screens N Blinds | Enquire About Blinds', 'Tell Screens N Blinds about your space, explore window-covering ideas or send an enquiry about your preferred style.', '/contact');
const steps = [
  { icon: ChatIcon, title: 'We read your enquiry', copy: 'Every message is read by a person who understands blinds, curtains, screens and shutters.' },
  { icon: SparkIcon, title: 'We talk through options', copy: 'We reply with styles, fabrics and finishes that suit your room, light and budget.' },
  { icon: RulerIcon, title: 'We plan the next step', copy: 'When you’re ready, we arrange measuring and a clear, itemised quote.' },
];
export default async function Contact({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const params = await searchParams; const selected = enquiryOptions.some(p => p.slug === params.product) ? params.product! : '';
  const hasDirect = Boolean(site.business.email || site.business.phone);
  return <>
    <PageHeading label="Get in touch" title="Let’s talk about your windows." description="Have a space in mind? Tell us a little about what you’re looking for and we’ll start the conversation." />
    <section className="contact-layout wrap">
      <aside className="contact-aside">
        <ImagePlaceholder asset={images.intro} className="contact-image" sizes="(max-width: 767px) 100vw, 34vw" />
        <div className="contact-aside-body">
          <span className="eyebrow">What happens next</span>
          <ol className="contact-steps">{steps.map(({ icon: Icon, title, copy }, i) => <li key={title}><span className="contact-step-icon"><Icon /></span><div><strong><span className="contact-step-index">0{i + 1}</span>{title}</strong><p>{copy}</p></div></li>)}</ol>
          {hasDirect && <div className="direct-contact"><h2>Prefer to speak directly?</h2>{site.business.phone && <a href={`tel:${site.business.phone}`}>{site.business.phone}</a>}{site.business.email && <a href={`mailto:${site.business.email}`}>{site.business.email}</a>}</div>}
          <p className="contact-aside-note">No obligation. We only use your details to respond to your enquiry.</p>
        </div>
      </aside>
      <EnquiryForm key={selected} product={selected} />
    </section>
  </>;
}
