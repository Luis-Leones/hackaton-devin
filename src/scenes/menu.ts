import { GAME, COLORS } from "../config";
import { spawnMenuBackground } from "../entities/background";

export function registerMenuScene() {
  scene("menu", () => {
    setBackground(...COLORS.sky);
    camPos(vec2(0, 0));

    spawnMenuBackground();

    add([
      rect(GAME.width - 4, GAME.height - 4, { fill: false }),
      pos(2, 2),
      outline(2, rgb(255, 255, 255)),
      fixed(),
      z(50),
    ]);

    add([
      text("Ninja City Chase", { size: 36 }),
      pos(center().x, 52),
      anchor("center"),
      color(...COLORS.coin),
      fixed(),
      z(100),
    ]);

    add([
      text("Pulsa Espacio o Enter para jugar", { size: 18 }),
      pos(center().x, GAME.height - 56),
      anchor("center"),
      color(...COLORS.coin),
      fixed(),
      z(100),
    ]);

    const start = () => go("game");

    onKeyPress("space", start);
    onKeyPress("enter", start);
    onClick(start);
  });
}
