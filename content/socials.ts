export type Social = Readonly<{
  id: "github" | "youtube" | "telegram" | "soundcloud" | "bandcamp";
  label: string;
  href: string | null;
}>;

export const socials: readonly Social[] = [
  { id: "github", label: "GitHub", href: "https://github.com/badretd" },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/playlist?list=PLbwUX30QFDaM",
  },
  { id: "telegram", label: "Telegram", href: null },
  { id: "soundcloud", label: "SoundCloud", href: "https://soundcloud.com/logka419" },
  { id: "bandcamp", label: "Bandcamp", href: "https://logka.bandcamp.com" },
] as const;
