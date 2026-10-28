import type { Metadata } from 'next';
import { Suspense } from 'react';
import { NavigationScroll } from '@/components/layout/NavigationScroll';
import { Manrope, DM_Sans } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Motion } from '@/components/animations/Motion';
import { CursorFeedback } from '@/components/animations/CursorFeedback';
import { site } from '@/content/site';
import './globals.css';
import './readability.css';
import './motion.css';
const manrope = Manrope({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
export const metadata: Metadata = { title: { default: 'Screens N Blinds | Beautiful Blinds for Considered Spaces', template: '%s | Screens N Blinds' }, description: 'Considered window coverings for beautiful spaces.', ...(site.domain ? { metadataBase: new URL(site.domain) } : {}), robots: site.domain ? { index: true, follow: true } : { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${manrope.variable} ${dmSans.variable}`}><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /><Motion /><CursorFeedback /><Suspense fallback={null}><NavigationScroll /></Suspense></body></html>;
}
