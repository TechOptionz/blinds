import Image from 'next/image';
import type { CSSProperties } from 'react';
import { imageSource, isPlaceholder, type ImageAsset } from '@/content/images';
export function ImagePlaceholder({ asset, className = '', priority = false, sizes = '(max-width: 767px) 100vw, 60vw' }: { asset: ImageAsset; className?: string; priority?: boolean; sizes?: string }) {
  return <div className={`image-frame ${className}`} style={{ '--image-position': asset.position, '--mobile-position': asset.mobilePosition } as CSSProperties}>
    <Image src={imageSource(asset)} alt={asset.alt} fill sizes={sizes} priority={priority} unoptimized={isPlaceholder(asset)} />
    {process.env.NODE_ENV === 'development' && isPlaceholder(asset) && <span className="asset-label">Image study · {asset.path.split('/').pop()}</span>}
  </div>;
}
