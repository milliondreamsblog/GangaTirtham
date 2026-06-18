import { defineField, defineType } from "sanity";

import { journeyStageField, OBITUARY_STAGE } from "../lib/journey";

/**
 * FACE · Environment — stewardship/continuity register, or where earned the
 * obituary register. Gravity, never NGO shock. Strictest sourcing applies.
 * See CONTENT_DOCTRINE.md.
 */
export const environmentalIssue = defineType({
  name: "environmentalIssue",
  title: "Environmental issue",
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
      name: "register",
      title: "Register",
      type: "string",
      options: {
        list: [
          { title: "Stewardship / continuity", value: "stewardship" },
          { title: "Obituary (where earned)", value: "obituary" },
        ],
        layout: "radio",
      },
      initialValue: "stewardship",
      // The Karuna Guard: the obituary register is earned at exactly ONE stage
      // (7 · The Wound). One grief beat, enforced in data — not editorial vigilance.
      validation: (rule) =>
        rule.custom((value, context) => {
          const stage = (context.document as { journeyStage?: number } | undefined)?.journeyStage;
          if (value === "obituary" && stage !== OBITUARY_STAGE) {
            return `The obituary register is only permitted at journey stage ${OBITUARY_STAGE} (The Wound). Everywhere else, Environment is stewardship.`;
          }
          return true;
        }),
    }),
    journeyStageField(),
    defineField({ name: "summary", title: "Summary", type: "localeText" }),
    defineField({ name: "body", title: "Body", type: "localePortableText" }),
    defineField({
      name: "dataPoints",
      title: "Data points (verifiable)",
      type: "array",
      description: "Specificity is the anti-cliché — a real number, with a source.",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "localeString" },
            { name: "value", title: "Value", type: "string" },
            { name: "source", title: "Source", type: "string" },
            { name: "year", title: "Year", type: "number" },
          ],
          preview: {
            select: { label: "label.en", value: "value" },
            prepare({ label, value }) {
              return { title: label || "Data point", subtitle: value };
            },
          },
        },
      ],
    }),
    defineField({
      name: "relatedPlaces",
      title: "Related places",
      type: "array",
      of: [{ type: "reference", to: [{ type: "place" }] }],
    }),
    defineField({ name: "images", title: "Images", type: "array", of: [{ type: "gtImage" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "editorialOps", title: "Production", type: "editorialOps" }),
  ],
  preview: {
    select: { title: "title.en", titleHi: "title.hi", register: "register" },
    prepare({ title, titleHi, register }) {
      return { title: title || titleHi || "Environment", subtitle: `FACE · Environment · ${register ?? ""}` };
    },
  },
});
