import { GAME, PHYSICS, COLORS, PLAYER } from "../config";
import { AUDIO, AUDIO_VOLUME } from "../assets/audio";
import { setupInfiniteMapBackground } from "../entities/background";
import { setupInfiniteWorldStream } from "../systems/worldStream";
import {
  spawnPlayer,
  setupPlayerJump,
  handlePlayerInput,
  tryJump,
} from "../entities/player";
import { spawnPlatform } from "../entities/platform";
import { canvasPlatforms } from "../levels/canvasPlatforms";
import { setupFallBehindCheck } from "../systems/camera";
import { setupCollisions } from "../systems/collision";
import {
  createPowerUpState,
  getScrollSpeed,
  getMaxForwardSpeed,
  powerUpLabel,
} from "../systems/powerups";
import { resetScrollMarker, trackScroll } from "../systems/worldScroll";

function scrollWorld(speed: number) {
  const dx = speed * dt();
  for (const obj of get("scrollable")) {
    obj.pos.x -= dx;
  }
}

export function registerGameScene() {
  scene("game", () => {
    setGravity(PHYSICS.gravity);
    setBackground(...COLORS.sky);
    camPos(vec2(0, 0));
    resetScrollMarker();

    setupInfiniteMapBackground();

    add([
      pos(0, 280),
      rect(GAME.width, 50),
      anchor("topleft"),
      color(rgb(200, 60, 60)),
      z(40),
    ]);

    for (const def of canvasPlatforms) {
      spawnPlatform(def);
    }

    setupInfiniteWorldStream();

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

    const chaseMusic = play(AUDIO.persecucion, {
      loop: true,
      volume: AUDIO_VOLUME.persecucion,
    });

    onSceneLeave(() => {
      chaseMusic.stop();
    });

    const player = spawnPlayer(PLAYER.startSurfaceY);
    setupPlayerJump(player);

    function endRun(message: string) {
      if (gameOver) return;
      gameOver = true;
      chaseMusic.stop();
      gameOverLabel.text = message;
    }

    add([
      rect(GAME.width + 400, 80),
      pos(-200, GAME.deathY - 20),
      anchor("topleft"),
      area(),
      body({ isStatic: true }),
      opacity(0),
      "killzone",
      "scrollable",
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
      text("Flechas mover | Espacio saltar | R reiniciar", { size: 13 }),
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

    setupFallBehindCheck(player, () => {
      if (gameOver || runTime < 1.5) return;
      endRun("Te quedaste atrás — pulsa R");
    });

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

    player.onCollide("killzone", () => {
      if (player.physicsImmune) return;
      endRun("Caíste al vacío — pulsa R");
    });

    player.onFallOff(() => {
      if (gameOver || player.physicsImmune) return;
      wait(0.28, () => {
        if (gameOver || player.physicsImmune || player.isGrounded()) return;
        if (player.pos.y >= GAME.deathY - 56) {
          endRun("Caíste al vacío — pulsa R");
        }
      });
    });

    onUpdate(() => {
      if (gameOver) return;

      runTime += dt();

      const scroll = getScrollSpeed(powerState);
      if (runTime > 0.4) {
        trackScroll(scroll);
        scrollWorld(scroll);
      }

      handlePlayerInput(player, getMaxForwardSpeed(powerState));

      if (player.physicsImmune) {
        player.vel.y = 0;
      } else if (!player.isGrounded() && player.pos.y >= GAME.deathY) {
        endRun("Caíste al vacío — pulsa R");
      }
    });
  });
}
