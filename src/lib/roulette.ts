export function pickAndRotate(n: number, currentRot: number, rand: () => number = Math.random) {
  const w = Math.floor(rand() * n); // winning segment index
  const jitter = (rand() - 0.5) * 0.6 * (360 / n); // stays inside the segment
  const centre = (w * 360) / n; // clockwise from the top
  const delta = (((-centre - jitter - currentRot) % 360) + 360) % 360;
  return { winner: w, newRot: currentRot + 360 * 5 + delta };
}
