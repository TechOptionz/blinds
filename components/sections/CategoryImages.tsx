import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { isPlaceholder, type ImageAsset } from '@/content/images';
export function CategoryImages({ name, assets }: { name: string; assets: ImageAsset[] }) {
  const captions = ['The room setting', 'Fabric & texture', 'The finishing detail'];
  return <div className="category-images"><div className="section-intro split" data-reveal><div><span className="eyebrow">A closer look</span><h2>{name}, <span className="accent">in detail.</span></h2></div><div className="section-intro-aside"><p className="lead">{assets.some(isPlaceholder) ? 'Illustrated studies of the room, materials and finishing details.' : 'The room, the materials and the finishing details, up close.'}</p></div></div><div className="category-image-grid">{assets.map((asset, i) => <figure key={asset.path} data-mask><ImagePlaceholder asset={asset} className={`category-image category-image-${i + 1}`} sizes="(max-width: 767px) 100vw, 40vw" /><figcaption><span>0{i + 1}</span>{captions[i]}</figcaption></figure>)}</div></div>;
}
