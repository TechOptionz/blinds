import { PageHeading } from '@/components/sections/Shared';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { images } from '@/content/images';
import { enquiryOptions } from '@/content/enquiry-options';
import { site } from '@/content/site';
import { deliveryConfigured } from '@/lib/delivery';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Contact Just Blinds | Enquire About Blinds', 'Tell Just Blinds about your space, explore window-covering ideas or send an enquiry about your preferred style.', '/contact');
export default async function Contact({ searchParams }: { searchParams: Promise<{ product?: string }> }) { const params = await searchParams; const selected = enquiryOptions.some(p => p.slug === params.product) ? params.product! : ''; return <><PageHeading label="Get in touch" title="Let’s talk about your windows." description="Have a space in mind? Tell us a little about what you’re looking for and we’ll start the conversation." /><section className="contact-layout wrap"><aside><ImagePlaceholder asset={images.intro} className="contact-image" /><p className="contact-aside-copy">A little light.<br />A fresh perspective.</p>{(site.business.email || site.business.phone) && <div className="direct-contact"><h2>Prefer to speak directly?</h2>{site.business.email && <a href={`mailto:${site.business.email}`}>{site.business.email}</a>}{site.business.phone && <a href={`tel:${site.business.phone}`}>{site.business.phone}</a>}</div>}</aside><EnquiryForm key={selected} product={selected} configured={deliveryConfigured()} /></section></>; }
