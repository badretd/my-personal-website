import { LocalizedPageIntro } from "@/components/layout/LocalizedPageIntro";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ReleaseArchive } from "@/components/music/ReleaseArchive";
import { ReleaseFeature } from "@/components/music/ReleaseFeature";
import { getLatestRelease, releases } from "@/lib/content/releases";

export default function MusicPage() {
  const latest = getLatestRelease();
  return (
    <main>
      <LocalizedPageIntro page="music" index="02" />
      <ReleaseFeature release={latest} />
      <ReleaseArchive releases={releases} latestId={latest.id} />
      <SiteFooter />
    </main>
  );
}
