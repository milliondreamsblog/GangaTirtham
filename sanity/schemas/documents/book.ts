import { defineField, defineType } from "sanity";

import { JOURNEY_STAGE_OPTIONS } from "../lib/journey";

/**
 * book — the Vessel. A publication-of-record (museum-acquisition register),
 * never a SKU. Foil is reserved to the book (1px keyline only). Joins Postgres
 * by `sku` for the order. See PROJECT_HANDOFF.md ("The Vessel").
 */
export const book = defineType({
  name: "book",
  title: "Book",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "register", title: "Register" },
    { name: "contents", title: "Contents" },
    { name: "production", title: "Production" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localeString",
      group: "identity",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "identity",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      group: "identity",
      description: "Stable string id → Postgres Product/Order/Offer. Never a hard FK.",
    }),
    defineField({ name: "coverImage", title: "Cover image", type: "gtImage", group: "identity" }),
    defineField({ name: "description", title: "Description", type: "localePortableText", group: "identity" }),

    // ── The acquisition register ──
    defineField({
      name: "edition",
      title: "Edition",
      type: "string",
      group: "register",
      description: "An edition, not a print run (e.g. 'First · No. 0147').",
    }),
    defineField({ name: "format", title: "Format", type: "string", group: "register" }),
    defineField({
      name: "priceINR",
      title: "Price (₹ INR)",
      type: "number",
      group: "register",
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      group: "register",
      of: [{ type: "specRow" }],
    }),
    defineField({
      name: "foreword",
      title: "Foreword by",
      type: "reference",
      group: "register",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "contributors",
      title: "Contributors",
      type: "array",
      group: "register",
      of: [{ type: "reference", to: [{ type: "author" }] }],
    }),

    // ── Table of contents (⇄ place.appearsInBooks) ──
    defineField({
      name: "tableOfContents",
      title: "Table of contents",
      type: "array",
      group: "contents",
      of: [
        {
          type: "object",
          name: "tocEntry",
          fields: [
            { name: "title", title: "Section title", type: "localeString" },
            {
              name: "journeyStage",
              title: "Journey stage",
              type: "number",
              description: "The chapter binds to one of the 8 stages. Vol. I's ToC is the 8-stage arc.",
              options: { list: JOURNEY_STAGE_OPTIONS },
            },
            { name: "plate", title: "Plate №", type: "string" },
            { name: "page", title: "Page", type: "number" },
            {
              name: "places",
              title: "Places",
              type: "array",
              of: [{ type: "reference", to: [{ type: "place" }] }],
            },
          ],
          preview: {
            select: { title: "title.en", page: "page" },
            prepare({ title, page }) {
              return { title: title || "Section", subtitle: page ? `p. ${page}` : undefined };
            },
          },
        },
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "production" }),
    defineField({ name: "editorialOps", title: "Production", type: "editorialOps", group: "production" }),
  ],
  preview: {
    select: { title: "title.en", titleHi: "title.hi", edition: "edition", media: "coverImage" },
    prepare({ title, titleHi, edition, media }) {
      return { title: title || titleHi || "Book", subtitle: edition, media };
    },
  },
});
