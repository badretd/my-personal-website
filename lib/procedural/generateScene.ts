import { generateGrid } from "./grid";
import { generatePalette } from "./palettes";
import { generatePlacement } from "./placements";
import { SeededRandom } from "./random";
import { compatibleSupport } from "./registry";
import type { SceneConfig, SceneFamilyId, SystemConfig } from "./types";

function generateSystem(
  random: SeededRandom,
  family: SceneFamilyId,
  supporting = false,
): SystemConfig {
  const isModular = family === "modular-blocks";
  return {
    family,
    region: random.pick(["left", "right", "center", "lower", "full"] as const),
    count: isModular
      ? random.integer(supporting ? 3 : 5, supporting ? 5 : 7)
      : random.integer(supporting ? 3 : 6, supporting ? 8 : 14),
    direction: random.boolean() ? 1 : -1,
    speed: Number(random.number(8, 20).toFixed(2)),
    density: Number(random.number(supporting ? 0.16 : 0.38, supporting ? 0.32 : 0.72).toFixed(2)),
    variant: random.integer(0, 3),
  };
}

export function generateScene(seed: number, family: SceneFamilyId): SceneConfig {
  const random = new SeededRandom(seed);
  const supportCount = random.integer(0, 2);
  const allowed = compatibleSupport[family];
  const supportFamilies = random.shuffle(allowed).slice(0, supportCount);

  return {
    id: `${family}-${seed}`,
    seed,
    family,
    palette: generatePalette(random),
    grid: generateGrid(random),
    placement: generatePlacement(random, family),
    primary: generateSystem(random, family),
    supporting: supportFamilies.map((support) => generateSystem(random, support, true)),
    grain: random.boolean(0.55),
  };
}
