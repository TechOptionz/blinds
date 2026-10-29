import { CategoryItemPage } from '@/components/sections/Catalogue';
import { catalogue } from '@/content/catalogue';
import { pageMetadata } from '@/lib/metadata';
const category = catalogue.screens;
export function generateStaticParams() { return category.items.map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = category.items.find(entry => entry.slug === slug); return item ? pageMetadata(item.name, item.seo, `/screens/${slug}`) : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <CategoryItemPage category="screens" slug={slug} />; }
