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
  gravity: 1980,
  jumpForce: 760,
  /** Velocidad máxima del cuerpo (salto y caída). */
  maxBodyVelocity: 920,
  maxForwardSpeed: 380,
  maxBackwardSpeed: 320,
  /** Control horizontal en el aire (0–1). */
  airControl: 0.9,
  /** Segundos tras dejar el suelo en los que aún se puede saltar. */
  coyoteTime: 0.11,
  /** Segundos de anticipación del botón de salto al aterrizar. */
  jumpBuffer: 0.13,
  /** Grosor del collider de superficie (tejado). */
  surfaceColliderHeight: 12,
  /** Tras salir de una plataforma, segundos antes de contar caída al vacío. */
  fallVoidDelay: 0.22,
  /** Velocidad fija del desplazamiento automático (px/s). */
  worldScrollSpeed: 118,
  worldScrollSpeedBoost: 1.55,
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
  startSurfaceY: 165,
  color: [230, 70, 70] as [number, number, number],
  growScale: 1.45,
} as const;

export const POWERUP = {
  speedDuration: 5,
  growDuration: 8,
  smashDuration: 3,
} as const;

export const COLORS = {
  building: [88, 98, 118] as [number, number, number],
  buildingDark: [50, 56, 68] as [number, number, number],
  roof: [158, 168, 182] as [number, number, number],
  platformOutline: [25, 28, 38] as [number, number, number],
  coin: [255, 210, 40] as [number, number, number],
  speed: [255, 210, 55] as [number, number, number],
  grow: [80, 215, 100] as [number, number, number],
  smash: [235, 75, 75] as [number, number, number],
  hud: [20, 24, 32] as [number, number, number],
  sky: [120, 175, 220] as [number, number, number],
} as const;
