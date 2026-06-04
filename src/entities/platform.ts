import type { PlatformDef } from "../levels/level01";
import { PHYSICS } from "../config";
import { PLATFORM_SPRITES } from "../assets/platformSprites";

type StreamOpts = { chunkId: number };

export function spawnPlatform(def: PlatformDef, stream?: StreamOpts) {
  const streamComp = stream
    ? (["stream-object", { chunkId: stream.chunkId }] as const)
    : [];

  add([
    pos(def.x, def.surfaceY),
    sprite(PLATFORM_SPRITES.building, { width: def.w, height: def.h }),
    anchor("topleft"),
    z(10),
    "platform-building",
    "scrollable",
    ...streamComp,
  ]);

  add([
    pos(def.x, def.surfaceY),
    sprite(PLATFORM_SPRITES.roof, { width: def.w, height: 8 }),
    anchor("topleft"),
    z(12),
    "platform-roof",
    "scrollable",
    ...streamComp,
  ]);

  const surface = [
    pos(def.x, def.surfaceY),
    rect(def.w, PHYSICS.surfaceColliderHeight),
    anchor("topleft"),
    area(),
    body({ isStatic: true }),
    opacity(0),
    z(11),
    "platform",
    "scrollable",
    ...streamComp,
  ] as const;

  if (def.destructible) {
    return add([...surface, "destructible", { platformDef: def }]);
  }
  return add([...surface, { platformDef: def }]);
}
