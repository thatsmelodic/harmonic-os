# Harmonic OS WebGL District Engine

## Current implementation

The cinematic district shell now contains a real Three.js scene rendered through React Three Fiber. The prior CSS environment remains available as a fallback for browsers without WebGL and can also be toggled from the interface.

## Shared world systems

- Smooth landmark-to-landmark camera interpolation
- Pointer-driven camera drift
- Perspective camera and fog depth
- Dynamic directional, hemisphere, point, emissive, and ambient lighting
- Real mesh-based roads, buildings, windows, grounds, props, and district monuments
- Cinematic and performance render modes
- Device-pixel-ratio control
- Optional shadows, stars, sparkles, and atmospheric particles
- WebGL capability detection and CSS fallback

## District architecture

### Harmonic City
A connected skyline with a central boulevard and repeated depth layers. The camera routes reveal the different district directions from one unified city.

### 2 Harmonic
A cream-stone runway, monumental showroom blocks, glowing insignias, and floating sculptural garment forms.

### Fried Em
A real mesh blacktop, backboard, rim, scoreboard, court environment, and floating basketball under orange directional light.

### Schmackinn
Neon restaurant buildings, illuminated windows, a food-truck form, steam-like particles, and a wet nighttime palette.

### Melodic
Speaker towers, emissive cones, animated equalizer architecture, dark glass buildings, and midnight frequency lighting.

### Business
Tall metallic towers, reflective surfaces, controlled morning light, and an elevated financial skyline.

## Main files

- `components/cinematic/WebGLDistrictCanvas.tsx`
- `components/cinematic/CinematicDistrictScene.tsx`
- `data/cinematic-districts.ts`

## Next asset stage

The engine is ready for optimized `.glb` models. Future model files should be placed under `public/models/<district>/`, compressed with Draco or Meshopt, and loaded lazily by district so the homepage does not download every world at once.
