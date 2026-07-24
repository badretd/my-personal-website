export type Breakpoint = "mobile" | "tablet" | "desktop" | "wide";
export type SceneFamilyId =
  | "line-field"
  | "modular-blocks"
  | "orbital-points"
  | "scanner-bands"
  | "wave-lattice"
  | "pulse-cells"
  | "sliding-frames";
export type PlacementId =
  | "upper-left"
  | "middle-left"
  | "lower-left"
  | "center-narrow"
  | "middle-right"
  | "lower-wide"
  | "split-left"
  | "split-right";

export type Palette = {
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  accentAlt: string;
};

export type GridConfig = {
  columns: Record<Breakpoint, number>;
  rows: Record<Breakpoint, number>;
  gap: Record<Breakpoint, number>;
  padding: Record<Breakpoint, number>;
};

export type SystemConfig = {
  family: SceneFamilyId;
  region: "left" | "right" | "center" | "lower" | "full";
  count: number;
  direction: -1 | 1;
  speed: number;
  density: number;
  variant: number;
};

export type SceneConfig = {
  id: string;
  seed: number;
  family: SceneFamilyId;
  palette: Palette;
  grid: GridConfig;
  placement: PlacementId;
  primary: SystemConfig;
  supporting: SystemConfig[];
  grain: boolean;
};
