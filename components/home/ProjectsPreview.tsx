"use client";

import Link from "next/link";
import { projects } from "@/content/projects";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { ProjectCard } from "@/components/projects/ProjectCard";
import styles from "./ProjectsPreview.module.css";

export function ProjectsPreview() {
  const { dictionary } = useI18n();
  return (
    <section className={styles.section} aria-labelledby="projects-preview-title">
      <header><p>02 / GitHub</p><h2 id="projects-preview-title">{dictionary.projects.title}</h2></header>
      <div className={styles.grid}>
        {projects.slice(0, 3).map((project) => <ProjectCard project={project} key={project.id} />)}
        <Link className={styles.all} href="/projects">
          <span aria-hidden="true">→</span>
          <strong>{dictionary.projects.all}</strong>
        </Link>
      </div>
    </section>
  );
}
