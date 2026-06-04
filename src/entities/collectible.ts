import type { CoinDef, PowerUpDef } from "../levels/level01";
import { COLORS } from "../config";

const POWERUP_COLORS = {
  speed: COLORS.speed,
  grow: COLORS.grow,
  smash: COLORS.smash,
} as const;

const POWERUP_SIZE = 24;

export function spawnCoin(def: CoinDef) {
  return add([
    pos(def.x, def.y),
    circle(def.r),
    color(...COLORS.coin),
    outline(3, rgb(180, 140, 30)),
    area(),
    anchor("center"),
    z(15),
    "coin",
    "scrollable",
    { collected: false },
  ]);
}

function diamondPoints(size: number) {
  const h = size;
  const w = size * 0.85;
  return [vec2(0, -h), vec2(w, 0), vec2(0, h), vec2(-w, 0)];
}

export function spawnPowerUp(def: PowerUpDef) {
  const c = POWERUP_COLORS[def.type];

  return add([
    pos(def.x, def.y),
    polygon(diamondPoints(POWERUP_SIZE)),
    color(...c),
    outline(3, rgb(c[0] * 0.6, c[1] * 0.6, c[2] * 0.6)),
    area(),
    anchor("center"),
    z(15),
    "powerup",
    "scrollable",
    { powerType: def.type },
  ]);
}
