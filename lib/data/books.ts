import "server-only";

import { isSanityConfigured } from "@/lib/env";
import { FIXTURE_BOOKS } from "@/lib/fixtures/library";
import { BOOK_QUERY, BOOK_SLUGS_QUERY, BOOKS_LIST_QUERY, FEATURED_BOOK_QUERY } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import type { BookData, BookListItem } from "@/lib/types";

/** The featured book for the homepage hero + acquisition register. */
export async function getFeaturedBook(): Promise<BookData | null> {
  if (!isSanityConfigured) return FIXTURE_BOOKS[0] ?? null;
  return sanityFetch<BookData | null>({ query: FEATURED_BOOK_QUERY, tags: ["book"] });
}

export async function getBooks(): Promise<BookListItem[]> {
  if (!isSanityConfigured) {
    return FIXTURE_BOOKS.map(({ title, subtitle, slug, edition, priceINR, coverImage }) => ({
      title,
      subtitle,
      slug,
      edition,
      priceINR,
      coverImage,
    }));
  }
  return sanityFetch<BookListItem[]>({ query: BOOKS_LIST_QUERY, tags: ["book"] });
}

export async function getBook(slug: string): Promise<BookData | null> {
  if (!isSanityConfigured) return FIXTURE_BOOKS.find((b) => b.slug === slug) ?? null;
  return sanityFetch<BookData | null>({
    query: BOOK_QUERY,
    params: { slug },
    tags: ["book", `book:${slug}`],
  });
}

export async function getBookSlugs(): Promise<string[]> {
  if (!isSanityConfigured) {
    return FIXTURE_BOOKS.map((b) => b.slug).filter((s): s is string => Boolean(s));
  }
  return sanityFetch<string[]>({ query: BOOK_SLUGS_QUERY, tags: ["book"] });
}
