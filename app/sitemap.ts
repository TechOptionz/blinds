import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { curtainCategories } from '@/content/curtains';
import { products } from '@/content/products';
import { catalogueCategories } from '@/content/catalogue';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.domain) return [];
  const paths = ['/', '/blinds', '/curtains', '/screens', '/shutters', '/gallery', '/about', '/contact', ...products.map(p => `/blinds/${p.slug}`), ...curtainCategories.map(p => `/curtains/${p.slug}`), ...catalogueCategories.flatMap(category => category.items.map(item => `/${category.slug}/${item.slug}`))];
  return paths.map(path => ({ url: new URL(path, site.domain!).href, changeFrequency: 'monthly', priority: path === '/' ? 1 : .7 }));
}
