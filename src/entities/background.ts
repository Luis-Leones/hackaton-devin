import { GAME } from "../config";
import {
  SCENE_SPRITES,
  SCENE_FRAME_SIZE,
  getMapFrameLayouts,
  MAP_CANVAS_HEIGHT,
  type MapFrameLayout,
} from "../assets/sceneFrames";

export function spawnMenuBackground() {
  const { w, h } = SCENE_FRAME_SIZE.menu;

  add([
    sprite(SCENE_SPRITES.menu, { width: w, height: h }),
    pos(GAME.width / 2, GAME.height / 2),
    anchor("center"),
    fixed(),
    z(-25),
  ]);
}

const MAP_BG_CYCLE_COPIES = 4;

function spawnMapBgSegment(layout: MapFrameLayout, worldX: number) {
  add([
    sprite(layout.sprite, {
      width: layout.width,
      height: layout.height,
    }),
    pos(worldX, MAP_CANVAS_HEIGHT),
    anchor("botleft"),
    z(-25),
    "map-bg",
    {
      worldX,
      segWidth: layout.width,
    },
  ]);
}

function syncMapBgToCamera() {
  const camX = camPos().x;

  for (const seg of get("map-bg")) {
    seg.pos.x = seg.worldX - camX;
  }
}

function mapBgWorldRightEdge(): number {
  let edge = 0;
  for (const seg of get("map-bg")) {
    edge = Math.max(edge, seg.worldX + seg.segWidth);
  }
  return edge;
}

function recycleMapBackground() {
  const leftBound = -GAME.width * 0.35;

  const offscreen = get("map-bg")
    .filter((seg) => seg.pos.x + seg.segWidth < leftBound)
    .sort((a, b) => a.pos.x - b.pos.x);

  if (offscreen.length === 0) return;

  let rightEdge = mapBgWorldRightEdge();

  for (const seg of offscreen) {
    seg.worldX = rightEdge;
    rightEdge += seg.segWidth;
  }
}

function buildMapBackground() {
  const layouts = getMapFrameLayouts();
  let worldX = 0;

  for (let copy = 0; copy < MAP_BG_CYCLE_COPIES; copy++) {
    for (const layout of layouts) {
      spawnMapBgSegment(layout, worldX);
      worldX += layout.width;
    }
  }
}

export function setupInfiniteMapBackground() {
  destroyAll("map-bg");
  buildMapBackground();
  syncMapBgToCamera();

  onUpdate(() => {
    syncMapBgToCamera();
    recycleMapBackground();
    syncMapBgToCamera();
  });
}
