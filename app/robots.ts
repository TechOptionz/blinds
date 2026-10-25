import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
export default function robots(): MetadataRoute.Robots { return site.domain ? { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: new URL('/sitemap.xml', site.domain).href } : { rules: { userAgent: '*', disallow: '/' } }; }
