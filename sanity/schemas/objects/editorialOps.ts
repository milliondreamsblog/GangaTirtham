import { defineField, defineType } from "sanity";

import {
  CHECKLIST_ITEMS,
  DEPTH_TIERS,
  FACT_CHECK_STATUSES,
  I18N_STATUSES,
  STATES,
  VISUAL_STATES,
} from "../lib/editorial";

/**
 * The production layer — embedded on every editorial document (the shared "Entry"
 * spine). It carries the state machine, the parallel visual track, the encounter
 * checklist (the publish gate), the fact-check log, and i18n status.
 * See CONTENT_DOCTRINE.md ("Production workflow") + ARCHITECTURE.md.
 */
export const editorialOps = defineType({
  name: "editorialOps",
  title: "Production",
  type: "object",
  options: { collapsible: true, collapsed: false },
  groups: [
    { name: "state", title: "State", default: true },
    { name: "gate", title: "Publish gate" },
    { name: "factcheck", title: "Fact-check" },
    { name: "i18n", title: "Translation" },
    { name: "ownership", title: "Ownership" },
  ],
  fields: [
    defineField({
      name: "state",
      title: "Editorial state",
      type: "string",
      group: "state",
      options: { list: STATES.map((s) => ({ title: s.title, value: s.value })), layout: "dropdown" },
      initialValue: "idea",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visualState",
      title: "Visual state (parallel track)",
      type: "string",
      group: "state",
      options: { list: VISUAL_STATES.map((s) => ({ title: s.title, value: s.value })), layout: "dropdown" },
      initialValue: "photo-brief",
    }),
    defineField({
      name: "depthTier",
      title: "Depth tier",
      type: "string",
      group: "state",
      description: "Stubs publish as forthcoming/noindex and bypass the 5/5 gate.",
      options: { list: DEPTH_TIERS.map((s) => ({ title: s.title, value: s.value })), layout: "radio" },
      initialValue: "stub",
    }),
    defineField({
      name: "sprint",
      title: "Sprint",
      type: "string",
      group: "state",
      description: "Free-text sprint tag (e.g. 2026-S1) for the board's by-sprint view.",
    }),

    // ── The encounter checklist — the publish gate (5/5 for standard/flagship) ──
    defineField({
      name: "checklist",
      title: "Encounter checklist (5/5 to be ready)",
      type: "object",
      group: "gate",
      options: { columns: 1 },
      fields: CHECKLIST_ITEMS.map((item) =>
        defineField({ name: item.name, title: item.title, type: "boolean", initialValue: false }),
      ),
    }),

    // ── Fact-check — claims log + sensitivity read ──
    defineField({
      name: "factCheck",
      title: "Fact-check",
      type: "object",
      group: "factcheck",
      fields: [
        defineField({
          name: "status",
          title: "Status",
          type: "string",
          options: { list: FACT_CHECK_STATUSES.map((s) => ({ title: s.title, value: s.value })), layout: "radio" },
          initialValue: "pending",
        }),
        defineField({
          name: "sensitivityRead",
          title: "Cultural sensitivity read passed",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "claims",
          title: "Claims log",
          type: "array",
          description: "Every assertion → a source. Checked by someone other than the writer.",
          of: [
            {
              type: "object",
              fields: [
                { name: "claim", title: "Claim", type: "text", rows: 2 },
                { name: "source", title: "Source", type: "string" },
                {
                  name: "status",
                  title: "Verification",
                  type: "string",
                  options: {
                    list: [
                      { title: "Verified", value: "verified" },
                      { title: "Unverified", value: "unverified" },
                      { title: "Corrected", value: "corrected" },
                    ],
                  },
                  initialValue: "unverified",
                },
                { name: "checkedBy", title: "Checked by", type: "string" },
              ],
              preview: {
                select: { title: "claim", status: "status" },
                prepare({ title, status }) {
                  return { title: title || "Claim", subtitle: status };
                },
              },
            },
          ],
        }),
      ],
    }),

    // ── i18n status ──
    defineField({
      name: "i18n",
      title: "Translation status",
      type: "object",
      group: "i18n",
      fields: [
        defineField({
          name: "primaryLocale",
          title: "Primary locale",
          type: "string",
          options: {
            list: [
              { title: "हिन्दी · Hindi", value: "hi" },
              { title: "English", value: "en" },
            ],
            layout: "radio",
          },
          initialValue: "hi",
        }),
        defineField({
          name: "en",
          title: "English",
          type: "string",
          options: { list: I18N_STATUSES.map((s) => ({ title: s.title, value: s.value })) },
          initialValue: "missing",
        }),
        defineField({
          name: "hi",
          title: "Hindi",
          type: "string",
          options: { list: I18N_STATUSES.map((s) => ({ title: s.title, value: s.value })) },
          initialValue: "missing",
        }),
      ],
    }),

    // ── Ownership ──
    defineField({
      name: "assignedTo",
      title: "Assigned to",
      type: "reference",
      group: "ownership",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "editor",
      title: "Editor",
      type: "reference",
      group: "ownership",
      to: [{ type: "author" }],
    }),
  ],
});
