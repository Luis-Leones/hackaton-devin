import type { CoinDef, PowerUpDef } from "../levels/level01";
import {
  COLLECTIBLE_SPRITES,
  coinScale,
  powerUpScale,
} from "../assets/collectibleSprites";

/** Mismo tamaño de hitbox que el rombo del prototipo (POWERUP_SIZE = 24). */
const POWERUP_HIT_SIZE = 48;

/** Hitbox en px de mundo; Kaboom escala el area con el sprite. */
function worldHitRect(worldSize: number, objectScale: number) {
  const local = worldSize / objectScale;
  const half = local / 2;
  return new Rect(vec2(-half, -half), local, local);
}

export function spawnCoin(def: CoinDef, chunkId?: number) {
  const streamComp =
    chunkId !== undefined
      ? (["stream-object", { chunkId }] as const)
      : [];

  const scaleFactor = coinScale(def.r);

  return add([
    sprite(COLLECTIBLE_SPRITES.coin),
    pos(def.x, def.y),
    scale(scaleFactor),
    area({ shape: worldHitRect(def.r * 2, scaleFactor) }),
    anchor("center"),
    z(15),
    "coin",
    "scrollable",
    { collected: false },
    ...streamComp,
  ]);
}

export function spawnPowerUp(def: PowerUpDef, chunkId?: number) {
  const streamComp =
    chunkId !== undefined
      ? (["stream-object", { chunkId }] as const)
      : [];

  const scaleFactor = powerUpScale();

  return add([
    sprite(COLLECTIBLE_SPRITES.potion),
    pos(def.x, def.y),
    scale(scaleFactor),
    area({ shape: worldHitRect(POWERUP_HIT_SIZE, scaleFactor) }),
    anchor("center"),
    z(15),
    "powerup",
    "scrollable",
    { powerType: def.type, collected: false },
    ...streamComp,
  ]);
}
