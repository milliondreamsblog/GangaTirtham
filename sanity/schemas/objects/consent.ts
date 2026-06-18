import { defineField, defineType } from "sanity";

/**
 * Consent — mandatory for any identifiable person (witness or image) before
 * publish. A HARD GATE. Informed consent in the person's own language, web +
 * book, both languages, permanent, international, with the right to withdraw.
 * Withdrawal = hard publish-block + needs-update. See CONTENT_DOCTRINE.md.
 */
export const consent = defineType({
  name: "consent",
  title: "Consent",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "obtained",
      title: "Informed consent obtained",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "scope",
      title: "Scope",
      type: "string",
      description:
        "full = named & shown · anon = used but not identified (where naming would endanger/shame) · withdrawn = a hard publish-block.",
      options: {
        list: [
          { title: "Full (named & shown)", value: "full" },
          { title: "Anonymous", value: "anon" },
          { title: "Withdrawn", value: "withdrawn" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "language",
      title: "Language consent was given in",
      type: "string",
      description: "The person's own language (e.g. Hindi, Bhojpuri, Bengali).",
    }),
    defineField({
      name: "obtainedDate",
      title: "Date obtained",
      type: "date",
    }),
    defineField({
      name: "form",
      title: "Signed / recorded release",
      type: "file",
      description: "The filed consent.form — signed or recorded.",
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { obtained: "obtained", scope: "scope" },
    prepare({ obtained, scope }) {
      return {
        title: obtained ? `Consent · ${scope ?? "scope?"}` : "No consent on file",
      };
    },
  },
});
