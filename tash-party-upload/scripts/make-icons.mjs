// One-off: renders the diya icon to PNGs. Run with `npm run icons`.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const diya = (scale, offset) => `
<g transform="translate(${offset} ${offset}) scale(${scale})">
  <circle cx="24" cy="13" r="16" fill="#FFB938" opacity=".3"/>
  <circle cx="24" cy="13" r="9" fill="#FFD982" opacity=".5"/>
  <path d="M24 3 C31 11 31 16 24 21 C17 16 17 11 24 3 Z" fill="#FFE9A8" stroke="#FFB938" stroke-width="1.5"/>
  <path d="M4 22 Q4 37 24 37 Q44 37 44 22 Z" fill="#A8741A"/>
  <path d="M4 22 Q24 29 44 22 Q24 16 4 22 Z" fill="#F2B84B"/>
  <rect x="19" y="36" width="10" height="3" rx="1.5" fill="#7A5210"/>
</g>`;
const svg = (size, scale) => {
  const w = 48 * scale, h = 40 * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0B0A12"/>
  ${diya(scale, 0).replace('translate(0 0)', `translate(${(size - w) / 2} ${(size - h) / 2})`)}
</svg>`;
};
const out = (name, size, scale) =>
  sharp(Buffer.from(svg(size, scale))).png().toFile(`public/icons/${name}`);
await out('icon-192.png', 192, 192 * 0.7 / 48);
await out('icon-512.png', 512, 512 * 0.7 / 48);
// maskable: keep the diya inside the central 60% safe zone
await out('icon-maskable-512.png', 512, 512 * 0.55 / 48);
writeFileSync('public/icons/.keep', '');
console.log('icons done');
