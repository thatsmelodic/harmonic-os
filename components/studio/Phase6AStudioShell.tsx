'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { EditorCommandBar } from '@/components/studio/EditorCommandBar';
import { useEditorHistory } from '@/components/studio/useEditorHistory';
import { useWorldCustomization, type WorldCustomizationStore, type WorldKey } from '@/components/studio/WorldCustomizationProvider';

const SECRET_KEY = 'harmonic-studio-secret-session';
const WORLD_KEYS: WorldKey[] = ['global', 'home', 'melodic', 'fried-em', 'schmackinn', 'two-harmonic'];

function snapshot(value: WorldCustomizationStore) {
  return JSON.stringify(value);
}

export function Phase6AStudioShell({ children }: { children: ReactNode }) {
  const { settings, replaceSettings, saveDraft, publishWorld, cloudStatus } = useWorldCustomization();
  const history = useEditorHistory(settings, { limit: 75 });
  const [focusedWorld, setFocusedWorld] = useState<WorldKey>('schmackinn');
  const [message, setMessage] = useState('Phase 6A history ready.');
  const observedRef = useRef(settings);
  const applyingHistoryRef = useRef(false);
  const pendingHistoryActionRef = useRef(false);

  useEffect(() => {
    if (applyingHistoryRef.current) {
      applyingHistoryRef.current = false;
      observedRef.current = settings;
      return;
    }

    if (snapshot(observedRef.current) === snapshot(settings)) return;

    const changedWorld = WORLD_KEYS.find(
      (key) => JSON.stringify(observedRef.current[key]) !== JSON.stringify(settings[key]),
    );

    if (changedWorld) setFocusedWorld(changedWorld);
    observedRef.current = settings;
    history.commit(settings);
  }, [settings, history]);

  useEffect(() => {
    if (!pendingHistoryActionRef.current) return;
    pendingHistoryActionRef.current = false;
    applyingHistoryRef.current = true;
    observedRef.current = history.value;
    replaceSettings(history.value);
  }, [history.value, replaceSettings]);

  const undo = useCallback(() => {
    if (!history.canUndo) return;
    pendingHistoryActionRef.current = true;
    history.undo();
    setMessage('Undid the last Studio change.');
  }, [history]);

  const redo = useCallback(() => {
    if (!history.canRedo) return;
    pendingHistoryActionRef.current = true;
    history.redo();
    setMessage('Restored the next Studio change.');
  }, [history]);

  const getSecret = useCallback(() => window.sessionStorage.getItem(SECRET_KEY) || '', []);

  const save = useCallback(async () => {
    const secret = getSecret();
    if (!secret) {
      setMessage('Open Publishing and authenticate with the Studio Secret before saving.');
      return;
    }
    setMessage(`Saving ${focusedWorld} draft…`);
    const ok = await saveDraft(focusedWorld, secret);
    setMessage(ok ? `${focusedWorld} draft saved.` : 'Draft save failed. Check Studio authentication and Supabase.');
  }, [focusedWorld, getSecret, saveDraft]);

  const publish = useCallback(async () => {
    const secret = getSecret();
    if (!secret) {
      setMessage('Open Publishing and authenticate with the Studio Secret before publishing.');
      return;
    }
    if (!window.confirm(`Publish ${focusedWorld} to the public world?`)) return;
    setMessage(`Publishing ${focusedWorld}…`);
    const ok = await publishWorld(focusedWorld, secret, `${focusedWorld} Phase 6A publish`);
    setMessage(ok ? `${focusedWorld} published.` : 'Publish failed. Check Studio authentication and Supabase.');
  }, [focusedWorld, getSecret, publishWorld]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches('input, textarea, select, [contenteditable="true"]');
      if (typing) return;
      const command = event.metaKey || event.ctrlKey;
      if (!command) return;

      if (event.key.toLowerCase() === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if ((event.key.toLowerCase() === 'z' && event.shiftKey) || event.key.toLowerCase() === 'y') {
        event.preventDefault();
        redo();
      } else if (event.key.toLowerCase() === 's') {
        event.preventDefault();
        void save();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [redo, save, undo]);

  const isUnsaved = cloudStatus === 'dirty';

  return (
    <div className="mx-auto max-w-[96rem]">
      <EditorCommandBar
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        isUnsaved={isUnsaved}
        saving={cloudStatus === 'saving'}
        onUndo={undo}
        onRedo={redo}
        onSaveDraft={() => void save()}
        onPublish={() => void publish()}
      />
      <div className="mb-4 mt-2 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-white/45">
        <span>{message}</span>
        <span className="font-black uppercase tracking-[.16em]">History {history.historyLength}/75 · Active {focusedWorld}</span>
      </div>
      {children}
    </div>
  );
}
