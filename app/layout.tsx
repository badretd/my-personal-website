import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { resolveLocale } from "@/lib/i18n/locale";
import "./globals.css";

export const metadata: Metadata = {
  title: "[ badretd ]",
  description: "The personal website of I. R. Badretdinov.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const initialLocale = resolveLocale(
    cookieStore.get("badretd-language")?.value,
    headerStore.get("accept-language"),
  );

  return (
    <html lang={initialLocale}>
      <body>
        <I18nProvider initialLocale={initialLocale}>
          <SiteHeader />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
