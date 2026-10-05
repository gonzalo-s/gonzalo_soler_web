/** Bounce at each edge rather than jumping or duplicating accessible content. */
export function advanceAutoScroll(position: number, direction: 1 | -1, elapsedMs: number, maximum: number) {
  if (maximum <= 0) return { position: 0, direction: 1 as const, atEdge: false };
  const next = position + direction * Math.min(100, Math.max(0, elapsedMs)) * 0.02;
  if (next >= maximum) return { position: maximum, direction: -1 as const, atEdge: true };
  if (next <= 0) return { position: 0, direction: 1 as const, atEdge: true };
  return { position: next, direction, atEdge: false };
}
