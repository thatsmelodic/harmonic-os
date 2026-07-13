# Harmonic OS district asset production

The WebGL runtime is now ready for authored GLB environments rather than only procedural browser geometry.

## Generate the first custom asset pack

Install Blender 4.x, then run from the repository root:

```bash
blender -b --python scripts/blender/generate_harmonic_districts.py
```

The generator creates:

```text
public/models/two-harmonic/fashion-house.glb
public/models/fried-em/blacktop-park.glb
public/models/schmackinn/flavor-city-block.glb
public/models/melodic/recording-complex.glb
public/models/business/financial-skyline.glb
```

These paths already match `data/district-models.ts`, so the runtime loads them automatically when present. Procedural environments remain behind them as a fallback and surrounding city layer.

## Visual targets

### 2 Harmonic
- Monumental cream-stone fashion house
- Reflective runway and private gallery towers
- Interlocked glowing rings representing harmony
- Three garment sculptures ready to be replaced by final hoodie and tee models

### Fried Em
- Full blacktop slab
- Backboard, illuminated rim, scoreboard and court lighting
- Strong orange dawn material language
- Space reserved for animated player silhouettes

### Schmackinn
- Three-building restaurant block
- Neon signs, glowing windows and food truck
- Lighting authored for reflective wet pavement
- Steam and rain remain real-time effects in the browser

### Melodic
- Twin speaker towers
- Studio core, equalizer architecture and frequency portal
- Emissive violet materials designed to react well with cinematic bloom

### Business
- Four metallic capital towers
- Window grids, founder plaza and floating capital orb
- High-reflection materials for morning glass lighting

## Asset rules

- Export one GLB per major district landmark.
- Keep each district hero asset below 8 MB after Draco compression.
- Use meters and apply transforms before export.
- Keep the world origin near the main entrance.
- Use PBR materials only.
- Name animated clips clearly, such as `GarmentFloat`, `CrowdIdle`, or `StudioPulse`.
- Avoid baked text in geometry when live HTML labels can be used instead.

## Next art pass

The generator establishes architecture and scale. The next authored pass should replace simplified geometry with sculpted facades, real garments, court props, restaurant interiors, studio equipment, traffic, foliage and character silhouettes while preserving these same origins and file paths.
