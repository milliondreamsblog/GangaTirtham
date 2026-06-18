/**
 * Centralised environment access. Reads are lazy and non-throwing at import time
 * so `next build` succeeds before a Sanity project exists; the Studio surfaces a
 * clear error at mount if the project id is still a placeholder.
 */

function read(name: string, fallback = ""): string {
  const v = process.env[name];
  return v && v.length > 0 ? v : fallback;
}

// A syntactically-valid placeholder so module evaluation never throws.
const PLACEHOLDER_PROJECT_ID = "placeholder";

export const projectId = read("NEXT_PUBLIC_SANITY_PROJECT_ID", PLACEHOLDER_PROJECT_ID);
export const dataset = read("NEXT_PUBLIC_SANITY_DATASET", "production");
export const apiVersion = read("NEXT_PUBLIC_SANITY_API_VERSION", "2025-01-01");
export const siteUrl = read("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");

/** Server-only tokens. Never import these into a client component. */
export const readToken = read("SANITY_API_READ_TOKEN");
export const writeToken = read("SANITY_API_WRITE_TOKEN");
export const revalidateSecret = read("SANITY_REVALIDATE_SECRET");

export const isSanityConfigured = projectId !== PLACEHOLDER_PROJECT_ID;
