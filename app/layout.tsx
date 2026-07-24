import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "badretd — projects, music & notes",
  description:
    "The personal site of badretd: selected projects, free music, writing, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
