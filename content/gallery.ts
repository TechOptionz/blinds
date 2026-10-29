import { images, type ImageAsset } from './images';
import type { BlindStyle } from './products';
import { withCredit } from './image-credits';
export type GalleryItem = { id: string; category: BlindStyle; caption: string; image: ImageAsset };
export const gallery: GalleryItem[] = [
  ['roller', 'Morning light, beautifully softened.'], ['roman', 'A softer way to frame a view.'], ['venetian', 'Simple lines, calm interiors.'], ['roman', 'Texture in the little details.'], ['venetian', 'The beauty of natural daylight.'], ['roller', 'Where comfort meets clean design.'],
].map(([style, caption], i) => ({ id: `gallery-${i + 1}`, category: style as BlindStyle, caption, image: withCredit({ ...images.products[style as BlindStyle].main, path: `/images/gallery/gallery-0${i + 1}.webp`, alt: `${caption} ${style} blind inspiration.`, position: i % 2 ? '70% center' : 'center' }) }));
