import type { PlatformDef } from "../levels/level01";
import { COLORS } from "../config";

export function spawnPlatform(def: PlatformDef) {
  add([
    pos(def.x, def.surfaceY),
    rect(def.w, 8),
    anchor("topleft"),
    color(...COLORS.roof),
    outline(2, rgb(...COLORS.platformOutline)),
    z(2),
    "scrollable",
  ]);

  const base = [
    pos(def.x, def.surfaceY),
    rect(def.w, def.h),
    anchor("topleft"),
    color(...COLORS.building),
    outline(3, rgb(...COLORS.platformOutline)),
    area(),
    body({ isStatic: true }),
    z(1),
    "platform",
    "scrollable",
  ] as const;

  if (def.destructible) {
    return add([...base, "destructible", { platformDef: def }]);
  }
  return add([...base, { platformDef: def }]);
}

export function spawnBackgroundSilhouettes() {
  const silhouettes = [
    { x: 600, top: 90, w: 90, h: 200 },
    { x: 1100, top: 60, w: 120, h: 240 },
    { x: 1750, top: 100, w: 100, h: 190 },
  ];

  for (const s of silhouettes) {
    add([
      pos(s.x, s.top),
      rect(s.w, s.h),
      anchor("topleft"),
      color(...COLORS.buildingDark),
      opacity(0.4),
      z(0),
      "scrollable",
    ]);
  }
}
