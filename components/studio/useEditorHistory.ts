'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

export type EditorHistoryState<T> = {
  past: T[];
  present: T;
  future: T[];
};

type EditorHistoryOptions<T> = {
  limit?: number;
  equals?: (left: T, right: T) => boolean;
};

const defaultEquals = <T,>(left: T, right: T) => JSON.stringify(left) === JSON.stringify(right);

/**
 * Shared undo/redo foundation for every Harmonic OS world editor.
 *
 * The hook keeps transient Studio edits local until the existing save/publish
 * pipeline is explicitly invoked. This lets live preview remain immediate
 * without creating accidental Supabase writes for every control movement.
 */
export function useEditorHistory<T>(initialValue: T, options: EditorHistoryOptions<T> = {}) {
  const { limit = 75, equals = defaultEquals } = options;
  const [history, setHistory] = useState<EditorHistoryState<T>>({
    past: [],
    present: initialValue,
    future: [],
  });
  const transactionStart = useRef<T | null>(null);

  const commit = useCallback(
    (next: T | ((current: T) => T)) => {
      setHistory((current) => {
        const value = typeof next === 'function' ? (next as (current: T) => T)(current.present) : next;
        if (equals(current.present, value)) return current;

        return {
          past: [...current.past, current.present].slice(-limit),
          present: value,
          future: [],
        };
      });
    },
    [equals, limit],
  );

  const replace = useCallback((value: T) => {
    setHistory({ past: [], present: value, future: [] });
    transactionStart.current = null;
  }, []);

  const undo = useCallback(() => {
    setHistory((current) => {
      const previous = current.past.at(-1);
      if (previous === undefined) return current;

      return {
        past: current.past.slice(0, -1),
        present: previous,
        future: [current.present, ...current.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((current) => {
      const next = current.future[0];
      if (next === undefined) return current;

      return {
        past: [...current.past, current.present].slice(-limit),
        present: next,
        future: current.future.slice(1),
      };
    });
  }, [limit]);

  const beginTransaction = useCallback(() => {
    setHistory((current) => {
      transactionStart.current ??= current.present;
      return current;
    });
  }, []);

  const endTransaction = useCallback(() => {
    const start = transactionStart.current;
    transactionStart.current = null;
    if (start === null) return;

    setHistory((current) => {
      if (equals(start, current.present)) return current;
      return {
        past: [...current.past.filter((item) => !equals(item, start)), start].slice(-limit),
        present: current.present,
        future: [],
      };
    });
  }, [equals, limit]);

  return useMemo(
    () => ({
      value: history.present,
      canUndo: history.past.length > 0,
      canRedo: history.future.length > 0,
      historyLength: history.past.length,
      commit,
      replace,
      undo,
      redo,
      beginTransaction,
      endTransaction,
    }),
    [history, commit, replace, undo, redo, beginTransaction, endTransaction],
  );
}
