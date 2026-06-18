import { defineField, defineType } from "sanity";

import { PRIMARY_LOCALE, SUPPORTED_LOCALES } from "../lib/locales";

export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fieldsets: [
    { name: "translations", title: "Translations", options: { collapsible: true, collapsed: false } },
  ],
  fields: SUPPORTED_LOCALES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "string",
      fieldset: lang.id === PRIMARY_LOCALE ? undefined : "translations",
    }),
  ),
});
