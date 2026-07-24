"use client";

import { useMemo, useState } from "react";
import type { ArticleMeta } from "@/lib/content/blog";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { ArticleCard } from "./ArticleCard";
import styles from "./BlogExplorer.module.css";

export function BlogExplorer({ articles }: { articles: Record<"ru" | "en", ArticleMeta[]> }) {
  const { locale, dictionary } = useI18n();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [ascending, setAscending] = useState(false);
  const current = articles[locale];
  const tags = useMemo(() => [...new Set(current.flatMap((article) => article.tags))].sort(), [current]);
  const visible = current
    .filter((article) => {
      const search = query.trim().toLocaleLowerCase(locale);
      const matchesSearch = !search || `${article.title} ${article.description}`.toLocaleLowerCase(locale).includes(search);
      return matchesSearch && (!selected.length || article.tags.some((tag) => selected.includes(tag)));
    })
    .sort((a, b) => (ascending ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));

  const toggle = (tag: string) => setSelected((value) => value.includes(tag) ? value.filter((item) => item !== tag) : [...value, tag]);
  return (
    <section className={styles.explorer} aria-label={dictionary.blog.title}>
      <div className={styles.controls}>
        <label>{dictionary.blog.search}<input type="search" value={query} placeholder={dictionary.blog.searchPlaceholder} onChange={(event) => setQuery(event.target.value)} /></label>
        <label>{dictionary.blog.sort}<select value={ascending ? "oldest" : "newest"} onChange={(event) => setAscending(event.target.value === "oldest")}><option value="newest">{dictionary.blog.newest}</option><option value="oldest">{dictionary.blog.oldest}</option></select></label>
        <fieldset>
          <legend>{dictionary.blog.tags}</legend>
          <div>{tags.map((tag) => <button type="button" key={tag} aria-pressed={selected.includes(tag)} onClick={() => toggle(tag)}><span aria-hidden="true">{selected.includes(tag) ? "×" : "+"}</span>{tag}</button>)}</div>
        </fieldset>
        <button className={styles.reset} type="button" disabled={!query && !selected.length && !ascending} onClick={() => { setQuery(""); setSelected([]); setAscending(false); }}>{dictionary.blog.reset}</button>
      </div>
      {visible.length ? <div className={styles.grid}>{visible.map((article) => <ArticleCard article={article} locale={locale} key={article.slug} />)}</div> : <p className={styles.empty}>{dictionary.blog.empty}</p>}
    </section>
  );
}
