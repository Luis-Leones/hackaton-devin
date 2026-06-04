import type { GameObj } from "kaboom";
import { CAMERA, GAME } from "../config";

export function setupCameraFollow(player: GameObj) {
  const offsetX = GAME.width * CAMERA.playerScreenRatio;

  onUpdate(() => {
    const targetX = clamp(
      player.pos.x - offsetX,
      0,
      GAME.worldWidth - GAME.width,
    );

    const nextX = lerp(camPos().x, targetX, CAMERA.lerp * dt());
    camPos(vec2(nextX, 0));
  });
}
