import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const worldEngine = readFileSync('data/world-engine.ts', 'utf8');
assert.match(worldEngine, /slug: '2-harmonic'/, '2 Harmonic uses canonical slug');
assert.match(worldEngine, /'two-harmonic': '2-harmonic'/, 'legacy two-harmonic alias remains');
assert.match(worldEngine, /harmonic: '2-harmonic'/, 'legacy harmonic alias remains');

const studio = readFileSync('components/studio/WorldDesignStudio.tsx', 'utf8');
assert.match(studio, /preview:'\/worlds\/2-harmonic'/, 'Studio opens canonical 2 Harmonic live route');
assert.match(studio, /Save Draft/, 'Save Draft button exists');
assert.match(studio, /Publish Changes/, 'Publish Changes button exists');
assert.match(studio, /Reset Unsaved Changes/, 'Reset Unsaved Changes button exists');
assert.match(studio, /Previewing unsaved changes/, 'Unsaved preview banner exists');
assert.match(studio, /sessionStorage\.setItem\(SECRET_KEY,secret\)/, 'Studio secret is session scoped');
assert.doesNotMatch(studio, /alert\(/, 'World Design Studio has no alert-based save flow');

const shell = readFileSync('components/WorldEngineShell.tsx', 'utf8');
assert.match(shell, /Open Creator Studio/, 'Studio route is explicit');
assert.match(shell, /previewMode/, 'Public world renderer supports preview mode');

const runtime = readFileSync('components/runtime/HarmonicOSRuntime.tsx', 'utf8');
for (const route of ['/worlds/melodic', '/worlds/fried-em', '/worlds/schmackinn', '/worlds/2-harmonic', '/worlds/business']) {
  assert.match(runtime, new RegExp(route.replaceAll('/', '\\/')), `Runtime includes ${route}`);
}
assert.doesNotMatch(runtime, /href: '\/studio[^']*'.*label: '2 Harmonic'/s, '2 Harmonic runtime tile does not point at Studio');

const dock = readFileSync('components/FrequencyDock.tsx', 'utf8');
for (const route of ['/worlds/melodic', '/worlds/fried-em', '/worlds/schmackinn', '/worlds/2-harmonic', '/worlds/business']) {
  assert.match(dock, new RegExp(route.replaceAll('/', '\\/')), `FrequencyDock includes ${route}`);
}

const canonicalPage = readFileSync('app/worlds/2-harmonic/page.tsx', 'utf8');
assert.match(canonicalPage, /TwoHarmonicWorldExperience/, 'Canonical 2 Harmonic route renders the public fashion house experience');
assert.match(canonicalPage, /getTwoHarmonicCatalog/, 'Canonical 2 Harmonic route loads the same catalog as the public world');

console.log('routing and studio UX assertions passed');
