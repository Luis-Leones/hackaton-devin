export const GAME = {
  width: 800,
  height: 450,
  worldWidth: 2600,
  /** Y del suelo invisible (debajo del último tejado). */
  floorY: 400,
} as const;

export const PHYSICS = {
  gravity: 1800,
  jumpForce: 720,
  maxForwardSpeed: 220,
  maxBackwardSpeed: 180,
  worldScrollSpeed: 30,
  worldScrollSpeedBoost: 1.5,
} as const;

export const CAMERA = {
  playerScreenRatio: 0.32,
  lerp: 10,
} as const;

export const PLAYER = {
  width: 48,
  height: 56,
  startX: 110,
  /** Superficie del primer tejado (pies del jugador). */
  startSurfaceY: 220,
  color: [230, 70, 70] as [number, number, number],
  growScale: 1.45,
} as const;

export const POWERUP = {
  speedDuration: 5,
  growDuration: 8,
  smashDuration: 3,
} as const;

export const COLORS = {
  building: [70, 78, 95] as [number, number, number],
  buildingDark: [50, 56, 68] as [number, number, number],
  roof: [145, 155, 170] as [number, number, number],
  platformOutline: [25, 28, 38] as [number, number, number],
  coin: [255, 210, 40] as [number, number, number],
  speed: [255, 210, 55] as [number, number, number],
  grow: [80, 215, 100] as [number, number, number],
  smash: [235, 75, 75] as [number, number, number],
  hud: [20, 24, 32] as [number, number, number],
  sky: [120, 175, 220] as [number, number, number],
} as const;
