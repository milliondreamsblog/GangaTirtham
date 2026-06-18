import { defineField, defineType } from "sanity";

/**
 * A place's appearance in a book — the many-to-many join carrying plate № and
 * page. Mirrors book.tableOfContents[].places[]. "This place lives in the book."
 */
export const bookAppearance = defineType({
  name: "bookAppearance",
  title: "Appears in book",
  type: "object",
  fields: [
    defineField({
      name: "book",
      title: "Book",
      type: "reference",
      to: [{ type: "book" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "plate", title: "Plate №", type: "string" }),
    defineField({ name: "page", title: "Page", type: "number" }),
    defineField({ name: "note", title: "Note", type: "string" }),
  ],
  preview: {
    select: { title: "book.title.en", plate: "plate" },
    prepare({ title, plate }) {
      return { title: title || "Book", subtitle: plate ? `Plate ${plate}` : undefined };
    },
  },
});
