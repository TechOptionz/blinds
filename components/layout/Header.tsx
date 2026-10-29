'use client';
import Link from 'next/link';
import Image from 'next/image';
import { logoSize } from '@/content/site';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation, site } from '@/content/site';
import { megaMenus, type MenuColumn } from '@/content/menu';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { trapDialogFocus } from '@/lib/focus-trap';
export function Wordmark({ onClick, priority = false }: { onClick?: () => void; priority?: boolean }) {
  return <Link href="/" onClick={onClick} className="wordmark" aria-label={`${site.name} home`}><Image src="/images/brand/screens-n-blinds-logo.png" alt={site.name} width={logoSize.width} height={logoSize.height} priority={priority} sizes="(max-width: 767px) 132px, 170px" /></Link>;
}
/** One mega-menu column: hovering or focusing a link swaps the preview image to that product. Only the text links navigate.
 *  At rest the preview cycles through the column's products, skipping the page being viewed. */
function MegaColumn({ column, pathname }: { column: MenuColumn; pathname: string }) {
  const choices = column.links.map((_, i) => i).filter(i => column.links[i].href !== pathname);
  const [tick, setTick] = useState(1);
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active !== null || choices.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setTick(t => t + 1), 2600);
    return () => clearInterval(timer);
  }, [active, choices.length]);
  const shown = active ?? (choices.length ? choices[tick % choices.length] : 0);
  return <div className="mega-col" onMouseLeave={() => setActive(null)}>
    <div className="mega-thumb" aria-hidden="true">{column.links.map((link, i) => <div key={link.href} className={`mega-thumb-layer${i === shown ? ' active' : ''}`}><ImagePlaceholder asset={link.image} sizes="240px" /></div>)}</div>
    <h4>{column.heading}</h4>
    {column.links.map((link, i) => <Link key={link.href} href={link.href} aria-current={link.href === pathname ? 'page' : undefined} className={i === active ? 'active' : undefined} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>{link.label}</Link>)}
  </div>;
}
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [closedMenu, setClosedMenu] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closing = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => { window.removeEventListener('scroll', update); document.body.style.overflow = ''; if (closing.current) clearTimeout(closing.current); };
  }, []);
  function open() { dialog.current?.showModal(); document.body.style.overflow = 'hidden'; trigger.current?.setAttribute('aria-expanded', 'true'); }
  function close() {
    if (!dialog.current?.open) return;
    dialog.current.classList.add('closing');
    closing.current = setTimeout(() => { dialog.current?.close(); dialog.current?.classList.remove('closing'); document.body.style.overflow = ''; trigger.current?.setAttribute('aria-expanded', 'false'); trigger.current?.focus({ preventScroll: true }); }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 250);
  }
  const current = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)) ? 'page' : undefined;
  const items = navigation.filter(item => item.href !== '/');
  const left = items.slice(0, 4); const right = items.slice(4);
  const blur = (event: React.KeyboardEvent<HTMLDivElement>) => { if (event.key === 'Escape') (event.currentTarget.querySelector('a') as HTMLElement | null)?.focus(); };
  // Hide the mega menu once a link inside it (or its top-level trigger) is clicked; it can reopen after the pointer leaves.
  const dismiss = (href: string) => (event: React.MouseEvent<HTMLDivElement>) => {
    if (!(event.target as HTMLElement).closest('a')) return;
    setClosedMenu(href);
    (document.activeElement as HTMLElement | null)?.blur();
  };
  return <>
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="header-nav left" aria-label="Main navigation">{left.map(item => {
        const mega = megaMenus[item.href];
        if (!mega) return <Link key={item.href} href={item.href} aria-current={current(item.href)}>{item.label}</Link>;
        return <div className={`nav-item${closedMenu === item.href ? ' closed' : ''}`} key={item.href} onKeyDown={blur} onClick={dismiss(item.href)} onMouseLeave={() => setClosedMenu(open => open === item.href ? null : open)}>
          <Link href={item.href} aria-current={current(item.href)} aria-haspopup="true">{item.label}<span className="caret" aria-hidden="true" /></Link>
          <div className="mega" style={{ '--cols': mega.columns.length } as React.CSSProperties}><div className="mega-inner">
            <div className="mega-head"><span className="mega-title">{item.label.replace(/^our /i, '')}</span><Link href={item.href} className="text-link">Explore the range <span className="arrow" aria-hidden="true">→</span></Link></div>
            {mega.columns.map(column => <MegaColumn key={column.heading} column={column} pathname={pathname} />)}
            <div className="mega-feature"><span className="eyebrow">{mega.feature.eyebrow}</span><h4>{mega.feature.title}</h4><p>{mega.feature.copy}</p><Link href={mega.feature.href} className="link-button solid">{mega.feature.label} <span className="arrow" aria-hidden="true">→</span></Link><Link href={item.href} className="text-link">View all {item.label.toLowerCase().replace('our ', '')} <span className="arrow" aria-hidden="true">→</span></Link></div>
          </div></div>
        </div>;
      })}</nav>
      <button className="menu-trigger" ref={trigger} onClick={open} aria-expanded="false" aria-controls="site-menu"><span aria-hidden="true"><i /><i /></span>Menu</button>
      <Wordmark priority />
      <nav className="header-nav right" aria-label="Secondary navigation">{right.map(item => <Link key={item.href} href={item.href} aria-current={current(item.href)}>{item.label}</Link>)}<Link href="/contact" className="header-quote">Request a Quote <span aria-hidden="true">→</span></Link></nav>
    </header>
    <dialog ref={dialog} id="site-menu" className="menu-dialog" aria-label="Main menu" onKeyDown={trapDialogFocus} onCancel={e => { e.preventDefault(); close(); }}>
      <div className="menu-top"><Wordmark onClick={close} /><button onClick={close} autoFocus>Close menu <span aria-hidden="true">×</span></button></div>
      <nav aria-label="Mobile navigation">{navigation.map((item, i) => <Link key={item.href} href={item.href} onClick={close} style={{ animationDelay: `${i * 55}ms` }}><span className="menu-index">0{i + 1}</span>{item.label}<span className="menu-arrow" aria-hidden="true">→</span></Link>)}</nav>
      <div className="menu-sub">{Object.entries(megaMenus).map(([href, mega]) => <div key={href}><h4>{navigation.find(item => item.href === href)?.label}</h4>{mega.columns.flatMap(column => column.links).map(link => <Link key={link.href} href={link.href} onClick={close}>{link.label}</Link>)}</div>)}</div>
      <Link href="/contact" onClick={close} className="link-button solid">Request a Quote <span className="arrow" aria-hidden="true">→</span></Link>
      <p>Thoughtful choices for the spaces you love.</p>
    </dialog>
  </>;
}
