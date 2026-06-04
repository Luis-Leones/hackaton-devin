import type {
  AreaComp,
  BodyComp,
  GameObj,
  PosComp,
  ScaleComp,
  SpriteComp,
} from "kaboom";
import { PHYSICS, PLAYER } from "../config";
import { CHARACTER_SCALE, CHARACTER_SPRITE } from "../assets/characterSprites";

export type PlayerObj = GameObj<
  PosComp &
    AreaComp &
    BodyComp &
    ScaleComp &
    SpriteComp & {
      baseScale: number;
      canDestroy: boolean;
    }
>;

export function spawnPlayer(surfaceY: number): PlayerObj {
  const p = add([
    sprite(CHARACTER_SPRITE, { anim: "idle" }),
    pos(PLAYER.startX, surfaceY),
    anchor("botleft"),
    scale(CHARACTER_SCALE),
    area({
      shape: new Rect(vec2(6, -PLAYER.height), PLAYER.width - 12, PLAYER.height),
    }),
    body({ stickToPlatform: true, maxVelocity: 720 }),
    z(20),
    "player",
    {
      baseScale: CHARACTER_SCALE,
      canDestroy: false,
    },
  ]) as PlayerObj;

  return p;
}

export function handlePlayerInput(player: PlayerObj, maxForward: number) {
  const control = player.isGrounded() ? 1 : PHYSICS.airControl;

  if (isKeyDown("right") || isKeyDown("d")) {
    player.vel.x = maxForward * control;
  } else if (isKeyDown("left") || isKeyDown("a")) {
    player.vel.x = -PHYSICS.maxBackwardSpeed * control;
  } else {
    player.vel.x = 0;
  }

  updatePlayerVisual(player);
}

export function updatePlayerVisual(player: PlayerObj) {
  const movingLeft = isKeyDown("left") || isKeyDown("a");
  const movingRight = isKeyDown("right") || isKeyDown("d");
  const moving = movingLeft || movingRight;

  player.flipX = movingLeft;

  if (moving || !player.isGrounded()) {
    if (player.curAnim() !== "run") player.play("run");
  } else if (player.curAnim() !== "idle") {
    player.play("idle");
  }
}

export function tryJump(player: PlayerObj) {
  if (player.isGrounded()) {
    player.jump(PHYSICS.jumpForce);
  }
}
