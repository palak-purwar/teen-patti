import { useState } from 'react';
import { useApp } from '../state';
import { tr, pattes, twistOf } from '../data/copy';
import { byId, tabVariants, LEVEL_COLOR, LEVEL_LIT } from '../data';
import type { Variant } from '../data/types';
import { Button, BackIcon, CheckIcon, WheelIcon } from '../components/Button';
import { Tabs } from '../components/Tabs';
import { DiyaRow } from '../components/Diya';
import { RouletteSheet } from './RouletteSheet';
import { href } from '../router';
import { track } from '../lib/analytics';

type Level = 'easy' | 'medium' | 'hard';

export function Choose() {
  const { lang, selectedId, setSelectedId, playedIds } = useApp();
  const t = (k: Parameters<typeof tr>[0]) => tr(k, lang);
  const selectedLevel = byId(selectedId)?.level;
  const [tab, setTab] = useState<Level>(selectedLevel && selectedLevel !== 'plain' ? selectedLevel : 'medium');
  const [sheet, setSheet] = useState(false);
  const plain = byId('plain')!;
  const list = tabVariants(tab);

  const closeSheet = () => {
    const l = byId(selectedId)?.level;
    if (l && l !== 'plain') setTab(l);
    setSheet(false);
  };

  const card = (v: Variant) => {
    const on = selectedId === v.id;
    const color = LEVEL_COLOR[v.level];
    const played = playedIds.includes(v.id);
    return (
      <button key={v.id} type="button" className={`pick${played ? ' played' : ''}`} aria-pressed={on}
        style={on ? { borderColor: color } : undefined} onClick={() => setSelectedId(v.id)}>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className="pick-name" style={{ display: 'block' }}>{v.name}</span>
          <span className="pick-twist" style={{ display: 'block' }}>{twistOf(v, lang)}</span>
          <span className="pick-meta" style={{ display: 'block', color }}>
            {pattes(v.cardsEach, lang)}{v.max < 10 ? ` · ${t('maxPlayers').toUpperCase()} ${v.max}` : ''}{played ? ` · ${t('played')}` : ''}
          </span>
        </span>
        <DiyaRow lit={LEVEL_LIT[v.level]} glow={color} />
      </button>
    );
  };

  const plainOn = selectedId === 'plain';
  return (
    <>
      <main className="screen fixed">
        <div className="topbar">
          <a className="icon-btn" href={href('/start')} aria-label={t('back')}><BackIcon /></a>
          <h1 className="display" style={{ fontSize: '2rem', fontWeight: 400 }}>{t('chooseTitle')}</h1>
        </div>
        <button type="button" className="pick" aria-pressed={plainOn}
          style={plainOn ? { borderColor: 'var(--gold)' } : undefined} onClick={() => setSelectedId('plain')}>
          <span style={{ flex: 1 }}>
            <span className="pick-name" style={{ display: 'block', fontSize: '1.5rem', color: 'var(--gold)' }}>{plain.name}</span>
            <span className="pick-twist" style={{ display: 'block' }}>{twistOf(plain, lang)}</span>
          </span>
          {plainOn && <span style={{ color: 'var(--gold)' }}><CheckIcon size={26} /></span>}
        </button>
        <Tabs label="Level" value={tab} onChange={(id) => setTab(id as Level)} items={[
          { id: 'easy', label: t('easy'), color: 'var(--peacock)' },
          { id: 'medium', label: t('medium'), color: 'var(--marigold)' },
          { id: 'hard', label: t('hard'), color: 'var(--rani)' },
        ]} />
        <div className="list">{list.map(card)}</div>
        <div className="bottom">
          <Button kind="secondary" onClick={() => setSheet(true)}><WheelIcon />{t('roulette')}</Button>
          <Button href={href(`/round/${selectedId}`)} disabled={!selectedId}
            onClick={() => (selectedId === 'plain' ? track('plain_chosen') : track('variant_chosen', { variant: selectedId, source: 'list' }))}>{t('briefingBtn')}</Button>
        </div>
      </main>
      {sheet && <RouletteSheet initialScope={tab} onClose={closeSheet} />}
    </>
  );
}
