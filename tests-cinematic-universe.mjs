import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const experience = await readFile(new URL('./components/universe/UniverseExperience.tsx', import.meta.url), 'utf8');
const scene = await readFile(new URL('./components/universe/UniverseScene.tsx', import.meta.url), 'utf8');
const data = await readFile(new URL('./components/universe/universeData.ts', import.meta.url), 'utf8');
const heart = await readFile(new URL('./components/universe/HarmonicHeart.tsx', import.meta.url), 'utf8');
const controls = await readFile(new URL('./components/universe/HeartMaterialControls.tsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('./components/universe/UniverseExperience.module.css', import.meta.url), 'utf8');

assert.match(experience, /UniverseScene/, 'Homepage delegates the universe to a modular scene component.');
assert.match(scene, /One Frequency\.<br \/>Many Worlds\./, 'Homepage communicates One Frequency. Many Worlds.');
assert.match(heart, /Interactive 3D 2 Harmonic interlocked heart logo/, 'Homepage centers the official 2 Harmonic heart identity.');
assert.match(heart, /onPointerDown=\{onPointerDown\}/, 'Heart supports pointer dragging.');
assert.match(scene, /CameraState/, 'Homepage has smooth camera movement state.');
assert.match(controls, /type="color"/, 'Heart material has custom color controls.');
assert.match(data, /Royal Gold/, 'Heart material presets are available.');
for (const route of ['/worlds/two-harmonic', '/worlds/melodic', '/worlds/fried-em', '/worlds/schmackinn', '/worlds/business']) {
  assert.match(data, new RegExp(route.replaceAll('/', '\\/')), `Homepage links to ${route}`);
}
assert.match(scene, /UniverseFallback/, 'Homepage includes a 2D fallback component.');
assert.match(styles, /transform-style: preserve-3d/, 'Homepage uses dimensional CSS 3D layers.');
assert.match(styles, /mask: url\('\/identity\/two-harmonic-mark-gold\.svg'\)/, 'Heart uses the official 2 Harmonic SVG as the geometry mask.');
assert.match(styles, /@keyframes orbitSpin/, 'Orbit animation exists.');
assert.match(styles, /@keyframes heartBreathe/, 'Heart breathing animation exists.');
assert.match(styles, /@supports not \(transform-style: preserve-3d\)/, 'Non-3D fallback is defined.');
assert.match(styles, /prefers-reduced-motion/, 'Reduced-motion support remains in place.');

console.log('Cinematic universe verification passed.');
