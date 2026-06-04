import { GAME_CANVAS } from "./assets/sceneFrames";

export const GAME = {
  width: GAME_CANVAS.w,
  height: GAME_CANVAS.h,
  /** Mundo sin límite horizontal; la cámara no hace clamp derecho. */
  infiniteWorld: true,
  /** Y (pies) por debajo del cual se considera caída al vacío. */
  deathY: GAME_CANVAS.h - 14,
} as const;

export const PHYSICS = {
  gravity: 2100,
  jumpForce: 820,
  maxForwardSpeed: 380,
  maxBackwardSpeed: 320,
  /** Control horizontal en el aire (0–1). */
  airControl: 0.92,
  /** Velocidad inicial del scroll automático (px/s). */
  worldScrollSpeedMin: 62,
  /** Velocidad máxima del scroll tras la rampa (px/s). */
  worldScrollSpeedMax: 185,
  /** Segundos para acercarse a la velocidad máxima. */
  worldScrollRampSeconds: 38,
  worldScrollSpeedBoost: 1.8,
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
