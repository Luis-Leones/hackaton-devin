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
import { setupAutoScrollCamera } from "../systems/camera";
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

    setupInfiniteMapBackground();
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

    onUpdate(() => {
      if (gameOver) return;
      scrollWorld(getScrollSpeed(powerState) * dt());
    });

    function endRun(message: string) {
      if (gameOver) return;
      gameOver = true;
      chaseMusic.stop();
      gameOverLabel.text = message;
    }

    add([
      rect(50000, 120),
      pos(-10000, GAME.deathY - 30),
      anchor("topleft"),
      area(),
      body({ isStatic: true }),
      opacity(0),
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

    camPos(vec2(Math.max(0, player.pos.x - GAME.width * 0.32), 0));

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
      wait(PHYSICS.fallVoidDelay, () => {
        if (gameOver || player.physicsImmune || player.isGrounded()) return;
        endRun("Caíste al vacío — pulsa R");
      });
    });

    onUpdate(() => {
      if (gameOver) return;
      runTime += dt();
      handlePlayerInput(player, getMaxForwardSpeed(powerState));

      if (player.physicsImmune) return;

      if (!player.isGrounded() && player.pos.y >= GAME.deathY - 8) {
        endRun("Caíste al vacío — pulsa R");
      }
    });

    setupAutoScrollCamera(
      player,
      () => getScrollSpeed(powerState),
      () => {
        if (gameOver || runTime < 3) return;
        endRun("Te quedaste atrás — pulsa R");
      },
    );
  });
}
