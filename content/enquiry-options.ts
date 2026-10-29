import { products } from './products';
import { curtainCategories } from './curtains';
import { catalogueCategories } from './catalogue';
export const enquiryOptions = [
  ...products.map(({ slug, name }) => ({ slug, name })),
  { slug: 'curtains', name: 'Curtains' },
  ...curtainCategories.map(({ slug, name }) => ({ slug, name })),
  ...catalogueCategories.flatMap(category => [{ slug: category.slug, name: category.name }, ...category.items.map(({ slug, name }) => ({ slug, name }))]),
];
