import { defineField, defineType } from "sanity";

import { journeyStageField } from "../lib/journey";

/**
 * FACE · Art — the living culture (music, manuscript). The artist references an
 * author. See CONTENT_DOCTRINE.md ("FACE GANGA framing").
 */
export const art = defineType({
  name: "art",
  title: "Art",
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
      name: "artist",
      title: "Artist",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({ name: "description", title: "Description", type: "localePortableText" }),
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
      return { title: title || titleHi || "Art", subtitle: "FACE · Art" };
    },
  },
});
