import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const runtime = await readFile(new URL('./components/runtime/WorldStructuredRuntime.tsx', import.meta.url), 'utf8');
const schmackinn = await readFile(new URL('./components/worlds/SchmackinnWorldExperience.tsx', import.meta.url), 'utf8');
const harmonicRuntime = await readFile(new URL('./components/runtime/HarmonicOSRuntime.tsx', import.meta.url), 'utf8');
const environment = await readFile(new URL('./components/runtime/LivingWorldEnvironment.tsx', import.meta.url), 'utf8');
const environmentCss = await readFile(new URL('./components/runtime/living-world-environment.css', import.meta.url), 'utf8');

assert.match(runtime, /sectionStructure/);
assert.match(runtime, /filter\(\(item\) => item\.visible/);
assert.match(runtime, /sort\(\(left, right\) => left\.order - right\.order\)/);
assert.match(runtime, /data-world-section/);
assert.match(schmackinn, /WorldStructuredRuntime/);
assert.match(schmackinn, /id: 'hero'/);
assert.match(schmackinn, /id: 'featured'/);
assert.match(schmackinn, /id: 'collections'/);
assert.match(schmackinn, /id: 'community'/);
assert.match(harmonicRuntime, /LivingWorldEnvironment/);
assert.match(harmonicRuntime, /\/worlds\/two-harmonic\/collections/);
assert.match(harmonicRuntime, /Liquid pour/);
assert.doesNotMatch(harmonicRuntime, /🏀|🍔|👕|📈/);
assert.match(environment, /environment-two-harmonic/);
assert.match(environment, /environment-fried-em/);
assert.match(environment, /environment-schmackinn/);
assert.match(environmentCss, /petal-fall/);
assert.match(environmentCss, /rain-fall/);
assert.match(environmentCss, /dust-rise/);
assert.match(environmentCss, /star-drift/);

console.log('Runtime structure and living environment verification passed.');
