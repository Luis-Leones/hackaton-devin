let scrollMarker = 0;

export function resetScrollMarker() {
  scrollMarker = 0;
}

export function trackScroll(speed: number) {
  scrollMarker += speed * dt();
}

export function getScrollMarker(): number {
  return scrollMarker;
}
