import type { PowerUpType } from "../levels/level01";
import { PHYSICS, PLAYER, POWERUP } from "../config";
import { CHARACTER_SCALE } from "../assets/characterSprites";
import type { PlayerObj } from "../entities/player";

export type PowerUpState = {
  scrollMultiplier: number;
  forwardMultiplier: number;
  potionActive: boolean;
};

export function createPowerUpState(): PowerUpState {
  return {
    scrollMultiplier: 1,
    forwardMultiplier: 1,
    potionActive: false,
  };
}

export function getScrollSpeed(state: PowerUpState): number {
  return PHYSICS.worldScrollSpeed * state.scrollMultiplier;
}

export function getMaxForwardSpeed(state: PowerUpState): number {
  return PHYSICS.maxForwardSpeed * state.forwardMultiplier;
}

let potionTimer: { cancel: () => void } | null = null;

function deactivatePotionMode(player: PlayerObj, state: PowerUpState, onHudUpdate: () => void) {
  state.potionActive = false;
  state.scrollMultiplier = 1;
  state.forwardMultiplier = 1;
  player.baseScale = CHARACTER_SCALE;
  player.scale = vec2(CHARACTER_SCALE);
  player.canDestroy = false;
  player.physicsImmune = false;
  player.gravityScale = 1;
  player.stickToPlatform = true;
  player.collisionIgnore = [];
  onHudUpdate();
}

function activatePotionMode(
  player: PlayerObj,
  state: PowerUpState,
  onHudUpdate: () => void,
  duration: number,
) {
  if (potionTimer) {
    potionTimer.cancel();
    potionTimer = null;
  }

  state.potionActive = true;
  player.baseScale = CHARACTER_SCALE * PLAYER.growScale;
  player.scale = vec2(player.baseScale);
  player.canDestroy = true;
  player.physicsImmune = true;
  player.gravityScale = 0;
  player.stickToPlatform = false;
  player.collisionIgnore = ["platform"];
  player.vel.y = 0;

  potionTimer = wait(duration, () => {
    potionTimer = null;
    deactivatePotionMode(player, state, onHudUpdate);
  });
}

export function applyPowerUp(
  type: PowerUpType,
  player: PlayerObj,
  state: PowerUpState,
  onHudUpdate: () => void,
) {
  activatePotionMode(player, state, onHudUpdate, POWERUP.growDuration);

  if (type === "speed") {
    state.scrollMultiplier = PHYSICS.worldScrollSpeedBoost;
    state.forwardMultiplier = PHYSICS.worldScrollSpeedBoost;
  }

  onHudUpdate();
}

export function powerUpLabel(state: PowerUpState): string {
  const parts: string[] = [];
  if (state.potionActive) parts.push("POTENCIADO");
  if (state.scrollMultiplier > 1) parts.push("VELOCIDAD");
  return parts.length ? parts.join(" | ") : "";
}
