import { defineField, defineType } from "sanity";

/**
 * gtImage — every image carries a provenance & ethics ledger (source, license,
 * subject, consent, mode, km). LIVE = warm documentary encounter; ARCHIVE =
 * monochrome deep-time record. Identifiable people require subjectConsent.
 * Banned frames are an editorial matter (CONTENT_DOCTRINE.md), enforced in review.
 */
export const gtImage = defineType({
  name: "gtImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localeString",
      description: "Describe the act, not the postcard. Required for publish.",
    }),
    defineField({ name: "caption", title: "Caption", type: "localeString" }),
    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      options: {
        list: [
          { title: "LIVE — warm documentary encounter", value: "live" },
          { title: "ARCHIVE — monochrome deep-time record", value: "archive" },
        ],
        layout: "radio",
      },
      initialValue: "live",
    }),
    defineField({
      name: "km",
      title: "River km (provenance)",
      type: "number",
      description: "Where on the river this was made. Optional context.",
    }),
    // ── Provenance & ethics ledger ──
    defineField({ name: "source", title: "Source / archive", type: "string", fieldset: "ledger" }),
    defineField({ name: "credit", title: "Credit", type: "string", fieldset: "ledger" }),
    defineField({
      name: "license",
      title: "License",
      type: "string",
      fieldset: "ledger",
      description: "e.g. public-domain, commissioned, documentary licence.",
    }),
    defineField({
      name: "subjectIdentifiable",
      title: "Shows an identifiable person",
      type: "boolean",
      fieldset: "ledger",
      initialValue: false,
    }),
    defineField({
      name: "subjectConsent",
      title: "Subject consent",
      type: "consent",
      fieldset: "ledger",
      description: "Required when an identifiable person is shown.",
      hidden: ({ parent }) => !parent?.subjectIdentifiable,
    }),
  ],
  fieldsets: [{ name: "ledger", title: "Provenance & ethics ledger", options: { collapsible: true, collapsed: true } }],
  preview: {
    select: { media: "asset", alt: "alt.en", altHi: "alt.hi", mode: "mode" },
    prepare({ media, alt, altHi, mode }) {
      return {
        title: alt || altHi || "Untitled image",
        subtitle: mode ? mode.toUpperCase() : undefined,
        media,
      };
    },
  },
});
