"use client";

import { useState } from "react";
import { projects } from "@/content/projects";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { LocalizedPageIntro } from "@/components/layout/LocalizedPageIntro";
import { ProjectCard } from "./ProjectCard";
import styles from "./ProjectsPageContent.module.css";

const paths = [
  { id: "web-radio", d: "M 40 90 H 320 V 260 H 720" },
  { id: "bitp", d: "M 120 430 H 520 V 170 H 940" },
  { id: "codecast", d: "M 300 650 V 460 H 860 V 710 H 1160" },
  { id: "all", d: "M 40 760 H 470 M 720 90 V 780" },
];

export function ProjectsPageContent() {
  const { dictionary } = useI18n();
  const [active, setActive] = useState<string | null>(null);
  return (
    <main className={styles.main}>
      <LocalizedPageIntro page="projects" index="01" />
      <div className={styles.system} aria-hidden="true">
        <svg viewBox="0 0 1200 850" preserveAspectRatio="none">
          {paths.map((path) => <path key={path.id} d={path.d} data-active={active === path.id || (!active && path.id === "all")} />)}
          {[["40","90"],["320","260"],["520","170"],["860","710"],["1160","710"]].map(([cx, cy]) => <rect key={`${cx}-${cy}`} x={cx} y={cy} width="7" height="7" />)}
        </svg>
      </div>
      <section className={styles.grid} aria-label={dictionary.projects.title}>
        {projects.map((project) => <ProjectCard project={project} key={project.id} onActive={setActive} />)}
      </section>
    </main>
  );
}
