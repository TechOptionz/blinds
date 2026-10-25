import manifest from './image-manifest.json';
import type { BlindStyle } from './products';
export type ImageAsset = { path: string; alt: string; style: BlindStyle | 'curtains'; placeholderSrc?: string; position?: string; mobilePosition?: string; source: string; licence: string; actualProject: boolean };
const asset = (path: string, alt: string, style: BlindStyle = 'roller'): ImageAsset => ({ path: `/images/${path}.webp`, alt, style, position: 'center', mobilePosition: '60% center', source: 'Original architectural placeholder illustration', licence: 'Created for this project; replace with approved imagery', actualProject: false });
export const images = {
  hero: asset('hero/hero-living-room', 'Architectural study of a warm living space with roller blinds'),
  intro: asset('sections/intro-detail', 'A quiet window corner in warm neutral tones'),
  about: asset('about/about-interior', 'Illustrated interior with a tailored Roman blind', 'roman'),
  cta: asset('sections/cta-interior', 'Soft daylight through horizontal Venetian slats', 'venetian'),
  products: Object.fromEntries((['roller', 'roman', 'venetian'] as BlindStyle[]).map(style => [style, {
    main: asset(`products/${style}-main`, `Illustrated ${style} blinds in a considered interior`, style),
    details: [1, 2, 3].map(n => ({ ...asset(`products/${style}-detail-0${n}`, `${style} blind design study, composition ${n}`, style), placeholderSrc: `/images/placeholders/${style}-detail-0${n}.svg` })),
  }])) as Record<BlindStyle, { main: ImageAsset; details: ImageAsset[] }>,
};
export function imageSource(asset: ImageAsset) { return (manifest as Record<string, boolean>)[asset.path] ? asset.path : asset.placeholderSrc || `/images/placeholders/${asset.style}.svg`; }
export function isPlaceholder(asset: ImageAsset) { return !(manifest as Record<string, boolean>)[asset.path]; }
