import { useApp } from '../state';
import { tr, bi } from '../data/copy';
import { byId } from '../data';
import { STANDARD_RANKING } from '../data/ranking';
import { CloseIcon } from '../components/Button';
import { MiniCards } from '../components/PlayingCard';
import { href } from '../router';
import { NotFound } from './NotFound';

export function Rules({ id }: { id: string }) {
  const { lang } = useApp();
  const v = byId(id);
  if (!v) return <NotFound />;
  const t = (k: Parameters<typeof tr>[0]) => tr(k, lang);
  const rows = v.ranking === 'reversed' ? [...STANDARD_RANKING].reverse() : STANDARD_RANKING;
  const winner = bi(v.setupSteps[v.setupSteps.length - 1], lang);

  return (
    <main className="screen rules">
      <div className="topbar" style={{ justifyContent: 'space-between', minHeight: 48 }}>
        <span className="label">{t('seeRules')}</span>
        <a className="icon-btn" href={href(`/round/${v.id}`)} aria-label={t('close')}><CloseIcon /></a>
      </div>
      <h1 className="rules-title">{v.name}</h1>
      <p className="muted" style={{ fontSize: '.875rem', marginBottom: 8 }}>{bi(v.summary, lang)}</p>

      {v.ranking === 'custom' ? (
        <>
          <div className="label section-label">{t('howWins')}</div>
          <p style={{ fontSize: '1.05rem' }}>{winner}</p>
        </>
      ) : (
        <>
          <div className="label section-label">{v.ranking === 'reversed' ? t('reversedLabel') : t('rankLabel')}</div>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {rows.map((r, i) => (
              <li key={r.rank} className="rank-row">
                <span className="rank-n">{i + 1}</span>
                <span className="rank-name">{bi(r.name, lang)}</span>
                <MiniCards cards={r.cards} />
              </li>
            ))}
          </ol>
          {v.ranking === 'reversed' && <p className="ex-note">{t('reversedNote')}</p>}
        </>
      )}

      {(v.wild || v.id === 'joker') && (
        <>
          <div className="label section-label">{t('jokerLabel')}</div>
          <div className="wild-chips" style={{ marginTop: 0 }}>
            {v.wild?.map((r) => <span key={r} className="wchip sm">{r}</span>)}
            <span style={{ flex: 1, minWidth: 140, fontSize: '.95rem' }}>
              {v.wild ? t('jokerLine') : t('jokerLineDraw')}
            </span>
          </div>
        </>
      )}

      {v.examples.length > 0 && (
        <>
          <div className="label section-label">{t('example')}</div>
          {v.examples.slice(0, 2).map((e, i) => (
            <div key={i} className="ex-row">
              <div className="ex-line">
                <MiniCards cards={e.cards} />
                <span aria-hidden="true" style={{ color: 'var(--gold)' }}>→</span>
                <span className="sr-only" style={{ position: 'absolute', left: -9999 }}>{lang === 'hi' ? 'natija' : 'result'}</span>
                <span className="ex-result">{e.result}</span>
              </div>
              <p className="ex-note">{bi(e.note, lang)}</p>
            </div>
          ))}
        </>
      )}
    </main>
  );
}
