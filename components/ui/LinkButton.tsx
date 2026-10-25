import Link from 'next/link';
export function Arrow({ down = false }: { down?: boolean }) { return <span aria-hidden="true" className="arrow">{down ? '↓' : '↗'}</span>; }
export function LinkButton({ href, children, variant = 'solid' }: { href: string; children: React.ReactNode; variant?: 'solid' | 'outline' | 'text' }) {
  return <Link href={href} className={`link-button ${variant}`}>{children}<Arrow /></Link>;
}
