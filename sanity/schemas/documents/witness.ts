import { defineField, defineType } from "sanity";

/**
 * witness — the named, consented human voice at the centre of a place page; the
 * emotional peak. Load-bearing: labour, memory, or risk. Never a priest/sadhu
 * "for mood." No consent, no publish; withdrawal is a hard publish-block.
 */
export const witness = defineType({
  name: "witness",
  title: "Witness",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "scope: anon where naming would endanger/shame (set on consent).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "work",
      title: "Work / role",
      type: "string",
      description: "Open with their work — boatman, sweeper, weaver, ferryman…",
    }),
    defineField({
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
    }),
    defineField({
      name: "quote",
      title: "The load-bearing quote",
      type: "localeText",
      description: "The one quote (EiC sign-off). A line the witness could have said.",
    }),
    defineField({ name: "portrait", title: "Portrait", type: "gtImage" }),
    defineField({
      name: "consent",
      title: "Consent",
      type: "consent",
      description: "Mandatory before publish for any identified person.",
    }),
    defineField({ name: "interviewNotes", title: "Interview notes", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "name", work: "work", obtained: "consent.obtained", scope: "consent.scope", media: "portrait" },
    prepare({ title, work, obtained, scope, media }) {
      const consentLabel = obtained ? `consent · ${scope ?? "?"}` : "⚠ no consent";
      return { title: title || "Witness", subtitle: [work, consentLabel].filter(Boolean).join(" · "), media };
    },
  },
});
