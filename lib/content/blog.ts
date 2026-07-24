import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n/locale";

const BLOG_ROOT = path.join(process.cwd(), "content", "blog");

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type Article = ArticleMeta & { body: string };

function parseArticle(source: string, slug: string): Omit<Article, "slug"> {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter in ${slug}.`);

  const lines = match[1].split(/\r?\n/);
  const values: Record<string, string | string[]> = {};
  let activeList: string | null = null;
  for (const line of lines) {
    const item = line.match(/^\s*-\s+"(.*)"\s*$/);
    if (item && activeList) {
      (values[activeList] as string[]).push(item[1]);
      continue;
    }
    const field = line.match(/^([a-z]+):\s*(?:"(.*)"\s*)?$/);
    if (!field) continue;
    activeList = field[2] === undefined ? field[1] : null;
    values[field[1]] = activeList ? [] : field[2];
  }
  const { title, description, date, tags } = values;
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof date !== "string" ||
    !Array.isArray(tags)
  ) {
    throw new Error(`Invalid frontmatter in ${slug}.`);
  }
  return { title, description, date, tags, body: match[2].trim() };
}

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(BLOG_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function getArticle(slug: string, locale: Locale): Article | null {
  if (!getArticleSlugs().includes(slug)) return null;
  const source = fs.readFileSync(path.join(BLOG_ROOT, slug, `${locale}.md`), "utf8");
  return { slug, ...parseArticle(source, slug) };
}

export function getArticles(locale: Locale): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => {
      const article = getArticle(slug, locale);
      if (!article) throw new Error(`Article ${slug} disappeared.`);
      const { body: _body, ...metadata } = article;
      void _body;
      return metadata;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
