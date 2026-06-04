import coinUrl from "../../Assets/Coin.png";
import potionUrl from "../../Assets/Potion.png";

export const COLLECTIBLE_SPRITES = {
  coin: "coin",
  potion: "powerup-potion",
} as const;

export const COLLECTIBLE_NATIVE_SIZE = {
  coin: { w: 480, h: 492 },
  potion: { w: 442, h: 559 },
} as const;

export const POWERUP_DISPLAY_HEIGHT = 48;

export function coinScale(radius: number): number {
  const diameter = radius * 2;
  return diameter / COLLECTIBLE_NATIVE_SIZE.coin.h;
}

export function powerUpScale(): number {
  return POWERUP_DISPLAY_HEIGHT / COLLECTIBLE_NATIVE_SIZE.potion.h;
}

export function loadCollectibleSprites() {
  loadSprite(COLLECTIBLE_SPRITES.coin, coinUrl);
  loadSprite(COLLECTIBLE_SPRITES.potion, potionUrl);
}
