import { CategoryPage } from '@/components/sections/Catalogue';
import { catalogue } from '@/content/catalogue';
import { pageMetadata } from '@/lib/metadata';
const category = catalogue.screens;
export const metadata = pageMetadata(`${category.name} | ${category.items.map(item => item.name).slice(0, 3).join(', ')} & more`, category.seo, '/screens');
export default function Page() { return <CategoryPage category="screens" />; }
