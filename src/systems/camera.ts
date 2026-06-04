import type { GameObj } from "kaboom";
import { CAMERA, GAME } from "../config";

export function setupAutoScrollCamera(
  player: GameObj,
  getScrollSpeed: () => number,
  onFallBehind: () => void,
) {
  const offsetX = GAME.width * CAMERA.playerScreenRatio;
  const fallBehindMargin = 130;

  onUpdate(() => {
    const scroll = getScrollSpeed() * dt();
    const autoCamX = camPos().x + scroll;
    const followX = player.pos.x - offsetX;

    const targetX = Math.max(0, autoCamX, followX);

    camPos(vec2(targetX, 0));

    if (player.pos.x < camPos().x - fallBehindMargin) {
      onFallBehind();
    }
  });
}
