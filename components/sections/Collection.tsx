import Link from 'next/link';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import type { ImageAsset } from '@/content/images';
import { CollectionNav } from '@/components/sections/CollectionNav';
export type StyleCard = { slug: string; name: string; index: string; group: string; headline: string; image: ImageAsset; href: string; enquire: string };
const groupId = (group: string) => `range-${group.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`;
/** A range's styles as photographic cards, grouped under sticky category tabs. Each card keeps the style's slug as its id. */
export function StyleGrid({ label, groups, items }: { label: string; groups: string[]; items: StyleCard[] }) {
  return <section className="style-range" aria-label={label}>
    <CollectionNav label={`Jump to ${label.toLowerCase()}`} groups={groups.map(group => ({ id: groupId(group), name: group }))} />
    <div className="wrap">{groups.map(group => <div className="style-group" id={groupId(group)} key={group}>
      <div className="style-group-head" data-reveal><h2>{group}</h2></div>
      <div className="style-cards">{items.filter(item => item.group === group).map(item => <article className="style-card" id={item.slug} key={item.slug} data-reveal>
        <Link href={item.href} className="style-card-media" tabIndex={-1} aria-hidden="true"><ImagePlaceholder asset={item.image} sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw" /><span className="style-card-index">{item.index}</span></Link>
        <div className="style-card-body">
          <span className="style-card-headline">{item.headline}</span>
          <h3><Link href={item.href}>{item.name}</Link></h3>
          <div className="style-card-actions"><Link href={item.href} className="text-link">View details <span className="arrow" aria-hidden="true">→</span></Link><Link href={item.enquire} className="quiet-link" aria-label={`Enquire about ${item.name}`}>Enquire</Link></div>
        </div>
      </article>)}</div>
    </div>)}</div>
  </section>;
}
