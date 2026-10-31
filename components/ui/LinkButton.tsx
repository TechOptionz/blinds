import Link from 'next/link';
export function Arrow({ down = false }: { down?: boolean }) { return <span aria-hidden="true" className="arrow">{down ? '↓' : '→'}</span>; }
/** solid: copper · dark: ink · outline: ink border · light/ghost: for dark or photographic backgrounds · text: underlined link */
export function LinkButton({ href, children, variant = 'solid' }: { href: string; children: React.ReactNode; variant?: 'solid' | 'dark' | 'outline' | 'light' | 'ghost' | 'text' }) {
  return <Link href={href} className={`link-button ${variant}`}>{children}<Arrow /></Link>;
}
