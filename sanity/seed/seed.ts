/**
 * Idempotent seed — river Ganga + the 5 reaches. Run with `npm run seed`.
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID + a write token (SANITY_API_WRITE_TOKEN)
 * in .env.local. Uses createOrReplace on deterministic _ids, so it is safe to
 * re-run. See sanity/seed/data.ts.
 */
import { createClient } from "@sanity/client";

import { seedDocs } from "./data";

// Load env without a dependency (Node ≥ 20.12).
const loadEnvFile = (process as unknown as { loadEnvFile?: (p: string) => void }).loadEnvFile;
if (typeof loadEnvFile === "function") {
  for (const file of [".env.local", ".env"]) {
    try {
      loadEnvFile(file);
    } catch {
      /* file absent — fine */
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

function fail(message: string): never {
  console.error(`\n✕ Seed aborted: ${message}\n`);
  process.exit(1);
}

if (!projectId || projectId === "placeholder") {
  fail("set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local (create a project at sanity.io/manage).");
}
if (!token) {
  fail("set SANITY_API_WRITE_TOKEN in .env.local (an Editor token from the project's API settings).");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function run() {
  console.log(`Seeding ${seedDocs.length} documents into ${projectId}/${dataset} …`);

  const tx = seedDocs.reduce((t, doc) => t.createOrReplace(doc), client.transaction());
  await tx.commit({ visibility: "async" });

  for (const doc of seedDocs) {
    console.log(`  ✓ ${doc._type.padEnd(6)} ${doc._id}`);
  }
  console.log(`\nDone. The river is seeded with its five reaches.\n`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
