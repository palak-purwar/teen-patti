const BULBS = ['#F2B84B', '#FF4F8B', '#2ED1C1', '#FF8A2B'];
const DELAYS = [0, 0.4, 0.9, 1.5];
const OFFS = [
  [24.5, 15.4],
  [49, 19.5],
  [73.5, 16.4],
];

export function FairyLights() {
  const bulbs = [];
  for (let s = 0; s < 4; s++)
    for (let k = 0; k < 3; k++) {
      const i = s * 3 + k;
      const x = s * 98 + OFFS[k][0];
      const y = OFFS[k][1];
      const c = BULBS[i % 4];
      bulbs.push(
        <g key={i} className="twinkle" style={{ animationDelay: `${DELAYS[i % 4]}s` }}>
          <circle cx={x} cy={y + 8} r="12" fill={c} opacity=".22" />
          <rect x={x - 2.5} y={y} width="5" height="3" fill="#6B5A2E" />
          <ellipse cx={x} cy={y + 8} rx="4.5" ry="6.5" fill={c} />
        </g>,
      );
    }
  return (
    <svg className="lights" viewBox="0 0 390 44" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path
        d="M-2 4 Q49 34 98 6 Q147 34 196 6 Q245 34 294 6 Q343 34 392 6"
        stroke="#6B5A2E"
        strokeWidth="1.5"
        fill="none"
      />
      {bulbs}
    </svg>
  );
}
