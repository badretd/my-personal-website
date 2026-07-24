"use client";

import { useEffect, useRef } from "react";
import styles from "./Equalizer.module.css";

const BAR_COUNT = 36;

export function Equalizer() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const bars = [...root.querySelectorAll<HTMLElement>("[data-bar]")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let timer = 0;
    let phase = 0;

    const update = () => {
      if (!visible || document.hidden || motion.matches) return;
      phase += 0.38;
      const anchors = [0.28, 0.6, 0.42, 0.7, 0.34].map(
        (value, index) => value + Math.sin(phase * (0.7 + index * 0.09)) * 0.13,
      );
      bars.forEach((bar, index) => {
        const position = (index / Math.max(1, bars.length - 1)) * (anchors.length - 1);
        const left = Math.floor(position);
        const blend = position - left;
        const broad = anchors[left] * (1 - blend) + anchors[Math.min(left + 1, anchors.length - 1)] * blend;
        const detail = Math.sin(phase * 1.7 + index * 0.63) * 0.07;
        bar.style.setProperty("--level", `${Math.max(0.12, Math.min(0.88, broad + detail))}`);
      });
    };
    const schedule = () => {
      window.clearInterval(timer);
      if (!motion.matches) {
        update();
        timer = window.setInterval(update, 280);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
    }, { rootMargin: "20% 0px" });
    observer.observe(root);
    motion.addEventListener("change", schedule);
    schedule();
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      motion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div className={styles.equalizer} ref={rootRef} aria-hidden="true">
      {Array.from({ length: BAR_COUNT }, (_, index) => (
        <i key={index} data-bar style={{ "--level": `${0.2 + ((index * 17) % 55) / 100}` } as React.CSSProperties} />
      ))}
    </div>
  );
}
