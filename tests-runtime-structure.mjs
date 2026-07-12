import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const runtime = await readFile(new URL('./components/runtime/WorldStructuredRuntime.tsx', import.meta.url), 'utf8');
const schmackinn = await readFile(new URL('./components/worlds/SchmackinnWorldExperience.tsx', import.meta.url), 'utf8');

assert.match(runtime, /sectionStructure/);
assert.match(runtime, /filter\(\(item\) => item\.visible/);
assert.match(runtime, /sort\(\(left, right\) => left\.order - right\.order\)/);
assert.match(runtime, /data-world-section/);
assert.match(schmackinn, /WorldStructuredRuntime/);
assert.match(schmackinn, /id: 'hero'/);
assert.match(schmackinn, /id: 'featured'/);
assert.match(schmackinn, /id: 'collections'/);
assert.match(schmackinn, /id: 'community'/);

console.log('Runtime structure verification passed.');
