'use client';

import { TwoHarmonicDynastyCanvas } from './TwoHarmonicDynastyCanvas';
import { WebGLDistrictCanvasV3, type WebGLDistrictCanvasProps } from './WebGLDistrictCanvasV3';

export function WebGLDistrictCanvas(props: WebGLDistrictCanvasProps) {
  if (props.district === 'two-harmonic') {
    return <TwoHarmonicDynastyCanvas {...props} />;
  }
  return <WebGLDistrictCanvasV3 {...props} />;
}

export type { WebGLDistrictCanvasProps };
