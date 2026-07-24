"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { socials } from "@/content/socials";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { LocalizedPageIntro } from "@/components/layout/LocalizedPageIntro";
import styles from "./AboutTimeline.module.css";

const frames = {
  "2023": { src: "/photo_2026-07-24_17-18-35.jpg", alt: 0 },
  "2024": { src: "/photo_2026-07-24_17-22-13.jpg", alt: 1 },
} as const;

export function AboutTimeline() {
  const { dictionary } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.toggleAttribute("data-visible", entry.isIntersecting));
    }, { threshold: 0.18 });
    root.querySelectorAll("[data-segment]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <main>
      <LocalizedPageIntro page="about" index="04" />
      <div className={styles.timeline} ref={rootRef} aria-label={dictionary.about.timelineLabel}>
        {(["2023", "2024", "2025", "2026"] as const).map((year, index) => (
          <section className={`${styles.segment} ${year === "2025" ? styles.pause : ""}`} data-segment key={year}>
            <div className={styles.timecode}><span>TC</span><h2>{year}</h2><small>0{index + 1} / 04</small></div>
            <div className={styles.rail} aria-hidden="true"><i /></div>
            <p className={styles.copy}>{dictionary.about.years[year]}</p>
            {year in frames && (() => {
              const frame = frames[year as keyof typeof frames];
              return <figure><div><Image src={frame.src} alt={dictionary.about.imageAlts[frame.alt]} fill sizes="(max-width: 48rem) 100vw, 45vw" /></div><figcaption>FRAME / {year} / 0{index + 1}</figcaption></figure>;
            })()}
          </section>
        ))}
      </div>
      <section className={styles.closing}>
        <div className={styles.portrait}><Image src="/photo_2026-07-16_08-53-21.jpg" alt={dictionary.about.imageAlts[2]} fill sizes="(max-width: 48rem) 100vw, 56rem" /></div>
        <div className={styles.contacts}>
          <h2>{dictionary.about.contact}</h2>
          <ul>{socials.map((social) => <li key={social.id}>{social.href ? <a href={social.href}>{social.label}</a> : <span>{social.label} — {dictionary.footer.soon}</span>}</li>)}</ul>
        </div>
      </section>
    </main>
  );
}
