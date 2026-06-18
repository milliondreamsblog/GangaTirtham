import "server-only";

import { isSanityConfigured } from "@/lib/env";
import { aboutFixture } from "@/lib/fixtures/about";
import { ABOUT_QUERY } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { AboutData, AuthorData, LocalePortableText, LocaleValue } from "@/lib/types";

interface AboutQueryResult {
  settings?: { title?: LocaleValue; mission?: LocalePortableText; doctrine?: LocalePortableText } | null;
  contributors?: AuthorData[];
}

/** The institution + its contributors. Content-editable via siteSettings. */
export async function getAbout(): Promise<AboutData> {
  if (!isSanityConfigured) return aboutFixture;
  const result = await sanityFetch<AboutQueryResult>({
    query: ABOUT_QUERY,
    tags: ["siteSettings", "author"],
  });
  return {
    title: result.settings?.title,
    mission: result.settings?.mission,
    doctrine: result.settings?.doctrine,
    contributors: result.contributors ?? [],
    seo: { noindex: false },
  };
}
