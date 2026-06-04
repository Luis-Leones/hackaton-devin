import type { PlatformDef } from "../levels/level01";
import { COLORS } from "../config";

type StreamOpts = { chunkId: number };

export function spawnPlatform(def: PlatformDef, stream?: StreamOpts) {
  const streamComp = stream
    ? (["stream-object", { chunkId: stream.chunkId }] as const)
    : [];

  add([
    pos(def.x, def.surfaceY),
    rect(def.w, 8),
    anchor("topleft"),
    color(...COLORS.roof),
    outline(2, rgb(...COLORS.platformOutline)),
    z(2),
    "scrollable",
    ...streamComp,
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
    ...streamComp,
  ] as const;

  if (def.destructible) {
    return add([...base, "destructible", { platformDef: def }]);
  }
  return add([...base, { platformDef: def }]);
}
