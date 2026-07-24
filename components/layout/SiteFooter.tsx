"use client";

import { socials } from "@/content/socials";
import { useI18n } from "@/lib/i18n/I18nProvider";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const { dictionary } = useI18n();
  return (
    <footer className={styles.footer} aria-label={dictionary.footer.label}>
      <p className={styles.brand}>[ badretd ]</p>
      <ul>
        {socials.map((social) => (
          <li key={social.id}>
            {social.href ? (
              <a href={social.href} aria-label={`${social.label} — [ badretd ]`}>
                {social.label}
              </a>
            ) : (
              <span>{social.label} — {dictionary.footer.soon}</span>
            )}
          </li>
        ))}
      </ul>
      <p className={styles.copyright}>{dictionary.footer.copyright}</p>
    </footer>
  );
}
