import { defineField, defineType } from "sanity";

/**
 * reach — a named river segment (Source / Upper / Middle / Lower / Delta) that
 * groups places. The archive deepens reach by reach.
 */
export const reach = defineType({
  name: "reach",
  title: "Reach",
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
      name: "river",
      title: "River",
      type: "reference",
      to: [{ type: "river" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "segment",
      title: "Segment",
      type: "string",
      options: {
        list: [
          { title: "Source", value: "source" },
          { title: "Upper", value: "upper" },
          { title: "Middle", value: "middle" },
          { title: "Lower", value: "lower" },
          { title: "Delta", value: "delta" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order (source → ocean)",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "startKm", title: "Start km", type: "number" }),
    defineField({ name: "endKm", title: "End km", type: "number" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [
    {
      title: "Source → Ocean",
      name: "downstream",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name.en", titleHi: "name.hi", segment: "segment", order: "order" },
    prepare({ title, titleHi, segment, order }) {
      return {
        title: title || titleHi || "Reach",
        subtitle: `${order ? `${order}. ` : ""}${segment ?? ""}`,
      };
    },
  },
});
