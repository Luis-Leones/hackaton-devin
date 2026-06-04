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
  player.onBeforePhysicsResolve((col) => {
    if (!col.target.is("platform")) return;
    if (col.isLeft() || col.isRight()) {
      col.preventResolution();
    }
  });

  player.onCollide("coin", (coin: GameObj) => {
    if (coin.collected) return;
    coin.collected = true;
    destroy(coin);
    onCoinCollect();
  });

  player.onCollide("powerup", (pu: GameObj) => {
    if (pu.collected) return;
    pu.collected = true;
    const type = pu.powerType as "speed" | "grow" | "smash";
    destroy(pu);
    applyPowerUp(type, player, state, onHudUpdate);
  });

  player.onCollide("destructible", (platform: GameObj) => {
    if (!player.canDestroy) return;
    destroy(platform);
  });
}
