export type PlatformDef = {
  x: number;
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
