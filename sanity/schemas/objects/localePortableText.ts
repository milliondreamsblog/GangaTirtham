import { defineField, defineType } from "sanity";

import { PRIMARY_LOCALE, SUPPORTED_LOCALES } from "../lib/locales";

/**
 * Localized long-form. Transcreation, not literal translation — the HI reads as
 * authored. A place may ship EN-complete with HI as a flagged fallback.
 */
export const localePortableText = defineType({
  name: "localePortableText",
  title: "Localized rich text",
  type: "object",
  fieldsets: [
    { name: "translations", title: "Translations", options: { collapsible: true, collapsed: false } },
  ],
  fields: SUPPORTED_LOCALES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "blockContent",
      fieldset: lang.id === PRIMARY_LOCALE ? undefined : "translations",
    }),
  ),
});
