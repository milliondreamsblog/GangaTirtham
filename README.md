# Gangatirtham

A digital cultural archive centred on the river Ganga. **Build phase.** Strategy
and design are locked — see `PROJECT_HANDOFF.md` and the four spec docs alongside it.

This repository currently delivers **M0 (Scaffold)** and **M1 (Sanity + Studio)**.

## Stack

Next.js 15 (App Router, RSC) · TypeScript · Tailwind v4 (CSS-first `@theme`) ·
embedded Sanity Studio at `/studio` · `next/font` (incl. the Tiro Devanagari soul
face). Transactional store (Neon + Razorpay) and the public content pages land in
later milestones (see `BUILD_ROADMAP.md`).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the Sanity block
npm run dev                  # http://localhost:3000  ·  Studio at /studio
```

### Sanity project

1. Create a project at <https://sanity.io/manage> (dataset `production`).
2. Put the project id in `.env.local` → `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Add an **Editor** API token → `SANITY_API_WRITE_TOKEN` (used only by the seed).
4. Add `http://localhost:3000` (and your deploy URL) to **CORS origins**.

### Seed the river

```bash
npm run seed   # idempotent — river Ganga + the 5 reaches (Source…Delta)
```

## Scripts

| Script | Does |
|---|---|
| `npm run dev` | Next dev server (app + embedded Studio) |
| `npm run build` / `start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run seed` | Seed river + reaches into Sanity |

## Layout

```
app/                     # Next App Router — globals.css (locked tokens), layout, build-shell, /studio
lib/                     # env · sanity client/image · temperature engine · i18n
sanity/
  schemas/objects/       # locale trio, gtImage, seo, riverPosition, editorialOps, consent, …
  schemas/documents/     # river · reach · place · book · collection · FACE · author · witness · sankalp · settings
  schemas/lib/           # shared editorial vocabulary + locale config
  actions/gatedPublish   # the publish gate (state · checklist 5/5 · i18n · fact-check · consent · hero)
  lib/{gate,badges}      # gate evaluator + document badges
  structure.ts           # the Production Board desk
  seed/                  # river + reaches seed
sanity.config.ts         # embedded Studio config
```

## Non-negotiables (enforced in review)

Bone ≠ `#FFF` · Ink ≠ `#000` · the hero Hindi name uses the Tiro soul face · the
lamp is inscriptional (never a glow) · **one** chromatic event per screen · **one**
persistent motion · foil = 1px keyline, never a fill · consent is a hard publish
gate · performance is a gate (Lighthouse 95+, LCP < 2.5s, < 1MB). See
`DESIGN_SYSTEM.md` and `CONTENT_DOCTRINE.md`.
