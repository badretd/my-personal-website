"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/locale";
import styles from "./SiteHeader.module.css";

const routes = [
  ["/", "home"],
  ["/projects", "projects"],
  ["/music", "music"],
  ["/blog", "blog"],
  ["/about", "about"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, dictionary, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const nav = dictionary.navigation;

  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/" aria-label={nav.homeLabel}>
        [ badretd ]
      </Link>
      <button
        className={styles.menu}
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? nav.close : nav.menu}
        <span aria-hidden="true" />
      </button>
      <nav
        className={`${styles.nav} ${open ? styles.open : ""}`}
        id="primary-navigation"
        aria-label={nav.label}
      >
        <ul>
          {routes.map(([href, key]) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
              >
                {nav[key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.languages} role="group" aria-label={nav.language}>
        {(["ru", "en"] as Locale[]).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={locale === value}
            onClick={() => setLocale(value)}
          >
            {value.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}
