import Link from 'next/link';
import { site } from '@/content/site';
import { products } from '@/content/products';
import { curtainCategories } from '@/content/curtains';
import { catalogue } from '@/content/catalogue';
import { Wordmark } from '@/components/layout/Header';
export function Footer() {
  const { business } = site;
  return <footer className="site-footer">
    <nav className="wrap footer-main" aria-label="Footer navigation">
      <div className="footer-brand"><Wordmark /><p>{site.descriptor} Blinds, curtains, screens and shutters chosen for the way light moves through your home.</p></div>
      <div className="footer-col"><h4>Blinds</h4>{products.map(product => <Link key={product.slug} href={`/blinds/${product.slug}`}>{product.name}</Link>)}<Link href="/blinds" className="footer-all">All blinds</Link></div>
      <div className="footer-col"><h4>Curtains</h4>{curtainCategories.map(category => <Link key={category.slug} href={`/curtains/${category.slug}`}>{category.name}</Link>)}<Link href="/curtains" className="footer-all">All curtains</Link></div>
      <div className="footer-col"><h4>Screens</h4>{catalogue.screens.items.map(item => <Link key={item.slug} href={`/screens/${item.slug}`}>{item.name}</Link>)}<Link href="/screens" className="footer-all">All screens</Link></div>
      <div className="footer-col"><h4>Shutters</h4>{catalogue.shutters.items.map(item => <Link key={item.slug} href={`/shutters/${item.slug}`}>{item.name}</Link>)}<Link href="/shutters" className="footer-all">All shutters</Link></div>
      <div className="footer-col"><h4>Company</h4><Link href="/about">About us</Link><Link href="/gallery">Inspiration gallery</Link><Link href="/contact">Contact &amp; quotes</Link>{business.email && <a href={`mailto:${business.email}`}>{business.email}</a>}{business.phone && <a href={`tel:${business.phone}`}>{business.phone}</a>}{business.address && <span>{[business.address, business.city, business.country].filter(Boolean).join(', ')}</span>}{business.instagramUrl && <a href={business.instagramUrl} rel="noopener noreferrer" target="_blank">Instagram</a>}</div>
    </nav>
    <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span><a href="#main">Back to top ↑</a></div>
  </footer>;
}
