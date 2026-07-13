import type { DistrictId } from './cinematic-districts';

export type DistrictModelAsset = {
  id: string;
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  animated?: boolean;
};

/**
 * Drop optimized GLB files into public/models/<district>/ and add them here.
 * Missing files fail quietly so the procedural environment remains usable.
 */
export const districtModelAssets: Record<DistrictId, DistrictModelAsset[]> = {
  universe: [],
  'two-harmonic': [
    { id: 'fashion-house', url: '/models/two-harmonic/fashion-house.glb', position: [0, -0.45, -7], scale: 1 },
    { id: 'garment-sculpture', url: '/models/two-harmonic/garment-sculpture.glb', position: [0, 1.3, -2], scale: 1, animated: true },
  ],
  'fried-em': [
    { id: 'blacktop-park', url: '/models/fried-em/blacktop-park.glb', position: [0, -0.5, -6], scale: 1 },
    { id: 'player-silhouettes', url: '/models/fried-em/player-silhouettes.glb', position: [0, -0.45, -3], scale: 1, animated: true },
  ],
  schmackinn: [
    { id: 'flavor-city-block', url: '/models/schmackinn/flavor-city-block.glb', position: [0, -0.5, -7], scale: 1 },
    { id: 'food-truck', url: '/models/schmackinn/food-truck.glb', position: [3, -0.35, -2], rotation: [0, -0.35, 0], scale: 1 },
  ],
  melodic: [
    { id: 'recording-complex', url: '/models/melodic/recording-complex.glb', position: [0, -0.45, -7], scale: 1 },
    { id: 'studio-interior', url: '/models/melodic/studio-interior.glb', position: [0, -0.25, -2], scale: 1 },
  ],
  business: [
    { id: 'financial-skyline', url: '/models/business/financial-skyline.glb', position: [0, -0.5, -8], scale: 1 },
  ],
};
