import { readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('public/images');
for (const name of ['hero', 'products', 'gallery', 'about', 'sections', 'placeholders']) await mkdir(path.join(root, name), { recursive: true });
const manifest = {};
async function walk(dir) { for (const file of await readdir(dir, { withFileTypes: true })) { const full = path.join(dir, file.name); if (file.isDirectory()) await walk(full); else manifest['/images/' + path.relative(root, full).replaceAll('\\', '/')] = true; } }
await walk(root);
await writeFile('content/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Image manifest: ${Object.keys(manifest).length} available assets`);
