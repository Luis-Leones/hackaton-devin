import type { PlatformDef } from "../levels/level01";
import { COLORS } from "../config";
import { getScrollMarker } from "../systems/worldScroll";

type StreamOpts = { chunkId: number };

export function spawnPlatform(def: PlatformDef, stream?: StreamOpts) {
  const streamComp = stream
    ? (["stream-object", { chunkId: stream.chunkId }] as const)
    : [];

  const worldX = getScrollMarker() + def.x;

  add([
    pos(worldX, def.surfaceY),
    rect(def.w, 8),
    anchor("topleft"),
    color(rgb(...COLORS.roof)),
    outline(2, rgb(...COLORS.platformOutline)),
    z(15),
    "platform-roof",
    "scrollable",
    ...streamComp,
  ]);

  const tags = [
    pos(worldX, def.surfaceY),
    rect(def.w, def.h),
    anchor("topleft"),
    color(rgb(...COLORS.building)),
    outline(3, rgb(...COLORS.platformOutline)),
    area(),
    body({ isStatic: true }),
    z(14),
    "platform",
    "scrollable",
    { platformDef: def },
    ...streamComp,
  ] as const;

  if (def.destructible) {
    return add([...tags, "destructible"]);
  }
  return add([...tags]);
}
