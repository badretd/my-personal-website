"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { PageIntro } from "./PageIntro";

export function LocalizedPageIntro({ page, index }: { page: "projects" | "music" | "blog" | "about"; index: string }) {
  const { dictionary } = useI18n();
  return <PageIntro title={dictionary[page].title} index={index} />;
}
