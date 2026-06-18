import { defineField, defineType } from "sanity";

import { journeyStageField } from "../lib/journey";

/**
 * sankalpCampaign — the contribution model's editorial content. NEVER "Donate."
 * Intention-first; the amount is framed as what it sustains; 80G at confirmation
 * only. Joins Postgres by `slug` (the lamp/Sankalp ledger). The transaction is
 * Postgres + Razorpay (M6); this document is content only.
 */
export const sankalpCampaign = defineType({
  name: "sankalpCampaign",
  title: "Sankalp campaign",
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
      description: "Stable string id → Postgres lamp/Sankalp ledger. Never a hard FK.",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "targetPlace",
      title: "Target place",
      type: "reference",
      to: [{ type: "place" }],
      description: "The place this offering sustains the documentation of.",
    }),
    journeyStageField({
      description:
        "Which part of the river's life the lamp keeps alive. May follow the target place's stage. 'What it sustains' is framed by this emotional state.",
    }),
    defineField({
      name: "intention",
      title: "Intention",
      type: "localeText",
      description: "Set an intention. Participation/offering, never charity.",
    }),
    defineField({ name: "story", title: "Story", type: "localePortableText" }),
    defineField({
      name: "tiers",
      title: "Tiers",
      type: "array",
      of: [{ type: "sustainTier" }],
    }),
    defineField({
      name: "goalAmountINR",
      title: "Goal amount (₹ INR)",
      type: "number",
    }),
    defineField({ name: "image", title: "Image", type: "gtImage" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "editorialOps", title: "Production", type: "editorialOps" }),
  ],
  preview: {
    select: { title: "title.en", titleHi: "title.hi", media: "image" },
    prepare({ title, titleHi, media }) {
      return { title: title || titleHi || "Sankalp campaign", subtitle: "Keep a lamp", media };
    },
  },
});
