/**
 * Embedded Sanity Studio at /studio (one repo, one deploy — the locked default).
 * The catch-all segment lets the Studio own its own client-side routing.
 */
import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
