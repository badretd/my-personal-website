import type { SceneConfig } from "@/lib/procedural/types";
import { VisualSystem } from "./systems/VisualSystem";
import styles from "./Scene.module.css";

export function Scene({ scene, paused }: { scene: SceneConfig; paused: boolean }) {
  return (
    <div className={styles.scene} data-family={scene.family} data-paused={paused}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.visuals} aria-hidden="true">
        <VisualSystem config={scene.primary} />
        {scene.supporting.map((system, index) => (
          <VisualSystem key={`${system.family}-${index}`} config={system} supporting />
        ))}
      </div>
      {scene.grain && <div className={styles.grain} aria-hidden="true" />}
    </div>
  );
}
