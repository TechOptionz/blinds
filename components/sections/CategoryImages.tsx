import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { isPlaceholder, type ImageAsset } from '@/content/images';
export function CategoryImages({ name, assets }: { name: string; assets: ImageAsset[] }) {
  const captions = ['The room setting', 'Fabric & texture', 'The finishing detail'];
  return <div className="category-images"><div className="category-images-heading" data-reveal><span className="eyebrow">A closer perspective</span><h2>{name},<br />in the details.</h2><p>{assets.some(isPlaceholder) ? 'Illustrated studies of the room, materials and finishing details.' : 'Explore the room, materials and finishing details.'}</p></div><div className="category-image-grid">{assets.map((asset, i) => <figure key={asset.path} data-mask><ImagePlaceholder asset={asset} className={`category-image category-image-${i + 1}`} sizes="(max-width: 767px) 100vw, 35vw" /><figcaption><span>0{i + 1} / {captions[i]}</span>{process.env.NODE_ENV === 'development' && isPlaceholder(asset) && <code>{asset.path.replace('/images/', '')}</code>}</figcaption></figure>)}</div></div>;
}
