"use client";

import Image from "next/image";
import type { Release } from "@/lib/content/releases";
import { formatReleaseDate } from "@/lib/content/releases";
import { useI18n } from "@/lib/i18n/I18nProvider";
import styles from "./ReleaseArchive.module.css";

export function ReleaseArchive({ releases, latestId }: { releases: readonly Release[]; latestId: string }) {
  const { locale, dictionary } = useI18n();
  return (
    <section className={styles.archive} aria-labelledby="release-archive-title">
      <h2 id="release-archive-title">{dictionary.music.archive}</h2>
      <ol>
        {[...releases].sort((a, b) => b.date.localeCompare(a.date)).map((release) => (
          <li key={release.id}>
            <div className={styles.cover}><Image src={release.cover} alt={dictionary.music.coverAlt} fill sizes="10rem" /></div>
            <div><h3>{release.title}</h3><p>{release.artist}</p></div>
            <time dateTime={release.date}>{formatReleaseDate(release.date, locale)}</time>
            {release.id === latestId && <span className={styles.latest}>{dictionary.music.latestMark}</span>}
            <div className={styles.links}>
              {Object.entries(release.links).map(([service, href]) => <a key={service} href={href}>{service}</a>)}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
