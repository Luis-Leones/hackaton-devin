import frame1Url from "../../Assets/Character/Frame 1.png";
import frame2Url from "../../Assets/Character/Frame 2.png";
import { PLAYER } from "../config";

export const CHARACTER_SPRITE = "player-ninja";

/** Altura nativa compartida por ambos frames (px). */
export const CHARACTER_FRAME_HEIGHT = 633;

/** Escala para que el personaje encaje con la hitbox del juego. */
export const CHARACTER_SCALE = PLAYER.height / CHARACTER_FRAME_HEIGHT;

export function loadCharacterSprites() {
  loadSprite(CHARACTER_SPRITE, [frame1Url, frame2Url], {
    anims: {
      idle: 0,
      run: { from: 0, to: 1, loop: true, speed: 10 },
    },
  });
}
