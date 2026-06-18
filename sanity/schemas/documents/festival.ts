import { defineField, defineType } from "sanity";

import { journeyStageField } from "../lib/journey";

/**
 * FACE · Festivals — preparation / aftermath / periphery, never peak spectacle.
 * (Haridwar = the sweeper, not the aarti.) See CONTENT_DOCTRINE.md.
 */
export const festival = defineType({
  name: "festival",
  title: "Festival",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "localePortableText" }),
    defineField({
      name: "instances",
      title: "Instances (dated)",
      type: "array",
      of: [{ type: "festivalInstance" }],
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
    select: { title: "name.en", titleHi: "name.hi" },
    prepare({ title, titleHi }) {
      return { title: title || titleHi || "Festival", subtitle: "FACE · Festivals" };
    },
  },
});
