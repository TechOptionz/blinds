import { mkdir, writeFile } from 'node:fs/promises';
// Close-up illustrations of each curtain heading style. Replace with photographs named
// public/images/curtains/heading-<slug>.webp (see IMAGE_GUIDE.md).
await mkdir('public/images/placeholders', { recursive: true });
const W = 1600, H = 1100;
const defs = `<defs>
  <linearGradient id="wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EFECE6"/><stop offset=".5" stop-color="#E5DFD4"/><stop offset="1" stop-color="#D8D0C2"/></linearGradient>
  <linearGradient id="fold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A89C86"/><stop offset=".48" stop-color="#E8E0D0"/><stop offset="1" stop-color="#B5A890"/></linearGradient>
  <linearGradient id="foldDeep" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8F826C"/><stop offset=".5" stop-color="#D9D0BE"/><stop offset="1" stop-color="#9C8F79"/></linearGradient>
  <linearGradient id="track" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6F3EC"/><stop offset="1" stop-color="#CFC7B8"/></linearGradient>
  <linearGradient id="pole" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E5A51"/><stop offset=".5" stop-color="#8A8577"/><stop offset="1" stop-color="#3F3C35"/></linearGradient>
  <linearGradient id="daylight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFCF3" stop-opacity=".45"/><stop offset="1" stop-color="#FFF8E8" stop-opacity="0"/></linearGradient>
  <filter id="shade" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#1D211F" flood-opacity=".14"/></filter>
</defs>`;
const frame = body => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs}<rect width="${W}" height="${H}" fill="url(#wall)"/><rect width="${W}" height="${H}" fill="url(#daylight)"/>${body}<rect x="0" y="${H - 6}" width="${W}" height="6" fill="#1D211F" opacity=".06"/></svg>\n`;
const wave = () => {
  const n = 9, step = (W - 160) / n, folds = [];
  for (let i = 0; i < n; i++) {
    const x = 80 + i * step, m = x + step / 2, e = x + step;
    folds.push(`<path d="M${x} 150 C${x} 120 ${e} 120 ${e} 150 L${e} ${H} L${x} ${H} Z" fill="url(#fold)"/><path d="M${m} 150 Q${m - step / 2} 400 ${m} 700 T${m} ${H}" stroke="#8C7F69" stroke-opacity=".28" stroke-width="3" fill="none"/>`);
  }
  return frame(`<rect x="40" y="110" width="${W - 80}" height="28" rx="6" fill="url(#track)" filter="url(#shade)"/>` + folds.join('') + `<path d="M80 150 ${Array.from({ length: n }, (_, i) => `Q${80 + i * step + step / 2} ${i % 2 ? 110 : 190} ${80 + (i + 1) * step} 150`).join(' ')}" fill="none" stroke="#7B6F5B" stroke-opacity=".4" stroke-width="4"/>`);
};
const pinchPleat = () => {
  const n = 7, step = (W - 160) / n, folds = [];
  for (let i = 0; i < n; i++) {
    const x = 80 + i * step, c = x + step / 2;
    folds.push(`<path d="M${c - 34} 160 L${c + 34} 160 L${x + step} ${H} L${x} ${H} Z" fill="url(#fold)"/>`);
    for (const d of [-26, 0, 26]) folds.push(`<path d="M${c + d} 160 L${c + d * 2.6} 420 L${c + d * 4.2} ${H}" stroke="#86795F" stroke-opacity=".32" stroke-width="3" fill="none"/>`);
    folds.push(`<path d="M${c - 40} 205 Q${c} 235 ${c + 40} 205" fill="none" stroke="#6E6350" stroke-opacity=".5" stroke-width="5"/>`);
  }
  return frame(`<rect x="40" y="120" width="${W - 80}" height="30" rx="6" fill="url(#track)" filter="url(#shade)"/>` + folds.join('') + Array.from({ length: n }, (_, i) => `<circle cx="${80 + i * step + step / 2}" cy="135" r="9" fill="#8A8577"/>`).join(''));
};
const eyelet = () => {
  const n = 8, step = (W - 160) / n, folds = [];
  for (let i = 0; i < n; i++) {
    const x = 80 + i * step, c = x + step / 2;
    folds.push(`<path d="M${x} 230 L${x + step} 230 Q${x + step - 18} 500 ${x + step} ${H} L${x} ${H} Q${x + 18} 500 ${x} 230 Z" fill="${i % 2 ? 'url(#foldDeep)' : 'url(#fold)'}"/><path d="M${c} 230 Q${c + 22} 600 ${c} ${H}" stroke="#86795F" stroke-opacity=".25" stroke-width="3" fill="none"/>`);
    folds.push(`<circle cx="${c}" cy="200" r="46" fill="none" stroke="url(#pole)" stroke-width="22"/><circle cx="${c}" cy="200" r="46" fill="none" stroke="#1D211F" stroke-opacity=".18" stroke-width="2"/>`);
  }
  return frame(`<rect x="30" y="178" width="${W - 60}" height="44" rx="22" fill="url(#pole)" filter="url(#shade)"/><circle cx="34" cy="200" r="42" fill="url(#pole)"/><circle cx="${W - 34}" cy="200" r="42" fill="url(#pole)"/>` + folds.join(''));
};
for (const [slug, draw] of [['wave', wave], ['pinch-pleat', pinchPleat], ['eyelet', eyelet]]) await writeFile(`public/images/placeholders/heading-${slug}.svg`, draw());
console.log('Heading placeholders written: wave, pinch-pleat, eyelet');
