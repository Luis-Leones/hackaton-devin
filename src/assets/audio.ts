import persecucionUrl from "../../Assets/Audio/02_persecucion.mp3";

export const AUDIO = {
  persecucion: "persecucion",
} as const;

export const AUDIO_VOLUME = {
  persecucion: 0.5,
} as const;

export function loadGameAudio() {
  loadSound(AUDIO.persecucion, persecucionUrl);
}
