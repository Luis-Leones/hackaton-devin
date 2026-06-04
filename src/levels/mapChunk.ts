export type { PlatformDef, CoinDef, PowerUpDef } from "./level01";
import type { CoinDef, PowerUpDef } from "./level01";
import { canvasPlatforms } from "./canvasPlatforms";

export const mapChunk = {
  platforms: canvasPlatforms,
  coins: [
    { x: 120, y: 110, r: 20 },
    { x: 520, y: 110, r: 20 },
    { x: 900, y: 110, r: 20 },
    { x: 1320, y: 103, r: 20 },
    { x: 1750, y: 90, r: 20 },
    { x: 2150, y: 70, r: 20 },
    { x: 2680, y: 110, r: 20 },
    { x: 3000, y: 75, r: 20 },
  ] as CoinDef[],
  powerUps: [
    { x: 1050, y: 100, type: "speed" },
    { x: 1880, y: 75, type: "grow" },
    { x: 2520, y: 45, type: "smash" },
  ] as PowerUpDef[],
};
