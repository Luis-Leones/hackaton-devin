import type { PlatformDef, CoinDef, PowerUpDef } from "./level01";

/** Patrón de un ciclo de fondo (~3240px); se repite con offset en X. */
export const mapChunk = {
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
    { x: 2180, surfaceY: 175, w: 150, h: 100 },
    { x: 2360, surfaceY: 210, w: 95, h: 125, destructible: true },
    { x: 2480, surfaceY: 155, w: 200, h: 52 },
    { x: 2700, surfaceY: 228, w: 240, h: 108 },
    { x: 2960, surfaceY: 185, w: 180, h: 88, destructible: true },
    { x: 3160, surfaceY: 130, w: 120, h: 40 },
  ] as PlatformDef[],
  coins: [
    { x: 200, y: 150, r: 20 },
    { x: 400, y: 175, r: 20 },
    { x: 620, y: 85, r: 20 },
    { x: 950, y: 130, r: 20 },
    { x: 1180, y: 100, r: 20 },
    { x: 1500, y: 155, r: 20 },
    { x: 1720, y: 95, r: 20 },
    { x: 2280, y: 120, r: 20 },
    { x: 2580, y: 105, r: 20 },
    { x: 2850, y: 165, r: 20 },
    { x: 3080, y: 90, r: 20 },
  ] as CoinDef[],
  powerUps: [
    { x: 750, y: 90, type: "speed" },
    { x: 1150, y: 105, type: "grow" },
    { x: 1650, y: 85, type: "smash" },
    { x: 2520, y: 95, type: "speed" },
    { x: 3020, y: 110, type: "grow" },
  ] as PowerUpDef[],
};
