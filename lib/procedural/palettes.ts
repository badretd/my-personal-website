import { SeededRandom } from "./random";
import type { Palette } from "./types";

const palettes: Palette[] = [
  { background: "#0b0c0b", foreground: "#e8e3d8", muted: "#73756d", accent: "#9a4938", accentAlt: "#b7ae86" },
  { background: "#101113", foreground: "#e4e6e1", muted: "#62686a", accent: "#436a70", accentAlt: "#a69772" },
  { background: "#12100e", foreground: "#eee5d8", muted: "#70675d", accent: "#87543c", accentAlt: "#868d6a" },
  { background: "#0a0d10", foreground: "#dfe4e6", muted: "#59666d", accent: "#5d7189", accentAlt: "#b08b65" },
  { background: "#0f0d10", foreground: "#e7e0e7", muted: "#6d626d", accent: "#72556f", accentAlt: "#9b8065" },
];

export function generatePalette(random: SeededRandom) {
  return random.pick(palettes);
}
