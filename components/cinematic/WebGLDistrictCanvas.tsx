'use client';

import { TwoHarmonicBeigeDynastyCanvas } from './TwoHarmonicBeigeDynastyCanvas';
import { WebGLDistrictCanvasV3, type WebGLDistrictCanvasProps } from './WebGLDistrictCanvasV3';

export function WebGLDistrictCanvas(props: WebGLDistrictCanvasProps) {
  if (props.district === 'two-harmonic') {
    return <TwoHarmonicBeigeDynastyCanvas {...props} />;
  }
  return <WebGLDistrictCanvasV3 {...props} />;
}

export type { WebGLDistrictCanvasProps };
