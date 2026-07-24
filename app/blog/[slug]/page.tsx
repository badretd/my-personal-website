import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getArticle, getArticleSlugs } from "@/lib/content/blog";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug, "en");
  if (!article) return {};
  return { title: `${article.title} — [ badretd ]`, description: article.description };
}

function ArticleLanguage({ slug, locale }: { slug: string; locale: "ru" | "en" }) {
  const article = getArticle(slug, locale);
  if (!article) notFound();
  const formatted = new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    year: "numeric", month: locale === "ru" ? "2-digit" : "long", day: "2-digit", timeZone: "UTC",
  }).format(new Date(`${article.date}T00:00:00Z`));
  return (
    <article className={locale === "ru" ? styles.localeRu : styles.localeEn} lang={locale}>
      <Link className={styles.back} href="/blog">← {locale === "ru" ? "Назад к блогу" : "Back to Blog"}</Link>
      <header>
        <time dateTime={article.date}>{formatted}</time>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <ul>{article.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </header>
      <div className={styles.markdown}>
        <ReactMarkdown components={{
          img: ({ src, alt }) => (
            // Local, trusted Markdown images need their natural aspect ratio.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" />
          ),
          a: ({ href, children }) => <a href={href}>{children}</a>,
        }}>{article.body}</ReactMarkdown>
      </div>
    </article>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getArticleSlugs().includes(slug)) notFound();
  return (
    <main className={styles.main}>
      <ArticleLanguage slug={slug} locale="ru" />
      <ArticleLanguage slug={slug} locale="en" />
      <SiteFooter />
    </main>
  );
}
