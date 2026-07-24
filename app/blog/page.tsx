import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { LocalizedPageIntro } from "@/components/layout/LocalizedPageIntro";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getArticles } from "@/lib/content/blog";

export default function BlogPage() {
  const articles = { ru: getArticles("ru"), en: getArticles("en") };
  return (
    <main>
      <LocalizedPageIntro page="blog" index="03" />
      <BlogExplorer articles={articles} />
      <SiteFooter />
    </main>
  );
}
