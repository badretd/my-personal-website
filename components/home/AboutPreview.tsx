"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import styles from "./AboutPreview.module.css";

export function AboutPreview() {
  const { dictionary } = useI18n();
  const copy = dictionary.aboutPreview;

  return (
    <section className={styles.section} aria-labelledby="about-preview-title">
      <div className={styles.heading}>
        <p>{copy.subtitle}</p>
        <h2 id="about-preview-title">{copy.title}</h2>
      </div>
      <div className={styles.copy}>
        {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <Link href="/about">{copy.action}<span aria-hidden="true"> →</span></Link>
      </div>
    </section>
  );
}
