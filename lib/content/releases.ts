import releasesData from "@/content/music/releases.json";
import type { Locale } from "@/lib/i18n/locale";

export type ReleaseService = "bandcamp" | "soundcloud" | "youtube";
export type Release = Readonly<{
  id: string;
  title: string;
  artist: string;
  date: string;
  cover: string;
  links: Partial<Record<ReleaseService, string>>;
}>;

export const releases = releasesData satisfies Release[];

export function getLatestRelease(): Release {
  const latest = [...releases].sort((a, b) => b.date.localeCompare(a.date))[0];
  if (!latest) throw new Error("At least one music release is required.");
  return latest;
}

export function formatReleaseDate(date: string, locale: Locale) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: locale === "ru" ? "2-digit" : "long",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
