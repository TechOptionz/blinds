import type { SVGProps } from 'react';
const base = (props: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> => ({ viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, ...props });
/** Simple line icons used in the top bar, value cards and footer. */
export function BlindIcon(props: SVGProps<SVGSVGElement>) { return <svg {...base(props)}><rect x="5" y="4" width="22" height="24" rx="2" /><path d="M5 10h22M5 15h22M5 20h22" /><path d="M16 20v5" /><circle cx="16" cy="26.5" r="1.3" /></svg>; }
export function CurtainIcon(props: SVGProps<SVGSVGElement>) { return <svg {...base(props)}><path d="M4 5h24" /><path d="M7 5c0 9 2 14 5 22" /><path d="M14 5c-1 8 0 14 2 22" /><path d="M25 5c0 9-2 14-5 22" /><path d="M18 5c1 8 0 14-2 22" /><path d="M6 16c3 1 5 1 8-1" /><path d="M26 16c-3 1-5 1-8-1" /></svg>; }
export function ChatIcon(props: SVGProps<SVGSVGElement>) { return <svg {...base(props)}><path d="M6 7h20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H14l-6 5v-5H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" /><path d="M10 13h12M10 17h7" /></svg>; }
export function RulerIcon(props: SVGProps<SVGSVGElement>) { return <svg {...base(props)}><rect x="3" y="11" width="26" height="10" rx="2" /><path d="M8 11v4M13 11v6M18 11v4M23 11v6" /></svg>; }
export function ShieldIcon(props: SVGProps<SVGSVGElement>) { return <svg {...base(props)}><path d="M16 4l10 4v8c0 6-4 10-10 12C10 26 6 22 6 16V8l10-4Z" /><path d="M11.5 16.5l3 3 6-7" /></svg>; }
export function SparkIcon(props: SVGProps<SVGSVGElement>) { return <svg {...base(props)}><path d="M16 4v6M16 22v6M4 16h6M22 16h6M7.5 7.5l4 4M20.5 20.5l4 4M7.5 24.5l4-4M20.5 11.5l4-4" /></svg>; }
export function EyeIcon(props: SVGProps<SVGSVGElement>) { return <svg {...base(props)}><path d="M3 16s5-8 13-8 13 8 13 8-5 8-13 8S3 16 3 16Z" /><circle cx="16" cy="16" r="4" /></svg>; }
export function PersonIcon(props: SVGProps<SVGSVGElement>) { return <svg {...base(props)}><circle cx="16" cy="11" r="5" /><path d="M6 27c1-6 5-9 10-9s9 3 10 9" /></svg>; }
export function CheckIcon(props: SVGProps<SVGSVGElement>) { return <svg {...base(props)}><circle cx="16" cy="16" r="12" /><path d="M10.5 16.5l3.5 3.5 7.5-8" /></svg>; }
export function TickIcon(props: SVGProps<SVGSVGElement>) { return <svg {...base({ strokeWidth: 2.2, ...props })}><path d="M6 17l6.5 6.5L26 9" /></svg>; }
