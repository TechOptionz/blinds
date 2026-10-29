import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('public/images/placeholders', { recursive: true });
const drawings = {
  roller: '<rect x="765" y="85" width="630" height="280" fill="url(#linen)"/><path d="M765 365h630" stroke="#a99f8b" stroke-width="7"/>',
  'double-roller': '<rect x="765" y="85" width="630" height="560" fill="#f1ebdd" opacity=".62"/>' + Array.from({ length: 21 }, (_, i) => `<path d="M${772 + i * 30} 85v560" stroke="#d8cfbd" stroke-width="2"/>`).join('') + '<rect x="765" y="85" width="630" height="215" fill="url(#linen)"/><path d="M765 300h630" stroke="#a99f8b" stroke-width="7"/><rect x="758" y="72" width="644" height="24" rx="6" fill="#9c907b"/>',
  roman: Array.from({ length: 5 }, (_, i) => `<path d="M765 ${85 + i * 64}h630v72q-315 22-630 0z" fill="url(#fold)"/><path d="M765 ${155 + i * 64}q315 14 630 0" fill="none" stroke="#928470" stroke-opacity=".4"/>`).join(''),
  honeycomb: Array.from({ length: 13 }, (_, i) => `<path d="M765 ${85 + i * 30}h630v18q-315 10-630 0z" fill="url(#fold)"/><path d="M765 ${103 + i * 30}h630v12q-315 -8-630 0z" fill="#b9ab92"/>`).join(''),
  venetian: Array.from({ length: 24 }, (_, i) => `<path d="M765 ${90 + i * 22}h630l-3 12H768z" fill="url(#slat)"/><path d="M925 ${90 + i * 22}v22m300-22v22" stroke="#857661" stroke-width="2"/>`).join(''),
  vertical: '<rect x="758" y="72" width="644" height="20" rx="5" fill="#9c907b"/>' + Array.from({ length: 14 }, (_, i) => `<path d="M${770 + i * 45} 92h36l-5 553h-36z" fill="url(#linen)"/><path d="M${788 + i * 45} 92l-4 553" stroke="#a99f8b" stroke-opacity=".5"/>`).join(''),
  panel: '<rect x="758" y="70" width="644" height="22" rx="5" fill="#9c907b"/>' + Array.from({ length: 4 }, (_, i) => `<rect x="${765 + i * 150}" y="92" width="182" height="553" fill="url(#linen)" stroke="#a99f8b" stroke-width="3"/>`).join(''),
  sunscreen: '<rect x="765" y="85" width="630" height="560" fill="#d8d0bf" opacity=".62"/>' + Array.from({ length: 52 }, (_, i) => `<path d="M${765 + i * 12} 85v560" stroke="#b9ae9a" stroke-opacity=".35"/>`).join('') + Array.from({ length: 46 }, (_, i) => `<path d="M765 ${85 + i * 12}h630" stroke="#b9ae9a" stroke-opacity=".35"/>`).join('') + '<rect x="758" y="72" width="644" height="22" rx="6" fill="#9c907b"/>',
  vision: Array.from({ length: 16 }, (_, i) => i % 2 ? `<rect x="765" y="${85 + i * 35}" width="630" height="35" fill="url(#linen)"/>` : `<rect x="765" y="${85 + i * 35}" width="630" height="35" fill="#f1ebdd" opacity=".55"/>`).join('') + '<rect x="758" y="72" width="644" height="22" rx="6" fill="#9c907b"/>',
  'timber-venetian': Array.from({ length: 14 }, (_, i) => `<path d="M765 ${90 + i * 40}h630l-4 24H769z" fill="#b07a4c"/><path d="M765 ${90 + i * 40}h630" stroke="#d2a278" stroke-width="3"/><path d="M769 ${114 + i * 40}h622" stroke="#7a4f2c" stroke-width="3"/>`).join('') + '<path d="M925 85v560m300-560v560" stroke="#6b4428" stroke-width="3"/>',
  motorised: '<rect x="765" y="85" width="630" height="330" fill="url(#linen)"/><path d="M765 415h630" stroke="#a99f8b" stroke-width="7"/><rect x="752" y="62" width="656" height="34" rx="9" fill="#5f574b"/><circle cx="1385" cy="79" r="5" fill="#8fd3a0"/><rect x="1180" y="860" width="46" height="110" rx="10" fill="#4a443b"/><circle cx="1203" cy="890" r="7" fill="#e5dccb"/><rect x="1193" y="912" width="20" height="8" rx="3" fill="#e5dccb"/><rect x="1193" y="930" width="20" height="8" rx="3" fill="#e5dccb"/>',
  ...Object.fromEntries([['fly-screens', '#6f6f6f', 12, 1, '#8a8a8a', '', 1], ['pet-mesh-screens', '#4f4f4f', 9, 1.6, '#5e5e5e', '', 1], ['security-screens', '#2f3335', 20, 2.4, '#3d4245', '<rect x="1368" y="340" width="14" height="40" rx="3" fill="#1f2426"/><circle cx="1375" cy="352" r="4" fill="#d6d6d6"/>', 1], ['retractable-screens', '#777', 12, 1, '#8a8a8a', '<rect x="742" y="70" width="30" height="590" rx="5" fill="#8b8477"/><rect x="1150" y="80" width="12" height="572" rx="3" fill="#8b8477"/>', 0.62], ['sliding-screen-doors', '#6a6a6a', 12, 1, '#8a8a8a', '<rect x="748" y="640" width="664" height="14" rx="3" fill="#8b8477"/><rect x="1080" y="80" width="10" height="572" fill="#8b8477"/><rect x="1060" y="330" width="8" height="70" rx="3" fill="#3b3b3b"/>', 0.5], ['pleated-screens', '#6a6a6a', 0, 0, '#8a8a8a', Array.from({ length: 18 }, (_, i) => `<path d="M${765 + i * 35} 85l17 0 18 560h-18l-17-560z" fill="${i % 2 ? '#d9d4c8' : '#c6c0b2'}" opacity=".85"/>`).join('') + '<rect x="748" y="640" width="664" height="10" rx="3" fill="#8b8477"/>', 0]].map(([key, line, step, width, frame, extraSvg, portion]) => [key, (step ? Array.from({ length: Math.ceil(630 * portion / step) }, (_, i) => `<path d="M${765 + i * step} 85v560" stroke="${line}" stroke-opacity=".55" stroke-width="${width}"/>`).join('') + Array.from({ length: Math.ceil(560 / step) }, (_, i) => `<path d="M765 ${85 + i * step}h${630 * portion}" stroke="${line}" stroke-opacity=".55" stroke-width="${width}"/>`).join('') : '') + `<rect x="760" y="80" width="640" height="570" fill="none" stroke="${frame}" stroke-width="9"/>` + extraSvg])),
  ...Object.fromEntries([['plantation-shutters', '#f3efe6', '#cfc8ba'], ['timber-shutters', '#b47d50', '#7d5130'], ['pvc-shutters', '#fbfaf7', '#d9d6cf'], ['aluminium-shutters', '#a3a8ad', '#6f757b'], ['sliding-shutters', '#f1ede4', '#c9c2b4'], ['exterior-shutters', '#4b5157', '#2d3236']].map(([key, fill, edge]) => [key, (key === 'sliding-shutters' ? '<rect x="740" y="62" width="680" height="16" rx="4" fill="#8b8477"/>' : '') + [0, 1].map(panel => { const x = 765 + panel * 315 + (key === 'sliding-shutters' && panel === 1 ? -40 : 0); return `<rect x="${x}" y="85" width="315" height="560" fill="${fill}" stroke="${edge}" stroke-width="6"/>` + Array.from({ length: 11 }, (_, i) => `<path d="M${x + 18} ${118 + i * 46}h279l-5 22H${x + 23}z" fill="${fill}" stroke="${edge}" stroke-width="2.5"/>`).join('') + `<rect x="${x + 150}" y="118" width="6" height="506" rx="3" fill="${edge}"/>`; }).join('')]))
};
for (const [style, blind] of Object.entries(drawings)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
<defs>
<linearGradient id="wall"><stop stop-color="#c1b7a7"/><stop offset=".46" stop-color="#e2dacb"/><stop offset="1" stop-color="#ece8de"/></linearGradient>
<linearGradient id="floor" x2="0" y2="1"><stop stop-color="#afa08c"/><stop offset="1" stop-color="#cabcaa"/></linearGradient>
<linearGradient id="glass" x2="0" y2="1"><stop stop-color="#b8bfb5"/><stop offset=".65" stop-color="#dce0cd"/><stop offset="1" stop-color="#d1cbb9"/></linearGradient>
<linearGradient id="linen"><stop stop-color="#b8ac96"/><stop offset=".55" stop-color="#d3c9b7"/><stop offset="1" stop-color="#c6bba4"/></linearGradient>
<linearGradient id="fold" x2="0" y2="1"><stop stop-color="#c1b39b"/><stop offset=".6" stop-color="#dfd4c0"/><stop offset=".95" stop-color="#aa9b83"/><stop offset="1" stop-color="#887c69"/></linearGradient>
<linearGradient id="slat" x2="0" y2="1"><stop stop-color="#d5c5aa"/><stop offset=".65" stop-color="#bcaa8a"/><stop offset="1" stop-color="#887757"/></linearGradient>
<linearGradient id="sofa" x2="0" y2="1"><stop stop-color="#e0d9ca"/><stop offset="1" stop-color="#b2a895"/></linearGradient>
<linearGradient id="pot"><stop stop-color="#7b715f"/><stop offset=".5" stop-color="#ada28c"/><stop offset="1" stop-color="#847b68"/></linearGradient>
<filter id="blur"><feGaussianBlur stdDeviation="24"/></filter>
<filter id="shadow"><feGaussianBlur stdDeviation="10"/></filter>
<pattern id="grain" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 1h5M1 0v5" stroke="#fff" stroke-opacity=".035" stroke-width=".7"/></pattern>
</defs>
<path fill="url(#wall)" d="M0 0h1600v1100H0z"/>
<path d="M0 850h1600v250H0z" fill="url(#floor)"/>
<path d="M0 848h1600" stroke="#948a78" stroke-width="3"/>
<path d="M180 850L40 1100m400-250-20 250m280-250 80 250m180-250 180 250m80-250 280 250" stroke="#93806b" stroke-opacity=".25"/>
<path d="M723 43h717v650H723z" fill="#a99e88"/>
<path d="M744 65h674v604H744z" fill="#f2ecdf"/>
<path d="M765 85h630v560H765z" fill="url(#glass)"/>
<g opacity=".3" filter="url(#blur)" fill="#6e7e58"><ellipse cx="1320" cy="420" rx="85" ry="180"/><ellipse cx="870" cy="550" rx="100" ry="100"/></g>
<path d="M1080 85v560M765 515h630" stroke="#f0eadb" stroke-width="13"/>
${blind}
<path d="M750 77h658" stroke="#d2c6b2" stroke-width="13"/>
<path d="M720 681h727" stroke="#f4eddf" stroke-width="16"/>
<path d="M766 650l-340 250h750l220-250" fill="#fff5ce" opacity=".18"/>
<path d="M1078 660L875 900m-94-240L449 900" stroke="#b0a48b" stroke-width="13" opacity=".18"/>
<ellipse cx="520" cy="950" rx="540" ry="55" fill="#746956" opacity=".18" filter="url(#shadow)"/>
<path d="M15 877l930-15 278 238H0z" fill="#b5a995"/>
<path d="M40 897l890-15 200 198H0" fill="none" stroke="#dbcfbc" stroke-width="2" opacity=".6"/>
<rect x="63" y="658" width="601" height="214" rx="35" fill="#b4a995"/>
<rect x="79" y="641" width="279" height="165" rx="28" fill="url(#sofa)"/><rect x="363" y="641" width="279" height="165" rx="28" fill="url(#sofa)"/>
<path d="M45 778q0-30 35-30h565q37 0 37 30v119H45z" fill="url(#sofa)"/>
<path d="M60 897h607v31H60z" fill="#a69a86"/>
<rect x="31" y="727" width="82" height="176" rx="24" fill="#c9beaa"/><rect x="617" y="727" width="82" height="176" rx="24" fill="#c9beaa"/>
<path d="M105 923v22m532-22v22" stroke="#554e41" stroke-width="11"/>
<path d="M136 674q50-25 107-8l-9 112q-60 12-109-4z" fill="#a59981"/><path d="M466 670q54-18 111 8l-8 104-116-3z" fill="#d6cbb7"/>
<ellipse cx="858" cy="1015" rx="200" ry="27" fill="#756750" opacity=".18" filter="url(#shadow)"/>
<path d="M721 884l-16 142m285-142 15 142" stroke="#5c513e" stroke-width="15"/>
<ellipse cx="855" cy="887" rx="190" ry="62" fill="#817056"/><ellipse cx="855" cy="879" rx="190" ry="60" fill="#ac987a"/>
<path d="M786 859l83-13 50 15-85 15z" fill="#ded6c6"/><path d="M786 859v8l48 17 85-16v-7l-85 15z" fill="#bdb19b"/>
<ellipse cx="939" cy="864" rx="25" ry="8" fill="#6b5e4b"/><path d="M916 842l5 23q18 9 36 0l5-23z" fill="#d7cdbb"/><ellipse cx="939" cy="842" rx="23" ry="7" fill="#afa18b"/>
<path d="M1450 789q-35-145-20-352m-1 218q-83-74-105-150m113 86q48-79 87-114" stroke="#666751" stroke-width="5" fill="none"/>
<g fill="#73785a"><ellipse cx="1427" cy="438" rx="18" ry="48" transform="rotate(-22 1427 438)"/><ellipse cx="1387" cy="515" rx="20" ry="51" transform="rotate(-46 1387 515)"/><ellipse cx="1466" cy="513" rx="19" ry="47" transform="rotate(36 1466 513)"/><ellipse cx="1344" cy="565" rx="18" ry="48" transform="rotate(-51 1344 565)"/><ellipse cx="1485" cy="623" rx="21" ry="55" transform="rotate(49 1485 623)"/><ellipse cx="1397" cy="664" rx="21" ry="48" transform="rotate(-42 1397 664)"/><ellipse cx="1511" cy="471" rx="17" ry="45" transform="rotate(31 1511 471)"/></g>
<path d="M1393 778h112l-16 129q-42 18-81 0z" fill="url(#pot)"/><ellipse cx="1449" cy="778" rx="56" ry="12" fill="#665e4f"/>
<path d="M270 151h235v310H270z" fill="#b3a68e"/><path d="M279 160h217v292H279z" fill="#dfd5c1"/><path d="M317 402V271a70 70 0 01140 0v131z" fill="#b4a58d"/><path d="M361 402V295a48 48 0 0196 0v107z" fill="#cbbca1"/>
<path d="M0 0h1600v1100H0z" fill="url(#grain)"/>
</svg>`;
  await writeFile(`public/images/placeholders/${style}.svg`, svg);
}
console.log(`Created ${Object.keys(drawings).length} original architectural blind studies.`);
