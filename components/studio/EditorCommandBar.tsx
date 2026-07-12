'use client';

type EditorCommandBarProps = {
  canUndo: boolean;
  canRedo: boolean;
  isUnsaved: boolean;
  saving?: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
};

export function EditorCommandBar({
  canUndo,
  canRedo,
  isUnsaved,
  saving = false,
  onUndo,
  onRedo,
  onSaveDraft,
  onPublish,
}: EditorCommandBarProps) {
  return (
    <div className="sticky top-3 z-40 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/75 p-3 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo || saving}
          aria-label="Undo last Studio change"
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-black disabled:cursor-not-allowed disabled:opacity-30"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo || saving}
          aria-label="Redo last Studio change"
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-black disabled:cursor-not-allowed disabled:opacity-30"
        >
          Redo
        </button>
        <span className={`rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-[.18em] ${isUnsaved ? 'bg-amber-200 text-black' : 'bg-white/10 text-white/55'}`}>
          {isUnsaved ? 'Unsaved live preview' : 'Synced'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={saving}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-black disabled:opacity-40"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={onPublish}
          disabled={saving}
          className="rounded-full bg-purple-200 px-5 py-2 text-xs font-black text-black disabled:opacity-40"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
