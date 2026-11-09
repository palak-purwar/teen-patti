import { useEffect, useRef, useState } from 'react';
import { useApp } from '../state';
import { tr, bi, pattes, levelLabel } from '../data/copy';
import { byId, LEVEL_COLOR, LEVEL_LIT } from '../data';
import type { Lang, Variant } from '../data/types';
import { Button, BackIcon } from '../components/Button';
import { Diya, DiyaRow } from '../components/Diya';
import { BigCard } from '../components/PlayingCard';
import { isRed } from '../data/ranking';
import { href, go } from '../router';
import { track } from '../lib/analytics';
import { NotFound } from './NotFound';

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = ['♠', '♥', '♦', '♣'];
const ODD = ['A', '3', '5', '7', '9', 'J', 'K'];
type Card = { rank: string; suit: string };

function drawMeaning(draw: NonNullable<Variant['draw']>, c: Card | null, lang: Lang) {
  const hi = lang === 'hi';
  if (!c) {
    return {
      suit: hi ? 'Nikle patte ka poora suit (13 patte) joker.' : 'The whole suit of the pulled card (13 cards) is joker.',
      rank: hi ? 'Nikle patte ki rank ke chaaron patte joker.' : 'All four cards of the pulled rank are jokers.',
      color: hi ? 'Laal: Plain. Kaala: Muflis.' : 'Red: Plain. Black: Muflis.',
      rankRange: hi ? 'Nikli rank aur uske upar-neeche ki rank joker (12 patte).' : 'The pulled rank and the ranks above and below are jokers (12 cards).',
      oddEven: hi ? 'Odd rank: odd patte joker. Even rank: even patte joker.' : 'Odd rank: odd cards are jokers. Even rank: even cards are jokers.',
    }[draw];
  }
  switch (draw) {
    case 'suit': return hi ? `Nikla ${c.suit}: saare 13 ${c.suit} patte joker hain.` : `Drew ${c.suit}: all 13 ${c.suit} cards are jokers.`;
    case 'rank': return hi ? `Nikla ${c.rank}: chaaron ${c.rank} joker hain.` : `Drew ${c.rank}: all four ${c.rank}s are jokers.`;
    case 'color': return isRed(c.suit)
      ? (hi ? 'Laal nikla: Plain khelein. Sabse bada hand jeetta hai.' : 'Red: play Plain. The best hand wins.')
      : (hi ? 'Kaala nikla: Muflis khelein. Sabse kam hand jeetta hai.' : 'Black: play Muflis. The lowest hand wins.');
    case 'rankRange': {
      const i = RANKS.indexOf(c.rank);
      const set = [RANKS[(i + 12) % 13], c.rank, RANKS[(i + 1) % 13]].join(', ');
      return hi ? `Nikla ${c.rank}: ${set} joker hain (har suit ke).` : `Drew ${c.rank}: ${set} are jokers (every suit).`;
    }
    case 'oddEven': {
      const odd = ODD.includes(c.rank);
      return odd
        ? (hi ? `Nikla ${c.rank} (odd): saare odd patte joker. A, 3, 5, 7, 9, J, K.` : `Drew ${c.rank} (odd): every odd card is a joker. A, 3, 5, 7, 9, J, K.`)
        : (hi ? `Nikla ${c.rank} (even): saare even patte joker. 2, 4, 6, 8, 10, Q.` : `Drew ${c.rank} (even): every even card is a joker. 2, 4, 6, 8, 10, Q.`);
    }
  }
}

