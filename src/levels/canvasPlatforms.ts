import { GAME } from "../config";
import type { PlatformDef } from "./level01";

/**
 * Coordenadas locales del canvas (477×434).
 * Al generar, se suma scrollMarker para que entren por la derecha del viewport.
 */
export const CANVAS_FLOOR_Y = 308;

export const canvasPlatforms: PlatformDef[] = [
  { x: 0, surfaceY: CANVAS_FLOOR_Y, w: 477, h: 118 },
  { x: 220, surfaceY: CANVAS_FLOOR_Y, w: 240, h: 118 },
  { x: 440, surfaceY: CANVAS_FLOOR_Y, w: 220, h: 118 },
  { x: 640, surfaceY: CANVAS_FLOOR_Y, w: 200, h: 118 },
  { x: 820, surfaceY: CANVAS_FLOOR_Y, w: 180, h: 118 },

  { x: 980, surfaceY: CANVAS_FLOOR_Y - 4, w: 160, h: 122 },
  { x: 1120, surfaceY: CANVAS_FLOOR_Y - 10, w: 150, h: 128 },
  { x: 1250, surfaceY: CANVAS_FLOOR_Y - 2, w: 140, h: 118 },

  { x: 1380, surfaceY: CANVAS_FLOOR_Y - 14, w: 125, h: 130 },
  { x: 1495, surfaceY: CANVAS_FLOOR_Y + 6, w: 110, h: 96 },
  { x: 1600, surfaceY: CANVAS_FLOOR_Y - 34, w: 115, h: 146 },
  { x: 1705, surfaceY: CANVAS_FLOOR_Y - 2, w: 120, h: 112 },

  { x: 1820, surfaceY: CANVAS_FLOOR_Y - 18, w: 100, h: 126 },
  { x: 1925, surfaceY: CANVAS_FLOOR_Y - 48, w: 95, h: 154 },
  { x: 2020, surfaceY: CANVAS_FLOOR_Y - 6, w: 88, h: 116 },
  { x: 2110, surfaceY: CANVAS_FLOOR_Y - 58, w: 82, h: 90 },
  { x: 2195, surfaceY: CANVAS_FLOOR_Y + 4, w: 78, h: 106 },

  { x: 2270, surfaceY: CANVAS_FLOOR_Y - 28, w: 72, h: 138 },
  { x: 2345, surfaceY: CANVAS_FLOOR_Y - 73, w: 68, h: 86 },
  { x: 2410, surfaceY: CANVAS_FLOOR_Y - 13, w: 65, h: 113 },
  { x: 2475, surfaceY: CANVAS_FLOOR_Y - 45, w: 62, h: 133 },
  { x: 2535, surfaceY: CANVAS_FLOOR_Y - 83, w: 58, h: 80 },

  { x: 2590, surfaceY: CANVAS_FLOOR_Y + 2, w: 150, h: 108 },
  { x: 2720, surfaceY: CANVAS_FLOOR_Y - 55, w: 90, h: 93 },
  { x: 2805, surfaceY: CANVAS_FLOOR_Y - 18, w: 80, h: 123 },
  { x: 2880, surfaceY: CANVAS_FLOOR_Y - 68, w: 70, h: 86 },
  { x: 2950, surfaceY: CANVAS_FLOOR_Y - 5, w: 100, h: 116 },
  { x: 3040, surfaceY: CANVAS_FLOOR_Y - 51, w: 82, h: 140 },
];

export const canvasStageLength = (): number => {
  let end = 0;
  for (const p of canvasPlatforms) {
    end = Math.max(end, p.x + p.w);
  }
  return Math.min(end, GAME.width * 6);
};
