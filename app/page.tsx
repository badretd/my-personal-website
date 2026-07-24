import { AboutPreview } from "@/components/home/AboutPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { ReleaseFeature } from "@/components/music/ReleaseFeature";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProceduralHero } from "@/components/procedural/ProceduralHero";
import { getArticles } from "@/lib/content/blog";
import { getLatestRelease } from "@/lib/content/releases";

export default function Home() {
  const articles = { ru: getArticles("ru"), en: getArticles("en") };
  return (
    <main>
      <ProceduralHero />
      <AboutPreview />
      <ProjectsPreview />
      <ReleaseFeature release={getLatestRelease()} compact />
      <BlogPreview articles={articles} />
      <SiteFooter />
    </main>
  );
}
