export type PlatformDef = {
  x: number;
  /** Y del borde superior del tejado (donde apoyan los pies). */
  surfaceY: number;
  w: number;
  h: number;
  destructible?: boolean;
};

export type CoinDef = { x: number; y: number; r: number };

export type PowerUpType = "speed" | "grow" | "smash";

export type PowerUpDef = {
  x: number;
  y: number;
  type: PowerUpType;
};

/** Tejados en la mitad superior-media del viewport (450px). */
export const level01 = {
  platforms: [
    { x: 40, surfaceY: 220, w: 170, h: 110 },
    { x: 230, surfaceY: 195, w: 75, h: 135, destructible: true },
    { x: 330, surfaceY: 235, w: 120, h: 95 },
    { x: 470, surfaceY: 205, w: 360, h: 125 },
    { x: 520, surfaceY: 120, w: 240, h: 42, destructible: true },
    { x: 820, surfaceY: 225, w: 200, h: 110 },
    { x: 1060, surfaceY: 165, w: 190, h: 75, destructible: true },
    { x: 1280, surfaceY: 215, w: 280, h: 115 },
    { x: 1580, surfaceY: 140, w: 220, h: 48 },
    { x: 1840, surfaceY: 200, w: 320, h: 130 },
  ] as PlatformDef[],
  coins: [
    { x: 200, y: 150, r: 20 },
    { x: 400, y: 175, r: 20 },
    { x: 620, y: 85, r: 20 },
    { x: 950, y: 130, r: 20 },
    { x: 1180, y: 100, r: 20 },
    { x: 1500, y: 155, r: 20 },
    { x: 1720, y: 95, r: 20 },
  ] as CoinDef[],
  powerUps: [
    { x: 750, y: 90, type: "speed" },
    { x: 1150, y: 105, type: "grow" },
    { x: 1650, y: 85, type: "smash" },
  ] as PowerUpDef[],
};
