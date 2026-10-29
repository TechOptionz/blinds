import { blindGroups, products } from './products';
import { curtainCategories } from './curtains';
import { catalogue, catalogueImage } from './catalogue';
import { images, type ImageAsset } from './images';
export type MenuLink = { label: string; href: string; image: ImageAsset };
export type MenuColumn = { heading: string; links: MenuLink[] };
export type MegaMenu = { columns: MenuColumn[]; feature: { eyebrow: string; title: string; copy: string; label: string; href: string } };
const byGroup = (group: string) => products.filter(product => product.group === group);
const curtain = (slug: string) => curtainCategories.find(category => category.slug === slug)!;
const curtainColumn = (heading: string, slugs: string[]): MenuColumn => ({ heading, links: slugs.map(slug => ({ label: curtain(slug).name, href: `/curtains/${slug}`, image: curtain(slug).image })) });
const catalogueColumns = (slug: 'screens' | 'shutters'): MenuColumn[] => catalogue[slug].groups.map(group => { const items = catalogue[slug].items.filter(item => item.group === group); return { heading: group, links: items.map(item => ({ label: item.name, href: `/${slug}/${item.slug}`, image: catalogueImage(slug, item) })) }; });
/** Hover menus for the main navigation, keyed by the top-level route. */
export const megaMenus: Record<string, MegaMenu> = {
  '/blinds': {
    columns: blindGroups.map(group => ({ heading: group, links: byGroup(group).map(product => ({ label: product.name, href: `/blinds/${product.slug}`, image: images.products[product.style].main })) })),
    feature: { eyebrow: 'Not sure where to start?', title: 'Tell us about your room.', copy: 'Share the window, the light and the look you have in mind and we will suggest styles worth considering.', label: 'Request a Quote', href: '/contact' },
  },
  '/curtains': {
    columns: [curtainColumn('Light & sheer', ['sheer-curtains', 'linen-curtains']), curtainColumn('Privacy & rest', ['blockout-curtains', 'thermal-curtains', 'velvet-curtains', 'layered-curtains']), curtainColumn('Heading styles', ['s-fold-curtains', 'pinch-pleat-curtains', 'eyelet-curtains'])],
    feature: { eyebrow: 'Blinds and curtains together', title: 'Layer structure with softness.', copy: 'Pair the clean lines of a blind with the gentle fall of fabric for a finish that works day and night.', label: 'Request a Quote', href: '/contact' },
  },
  '/screens': {
    columns: catalogueColumns('screens'),
    feature: { eyebrow: 'Doors, windows and openings', title: 'Keep the breeze. Lose the bugs.', copy: 'Tell us which doors and windows you would like screened and how they open, and we will suggest the right style and mesh.', label: 'Request a Quote', href: '/contact' },
  },
  '/shutters': {
    columns: catalogueColumns('shutters'),
    feature: { eyebrow: 'Inside and out', title: 'A finish that lasts for years.', copy: 'Share the room and the window sizes, and whether the shutters will live inside or out. We will talk through materials and louvres.', label: 'Request a Quote', href: '/contact' },
  },
};
