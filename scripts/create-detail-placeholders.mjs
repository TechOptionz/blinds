import { readFile, writeFile } from 'node:fs/promises';
for (const category of ['roller', 'double-roller', 'sunscreen', 'vision', 'roman', 'honeycomb', 'venetian', 'timber-venetian', 'vertical', 'panel', 'motorised', 'sheer-curtains', 'blockout-curtains', 'layered-curtains', 's-fold-curtains', 'pinch-pleat-curtains', 'linen-curtains', 'velvet-curtains', 'thermal-curtains', 'eyelet-curtains', 'fly-screens', 'pet-mesh-screens', 'retractable-screens', 'sliding-screen-doors', 'pleated-screens', 'security-screens', 'plantation-shutters', 'timber-shutters', 'pvc-shutters', 'aluminium-shutters', 'sliding-shutters', 'exterior-shutters']) {
  const source = await readFile(`public/images/placeholders/${category}.svg`, 'utf8');
  for (const [index, viewBox] of ['0 0 1600 1100', '760 65 570 630', '1020 45 480 800'].entries()) {
    const image = source.replace('viewBox="0 0 1600 1100"', `viewBox="${viewBox}"`);
    await writeFile(`public/images/placeholders/${category}-detail-0${index + 1}.svg`, image);
  }
}
