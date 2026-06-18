import { defineField, defineType } from "sanity";

/**
 * Per-document SEO overrides. Defaults are derived from content; these only
 * override. Depth-tier rule (stub/forthcoming → noindex,follow) is enforced in
 * metadata generation, not here. See ARCHITECTURE.md ("SEO architecture").
 */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title override",
      type: "localeString",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description override",
      type: "localeText",
    }),
    defineField({
      name: "ogImage",
      title: "Social share image override",
      type: "gtImage",
      description: "Falls back to the dynamic OG card if empty.",
    }),
    defineField({
      name: "noindex",
      title: "Force noindex",
      type: "boolean",
      description: "Stubs/forthcoming are noindex automatically; this forces it.",
      initialValue: false,
    }),
    defineField({
      name: "canonicalOverride",
      title: "Canonical URL override",
      type: "url",
    }),
  ],
});
