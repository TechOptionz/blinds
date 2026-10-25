import Link from 'next/link';
import { navigation, site } from '@/content/site';
export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><p>A better view begins<br />with the details.</p><nav aria-label="Footer navigation">{navigation.slice(1).map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><div><span className="eyebrow">Start a conversation</span><Link className="footer-contact" href="/contact">Let’s talk <span aria-hidden="true">↗</span></Link>{site.business.email && <a href={`mailto:${site.business.email}`}>{site.business.email}</a>}{site.business.phone && <a href={`tel:${site.business.phone}`}>{site.business.phone}</a>}</div></div><div className="footer-wordmark" aria-label={site.name}>JUST BLINDS</div><div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span><span>Considered window coverings.</span><a href="#main">Back to top ↑</a></div></footer>;
}

