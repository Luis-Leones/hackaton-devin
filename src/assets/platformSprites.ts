import { COLORS } from "../config";

export const PLATFORM_SPRITES = {
  building: "platform-building",
  roof: "platform-roof",
} as const;

function solidTileUrl(rgb: readonly [number, number, number]): string {
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 8;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No se pudo crear el sprite de plataforma.");
  }
  ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  ctx.fillRect(0, 0, 8, 8);
  return canvas.toDataURL("image/png");
}

export function loadPlatformSprites() {
  loadSprite(PLATFORM_SPRITES.building, solidTileUrl(COLORS.building));
  loadSprite(PLATFORM_SPRITES.roof, solidTileUrl(COLORS.roof));
}
