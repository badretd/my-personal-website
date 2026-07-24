import Link from "next/link";
import type { ArticleMeta } from "@/lib/content/blog";
import type { Locale } from "@/lib/i18n/locale";
import styles from "./ArticleCard.module.css";

export function ArticleCard({ article, locale, className = "" }: { article: ArticleMeta; locale: Locale; className?: string }) {
  const [year, month, day] = article.date.split("-").map(Number);
  const date = new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    year: "numeric", month: locale === "ru" ? "2-digit" : "short", day: "2-digit", timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
  return (
    <Link className={`${styles.card} ${className}`} href={`/blog/${article.slug}`}>
      <time dateTime={article.date}>{date}</time>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <ul>{article.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
