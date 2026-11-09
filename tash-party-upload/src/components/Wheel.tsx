import type { Variant } from '../data/types';
import { LEVEL_COLOR } from '../data';

const BULB_COLORS = ['#F2B84B', '#FF4F8B', '#2ED1C1', '#FF8A2B'];
const rad = (d: number) => (d * Math.PI) / 180;
const P = (a: number, r: number): [number, number] => [160 + r * Math.sin(rad(a)), 160 - r * Math.cos(rad(a))];
const f = (n: number) => n.toFixed(2);

function sectorPath(th: number, n: number) {
  if (n === 1) return 'M160 32 A128 128 0 1 1 160 288 A128 128 0 1 1 160 32 Z';
  const half = 180 / n;
  const [x1, y1] = P(th - half, 128);
  const [x2, y2] = P(th + half, 128);
  const large = 360 / n > 180 ? 1 : 0;
  return `M160 160 L${f(x1)} ${f(y1)} A128 128 0 ${large} 1 ${f(x2)} ${f(y2)} Z`;
}

export function Wheel({ pool, rotation, animate, landed }: {
  pool: Variant[]; rotation: number; animate: boolean; landed: number | null;
}) {
  const n = pool.length;
  const radial = n > 6;
  return (
    <svg className="wheel" viewBox="0 0 320 320" aria-hidden="true">
      <circle cx="160" cy="160" r="156" fill="var(--dusk)" stroke="var(--line)" strokeWidth="1.5" />
      <circle cx="160" cy="160" r="131" fill="var(--night)" stroke="var(--gold)" strokeWidth="2" />
      {Array.from({ length: 16 }, (_, i) => {
        const [x, y] = P(i * 22.5, 143);
        const c = BULB_COLORS[i % 4];
        return (
          <g key={i} className="twinkle" style={{ animationDelay: `${[0, 0.4, 0.9, 1.5][i % 4]}s` }}>
            <circle cx={x} cy={y} r="9" fill={c} opacity=".25" />
            <circle cx={x} cy={y} r="4.5" fill={c} />
          </g>
        );
      })}
      <g className={`wheel-rot${animate ? ' anim' : ''}`} style={{ transform: `rotate(${rotation}deg)` }}>
        {pool.map((v, i) => {
          const th = (i * 360) / n;
          const on = landed === i;
          const upright = th > 90 && th < 270;
          return (
            <g key={v.id}>
              <path
                d={sectorPath(th, n)}
                fill={on ? 'var(--gold)' : LEVEL_COLOR[v.level]}
                fillOpacity={on ? 1 : 0.26}
                stroke="var(--gold)"
                strokeWidth="1.5"
              />
              <text
                x="160"
                y={radial ? 86 : 82}
                textAnchor="middle"
                fontSize={n > 16 ? 11 : radial ? 12 : 14}
                fontWeight="700"
                fontFamily="var(--font-body)"
                fill={on ? 'var(--ink-on-gold)' : 'var(--cream)'}
                transform={
                  radial
                    ? `rotate(${th} 160 160) rotate(${th < 180 ? -90 : 90} 160 84)`
                    : `rotate(${th} 160 160)${upright ? ' rotate(180 160 78)' : ''}`
                }
              >
                {v.short}
              </text>
            </g>
          );
        })}
      </g>
      <circle cx="160" cy="160" r="30" fill="var(--night)" stroke="var(--gold)" strokeWidth="2" />
      <g transform="translate(142 145)" className="lit">
        <circle cx="18" cy="9" r="11" fill="#FFB938" opacity=".3" />
        <g transform="scale(.75)">
          <path className="flame" d="M24 3 C31 11 31 16 24 21 C17 16 17 11 24 3 Z" fill="#FFE9A8" stroke="#FFB938" strokeWidth="1.5" />
          <path d="M4 22 Q4 37 24 37 Q44 37 44 22 Z" fill="#A8741A" />
          <path d="M4 22 Q24 29 44 22 Q24 16 4 22 Z" fill="#F2B84B" />
          <rect x="19" y="36" width="10" height="3" rx="1.5" fill="#7A5210" />
        </g>
      </g>
      <polygon points="147,2 173,2 160,40" fill="var(--gold)" stroke="var(--night)" strokeWidth="2" />
    </svg>
  );
}
