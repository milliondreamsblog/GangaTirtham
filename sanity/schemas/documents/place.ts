import { defineField, defineType } from "sanity";

import { FACE_WINGS } from "../lib/editorial";
import { journeyStageField } from "../lib/journey";

/**
 * place — the keystone document and where most traffic lands. Every place page
 * is an ENCOUNTER: a named witness, place, memory, specificity, one emotional
 * peak. Written against the Varanasi/Kashi standard. See CONTENT_DOCTRINE.md.
 *
 * Colour input is exactly one number: riverPosition.km.
 */
export const place = defineType({
  name: "place",
  title: "Place",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "encounter", title: "Encounter" },
    { name: "media", title: "Media" },
    { name: "relations", title: "Relations" },
    { name: "production", title: "Production" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Display name",
      type: "localeString",
      group: "identity",
      description: "Follows the brand (काशी / Kashi). The slug follows search intent.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "identity",
      description: "Search intent, e.g. 'varanasi'. Immutable post-publish (renames → 301).",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reach",
      title: "Reach",
      type: "reference",
      group: "identity",
      to: [{ type: "reach" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "riverPosition",
      title: "River position",
      type: "riverPosition",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    journeyStageField({
      group: "identity",
      description:
        "The river's emotional state here (the Biography of a River) — derived from km, confirm. The chapter a place embodies.",
    }),

    // ── The encounter ──
    defineField({
      name: "dek",
      title: "Dek (the query answer)",
      type: "localeText",
      group: "encounter",
      description: "Answers what a cold search visitor came for, in one breath.",
    }),
    defineField({
      name: "distinctTruth",
      title: "The distinct truth",
      type: "string",
      group: "encounter",
      description: "The one truth no other place repeats (birth, naming, labour, the wound…).",
    }),
    defineField({
      name: "essay",
      title: "Essay",
      type: "localePortableText",
      group: "encounter",
      description: "A reported scene, present tense. If a paragraph could sit on Wikipedia, cut it.",
    }),
    defineField({
      name: "witnesses",
      title: "Witnesses (the peak)",
      type: "array",
      group: "encounter",
      of: [{ type: "reference", to: [{ type: "witness" }] }],
      description: "The named, consented human voice at the centre. Consent-gated.",
    }),

    // ── Media ──
    defineField({
      name: "heroImage",
      title: "Hero image (LIVE opens)",
      type: "gtImage",
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [{ type: "gtImage" }],
    }),
    defineField({
      name: "archiveLayer",
      title: "Archive layer (the record deepens)",
      type: "localePortableText",
      group: "media",
      description: "ARCHIVE deepens — monochrome deep-time record, scholarship.",
    }),

    // ── Relations ──
    defineField({
      name: "wings",
      title: "FACE wings carried",
      type: "array",
      group: "relations",
      of: [{ type: "string" }],
      options: { list: FACE_WINGS.map((w) => ({ title: w.title, value: w.value })) },
      description: "A place earns its slot by carrying one wing without becoming a brochure for it.",
    }),
    defineField({
      name: "relatedFestivals",
      title: "Related festivals",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "festival" }] }],
    }),
    defineField({
      name: "relatedArt",
      title: "Related art",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "art" }] }],
    }),
    defineField({
      name: "relatedCraft",
      title: "Related craft",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "craft" }] }],
    }),
    defineField({
      name: "relatedEnvironment",
      title: "Related environment",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "environmentalIssue" }] }],
    }),
    defineField({
      name: "appearsInBooks",
      title: "Appears in books",
      type: "array",
      group: "relations",
      of: [{ type: "bookAppearance" }],
    }),
    journeyStageField({
      name: "journeyStageSecondary",
      title: "Secondary stage (split places only)",
      group: "relations",
      description:
        "Only for places whose truth spans two states — e.g. Bhagalpur: primary 6 (silk/Craft), secondary 7 (the dolphin/the wound). Subordinate, never co-equal.",
    }),

    // ── Production spine ──
    defineField({ name: "seo", title: "SEO", type: "seo", group: "production" }),
    defineField({
      name: "editorialOps",
      title: "Production",
      type: "editorialOps",
      group: "production",
    }),
  ],
  orderings: [
    {
      title: "Source → Ocean (km)",
      name: "downstream",
      by: [{ field: "riverPosition.km", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title.en",
      titleHi: "title.hi",
      km: "riverPosition.km",
      tier: "editorialOps.depthTier",
      state: "editorialOps.state",
      media: "heroImage",
    },
    prepare({ title, titleHi, km, tier, state, media }) {
      const apparatus = [km != null ? `km ${km}` : null, tier, state]
        .filter(Boolean)
        .join(" · ");
      return { title: title || titleHi || "Place", subtitle: apparatus, media };
    },
  },
});
