"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/lib/env";
import { createGatedPublishAction } from "@/sanity/actions/gatedPublish";
import { consentBadge, editorialBadges, publishGateBadge } from "@/sanity/lib/badges";
import { schemaTypes } from "@/sanity/schemas";
import { EDITORIAL_TYPES } from "@/sanity/schemas/lib/editorial";
import { structure } from "@/sanity/structure";

const editorialSet = new Set<string>([...EDITORIAL_TYPES]);
const consentSet = new Set<string>(["witness"]); // carries a consent object directly

/**
 * The embedded Studio config (served by Next at /studio). Wires the schema, the
 * Production Board desk, the gated publish action, the document badges, and the
 * siteSettings singleton. See ARCHITECTURE.md ("Studio configuration").
 */
export default defineConfig({
  name: "gangatirtham",
  title: "Gangatirtham",
  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Gate publish for editorial docs + the consent-bearing witness.
    actions: (prev, context) => {
      const type = context.schemaType;

      if (type === "siteSettings") {
        // Singleton: no duplicate / delete / unpublish.
        return prev.filter(
          (action) => !["duplicate", "delete", "unpublish"].includes(action.action ?? ""),
        );
      }

      if (editorialSet.has(type) || consentSet.has(type)) {
        return prev.map((action) =>
          action.action === "publish" ? createGatedPublishAction(action) : action,
        );
      }

      return prev;
    },

    // Glanceable production read on every editorial document.
    badges: (prev, context) => {
      const type = context.schemaType;
      if (editorialSet.has(type)) return [...editorialBadges, ...prev];
      if (consentSet.has(type)) return [consentBadge, publishGateBadge, ...prev];
      return prev;
    },

    // Keep the singleton out of the global "new document" menu.
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((template) => template.templateId !== "siteSettings");
      }
      return prev;
    },
  },
});
