export interface SinkStyle {
  background: string;
  color: string;
}

// Assign colors symmetrically by each sink's distance from the center.
export function getSinkStyle(index: number, total = 17): SinkStyle {
  const dist = Math.abs(index - (total - 1) / 2);
  if (dist >= 6) return { background: "#ff003f", color: "white" };
  if (dist >= 4) return { background: "#ff7f00", color: "white" };
  if (dist >= 2) return { background: "#ffbf00", color: "black" };
  return { background: "#22c55e", color: "black" };
}
