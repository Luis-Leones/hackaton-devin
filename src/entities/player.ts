import type { AreaComp, BodyComp, GameObj, PosComp, ScaleComp } from "kaboom";
import { PHYSICS, PLAYER } from "../config";

export type PlayerObj = GameObj<PosComp & AreaComp & BodyComp & ScaleComp & {
  baseScale: number;
  canDestroy: boolean;
}>;

export function spawnPlayer(surfaceY: number): PlayerObj {
  const p = add([
    pos(PLAYER.startX, surfaceY),
    rect(PLAYER.width, PLAYER.height),
    color(...PLAYER.color),
    outline(4, rgb(30, 30, 40)),
    area(),
    body(),
    anchor("botleft"),
    scale(1),
    z(20),
    "player",
    {
      baseScale: 1,
      canDestroy: false,
    },
  ]) as PlayerObj;

  return p;
}

export function handlePlayerInput(player: PlayerObj, maxForward: number) {
  let vx = 0;

  if (isKeyDown("right") || isKeyDown("d")) {
    vx = maxForward;
  } else if (isKeyDown("left") || isKeyDown("a")) {
    vx = -PHYSICS.maxBackwardSpeed;
  }

  player.vel.x = vx;
}

export function tryJump(player: PlayerObj) {
  if (player.isGrounded()) {
    player.jump(PHYSICS.jumpForce);
  }
}
