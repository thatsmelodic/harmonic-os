import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const studio = await readFile(new URL('./components/studio/WorldDesignStudio.tsx', import.meta.url), 'utf8');
const history = await readFile(new URL('./components/studio/useEditorHistory.ts', import.meta.url), 'utf8');
const commandBar = await readFile(new URL('./components/studio/EditorCommandBar.tsx', import.meta.url), 'utf8');
const provider = await readFile(new URL('./components/studio/WorldCustomizationProvider.tsx', import.meta.url), 'utf8');

assert.match(studio, /useEditorHistory/, 'WorldDesignStudio must use shared editor history');
assert.match(studio, /EditorCommandBar/, 'WorldDesignStudio must render the shared command bar');
assert.match(studio, /metaKey\|\|event\.ctrlKey|event\.metaKey\|\|event\.ctrlKey/, 'Studio must support command/control keyboard shortcuts');
assert.match(studio, /key\.toLowerCase\(\)===['"]z['"]/, 'Studio must register undo/redo shortcut handling');
assert.match(studio, /key\.toLowerCase\(\)===['"]s['"]/, 'Studio must register save shortcut handling');
assert.match(history, /limit\s*=\s*75/, 'History must remain bounded to 75 entries by default');
assert.match(history, /canUndo/, 'History must expose undo availability');
assert.match(history, /canRedo/, 'History must expose redo availability');
assert.match(history, /beginTransaction/, 'History must support high-frequency edit transactions');
assert.match(commandBar, /Unsaved live preview/, 'Command bar must expose unsaved preview state');
assert.match(commandBar, /Save Draft/, 'Command bar must retain explicit draft saving');
assert.match(commandBar, /Publish/, 'Command bar must retain explicit publishing');
assert.match(provider, /replaceWorld/, 'Provider must expose atomic world replacement for undo and redo');
assert.match(provider, /setSettings/, 'Atomic restoration must update the shared settings store');

console.log('Phase 6A editor foundation checks passed.');
