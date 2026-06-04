import type { PowerUpType } from "../levels/level01";
import { PHYSICS, PLAYER, POWERUP } from "../config";
import type { PlayerObj } from "../entities/player";

export type PowerUpState = {
  scrollMultiplier: number;
  forwardMultiplier: number;
  growActive: boolean;
  smashActive: boolean;
};

export function createPowerUpState(): PowerUpState {
  return {
    scrollMultiplier: 1,
    forwardMultiplier: 1,
    growActive: false,
    smashActive: false,
  };
}

export function getScrollSpeed(state: PowerUpState): number {
  return PHYSICS.worldScrollSpeed * state.scrollMultiplier;
}

export function getMaxForwardSpeed(state: PowerUpState): number {
  return PHYSICS.maxForwardSpeed * state.forwardMultiplier;
}

export function applyPowerUp(
  type: PowerUpType,
  player: PlayerObj,
  state: PowerUpState,
  onHudUpdate: () => void,
) {
  switch (type) {
    case "speed": {
      state.scrollMultiplier = PHYSICS.worldScrollSpeedBoost;
      state.forwardMultiplier = PHYSICS.worldScrollSpeedBoost;
      wait(POWERUP.speedDuration, () => {
        state.scrollMultiplier = 1;
        state.forwardMultiplier = 1;
        onHudUpdate();
      });
      break;
    }
    case "grow": {
      if (!state.growActive) {
        state.growActive = true;
        player.baseScale = PLAYER.growScale;
        player.scale = vec2(PLAYER.growScale);
      }
      wait(POWERUP.growDuration, () => {
        state.growActive = false;
        player.baseScale = 1;
        player.scale = vec2(1);
        onHudUpdate();
      });
      break;
    }
    case "smash": {
      state.smashActive = true;
      player.canDestroy = true;
      wait(POWERUP.smashDuration, () => {
        state.smashActive = false;
        player.canDestroy = false;
        onHudUpdate();
      });
      break;
    }
  }
  onHudUpdate();
}

export function powerUpLabel(state: PowerUpState): string {
  const parts: string[] = [];
  if (state.scrollMultiplier > 1) parts.push("VELOCIDAD");
  if (state.growActive) parts.push("GRANDE");
  if (state.smashActive) parts.push("DESTRUIR");
  return parts.length ? parts.join(" | ") : "";
}
