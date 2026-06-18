# Gangatirtham — Architecture

> Technical architecture. Decisions are locked; this documents the *how*. See DESIGN_SYSTEM.md for tokens and CONTENT_DOCTRINE.md for the editorial model.

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15, App Router, TypeScript** | RSC by default |
| Styling | **Tailwind CSS v4** (`@tailwindcss/postcss`, compiled) | No browser CDN. `@theme` tokens. |
| UI primitives | **shadcn/ui** | Sparingly — forms, dialog (mobile nav), the sankalp flow. The visual system is bespoke. |
| CMS (editorial) | **Sanity** | Studio embedded at `/studio` |
| Transactional store | **Neon Postgres + Drizzle** | Money/PII only |
| Payments | **Razorpay** | UPI + Subscriptions (standing lamp) + GST + 80G |
| Media | **`next/image`** (Sanity image CDN) + **Mux** (video) | AVIF, responsive |
| Auth | **Clerk** | One identity: donors, patrons, future contributors |
| Email/CRM | **Resend** + nurture list | Receipts + "Walk with the river" |
| Hosting | **Vercel** | SSG + ISR |

## Rendering map (locked)

- **Content (place/essay/book/collection/FACE/home)** → **SSG + ISR**, tag-based revalidation (`revalidateTag` from a Sanity publish webhook → `/api/revalidate`).
- **Checkout / account / sankalp transaction** → **dynamic** (Server Actions, no cache).
- **Temperature / time-of-day atmosphere** → **client enhancement** over a static, cacheable base (never gates the server render).

## The store boundary (critical)

**Sanity = editorial only. Postgres = money/PII only.** They join **only by stable string IDs** (`slug`, `sku`) — never a hard cross-store FK.

- Sanity: places, books, collections, FACE content, authors, witnesses, sankalp **campaign content**, production/editorial state.
- Postgres: Orders, Donations, Subscriptions (standing lamps), Patrons, the **Lamp/Sankalp ledger**, ShippingAddresses, TaxReceipts (80G), WebhookEvents (idempotency), Redirects.
- Razorpay is the source of truth for money; Postgres mirrors it via idempotent webhooks (dedupe on `WebhookEvent.eventId`).

## i18n

- **Field-level localization** (not per-locale documents): structured data (km, geo, refs) is shared; only text is localized via `localeString` / `localeText` / `localePortableText` (Hindi-first).
- **Locale-prefixed routes** `/[locale]/…` (`hi` | `en`); middleware redirects `/` by `Accept-Language`.
- hreflang (`en`/`hi`/`x-default`) + canonical emitted from the single document.
- Partial-translation fallback: a place ships EN-complete with `hi: 'fallback'`; chrome stays localized.

## Sanity data model

**Documents:** `river` · `reach` · `place` · `book` · `collection` · `festival` · `art` · `craft` · `environmentalIssue` · `author` · `witness` · `sankalpCampaign` · `siteSettings`.

**Reusable objects:** `localeString` · `localeText` · `blockContent` · `localePortableText` · `gtImage` · `seo` · `riverPosition` · `bookAppearance` · `specRow` · `festivalInstance` · `sustainTier` · `editorialOps` · `consent`.

### Relationships

```
river ◄─ reach ◄─ place
place ── riverPosition.river ─► river          (km drives order + temperature; single source)
place ── reach ─► reach
place ── witnesses[] ─► witness  (witness ─► place)        the emotional peak; consent-gated
place ── appearsInBooks[] ─► book  ⇄  book.tableOfContents[].places[]    (many-to-many + plate/page)
place ── relatedFestivals[]/relatedArt[]/relatedCraft[]/relatedEnvironment[] ─► FACE docs (bidirectional)
place ── wings[] (tags: festivals|art|craft|environment)
collection.items[] ─► place | festival | art | craft | environmentalIssue | book   (ordered, polymorphic)
book.foreword/contributors[] ─► author ;  art.artist ─► author
sankalpCampaign.targetPlace ─► place ;  ── slug ─►  Postgres (lamp ledger / donations)
book.productSku ;  craft.productSkus[]  ── sku ─►  Postgres (Product/Order/Offer)
every document ── editorialOps · seo · slug · gtImage(s)   ← the shared "Entry" spine
```

