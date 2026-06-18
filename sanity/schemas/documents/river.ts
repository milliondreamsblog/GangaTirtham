import { defineField, defineType } from "sanity";

/**
 * river — the spine. `km` on each place is measured against this; totalKm scales
 * the temperature ramp. There is exactly one river at launch (Ganga).
 */
export const river = defineType({
  name: "river",
  title: "River",
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
    defineField({
      name: "totalKm",
      title: "Total length (km)",
      type: "number",
      description: "Source → ocean. Scales the temperature ramp.",
      initialValue: 2525,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "sourceName", title: "Source name", type: "localeString" }),
    defineField({ name: "mouthName", title: "Mouth name", type: "localeString" }),
    defineField({ name: "overview", title: "Overview", type: "localePortableText" }),
    defineField({ name: "hero", title: "Hero image", type: "gtImage" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "name.en", titleHi: "name.hi", km: "totalKm", media: "hero" },
    prepare({ title, titleHi, km, media }) {
      return { title: title || titleHi || "River", subtitle: km ? `${km} km` : undefined, media };
    },
  },
});
