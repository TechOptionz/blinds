import { products } from './products';
import { curtainCategories } from './curtains';
export const enquiryOptions = [...products.map(({ slug, name }) => ({ slug, name })), { slug: 'curtains', name: 'Curtains' }, ...curtainCategories.map(({ slug, name }) => ({ slug, name }))];
