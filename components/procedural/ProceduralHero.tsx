"use client";

import { type CSSProperties, useRef } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Scene } from "./Scene";
import { useSceneCycle } from "./useSceneCycle";
import styles from "./ProceduralHero.module.css";

export function ProceduralHero() {
  const { dictionary } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  const { scene, interstitial, paused } = useSceneCycle(heroRef);
  const gridStyle = {
    "--scene-bg": scene.palette.background,
    "--scene-fg": scene.palette.foreground,
    "--scene-muted": scene.palette.muted,
    "--scene-accent": scene.palette.accent,
    "--scene-accent-alt": scene.palette.accentAlt,
    "--cols-mobile": scene.grid.columns.mobile,
    "--cols-tablet": scene.grid.columns.tablet,
    "--cols-desktop": scene.grid.columns.desktop,
    "--cols-wide": scene.grid.columns.wide,
    "--rows-mobile": scene.grid.rows.mobile,
    "--rows-tablet": scene.grid.rows.tablet,
    "--rows-desktop": scene.grid.rows.desktop,
    "--rows-wide": scene.grid.rows.wide,
    "--cell-mobile-x": `${100 / scene.grid.columns.mobile}%`,
    "--cell-tablet-x": `${100 / scene.grid.columns.tablet}%`,
    "--cell-desktop-x": `${100 / scene.grid.columns.desktop}%`,
    "--cell-wide-x": `${100 / scene.grid.columns.wide}%`,
    "--cell-mobile-y": `${100 / scene.grid.rows.mobile}%`,
    "--cell-tablet-y": `${100 / scene.grid.rows.tablet}%`,
    "--cell-desktop-y": `${100 / scene.grid.rows.desktop}%`,
    "--cell-wide-y": `${100 / scene.grid.rows.wide}%`,
    "--pad-mobile": `${scene.grid.padding.mobile}px`,
    "--pad-tablet": `${scene.grid.padding.tablet}px`,
    "--pad-desktop": `${scene.grid.padding.desktop}px`,
    "--pad-wide": `${scene.grid.padding.wide}px`,
    "--motion-state": paused ? "paused" : "running",
  } as CSSProperties;

  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-title"
      ref={heroRef}
      style={gridStyle}
    >
      <Scene scene={scene} paused={paused} />
      <div className={styles.compositionGrid}>
        <div className={`${styles.copy} ${styles[scene.placement]}`}>
          <h1 id="hero-title">{dictionary.hero.title}</h1>
          <p>{dictionary.hero.description}</p>
        </div>
      </div>
      {interstitial && (
        <div className={styles.interstitial}>
          <span>[ badretded ]</span>
        </div>
      )}
    </section>
  );
}
