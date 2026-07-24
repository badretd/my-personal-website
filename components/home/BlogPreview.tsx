"use client";

import type { ArticleMeta } from "@/lib/content/blog";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { ArticleCard } from "@/components/blog/ArticleCard";
import styles from "./BlogPreview.module.css";

export function BlogPreview({ articles }: { articles: Record<"ru" | "en", ArticleMeta[]> }) {
  const { locale, dictionary } = useI18n();
  return (
    <section className={styles.section} aria-labelledby="blog-preview-title">
      <header><p>04 / Markdown</p><h2 id="blog-preview-title">{dictionary.blog.title}</h2></header>
      <div className={styles.grid}>
        {articles[locale].slice(0, 3).map((article, index) => (
          <ArticleCard article={article} locale={locale} key={article.slug} className={styles[`item${index + 1}`]} />
        ))}
      </div>
    </section>
  );
}
