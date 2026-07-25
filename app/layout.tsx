import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "[ badretd ]",
  description: "The personal website of I. R. Badretdinov.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <I18nProvider initialLocale="en">
          <SiteHeader />
          {children}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
