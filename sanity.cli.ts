import { defineCliConfig } from "sanity/cli";

/**
 * Sanity CLI config — for schema/dataset/graphql operations. The Studio itself
 * is served by Next at /studio (embedded), so there is no separate studio host.
 * Reads env directly (the CLI does not see NEXT_PUBLIC_* through lib/env aliasing).
 */
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "placeholder";

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

export default defineCliConfig({
  api: { projectId, dataset },
  autoUpdates: true,
});
