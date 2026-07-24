import type { CSSProperties } from "react";
import type { SystemConfig } from "@/lib/procedural/types";
import styles from "./VisualSystem.module.css";

type Variables = CSSProperties & {
  "--count": number;
  "--speed": string;
  "--direction": number;
  "--density": number;
};

export function VisualSystem({
  config,
  supporting = false,
}: {
  config: SystemConfig;
  supporting?: boolean;
}) {
  const variables: Variables = {
    "--count": config.count,
    "--speed": `${config.speed}s`,
    "--direction": config.direction,
    "--density": config.density,
  };
  const items = Array.from({ length: config.count }, (_, index) => index);

  return (
    <div
      className={`${styles.system} ${styles[config.family]} ${styles[config.region]} ${supporting ? styles.supporting : ""}`}
      data-variant={config.variant}
      style={variables}
    >
      {config.family === "wave-lattice" ? (
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none">
          {items.map((index) => (
            <path
              key={index}
              d={`M-100 ${70 + index * 42} C180 ${-20 + index * 38}, 330 ${180 + index * 25}, 560 ${80 + index * 40} S850 ${160 + index * 22}, 1100 ${60 + index * 43}`}
            />
          ))}
        </svg>
      ) : (
        items.map((index) => <i key={index} style={{ "--index": index } as CSSProperties} />)
      )}
    </div>
  );
}
