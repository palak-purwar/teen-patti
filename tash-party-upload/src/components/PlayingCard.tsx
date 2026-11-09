import { parseCard, isRed } from '../data/ranking';

export function MiniCard({ card }: { card: string }) {
  const p = parseCard(card);
  if (!p) return null;
  return (
    <span className={`mini${isRed(p.suit) ? ' red' : ''}`} aria-label={`${p.rank} ${p.suit}`} role="img">
      <span aria-hidden="true">{p.rank}</span>
      <span aria-hidden="true">{p.suit}</span>
    </span>
  );
}

export function MiniCards({ cards }: { cards: string[] }) {
  return (
    <span className="mini-cards">
      {cards.map((c, i) => (
        <MiniCard key={i} card={c} />
      ))}
    </span>
  );
}

export function BigCard({ rank, suit }: { rank: string; suit: string }) {
  return (
    <div className={`big-card${isRed(suit) ? ' red' : ''}`} role="img" aria-label={`${rank} ${suit}`}>
      <span aria-hidden="true">{rank}</span>
      <span className="s" aria-hidden="true">{suit}</span>
    </div>
  );
}
