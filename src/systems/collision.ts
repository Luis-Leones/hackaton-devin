import type { GameObj } from "kaboom";
import type { PlayerObj } from "../entities/player";
import type { PowerUpState } from "./powerups";
import { applyPowerUp } from "./powerups";

export function setupCollisions(
  player: PlayerObj,
  state: PowerUpState,
  onCoinCollect: () => void,
  onHudUpdate: () => void,
) {
  player.onCollide("coin", (coin: GameObj) => {
    if (coin.collected) return;
    coin.collected = true;
    destroy(coin);
    onCoinCollect();
  });

  player.onCollide("powerup", (pu: GameObj) => {
    const type = pu.powerType as "speed" | "grow" | "smash";
    destroy(pu);
    applyPowerUp(type, player, state, onHudUpdate);
  });

  player.onCollide("destructible", (platform) => {
    if (!player.canDestroy) return;
    destroy(platform);
  });
}
