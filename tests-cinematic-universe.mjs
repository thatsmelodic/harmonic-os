import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const experience = await readFile(new URL('./components/universe/UniverseExperience.tsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('./components/universe/UniverseExperience.module.css', import.meta.url), 'utf8');

assert.match(experience, /Schmackinn cup pouring into Harmonic OS/);
assert.match(experience, /Enter the frequency/);
assert.match(experience, /Real place first/);
assert.match(experience, /\/worlds\/two-harmonic\/collections/);
assert.match(experience, /Orange Dawn/);
assert.match(experience, /Night Session/);
assert.doesNotMatch(experience, /rooms\[0\]\?\.icon/);
assert.doesNotMatch(experience, /Explore Frequencies/);
assert.match(styles, /@keyframes pour/);
assert.match(styles, /@keyframes flood/);
assert.match(styles, /\.districtGrid/);
assert.match(styles, /prefers-reduced-motion/);

console.log('Cinematic universe verification passed.');
