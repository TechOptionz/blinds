import type { ImageAsset } from './images';
import { curtainCategories } from './curtains';
export const curtainGallery: Record<string, ImageAsset[]> = Object.fromEntries(curtainCategories.map(category => [category.slug, [1, 2, 3].map(number => ({
  ...category.image,
  path: `/images/curtains/${category.slug}-gallery-0${number}.webp`,
  alt: `${category.name}: ${['room setting', 'fabric and texture', 'finishing detail'][number - 1]}`,
  placeholderSrc: `/images/placeholders/${category.slug}-detail-0${number}.svg`,
  position: 'center', mobilePosition: 'center',
}))]));
