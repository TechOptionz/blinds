import { images, type ImageAsset } from './images';
import { products, type BlindStyle } from './products';
import { curtainCategories } from './curtains';
import { curtainGallery } from './curtain-images';
import { catalogue, catalogueDetails, catalogueImage } from './catalogue';
import { withCredit } from './image-credits';

export type GalleryGroup = 'blinds' | 'curtains' | 'screens' | 'shutters';
export type GalleryItem = {
  id: string;
  /** Top-level collection the image belongs to. */
  group: GalleryGroup;
  /** Product or category slug used for the secondary filter (a blind style, curtain, screen or shutter slug). */
  category: string;
  /** Human-readable product or category name shown under the tile. */
  label: string;
  /** Short caption used on tiles and in the lightbox. */
  caption: string;
  /** Page the image relates to, so visitors can jump from inspiration to detail. */
  href: string;
  /** Larger editorial tile in the grid. */
  featured?: boolean;
  image: ImageAsset;
};

export const galleryGroups: { slug: GalleryGroup | 'all'; name: string }[] = [
  { slug: 'all', name: 'All inspiration' }, { slug: 'blinds', name: 'Blinds' }, { slug: 'curtains', name: 'Curtains' }, { slug: 'screens', name: 'Screens' }, { slug: 'shutters', name: 'Shutters' },
];

const sentence = (text: string) => { const clean = text.replace(/\.$/, '').trim(); return clean.charAt(0).toUpperCase() + clean.slice(1); };
/** Captions come from the licensed photo descriptions so they always match what is actually in the picture. */
const captionFor = (asset: ImageAsset) => sentence(asset.alt.split(':').pop() || asset.alt);

/* Six editorial room scenes. These stay first so the homepage teaser keeps using them. */
const editorial: GalleryItem[] = [
  ['roller', 'Morning light, beautifully softened.'], ['roman', 'A softer way to frame a view.'], ['venetian', 'Simple lines, calm interiors.'], ['roman', 'Texture in the little details.'], ['venetian', 'The beauty of natural daylight.'], ['roller', 'Where comfort meets clean design.'],
].map(([style, caption], i) => {
  const product = products.find(item => item.style === style)!;
  return { id: `gallery-${i + 1}`, group: 'blinds' as const, category: style as BlindStyle, label: product.name, caption, href: `/blinds/${product.slug}`, featured: i === 0, image: withCredit({ ...images.products[style as BlindStyle].main, path: `/images/gallery/gallery-0${i + 1}.webp`, alt: `${caption} ${style} blind inspiration.`, position: i % 2 ? '70% center' : 'center' }) };
});

const blinds: GalleryItem[] = products.flatMap(product => {
  const set = images.products[product.style];
  return [set.main, ...set.details].map((image, n) => ({ id: `${product.slug}-${n}`, group: 'blinds' as const, category: product.style, label: product.name, caption: captionFor(image), href: `/blinds/${product.slug}`, featured: n === 0 && ['roman', 'timber-venetian', 'honeycomb'].includes(product.style), image }));
});

const curtains: GalleryItem[] = curtainCategories.flatMap(category => [category.image, ...curtainGallery[category.slug]].map((image, n) => ({ id: `${category.slug}-${n}`, group: 'curtains' as const, category: category.slug, label: category.name, caption: captionFor(image), href: `/curtains/${category.slug}`, featured: n === 0 && ['sheer-curtains', 'linen-curtains', 'velvet-curtains'].includes(category.slug), image })));

const fromCatalogue = (group: 'screens' | 'shutters'): GalleryItem[] => catalogue[group].items.flatMap((item, i) => [catalogueImage(group, item), ...catalogueDetails(group, item)].map((image, n) => ({ id: `${item.slug}-${n}`, group, category: item.slug, label: item.name, caption: captionFor(image), href: `/${group}/${item.slug}`, featured: n === 0 && i % 3 === 0, image })));

export const gallery: GalleryItem[] = [...editorial, ...blinds, ...curtains, ...fromCatalogue('screens'), ...fromCatalogue('shutters')];

/** Secondary filter options for a group, in catalogue order. */
export function galleryCategories(group: GalleryGroup) {
  const seen = new Map<string, string>();
  gallery.forEach(item => { if (item.group === group && !seen.has(item.category)) seen.set(item.category, item.label); });
  return [...seen].map(([slug, name]) => ({ slug, name }));
}
