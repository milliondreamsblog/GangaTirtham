import { defineField, defineType } from "sanity";

/**
 * A Sankalp tier — intention-first. The amount is framed as WHAT IT SUSTAINS,
 * never as a price or a charity ask. "Keep a standing lamp" = recurring. 80G is
 * issued at confirmation, never in the invitation. See CONTENT_DOCTRINE.md.
 */
export const sustainTier = defineType({
  name: "sustainTier",
  title: "Sankalp tier",
  type: "object",
  fields: [
    defineField({
      name: "amount",
      title: "Amount (₹ INR)",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "label",
      title: "Intention label",
      type: "localeString",
      description: 'e.g. "Keep a lamp", "Keep a standing lamp".',
    }),
    defineField({
      name: "sustains",
      title: "What it sustains",
      type: "localeText",
      description: "Frame the amount as what it keeps lit on the river.",
    }),
    defineField({
      name: "recurring",
      title: "Recurring (standing lamp)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { amount: "amount", label: "label.en", recurring: "recurring" },
    prepare({ amount, label, recurring }) {
      return {
        title: label || "Tier",
        subtitle: `₹${amount ?? "—"}${recurring ? " · standing" : ""}`,
      };
    },
  },
});
