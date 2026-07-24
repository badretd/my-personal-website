"use client";

import Image from "next/image";
import type { Release } from "@/lib/content/releases";
import { formatReleaseDate } from "@/lib/content/releases";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Equalizer } from "./Equalizer";
import styles from "./ReleaseFeature.module.css";

export function ReleaseFeature({ release, compact = false }: { release: Release; compact?: boolean }) {
  const { locale, dictionary } = useI18n();
  return (
    <section className={`${styles.feature} ${compact ? styles.compact : ""}`} aria-labelledby={`release-${release.id}`}>
      <Equalizer />
      <div className={styles.cover}>
        <Image src={release.cover} alt={dictionary.music.coverAlt} fill sizes={compact ? "(max-width: 48rem) 100vw, 42vw" : "(max-width: 48rem) 100vw, 50vw"} priority={!compact} />
      </div>
      <div className={styles.copy}>
        <p className={styles.label}>{dictionary.music.latest}</p>
        <h2 id={`release-${release.id}`}>{release.title}</h2>
        <p className={styles.artist}>{release.artist}</p>
        <time dateTime={release.date}>{formatReleaseDate(release.date, locale)}</time>
        <ul aria-label={dictionary.music.listenOn}>
          {Object.entries(release.links).map(([service, href]) => (
            <li key={service}><a href={href}>{service === "youtube" ? "YouTube" : service[0].toUpperCase() + service.slice(1)}</a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
