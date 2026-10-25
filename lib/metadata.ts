import type { Metadata } from 'next';
import { site } from '@/content/site';
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: site.domain ? { canonical: new URL(path, site.domain).href } : undefined, openGraph: { title, description, type: 'website', siteName: site.name, ...(site.domain ? { url: new URL(path, site.domain).href } : {}) } };
}
