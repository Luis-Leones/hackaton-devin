import frame0Url from "../../Assets/Scene/Frame 0.png";
import frame1Url from "../../Assets/Scene/Frame 1.png";
import frame2Url from "../../Assets/Scene/Frame 2.png";
import frame3Url from "../../Assets/Scene/Frame 3.png";
import frame4Url from "../../Assets/Scene/Frame 4.png";

export const SCENE_SPRITES = {
  menu: "scene-menu",
  map: ["scene-map-1", "scene-map-2", "scene-map-3", "scene-map-4"] as const,
} as const;

/** Tamaño nativo de cada PNG (px). */
export const SCENE_FRAME_SIZE = {
  menu: { w: 325, h: 434 },
  map: [
    { w: 477, h: 434 },
    { w: 818, h: 433 },
    { w: 803, h: 432 },
    { w: 1024, h: 435 },
  ],
} as const;

/** Viewport del juego = Frame 1 (primer segmento del ciclo). */
export const GAME_CANVAS = SCENE_FRAME_SIZE.map[0];

const MAP_SOURCES = [frame1Url, frame2Url, frame3Url, frame4Url] as const;

export function loadSceneFrameSprites() {
  loadSprite(SCENE_SPRITES.menu, frame0Url);
  SCENE_SPRITES.map.forEach((name, i) => {
    loadSprite(name, MAP_SOURCES[i]);
  });
}

export type MapFrameLayout = {
  sprite: (typeof SCENE_SPRITES.map)[number];
  width: number;
  height: number;
};

/** Ciclo 1→4 a tamaño nativo (sin escalar). */
export function getMapFrameLayouts(): MapFrameLayout[] {
  return SCENE_SPRITES.map.map((sprite, i) => {
    const { w, h } = SCENE_FRAME_SIZE.map[i];
    return { sprite, width: w, height: h };
  });
}

export function mapCycleWidth(): number {
  return SCENE_FRAME_SIZE.map.reduce((sum, f) => sum + f.w, 0);
}

export const MAP_CANVAS_HEIGHT = Math.max(
  ...SCENE_FRAME_SIZE.map.map((f) => f.h),
);
