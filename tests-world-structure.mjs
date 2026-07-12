import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const registry = await readFile(new URL('./lib/world-component-registry.ts', import.meta.url), 'utf8');
const studio = await readFile(new URL('./components/studio/WorldStructureStudio.tsx', import.meta.url), 'utf8');
const page = await readFile(new URL('./app/studio/design/page.tsx', import.meta.url), 'utf8');

assert.match(registry, /worldComponentRegistry/);
assert.match(registry, /createDefaultWorldStructure/);
assert.match(studio, /draggable/);
assert.match(studio, /sectionStructure/);
assert.match(studio, /dataTransfer\.setData/);
assert.match(studio, /visible: !entry\.visible/);
assert.match(page, /WorldStructureStudio/);

console.log('World structure verification passed.');
