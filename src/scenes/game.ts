import { GAME, PHYSICS, COLORS, PLAYER } from "../config";
import { level01 } from "../levels/level01";
import { spawnPlatform, spawnBackgroundSilhouettes } from "../entities/platform";
import { spawnCoin, spawnPowerUp } from "../entities/collectible";
import { spawnPlayer, handlePlayerInput, tryJump } from "../entities/player";
import { setupCameraFollow } from "../systems/camera";
import { setupCollisions } from "../systems/collision";
import {
  createPowerUpState,
  getScrollSpeed,
  getMaxForwardSpeed,
  powerUpLabel,
} from "../systems/powerups";

function scrollWorld(speed: number) {
  for (const obj of get("scrollable")) {
    obj.pos.x -= speed;
  }
}

export function registerGameScene() {
  scene("game", () => {
    setGravity(PHYSICS.gravity);
    setBackground(...COLORS.sky);
    camPos(vec2(0, 0));

    add([
      rect(GAME.width, GAME.height),
      pos(0, 0),
      color(...COLORS.sky),
      fixed(),
      z(-30),
    ]);

    add([
      rect(GAME.width - 4, GAME.height - 4, { fill: false }),
      pos(2, 2),
      outline(2, rgb(255, 255, 255)),
      fixed(),
      z(50),
    ]);

    const powerState = createPowerUpState();
    let coinCount = 0;
    let gameOver = false;
    let runTime = 0;

    spawnBackgroundSilhouettes();

    for (const p of level01.platforms) {
      spawnPlatform(p);
    }
    for (const c of level01.coins) {
      spawnCoin(c);
    }
    for (const pu of level01.powerUps) {
      spawnPowerUp(pu);
    }

    const player = spawnPlayer(PLAYER.startSurfaceY);

    add([
      rect(GAME.worldWidth + 400, 50),
      pos(-200, GAME.floorY),
      anchor("topleft"),
      area(),
      body({ isStatic: true }),
      opacity(0),
      "platform",
      "killzone",
    ]);

    const hudCoins = add([
      text("Monedas: 0", { size: 20 }),
      pos(16, 16),
      color(...COLORS.hud),
      fixed(),
      z(100),
      "hud",
    ]);

    const hudPower = add([
      text("", { size: 15 }),
      pos(16, 46),
      color(50, 55, 70),
      fixed(),
      z(100),
      "hud",
    ]);

    add([
      text("→ avanzar | Espacio saltar | R reiniciar", { size: 13 }),
      pos(16, GAME.height - 28),
      color(40, 45, 58),
      fixed(),
      z(100),
    ]);

    const gameOverLabel = add([
      text("", { size: 26 }),
      pos(center().x, center().y),
      color(...COLORS.hud),
      anchor("center"),
      fixed(),
      z(200),
    ]);

    function updateHud() {
      hudCoins.text = `Monedas: ${coinCount}`;
      hudPower.text = powerUpLabel(powerState);
    }

    camPos(vec2(Math.max(0, player.pos.x - GAME.width * 0.32), 0));

    setupCameraFollow(player);
    setupCollisions(player, powerState, () => {
      coinCount++;
      updateHud();
    }, updateHud);

    onKeyPress("space", () => {
      if (!gameOver) tryJump(player);
    });
    onKeyPress("up", () => {
      if (!gameOver) tryJump(player);
    });

    onKeyPress("r", () => {
      go("game");
    });

    onUpdate(() => {
      if (gameOver) return;

      runTime += dt();

      const scroll =
        runTime > 2.5 ? getScrollSpeed(powerState) * dt() : 0;

      if (scroll > 0) {
        scrollWorld(scroll);
        if (player.isGrounded()) {
          player.pos.x -= scroll;
        }
      }

      handlePlayerInput(player, getMaxForwardSpeed(powerState));

      if (runTime > 2 && player.pos.y > GAME.floorY) {
        gameOver = true;
        gameOverLabel.text = "Game Over — pulsa R";
      }

      const screenX = player.pos.x - camPos().x;
      if (runTime > 3 && screenX < -100) {
        gameOver = true;
        gameOverLabel.text = "Te quedaste atrás — pulsa R";
      }
    });
  });
}
