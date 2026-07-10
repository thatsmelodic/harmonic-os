'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { harmonicProgressionDefaults } from '@/data/harmonic-progression';
import { addProgressionReward, saveProgressionSettings, type RewardInput } from '@/lib/supabase/progression-creator-client';

export function HarmonicProgressionStudio() {
  const [worldId, setWorldId] = useState('fried-em');
  const selected = useMemo(() => harmonicProgressionDefaults.find((item) => item.worldId === worldId) ?? harmonicProgressionDefaults[0], [worldId]);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [currencyName, setCurrencyName] = useState(selected.currencyName);
  const [currencyIcon, setCurrencyIcon] = useState(selected.currencyIcon);
  const [levelNames, setLevelNames] = useState(selected.levelNames.join(', '));
  const [constitutionTitle, setConstitutionTitle] = useState(selected.constitutionTitle);
  const [constitutionBody, setConstitutionBody] = useState(selected.constitutionBody);
  const [constitutionRequired, setConstitutionRequired] = useState(true);
  const [earningEnabled, setEarningEnabled] = useState(true);
  const [purchaseMultiplier, setPurchaseMultiplier] = useState(1);
  const [watchMultiplier, setWatchMultiplier] = useState(1);
  const [reward, setReward] = useState<RewardInput>({
    worldId,
    threshold: 100,
    title: '',
    description: '',
    rewardType: 'badge',
  });

  const resetFromWorld = (nextWorldId: string) => {
    const next = harmonicProgressionDefaults.find((item) => item.worldId === nextWorldId) ?? harmonicProgressionDefaults[0];
    setWorldId(nextWorldId);
    setCurrencyName(next.currencyName);
    setCurrencyIcon(next.currencyIcon);
    setLevelNames(next.levelNames.join(', '));
    setConstitutionTitle(next.constitutionTitle);
    setConstitutionBody(next.constitutionBody);
    setReward({ worldId: nextWorldId, threshold: 100, title: '', description: '', rewardType: 'badge' });
    setMessage('');
  };

  const saveSettings = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await saveProgressionSettings({
        worldId,
        currencyName,
        currencyIcon,
        levelNames: levelNames.split(',').map((item) => item.trim()).filter(Boolean),
        constitutionTitle,
        constitutionBody,
        constitutionRequired,
        earningEnabled,
        purchaseMultiplier,
        watchMultiplier,
      });
      setMessage('Progression language and constitution saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save progression settings.');
    } finally {
      setSaving(false);
    }
  };

  const saveReward = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await addProgressionReward({ ...reward, worldId });
      setReward({ worldId, threshold: 100, title: '', description: '', rewardType: 'badge' });
      setMessage('Reward added to the ladder.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not add reward.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-[2.8rem] border border-violet-300/15 bg-black/55 p-6 text-white shadow-[0_0_80px_rgba(139,92,246,.16)] backdrop-blur-2xl sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[.34em] text-violet-200/45">Harmonic Progression Engine</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">Name the culture.</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/55">Every world starts with a default progression name, level ladder, reward system, and constitution. Creators can change every part without changing the engine underneath.</p>
        </div>
        <label className="text-xs font-black uppercase tracking-[.18em] text-white/35">World
          <select value={worldId} onChange={(event) => resetFromWorld(event.target.value)} className="mt-2 block rounded-2xl border border-white/10 bg-[#130805] px-4 py-3 text-white outline-none">
            {harmonicProgressionDefaults.map((world) => <option key={world.worldId} value={world.worldId}>{world.worldName}</option>)}
          </select>
        </label>
      </div>

      {message && <p className="mt-6 rounded-2xl border border-violet-300/15 bg-violet-400/10 px-4 py-3 text-sm text-violet-100/80">{message}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <form onSubmit={saveSettings} className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
          <p className="text-xs font-black uppercase tracking-[.24em] text-violet-200/45">Community Language</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-[.35fr_.65fr]">
            <Field label="Icon" value={currencyIcon} onChange={setCurrencyIcon} />
            <Field label="Progress name" value={currencyName} onChange={setCurrencyName} />
          </div>
          <TextArea label="Level names, separated by commas" value={levelNames} onChange={setLevelNames} rows={3} />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <NumberField label="Purchase multiplier" value={purchaseMultiplier} onChange={setPurchaseMultiplier} step="0.1" min={0} />
            <NumberField label="Watch multiplier" value={watchMultiplier} onChange={setWatchMultiplier} step="0.1" min={0} />
          </div>
          <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.24em] text-violet-200/45">Community Constitution</p>
            <Field label="Title" value={constitutionTitle} onChange={setConstitutionTitle} />
            <TextArea label="Body" value={constitutionBody} onChange={setConstitutionBody} rows={5} />
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-white/60">
              <label className="flex items-center gap-2"><input type="checkbox" checked={constitutionRequired} onChange={(event) => setConstitutionRequired(event.target.checked)} /> Require acceptance</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={earningEnabled} onChange={(event) => setEarningEnabled(event.target.checked)} /> Earning enabled</label>
            </div>
          </div>
          <button disabled={saving} className="mt-6 w-full rounded-full bg-violet-400 px-6 py-4 text-sm font-black text-black disabled:opacity-50">{saving ? 'Saving…' : 'Save World Progression'}</button>
        </form>

        <div className="grid gap-6">
          <article className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(139,92,246,.2),rgba(0,0,0,.45)_70%)] p-6">
            <p className="text-xs font-black uppercase tracking-[.24em] text-violet-200/45">Live Preview</p>
            <div className="mt-5 flex items-center gap-3"><span className="text-4xl">{currencyIcon}</span><div><p className="text-sm text-white/40">Community progress</p><h2 className="text-4xl font-black tracking-[-.06em]">2,450 {currencyName}</h2></div></div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-violet-400" /></div>
            <p className="mt-3 text-sm text-white/50">Current title: {(levelNames.split(',').map((item) => item.trim()).filter(Boolean)[4] ?? 'Level 5')}</p>
          </article>

          <form onSubmit={saveReward} className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
            <p className="text-xs font-black uppercase tracking-[.24em] text-violet-200/45">Reward Ladder</p>
            <NumberField label={`Required ${currencyName}`} value={reward.threshold} onChange={(threshold) => setReward({ ...reward, threshold })} min={0} step="1" />
            <Field label="Reward name" value={reward.title} onChange={(title) => setReward({ ...reward, title })} />
            <TextArea label="Description" value={reward.description} onChange={(description) => setReward({ ...reward, description })} rows={3} />
            <label className="mt-4 block text-xs font-black uppercase tracking-[.16em] text-white/35">Reward type
              <select value={reward.rewardType} onChange={(event) => setReward({ ...reward, rewardType: event.target.value as RewardInput['rewardType'] })} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#130805] px-4 py-3 text-white outline-none">
                {['badge', 'discount', 'access', 'merch', 'experience', 'custom'].map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>
            <button disabled={saving} className="mt-6 w-full rounded-full border border-violet-300/20 bg-violet-400/10 px-6 py-4 text-sm font-black text-violet-100 disabled:opacity-50">Add Reward</button>
          </form>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {selected.defaultRewards.slice(0, 3).map((reward) => <article key={reward.threshold} className="rounded-[1.7rem] border border-white/10 bg-white/[.035] p-5"><p className="text-xs font-black uppercase tracking-[.18em] text-violet-200/45">{currencyIcon} {reward.threshold} {currencyName}</p><h3 className="mt-3 text-xl font-black">{reward.title}</h3><p className="mt-2 text-sm leading-6 text-white/48">{reward.description}</p></article>)}
      </div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="mt-4 block text-xs font-black uppercase tracking-[.16em] text-white/35">{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none" /></label>; }
function TextArea({ label, value, onChange, rows }: { label: string; value: string; onChange: (value: string) => void; rows: number }) { return <label className="mt-4 block text-xs font-black uppercase tracking-[.16em] text-white/35">{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none" /></label>; }
function NumberField({ label, value, onChange, min, step }: { label: string; value: number; onChange: (value: number) => void; min?: number; step?: string }) { return <label className="mt-4 block text-xs font-black uppercase tracking-[.16em] text-white/35">{label}<input type="number" value={value} min={min} step={step} onChange={(event) => onChange(Number(event.target.value))} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none" /></label>; }
