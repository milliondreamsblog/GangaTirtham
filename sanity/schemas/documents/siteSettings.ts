import { defineField, defineType } from "sanity";

/**
 * siteSettings — a singleton. Chrome strings live here (localized); content
 * strings live per-document. Restricted to a single instance via the desk +
 * document-actions filter. See ARCHITECTURE.md ("i18n") + CONTENT_DOCTRINE.md.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "chrome", title: "Chrome strings" },
    { name: "about", title: "About page" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "localeString",
      group: "general",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "localeString",
      group: "general",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
      group: "general",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      group: "general",
    }),

    // ── Chrome strings (navigation + recurring CTAs) ──
    defineField({ name: "navCollection", title: "Nav · The Collection", type: "localeString", group: "chrome" }),
    defineField({ name: "navFace", title: "Nav · FACE Ganga", type: "localeString", group: "chrome" }),
    defineField({ name: "navBook", title: "Nav · The Vessel", type: "localeString", group: "chrome" }),
    defineField({ name: "navSankalp", title: "Nav · Sankalp", type: "localeString", group: "chrome" }),
    defineField({ name: "navAbout", title: "Nav · About", type: "localeString", group: "chrome" }),
    defineField({
      name: "walkWithRiverCta",
      title: "Email capture CTA ('Walk with the river')",
      type: "localeString",
      group: "chrome",
    }),

    // ── About page (the institution) ──
    defineField({ name: "aboutTitle", title: "About · title", type: "localeString", group: "about" }),
    defineField({
      name: "mission",
      title: "About · mission",
      type: "localePortableText",
      group: "about",
      description: "The institution: a cultural archive centred on the Ganga. Not an NGO.",
    }),
    defineField({
      name: "doctrine",
      title: "About · the documentation",
      type: "localePortableText",
      group: "about",
      description: "How the archive is reported, shot, consented, fact-checked, translated.",
    }),

    // ── Footer ──
    defineField({ name: "footerNote", title: "Footer note", type: "localePortableText", group: "footer" }),
    defineField({
      name: "social",
      title: "Social links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
