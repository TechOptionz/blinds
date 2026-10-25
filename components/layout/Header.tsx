'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/content/site';
import { trapDialogFocus } from '@/lib/focus-trap';
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closing = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 50);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => { window.removeEventListener('scroll', update); document.body.style.overflow = ''; if (closing.current) clearTimeout(closing.current); };
  }, []);
  function open() { dialog.current?.showModal(); document.body.style.overflow = 'hidden'; trigger.current?.setAttribute('aria-expanded', 'true'); }
  function close() {
    if (!dialog.current?.open) return;
    dialog.current.classList.add('closing');
    closing.current = setTimeout(() => { dialog.current?.close(); dialog.current?.classList.remove('closing'); document.body.style.overflow = ''; trigger.current?.setAttribute('aria-expanded', 'false'); trigger.current?.focus({ preventScroll: true }); }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 250);
  }
  return <>
    <header className={`site-header ${pathname === '/' && !scrolled ? 'over-hero' : 'solid-header'}`}>
      <Link href="/" className="wordmark" aria-label="Just Blinds home">JUST<span>BLINDS</span><i aria-hidden="true" /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`)) ? 'page' : undefined}>{item.label}</Link>)}</nav>
      <Link href="/contact" className="header-quote">Request a Quote <span aria-hidden="true">↗</span></Link>
      <button className="menu-trigger" ref={trigger} onClick={open} aria-expanded="false" aria-controls="site-menu">Menu<span aria-hidden="true"><i /><i /></span></button>
    </header>
    <dialog ref={dialog} id="site-menu" className="menu-dialog" aria-label="Main menu" onKeyDown={trapDialogFocus} onCancel={e => { e.preventDefault(); close(); }}>
      <div className="menu-top"><Link href="/" onClick={close} className="wordmark">JUST<span>BLINDS</span></Link><button onClick={close} autoFocus>Close menu <span aria-hidden="true">×</span></button></div>
      <nav aria-label="Mobile navigation">{navigation.map((item, i) => <Link key={item.href} href={item.href} onClick={close} style={{ animationDelay: `${i * 55}ms` }}><span className="menu-index">0{i + 1}</span>{item.label}<span className="menu-arrow" aria-hidden="true">↗</span></Link>)}</nav>
      <p>Thoughtful choices for the spaces you love.</p>
    </dialog>
  </>;
}
