/**
 * Field-level localization (not per-locale documents). Hindi-first. Structured
 * data (km, geo, refs) is shared; only text is localized via localeString /
 * localeText / localePortableText. See ARCHITECTURE.md ("i18n").
 *
 * Locale-prefixed routes `/[locale]/…` + middleware land in M2.
 */

export const locales = ["hi", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "hi";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** A localized string value as stored in Sanity. */
export type LocaleValue = Partial<Record<Locale, string>>;

/**
 * Resolve a localized value with graceful fallback: requested locale → the
 * primary (hi) → the other locale → empty. A place may ship EN-complete with
 * `hi: 'fallback'`; chrome strings stay localized.
 */
export function resolveLocale(
  value: LocaleValue | undefined | null,
  locale: Locale = defaultLocale,
): string {
  if (!value) return "";
  return value[locale] || value[defaultLocale] || value.en || value.hi || "";
}
