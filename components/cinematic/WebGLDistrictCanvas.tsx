'use client';

import { TwoHarmonicBeigeDynastyCanvas } from './TwoHarmonicBeigeDynastyCanvas';
import { WebGLDistrictCanvasV3, type WebGLDistrictCanvasProps } from './WebGLDistrictCanvasV3';

export type InteractiveWebGLDistrictCanvasProps = WebGLDistrictCanvasProps & {
  onSelectLandmark?: (index: number) => void;
};

export function WebGLDistrictCanvas(props: InteractiveWebGLDistrictCanvasProps) {
  if (props.district === 'two-harmonic') {
    return <TwoHarmonicBeigeDynastyCanvas {...props} />;
  }

  const { onSelectLandmark: _onSelectLandmark, ...baseProps } = props;
  return <WebGLDistrictCanvasV3 {...baseProps} />;
}

export type { WebGLDistrictCanvasProps };
