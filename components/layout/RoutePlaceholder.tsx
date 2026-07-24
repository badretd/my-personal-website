"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import styles from "./RoutePlaceholder.module.css";

type PlaceholderKey = "projects" | "music" | "blog" | "about";

export function RoutePlaceholder({ route }: { route: PlaceholderKey }) {
  const { dictionary } = useI18n();
  const [title, description] = dictionary.placeholders[route];

  return (
    <main className={styles.main}>
      <p>[ badretd ] / {title}</p>
      <h1>{title}</h1>
      <div className={styles.rule} aria-hidden="true" />
      <p className={styles.description}>{description}</p>
    </main>
  );
}
