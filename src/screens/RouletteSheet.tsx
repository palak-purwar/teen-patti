import { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../state';
import { tr, twistOf } from '../data/copy';
import { TAB_IDS, byId } from '../data';
import type { Variant } from '../data/types';
import { pickAndRotate } from '../lib/roulette';
import { Wheel } from '../components/Wheel';
import { Tabs } from '../components/Tabs';
import { Button, CloseIcon } from '../components/Button';
import { go } from '../router';
import { track } from '../lib/analytics';

type Scope = 'easy' | 'medium' | 'hard' | 'sab';
const ORDER = [...TAB_IDS.easy, ...TAB_IDS.medium, ...TAB_IDS.hard];

export function RouletteSheet({ initialScope, onClose }: { initialScope: Scope; onClose: () => void }) {
  const { lang, playedIds, addPlayed, clearPlayed, setSelectedId } = useApp();
  const t = (k: Parameters<typeof tr>[0]) => tr(k, lang);
  const [scope, setScope] = useState<Scope>(initialScope);
  const [rot, setRot] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const closeRef = useRef<HTMLButtonElement>(null);

  const scoped = useMemo(
    () => ORDER.map((id) => byId(id)!).filter((v) => v.inRoulette && (scope === 'sab' || v.level === scope)),
    [scope],
  );
  const pool: Variant[] = scoped.filter((v) => !playedIds.includes(v.id));

  useEffect(() => {
    closeRef.current?.focus();
    return () => window.clearTimeout(timer.current);
  }, []);

  const reset = () => {
    window.clearTimeout(timer.current);
    setAnimate(false);
    setRot(0);
    setLanded(null);
    setSpinning(false);
  };

  const spin = () => {
    if (spinning || pool.length === 0) return;
    track('roulette_spin', { scope });
    const { winner, newRot } = pickAndRotate(pool.length, rot);
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    setAnimate(true);
    setRot(newRot);
    setSpinning(true);
    timer.current = window.setTimeout(() => {
      setSpinning(false);
      setLanded(winner);
      setSelectedId(pool[winner].id);
    }, reduce ? 50 : 4400);
  };

  const result = landed !== null ? pool[landed] : null;

  const changeScope = (s: string) => {
    if (spinning) return;
    reset();
    setScope(s as Scope);
  };

  return (
    <div className="sheet" role="dialog" aria-label={t('rouletteLabel')}>
      <div className="sheet-top">
        <div>
          <div className="label">{t('rouletteLabel')}</div>
          <div className="muted" style={{ fontSize: '.9rem' }}>{pool.length} {t('variantsLeft')}</div>
        </div>
        <button ref={closeRef} type="button" className="icon-btn" aria-label={t('close')} onClick={onClose}><CloseIcon /></button>
      </div>
      <div style={{ width: '100%' }}>
        <Tabs label="Scope" value={scope} onChange={changeScope} items={[
          { id: 'easy', label: t('easy'), color: 'var(--peacock)' },
          { id: 'medium', label: t('medium'), color: 'var(--marigold)' },
          { id: 'hard', label: t('hard'), color: 'var(--rani)' },
          { id: 'sab', label: t('all'), color: 'var(--gold)' },
        ]} />
      </div>
      {pool.length > 0 ? (
        <>
          <Wheel pool={pool} rotation={rot} animate={animate} landed={landed} />
          <div className="result" aria-live="polite">
            {result && (
              <>
                <div className="label">{t('chosen')}</div>
                <div className="result-name">{result.name}</div>
                <div className="muted">{twistOf(result, lang)}</div>
              </>
            )}
          </div>
          <div className="stack" style={{ width: '100%', marginTop: 12 }}>
            {result ? (
              <>
                <Button onClick={() => { track('roulette_accepted', { variant: result.id }); track('variant_chosen', { variant: result.id, source: 'roulette' }); setSelectedId(result.id); go(`/round/${result.id}`); }}>{t('playThis')}</Button>
                <Button kind="secondary" onClick={() => { addPlayed(result.id); reset(); }}>{t('spinAgain')}</Button>
              </>
            ) : (
              <Button onClick={spin} disabled={spinning}>{spinning ? t('spinning') : t('spin')}</Button>
            )}
          </div>
        </>
      ) : (
        <div className="center stack" style={{ width: '100%', marginTop: 40 }} aria-live="polite">
          <div className="result-name">{t('allDone')}</div>
          <p className="muted">{t('allDoneSub')}</p>
          <Button onClick={() => { clearPlayed(scoped.map((v) => v.id)); reset(); }}>{t('refill')}</Button>
        </div>
      )}
    </div>
  );
}
