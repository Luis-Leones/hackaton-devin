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
      physicsImmune: boolean;
      coyoteTimer: number;
      jumpBufferTimer: number;
    }
>;

export function spawnPlayer(surfaceY: number): PlayerObj {
  const p = add([
    sprite(CHARACTER_SPRITE, { anim: "idle" }),
    pos(PLAYER.startX, surfaceY),
    anchor("botleft"),
    scale(CHARACTER_SCALE),
    area({
      shape: new Rect(vec2(8, -PLAYER.height + 4), PLAYER.width - 16, PLAYER.height - 4),
    }),
    body({
      stickToPlatform: true,
      maxVelocity: PHYSICS.maxBodyVelocity,
    }),
    z(20),
    "player",
    "scrollable",
    {
      baseScale: CHARACTER_SCALE,
      canDestroy: false,
      physicsImmune: false,
      coyoteTimer: PHYSICS.coyoteTime,
      jumpBufferTimer: 0,
    },
  ]) as PlayerObj;

  return p;
}

export function setupPlayerJump(player: PlayerObj) {
  onUpdate(() => {
    if (player.isGrounded()) {
      player.coyoteTimer = PHYSICS.coyoteTime;
      if (player.jumpBufferTimer > 0) {
        performJump(player);
      }
    } else {
      player.coyoteTimer = Math.max(0, player.coyoteTimer - dt());
    }

    player.jumpBufferTimer = Math.max(0, player.jumpBufferTimer - dt());
  });
}

function performJump(player: PlayerObj) {
  player.jump(PHYSICS.jumpForce);
  player.coyoteTimer = 0;
  player.jumpBufferTimer = 0;
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
  if (player.physicsImmune) return;
  if (player.coyoteTimer > 0) {
    performJump(player);
    return;
  }
  player.jumpBufferTimer = PHYSICS.jumpBuffer;
}
