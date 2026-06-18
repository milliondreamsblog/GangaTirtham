import { defineField, defineType } from "sanity";

/**
 * A dated occurrence of a festival (festivals recur; dates shift yearly and are
 * a `needs-update` review item). Framing = preparation/aftermath/periphery,
 * never peak spectacle.
 */
export const festivalInstance = defineType({
  name: "festivalInstance",
  title: "Festival instance",
  type: "object",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "startDate", title: "Start date", type: "date" }),
    defineField({ name: "endDate", title: "End date", type: "date" }),
    defineField({
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
    }),
    defineField({ name: "note", title: "Note", type: "string" }),
  ],
  preview: {
    select: { year: "year", place: "place.title.en" },
    prepare({ year, place }) {
      return { title: `${year ?? "—"}${place ? ` · ${place}` : ""}` };
    },
  },
});