### Production layer (`editorialOps`, embedded on editorial docs)
- `state`: `idea → reporting → drafting → edit → fact-check → translation → ready → published` (+ `needs-update`, `archived`)
- `visualState`: `photo-brief → shoot-scheduled → sourced → selected → graded → final`
- `checklist` (the encounter checklist — the publish gate): `namedWitnessWithConsent`, `encounterHero`, `singlePeak`, `distinctTruth`, `oneVerifiableFact`
- `factCheck` (claims log + `sensitivityRead`), `i18n` (en/hi status + `primaryLocale`), ownership refs.
- **Consent** (`witness.consent`, `gtImage.subjectConsent`): `obtained` + `scope` (`full`/`anon`/`withdrawn`) + signed `form`. Publish is **hard-blocked** without it for any identified person.

### Studio configuration
- **Production Board** desk: grouped by `state` (kanban), plus "⚡ Needs my action", by reach, by depth tier, by FACE wing, by sprint, and an orderable Source→Ocean place list.
- **Gated publish action**: blocks unless `state==='ready'` · checklist 5/5 · `i18n.en==='final'` · `factCheck.status==='passed'` · consent green.
- Document badges (state · depthTier · consent · fact-check · HI), validation rules, Scheduled Publishing, image CDN, roles (EiC=admin, ME=editor, writers=contributor).

## The temperature engine

`riverTemperature(km, totalKm=2525)` → `{ t, accent, accentReadable }`.
- Ramp stops: `0% #3E6E82 · 18% #6E94A0 · 40% #9A8E78 · 68% #B5823E · 100% #B5772E`.
- Server-renders `--river-t` + a hex fallback per place; CSS `color-mix(in oklch, …)` overrides under `@supports`. **No per-place colour is ever stored** — adding a place is setting one number (`km`).
- Text-use accent is the **darkened (AA) ramp**, never the saturated one (prevents saffron drift).

## SEO architecture

- Every place/essay/book/FACE doc is a real, server-rendered, deep-linkable URL `/[locale]/places/[slug]` (slug follows search intent, e.g. `varanasi`; display follows the brand, काशी/Kashi).
- JSON-LD: `Place`/`TouristAttraction` (+ geo, sameAs), `BreadcrumbList`, `Article` (+ author), `ImageGallery`, `Book`+`Offer` (INR); site-level `Organization` + `WebSite`+`SearchAction`.
- hreflang `en`/`hi`/`x-default`; canonical; dynamic OG cards at `/api/og/[...]`; sitemap **index** split by type (places/stories/wings/collections/library), `lastmod` + hreflang.
- **Depth-tier SEO:** `stub`/`forthcoming` → `noindex,follow` until `standard` depth. No thin-content.
- Slugs immutable post-publish; renames → 301 via the Postgres `Redirect` table.

## Performance budget (CI-gated)

- **Lighthouse 95+ · LCP < 2.5s on 4G · < 1MB initial.**
- Fonts: `next/font` self-hosted + subset (`latin` + `devanagari`), display face preloaded, **≤ 180KB above-fold**.
- Images: `next/image` AVIF, explicit dimensions (no CLS), `priority` on the hero LCP, lazy below fold.
- Motion: **one persistent** (the descent marker), compositor-only; no `filter:blur` animation on mobile; audio/overture opt-in, silent/static default; `prefers-reduced-motion` collapses all.
- Static map (no JS map library on the critical path); no WebGL; field-of-lamps is server SVG.

## File structure

```
app/
  globals.css                  # Tailwind import + @theme + design system + moments
  layout.tsx                   # fonts, grain, global JSON-LD
  middleware.ts                # locale redirect
  [locale]/
    layout.tsx                 # generateMetadata (canonical/hreflang/OG)
    page.tsx                   # homepage
    places/[slug]/page.tsx     # place page (generateStaticParams + JSON-LD + ISR)
    library/[book]/page.tsx · sankalp/page.tsx · face-ganga/* · about/*
  api/revalidate/route.ts · api/og/[...slug]/route.ts
components/
  chrome/{Masthead,MobileNav,SiteFooter}
  sections/{Hero,PlacesSection,PlaceTile,BookSection,SankalpSection}
  moments/{RiverLine,DescentGauge,LampField}
  place/{ObjectLabel,WitnessPeak,BookDeepLink,ArchiveLayer,LateralRails}
  media/PlateImage · seo/JsonLd · i18n/Localized
lib/
  sanity/{client,image,queries,fetch} · temperature · i18n · metadata
sanity/                        # Studio (schema, structure, actions)
```

## Environment variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID · NEXT_PUBLIC_SANITY_DATASET · SANITY_API_READ_TOKEN
NEXT_PUBLIC_SITE_URL
DATABASE_URL (Neon)
RAZORPAY_KEY_ID · RAZORPAY_KEY_SECRET · RAZORPAY_WEBHOOK_SECRET
CLERK_* · RESEND_API_KEY · MUX_* · SENTRY_DSN
SANITY_REVALIDATE_SECRET
```
