import { defineField, defineType } from "sanity";

import { journeyStageField } from "../lib/journey";

/**
 * FACE · Craft — the maker's hand; process over product. Joins Postgres by
 * productSkus for any acquirable objects. See CONTENT_DOCTRINE.md.
 */
export const craft = defineType({
  name: "craft",
  title: "Craft",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "makerWitness",
      title: "Maker (as witness)",
      type: "reference",
      to: [{ type: "witness" }],
      description: "The maker, treated as a consented witness where identified.",
    }),
    defineField({ name: "process", title: "Process", type: "localePortableText" }),
    defineField({
      name: "productSkus",
      title: "Product SKUs",
      type: "array",
      of: [{ type: "string" }],
      description: "Stable string ids → Postgres. Never a hard FK.",
    }),
    defineField({
      name: "relatedPlaces",
      title: "Related places",
      type: "array",
      of: [{ type: "reference", to: [{ type: "place" }] }],
    }),
    journeyStageField(),
    defineField({ name: "images", title: "Images", type: "array", of: [{ type: "gtImage" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "editorialOps", title: "Production", type: "editorialOps" }),
  ],
  preview: {
    select: { title: "title.en", titleHi: "title.hi" },
    prepare({ title, titleHi }) {
      return { title: title || titleHi || "Craft", subtitle: "FACE · Craft" };
    },
  },
});
