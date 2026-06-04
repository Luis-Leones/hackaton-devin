import type { PowerUpType } from "../levels/level01";
import { PHYSICS, PLAYER, POWERUP } from "../config";
import { CHARACTER_SCALE } from "../assets/characterSprites";
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

/** Scroll que parte lento y sube progresivamente con el tiempo de partida. */
export function getScrollSpeed(state: PowerUpState, runTime: number): number {
  const ramp = clamp(runTime / PHYSICS.worldScrollRampSeconds, 0, 1);
  const eased = Math.sqrt(ramp);
  const base = lerp(
    PHYSICS.worldScrollSpeedMin,
    PHYSICS.worldScrollSpeedMax,
    eased,
  );
  return base * state.scrollMultiplier;
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
        player.baseScale = CHARACTER_SCALE * PLAYER.growScale;
        player.scale = vec2(player.baseScale);
      }
      wait(POWERUP.growDuration, () => {
        state.growActive = false;
        player.baseScale = CHARACTER_SCALE;
        player.scale = vec2(CHARACTER_SCALE);
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
