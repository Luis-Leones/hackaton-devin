import kaboom from "kaboom";
import { COLORS, GAME } from "./config";
import { loadSceneFrameSprites } from "./assets/sceneFrames";
import { loadCharacterSprites } from "./assets/characterSprites";
import { loadCollectibleSprites } from "./assets/collectibleSprites";
import { loadGameAudio } from "./assets/audio";
import { registerMenuScene } from "./scenes/menu";
import { registerGameScene } from "./scenes/game";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

canvas.width = GAME.width;
canvas.height = GAME.height;
canvas.style.width = `${GAME.width}px`;
canvas.style.height = `${GAME.height}px`;

kaboom({
  canvas,
  width: GAME.width,
  height: GAME.height,
  background: [...COLORS.sky],
  crisp: true,
  pixelDensity: 1,
});

loadSceneFrameSprites();
loadCharacterSprites();
loadCollectibleSprites();
loadGameAudio();

registerMenuScene();
registerGameScene();

onLoad(() => go("menu"));
