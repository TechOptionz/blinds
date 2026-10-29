import { CategoryPage } from '@/components/sections/Catalogue';
import { catalogue } from '@/content/catalogue';
import { pageMetadata } from '@/lib/metadata';
const category = catalogue.shutters;
export const metadata = pageMetadata(`${category.name} | ${category.items.map(item => item.name).slice(0, 3).join(', ')} & more`, category.seo, '/shutters');
export default function Page() { return <CategoryPage category="shutters" />; }
