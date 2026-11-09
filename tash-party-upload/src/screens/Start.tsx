import { useApp } from '../state';
import { tr } from '../data/copy';
import { Diya } from '../components/Diya';
import { Button } from '../components/Button';
import { href } from '../router';
import { byId } from '../data';
import { track } from '../lib/analytics';

export function Start() {
  const { players, setPlayers, lang, setLang, bigText, setBigText, activeId, round, resetGame } = useApp();
  const active = byId(activeId ?? undefined);
  const t = (k: Parameters<typeof tr>[0]) => tr(k, lang);
  return (
    <>
      <div className="start-controls">
        <div className="seg" role="group" aria-label="Language">
          <button type="button" className="chip-toggle" aria-pressed={lang === 'en'}
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}>EN</button>
          <button type="button" className="chip-toggle" disabled title={tr('hindiSoon', 'hi')}
            aria-label={`हिं (${tr('hindiSoon', 'hi')})`}>हिं</button>
        </div>
        <button type="button" className="chip-toggle" aria-pressed={bigText} onClick={() => setBigText(!bigText)}>
          {t('bigText')}
        </button>
      </div>
      <main className="screen center" style={{ paddingTop: 44 }}>
        {active && (
          <section className="card resume" aria-label={t('inProgress')}>
            <p>{t('inProgress')}: <strong>{active.name} · {t('round')} {round}</strong></p>
            <div className="stack" style={{ marginTop: 10 }}>
              <Button href={href(`/round/${active.id}`)}>{t('keepGoing')}</Button>
              <Button kind="secondary" onClick={resetGame}>{t('newGame')}</Button>
            </div>
          </section>
        )}
        <p className="label">{t('eyebrow')}</p>
        <h1 className="display start-title">{t('startTitle')}</h1>
        <p className="muted">{t('startSub')}</p>
        <div className="ring">
          <div className="ring-hub">
            <span className="ring-count" aria-live="polite" aria-atomic="true">{players}</span>
            <span className="muted">{t('log')}</span>
          </div>
          {Array.from({ length: 10 }, (_, i) => {
            const a = ((-90 + i * 36) * Math.PI) / 180;
            return (
              <span key={i} className="ring-slot" aria-hidden="true"
                style={{ left: 150 + 128 * Math.cos(a) - 18, top: 150 + 128 * Math.sin(a) - 18 }}>
                <Diya lit={i < players} size={36} />
              </span>
            );
          })}
        </div>
        <div className="counter">
          <button type="button" className="round-btn" aria-label={t('fewer')} disabled={players <= 2}
            onClick={() => setPlayers(players - 1)}>−</button>
          <span className="muted">{t('range')}</span>
          <button type="button" className="round-btn" aria-label={t('more')} disabled={players >= 10}
            onClick={() => setPlayers(players + 1)}>+</button>
        </div>
        <Button href={href('/choose')} onClick={() => track('players_set', { players })}>{t('next')}</Button>
        <p className="foot">{t('footer')}</p>
      </main>
    </>
  );
}
