"use client";

import type { Project } from "@/content/projects";
import { useI18n } from "@/lib/i18n/I18nProvider";
import styles from "./ProjectCard.module.css";

export function ProjectCard({
  project,
  onActive,
}: {
  project: Project;
  onActive?: (id: string | null) => void;
}) {
  const { locale, dictionary } = useI18n();
  return (
    <a
      className={styles.card}
      href={project.repository}
      data-project={project.id}
      aria-label={`${dictionary.projects.repositoryLabel}: ${project.name}`}
      onMouseEnter={() => onActive?.(project.id)}
      onMouseLeave={() => onActive?.(null)}
      onFocus={() => onActive?.(project.id)}
      onBlur={() => onActive?.(null)}
    >
      <span className={styles.symbol} aria-hidden="true">{project.symbol}</span>
      <h3>{project.name}</h3>
      <p className={styles.description}>{project.description[locale]}</p>
      <div className={styles.comment}>
        <span>{dictionary.projects.comment}</span>
        <p>{project.comment[locale]}</p>
      </div>
      <span className={styles.repository}>{dictionary.projects.repository} ↗</span>
    </a>
  );
}
