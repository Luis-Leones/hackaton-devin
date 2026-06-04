import { GAME } from "../config";
import { mapCycleWidth } from "../assets/sceneFrames";
import { mapChunk } from "../levels/mapChunk";
import { spawnPlatform } from "../entities/platform";
import { spawnCoin, spawnPowerUp } from "../entities/collectible";
import { getScrollMarker } from "./worldScroll";

const CHUNK_WIDTH = mapCycleWidth();
const LOOK_AHEAD = GAME.width * 2.2;
const LOOK_BEHIND = GAME.width * 1.6;

let nextChunkX = 0;
let chunkSerial = 0;
const activeChunks = new Map<number, number>();

function spawnChunk(chunkId: number, offsetX: number) {
  activeChunks.set(chunkId, offsetX);

  const stream = { chunkId };

  for (const p of mapChunk.platforms) {
    spawnPlatform({ ...p, x: p.x + offsetX }, stream);
  }
  for (const c of mapChunk.coins) {
    spawnCoin({ ...c, x: c.x + offsetX }, chunkId);
  }
  for (const pu of mapChunk.powerUps) {
    spawnPowerUp({ ...pu, x: pu.x + offsetX }, chunkId);
  }
}

function pruneChunks() {
  const minX = getScrollMarker() - LOOK_BEHIND;

  for (const [chunkId, startX] of activeChunks) {
    if (startX + CHUNK_WIDTH < minX) {
      for (const obj of get("scrollable")) {
        if (obj.chunkId === chunkId) destroy(obj);
      }
      activeChunks.delete(chunkId);
    }
  }
}

function ensureChunksAhead() {
  const needUntil = getScrollMarker() + LOOK_AHEAD;

  while (nextChunkX < needUntil) {
    spawnChunk(chunkSerial, nextChunkX);
    nextChunkX += CHUNK_WIDTH;
    chunkSerial++;
  }
}

export function setupInfiniteWorldStream() {
  nextChunkX = CHUNK_WIDTH;
  chunkSerial = 0;
  activeChunks.clear();

  for (let i = 0; i < 2; i++) {
    spawnChunk(chunkSerial, nextChunkX);
    nextChunkX += CHUNK_WIDTH;
    chunkSerial++;
  }

  onUpdate(() => {
    ensureChunksAhead();
    pruneChunks();
  });
}
