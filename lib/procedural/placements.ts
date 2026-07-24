import { SeededRandom } from "./random";
import type { PlacementId, SceneFamilyId } from "./types";

const placements: PlacementId[] = [
  "upper-left",
  "middle-left",
  "lower-left",
  "middle-right",
  "lower-wide",
  "split-left",
  "split-right",
];

const exclusions: Partial<Record<SceneFamilyId, PlacementId[]>> = {
  "line-field": ["middle-right", "split-right"],
  "modular-blocks": ["upper-left", "middle-left"],
  "orbital-points": ["center-narrow"],
  "scanner-bands": ["lower-wide"],
  "wave-lattice": ["middle-right", "split-right"],
  "pulse-cells": ["lower-left", "split-left"],
  "sliding-frames": ["middle-left", "center-narrow"],
};

export function generatePlacement(random: SeededRandom, family: SceneFamilyId) {
  const excluded = exclusions[family] ?? [];
  return random.pick(placements.filter((placement) => !excluded.includes(placement)));
}
