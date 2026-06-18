import { defineField, defineType } from "sanity";

/**
 * collection — an ordered, polymorphic curatorial set ("The Ganga Collection"
 * archive). Items may be places, FACE entities, or books.
 */
export const collection = defineType({
  name: "collection",
  title: "Collection",
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
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "coverImage", title: "Cover image", type: "gtImage" }),
    defineField({
      name: "items",
      title: "Items (ordered)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "place" },
            { type: "festival" },
            { type: "art" },
            { type: "craft" },
            { type: "environmentalIssue" },
            { type: "book" },
          ],
        },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "editorialOps", title: "Production", type: "editorialOps" }),
  ],
  preview: {
    select: { title: "title.en", titleHi: "title.hi", media: "coverImage" },
    prepare({ title, titleHi, media }) {
      return { title: title || titleHi || "Collection", media };
    },
  },
});
