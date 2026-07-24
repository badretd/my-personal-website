import type { SceneFamilyId } from "./types";

export const sceneFamilies: SceneFamilyId[] = [
  "line-field",
  "modular-blocks",
  "orbital-points",
  "scanner-bands",
  "wave-lattice",
  "pulse-cells",
  "sliding-frames",
];

export const compatibleSupport: Record<SceneFamilyId, SceneFamilyId[]> = {
  "line-field": ["scanner-bands", "pulse-cells"],
  "modular-blocks": ["scanner-bands", "line-field"],
  "orbital-points": ["line-field"],
  "scanner-bands": ["line-field", "pulse-cells"],
  "wave-lattice": ["line-field", "scanner-bands"],
  "pulse-cells": ["line-field", "scanner-bands"],
  "sliding-frames": ["line-field", "scanner-bands"],
};
