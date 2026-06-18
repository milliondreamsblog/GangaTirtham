import { defineField, defineType } from "sanity";

/**
 * A specification row for the book's acquisition apparatus (Edition, Format,
 * Binding, Paper, Endpaper…). Presented as a register, never a SKU spec sheet.
 */
export const specRow = defineType({
  name: "specRow",
  title: "Specification",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { label: "label.en", value: "value.en" },
    prepare({ label, value }) {
      return { title: label || "Spec", subtitle: value };
    },
  },
});
