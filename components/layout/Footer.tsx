import Link from 'next/link';
import { site } from '@/content/site';
import { products } from '@/content/products';
import { curtainCategories } from '@/content/curtains';
import { catalogue } from '@/content/catalogue';
import { BlindIcon, ChatIcon, CurtainIcon } from '@/components/ui/Icons';
import { Wordmark } from '@/components/layout/Header';
export function Footer() {
  const { business } = site;
  return <footer className="site-footer">
    <div className="footer-usp"><div className="wrap footer-usp-inner">
      <div className="footer-usp-item"><BlindIcon /><div><strong>Blinds &amp; curtains</strong>Twenty styles for every window</div></div>
      <div className="footer-usp-item"><CurtainIcon /><div><strong>Screens &amp; shutters</strong>Fly, security, plantation and more</div></div>
      <div className="footer-usp-item"><ChatIcon /><div><strong>Friendly, no-pressure enquiries</strong>Tell us about your space</div></div>
      <div className="footer-usp-contact"><small>Need help choosing?</small>{business.phone ? <a className="phone" href={`tel:${business.phone}`}>{business.phone}</a> : <Link href="/contact" className="link-button solid">Request a Quote <span className="arrow" aria-hidden="true">→</span></Link>}</div>
    </div></div>
    <nav className="wrap footer-main" aria-label="Footer navigation">
      <div className="footer-brand"><Wordmark /><p>{site.descriptor} Explore blinds and curtains chosen for the way light moves through your home, then send an enquiry about the style you love.</p></div>
      <div className="footer-col"><h4>Blinds</h4>{products.map(product => <Link key={product.slug} href={`/blinds/${product.slug}`}>{product.name}</Link>)}<Link href="/blinds">Our Blinds</Link></div>
      <div className="footer-col"><h4>Curtains</h4>{curtainCategories.map(category => <Link key={category.slug} href={`/curtains/${category.slug}`}>{category.name}</Link>)}<Link href="/curtains">All Curtains</Link></div>
      <div className="footer-col"><h4>Screens</h4>{catalogue.screens.items.map(item => <Link key={item.slug} href={`/screens/${item.slug}`}>{item.name}</Link>)}<Link href="/screens">All Screens</Link></div>
      <div className="footer-col"><h4>Shutters</h4>{catalogue.shutters.items.map(item => <Link key={item.slug} href={`/shutters/${item.slug}`}>{item.name}</Link>)}<Link href="/shutters">All Shutters</Link></div>
      <div className="footer-col"><h4>Company</h4><Link href="/about">About us</Link><Link href="/gallery">Inspiration gallery</Link><Link href="/contact">Contact &amp; quotes</Link>{business.email && <a href={`mailto:${business.email}`}>{business.email}</a>}{business.phone && <a href={`tel:${business.phone}`}>{business.phone}</a>}{business.address && <span>{[business.address, business.city, business.country].filter(Boolean).join(', ')}</span>}{business.instagramUrl && <a href={business.instagramUrl} rel="noopener noreferrer" target="_blank">Instagram</a>}</div>
    </nav>
    <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span><a href="#main">Back to top ↑</a></div>
  </footer>;
}
