import { BlindIcon, ChatIcon } from '@/components/ui/Icons';
/** Thin utility strip above the header with two short service notes. */
export function TopBar() {
  return <div className="topbar"><div className="wrap topbar-inner">
    <div className="topbar-item"><BlindIcon /><span><strong>Blinds, curtains, screens &amp; shutters</strong><span className="topbar-more"> for every window and door</span></span></div>
    <div className="topbar-item"><ChatIcon /><span><strong>Free, no-obligation</strong> quote requests for your space</span></div>
  </div></div>;
}
