/**
 * The editorial vocabulary — single source of truth shared by the editorialOps
 * schema, the Production Board desk, the gated publish action, and the badges.
 * See CONTENT_DOCTRINE.md ("Production workflow") and ARCHITECTURE.md.
 */

export const STATES = [
  { value: "idea", title: "Idea" },
  { value: "reporting", title: "Reporting" },
  { value: "drafting", title: "Drafting" },
  { value: "edit", title: "Edit" },
  { value: "fact-check", title: "Fact-check" },
  { value: "translation", title: "Translation" },
  { value: "ready", title: "Ready" },
  { value: "published", title: "Published" },
  { value: "needs-update", title: "Needs update" },
  { value: "archived", title: "Archived" },
] as const;

export const VISUAL_STATES = [
  { value: "photo-brief", title: "Photo brief" },
  { value: "shoot-scheduled", title: "Shoot scheduled" },
  { value: "sourced", title: "Sourced" },
  { value: "selected", title: "Selected" },
  { value: "graded", title: "Graded" },
  { value: "final", title: "Final" },
] as const;

export const DEPTH_TIERS = [
  { value: "stub", title: "Stub (forthcoming · noindex)" },
  { value: "standard", title: "Standard (~600 words)" },
  { value: "flagship", title: "Flagship (full peak)" },
] as const;

export const FACE_WINGS = [
  { value: "festivals", title: "Festivals" },
  { value: "art", title: "Art" },
  { value: "craft", title: "Craft" },
  { value: "environment", title: "Environment" },
] as const;

export const I18N_STATUSES = [
  { value: "missing", title: "Missing" },
  { value: "draft", title: "Draft" },
  { value: "in-progress", title: "In progress" },
  { value: "final", title: "Final" },
  { value: "fallback", title: "Fallback (ships EN-complete)" },
] as const;

export const FACT_CHECK_STATUSES = [
  { value: "pending", title: "Pending" },
  { value: "in-progress", title: "In progress" },
  { value: "passed", title: "Passed" },
  { value: "failed", title: "Failed" },
] as const;

/** The encounter checklist — the publish gate. Every flagship/standard page must pass 5/5. */
export const CHECKLIST_ITEMS = [
  { name: "namedWitnessWithConsent", title: "One named witness with consent on file" },
  { name: "encounterHero", title: "Hero is an encounter (proximity, available light, the human), not a vista" },
  { name: "singlePeak", title: "Exactly one emotional peak" },
  { name: "distinctTruth", title: "A distinct truth no other place repeats" },
  { name: "oneVerifiableFact", title: "≥1 verifiable number or date" },
] as const;

export const CHECKLIST_KEYS = CHECKLIST_ITEMS.map((i) => i.name);

/** Editorial document types — the ones that carry the editorialOps spine. */
export const EDITORIAL_TYPES = [
  "place",
  "book",
  "collection",
  "festival",
  "art",
  "craft",
  "environmentalIssue",
  "sankalpCampaign",
] as const;
