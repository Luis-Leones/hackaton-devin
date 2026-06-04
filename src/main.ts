import kaboom from "kaboom";
import { COLORS, GAME } from "./config";
import { registerGameScene } from "./scenes/game";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

kaboom({
  canvas,
  width: GAME.width,
  height: GAME.height,
  background: [...COLORS.sky],
  crisp: true,
  pixelDensity: 1,
});

canvas.style.width = "800px";
canvas.style.height = "450px";

registerGameScene();
go("game");
