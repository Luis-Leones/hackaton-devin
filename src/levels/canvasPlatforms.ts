import type { PlatformDef } from "./level01";

/** Tejados visibles en el viewport (477×434); alineado con los techos del arte. */
export const CANVAS_FLOOR_Y = 165;

export const canvasPlatforms: PlatformDef[] = [
  { x: 0, surfaceY: CANVAS_FLOOR_Y, w: 477, h: 110 },
  { x: 200, surfaceY: CANVAS_FLOOR_Y, w: 280, h: 110 },
  { x: 460, surfaceY: CANVAS_FLOOR_Y, w: 240, h: 110 },

  { x: 680, surfaceY: 163, w: 200, h: 112 },
  { x: 860, surfaceY: 160, w: 180, h: 115 },
  { x: 1020, surfaceY: 165, w: 160, h: 110 },

  { x: 1170, surfaceY: 155, w: 140, h: 120 },
  { x: 1300, surfaceY: 173, w: 125, h: 98 },
  { x: 1410, surfaceY: 145, w: 120, h: 128 },
  { x: 1520, surfaceY: 167, w: 115, h: 108 },

  { x: 1630, surfaceY: 150, w: 105, h: 125 },
  { x: 1735, surfaceY: 133, w: 100, h: 140 },
  { x: 1835, surfaceY: 163, w: 95, h: 112 },
  { x: 1925, surfaceY: 120, w: 90, h: 90 },
  { x: 2010, surfaceY: 170, w: 85, h: 105 },

  { x: 2090, surfaceY: 140, w: 80, h: 132 },
  { x: 2170, surfaceY: 100, w: 72, h: 85 },
  { x: 2240, surfaceY: 155, w: 68, h: 115 },
  { x: 2305, surfaceY: 123, w: 65, h: 135 },
  { x: 2365, surfaceY: 85, w: 60, h: 80 },

  { x: 2420, surfaceY: 165, w: 150, h: 110 },
  { x: 2560, surfaceY: 113, w: 88, h: 92 },
  { x: 2645, surfaceY: 150, w: 78, h: 122 },
  { x: 2720, surfaceY: 100, w: 72, h: 85 },
  { x: 2790, surfaceY: 160, w: 100, h: 115 },
  { x: 2885, surfaceY: 117, w: 82, h: 138 },
];
