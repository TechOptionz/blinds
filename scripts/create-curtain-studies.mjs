import { readFile, writeFile } from 'node:fs/promises';
const source = await readFile('public/images/placeholders/curtains.svg', 'utf8');
const sheer = `<g opacity=".58"><rect x="770" y="58" width="620" height="775" fill="#f5efdf"/>${Array.from({length:20}, (_, i) => `<path d="M${778+i*31} 58q-12 380 0 775" fill="none" stroke="#c6bda7" stroke-width="8"/>`).join('')}</g>`;
const marker = '<defs><linearGradient id="curtainFold">';
const darker = source.replaceAll('#a99b84', '#706254').replaceAll('#e9e0ce', '#b5a48d').replaceAll('#cec0a6', '#8e7c65').replaceAll('#998a74', '#645647');
await writeFile('public/images/placeholders/sheer-curtains.svg', source.replace(marker, sheer + marker));
await writeFile('public/images/placeholders/blockout-curtains.svg', darker);
await writeFile('public/images/placeholders/layered-curtains.svg', darker.replace(marker, sheer + marker));
