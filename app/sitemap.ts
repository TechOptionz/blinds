import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { curtainCategories } from '@/content/curtains';
import { products } from '@/content/products';
export default function sitemap(): MetadataRoute.Sitemap { if (!site.domain) return []; return ['/', '/blinds', '/curtains', '/gallery', '/about', '/contact', ...products.map(p => `/blinds/${p.slug}`), ...curtainCategories.map(p => `/curtains/${p.slug}`)].map(path => ({ url: new URL(path, site.domain!).href, changeFrequency: 'monthly', priority: path === '/' ? 1 : .7 })); }