export function Round({ id }: { id: string }) {
  const { lang, players, round, dealerIndex, nextRound, setActive, resetGame } = useApp();
  const [confirm, setConfirm] = useState(false);
  const [moment, setMoment] = useState(false);
  const [card, setCard] = useState<Card | null>(null);
  const [house, setHouse] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => { if (byId(id)) setActive(id); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const v = byId(id);
  if (!v) return <NotFound />;
  const t = (k: Parameters<typeof tr>[0]) => tr(k, lang);
  const color = LEVEL_COLOR[v.level];

  const draw = () => {
    const all = RANKS.flatMap((rank) => SUITS.map((suit) => ({ rank, suit })));
    setCard(all[Math.floor(Math.random() * all.length)]);
  };
  const advance = () => {
    if (moment) return;
    track('round_next', { variant: id, round });
    setMoment(true);
    timer.current = window.setTimeout(() => {
      nextRound();
      setCard(null);
      setMoment(false);
    }, 1700);
  };

  return (
    <>
      <main className="screen" aria-hidden={moment || undefined}>
        <div className="topbar">
          <a className="icon-btn" href={href('/choose')} aria-label={t('back')}><BackIcon /></a>
          <span className="label">{v.name.toUpperCase()} · {t('round')} {round}</span>
        </div>

        <section className="card dealer-card">
          <div>
            <div className="small-cap">{t('dealerNow')}</div>
            <div className="dealer-now" aria-live="polite">{t('seat')} {dealerIndex + 1}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="small-cap">{t('dealerNext')}</div>
            <div className="dealer-next">{t('seat')} {((dealerIndex + 1) % players) + 1}</div>
          </div>
        </section>

        <div className="level-line" style={{ margin: '0 0 12px' }}>
          <span className="label" style={{ color }}>
            {levelLabel(v, lang)} · {lang === 'hi' ? `HAR EK KO ${pattes(v.cardsEach, lang)}` : `${pattes(v.cardsEach, lang)} EACH`}
          </span>
          <DiyaRow lit={LEVEL_LIT[v.level]} glow={color} />
        </div>

        {players > v.max && (
          <p className="warn" role="alert">{t('tooMany').replace('<m>', String(v.max)).replace('<n>', String(players))}</p>
        )}

        {v.wild && (
          <section className="wild-card" aria-label={t('jokerCard')}>
            <div className="label">{t('jokerCard')}</div>
            <div className="wild-chips">
              {v.wild.map((r, i) => (
                <span key={r} className={`wchip${r.length > 1 ? ' two' : ''}`} style={{ animationDelay: `${i * 0.3}s` }}>{r}</span>
              ))}
              {v.wildNote && <span style={{ color: 'var(--haldi)', fontWeight: 600 }}>{bi(v.wildNote, lang)}</span>}
            </div>
          </section>
        )}

        {v.readAloud && (
          <section className="read-box">
            <div className="label">{t('readAloud')}</div>
            <p className="read-line">{bi(v.readAloud, lang)}</p>
          </section>
        )}

        {v.houseRule && (
          <button type="button" className="chip-toggle house" aria-pressed={house} onClick={() => setHouse(!house)}>
            {house ? t('houseOn') + ': ' : ''}{bi(v.houseRule, lang)}
          </button>
        )}

        {v.draw && (
          <section className="card joker-box">
            <div className="joker-row" style={{ marginTop: 0 }}>
              {card && <BigCard rank={card.rank} suit={card.suit} />}
              <p className="muted" style={{ flex: 1 }} aria-live="polite">{drawMeaning(v.draw, card, lang)}</p>
            </div>
            <div style={{ marginTop: 12 }}>
              <Button kind="secondary" onClick={draw}>
                {card ? t('drawAgain') : v.draw === 'color' ? t('drawCard') : t('drawJoker')}
              </Button>
            </div>
          </section>
        )}

        <details className="how">
          <summary>{lang === 'hi' ? 'Khel kaise chalta hai' : 'How the game works'}</summary>
          <ol>
            {v.setupSteps.map((s, i) => <li key={i}>{bi(s, lang)}</li>)}
          </ol>
        </details>

        <div className="stack" style={{ marginTop: 'auto', paddingTop: 16, alignItems: 'center' }}>
          <Button onClick={advance} disabled={moment} style={{ height: 60 }}>{t('nextRound')}</Button>
          <Button kind="secondary" href={href('/choose')}>{t('changeVariant')}</Button>
          <Button kind="link" href={href(`/rules/${v.id}`)}>{t('seeRules')}</Button>
          <Button kind="link" onClick={() => setConfirm(true)}>{t('resetLink')}</Button>
        </div>
      </main>
      {confirm && (
        <div className="overlay confirm" role="dialog" aria-modal="true" aria-label={t('resetTitle')} style={{ animation: 'none' }}>
          <div className="card confirm-box">
            <p className="display" style={{ fontSize: '1.6rem', color: 'var(--gold)' }}>{t('resetTitle')}</p>
            <p className="muted">{t('resetLine').replace('<n>', String(round))}</p>
            <Button onClick={() => { resetGame(); go('/start'); }}>{t('resetYes')}</Button>
            <Button kind="secondary" onClick={() => setConfirm(false)} autoFocus>{t('resetNo')}</Button>
          </div>
        </div>
      )}
      {moment && (
        <div className="overlay" role="status">
          <Diya lit size={96} />
          <p className="display">{t('laxmi')}</p>
          <p className="muted">
            {lang === 'hi' ? `Round ${round} ho gaya. Round ${round + 1} shuru.` : `Round ${round} done. Round ${round + 1} begins.`}
          </p>
        </div>
      )}
    </>
  );
}
