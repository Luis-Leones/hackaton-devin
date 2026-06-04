export { canvasPlatforms as mapChunkPlatforms } from "./canvasPlatforms";
export type { PlatformDef, CoinDef, PowerUpDef } from "./level01";
import type { CoinDef, PowerUpDef } from "./level01";
import { canvasPlatforms } from "./canvasPlatforms";

/** Ciclo del nivel (mismo layout que el canvas). */
export const mapChunk = {
  platforms: canvasPlatforms,
  coins: [
    { x: 120, y: 255, r: 20 },
    { x: 520, y: 255, r: 20 },
    { x: 900, y: 255, r: 20 },
    { x: 1320, y: 248, r: 20 },
    { x: 1750, y: 235, r: 20 },
    { x: 2150, y: 215, r: 20 },
    { x: 2680, y: 255, r: 20 },
    { x: 3000, y: 220, r: 20 },
  ] as CoinDef[],
  powerUps: [
    { x: 1050, y: 155, type: "speed" },
    { x: 1880, y: 130, type: "grow" },
    { x: 2520, y: 100, type: "smash" },
  ] as PowerUpDef[],
};
