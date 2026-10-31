import Link from 'next/link';
/** Thin utility strip above the header with short service notes. */
export function TopBar() {
  return <div className="topbar"><div className="wrap topbar-inner">
    <span>Blinds, curtains, screens &amp; shutters<span className="topbar-more"> for every window and door</span></span>
    <Link href="/contact">Free, no-obligation quotes <span aria-hidden="true">→</span></Link>
  </div></div>;
}
