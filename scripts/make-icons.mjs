// One-off: renders the 1200x630 link-preview image. Run with `node scripts/make-og.mjs`.
import sharp from 'sharp';

const W = 1200, H = 630;
const cards = [
  { x: 780, y: 190, r: -14, s: '♠', c: '#14131C' },
  { x: 880, y: 160, r: -2, s: '♥', c: '#C8312F' },
  { x: 980, y: 190, r: 10, s: '♦', c: '#C8312F' },
].map(({ x, y, r, s, c }) => `
  <g transform="translate(${x} ${y}) rotate(${r} 60 90)">
    <rect width="150" height="210" rx="16" fill="#FFF8E7" stroke="#F2B84B" stroke-width="3"/>
    <text x="75" y="130" font-size="90" text-anchor="middle" fill="${c}" font-family="Arial, sans-serif">${s}</text>
  </g>`).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="g" cx="25%" cy="30%" r="80%">
      <stop offset="0" stop-color="#2A1B3D"/><stop offset="1" stop-color="#0B0A12"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g transform="translate(70 70) scale(2.2)">
    <circle cx="24" cy="13" r="16" fill="#FFB938" opacity=".3"/>
    <path d="M24 3 C31 11 31 16 24 21 C17 16 17 11 24 3 Z" fill="#FFE9A8" stroke="#FFB938" stroke-width="1.5"/>
    <path d="M4 22 Q4 37 24 37 Q44 37 44 22 Z" fill="#A8741A"/>
    <path d="M4 22 Q24 29 44 22 Q24 16 4 22 Z" fill="#F2B84B"/>
  </g>
  <text x="70" y="370" font-size="112" font-weight="700" fill="#FFD982" font-family="Georgia, serif">Tash Party</text>
  <text x="74" y="440" font-size="40" fill="#F4EBD6" font-family="Arial, sans-serif">Teen Patti ka dealer-saathi.</text>
  <text x="74" y="495" font-size="34" fill="#C9BFA8" font-family="Arial, sans-serif">36 twists, ek phone, bina cards ke jhanjhat.</text>
  ${cards}
</svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('og done');
