import { useApp } from '../state';
import { tr } from '../data/copy';

export function Diya({ lit, size = 48, glow = '#FFB938' }: { lit: boolean; size?: number; glow?: string }) {
  const { lang } = useApp();
  return (
    <svg
      className={lit ? 'lit' : undefined}
      width={size}
      height={(size * 40) / 48}
      viewBox="0 0 48 40"
      role="img"
      aria-label={lit ? tr('diyaLit', lang) : tr('diyaUnlit', lang)}
      style={{ flex: 'none', overflow: 'visible' }}
    >
      {lit && (
        <>
          <circle cx="24" cy="13" r="16" fill={glow} opacity=".3" />
          <circle cx="24" cy="13" r="9" fill="#FFD982" opacity=".5" />
        </>
      )}
      <path
        className="flame"
        d="M24 3 C31 11 31 16 24 21 C17 16 17 11 24 3 Z"
        fill={lit ? '#FFE9A8' : 'none'}
        stroke={lit ? '#FFB938' : '#8B7E66'}
        strokeWidth="1.5"
      />
      <path d="M4 22 Q4 37 24 37 Q44 37 44 22 Z" fill="#A8741A" />
      <path d="M4 22 Q24 29 44 22 Q24 16 4 22 Z" fill="#F2B84B" />
      <rect x="19" y="36" width="10" height="3" rx="1.5" fill="#7A5210" />
    </svg>
  );
}

/** Decorative diya (no accessible name), used in repeated rows. */
export function DiyaRow({ lit, total = 3, size = 26, glow }: { lit: number; total?: number; size?: number; glow: string }) {
  return (
    <span aria-hidden="true" style={{ display: 'inline-flex', gap: 2, flex: 'none' }}>
      {Array.from({ length: total }, (_, i) => (
        <Diya key={i} lit={i < lit} size={size} glow={glow} />
      ))}
    </span>
  );
}
