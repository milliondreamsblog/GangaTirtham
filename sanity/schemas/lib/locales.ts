/**
 * Field-level localization config (Hindi-first). Structured data is shared; only
 * text is localized. Kept in lock-step with lib/i18n.ts. See ARCHITECTURE.md.
 */
export const PRIMARY_LOCALE = "hi";

export const SUPPORTED_LOCALES = [
  { id: "hi", title: "हिन्दी · Hindi" },
  { id: "en", title: "English" },
] as const;
