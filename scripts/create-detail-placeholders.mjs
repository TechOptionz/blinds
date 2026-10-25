import { readFile, writeFile } from 'node:fs/promises';
for (const category of ['roller', 'roman', 'venetian', 'sheer-curtains', 'blockout-curtains', 'layered-curtains']) {
  const source = await readFile(`public/images/placeholders/${category}.svg`, 'utf8');
  for (const [index, viewBox] of ['0 0 1600 1100', '760 65 570 630', '1020 45 480 800'].entries()) {
    const image = source.replace('viewBox="0 0 1600 1100"', `viewBox="${viewBox}"`);
    await writeFile(`public/images/placeholders/${category}-detail-0${index + 1}.svg`, image);
  }
}
