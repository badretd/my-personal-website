import { SeededRandom } from "./random";
import type { GridConfig } from "./types";

export function generateGrid(random: SeededRandom): GridConfig {
  return {
    columns: {
      mobile: random.integer(4, 6),
      tablet: random.integer(6, 9),
      desktop: random.integer(8, 14),
      wide: random.integer(10, 16),
    },
    rows: {
      mobile: random.integer(6, 10),
      tablet: random.integer(6, 10),
      desktop: random.integer(6, 12),
      wide: random.integer(7, 12),
    },
    gap: {
      mobile: random.integer(5, 9),
      tablet: random.integer(7, 12),
      desktop: random.integer(8, 16),
      wide: random.integer(10, 18),
    },
    padding: {
      mobile: random.integer(18, 26),
      tablet: random.integer(26, 42),
      desktop: random.integer(38, 70),
      wide: random.integer(52, 86),
    },
  };
}
