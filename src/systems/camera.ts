import type { PlayerObj } from "../entities/player";

/** Sin mover la cámara: el scroll desplaza los objetos. */
export function setupFallBehindCheck(
  player: PlayerObj,
  onFallBehind: () => void,
) {
  const minScreenX = 70;

  onUpdate(() => {
    if (player.pos.x < minScreenX) {
      onFallBehind();
    }
  });
}
