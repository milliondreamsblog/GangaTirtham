"use client";

import { useState } from "react";
import Link from "next/link";

import { plateTone } from "@/lib/temperature";
import type { Locale } from "@/lib/i18n";
import type { JourneyStage } from "@/lib/journey";

/**
 * One chapter of the river's life. Collapsed: number · title · the 15-word
 * summary · place anchor · emotional state, over a graded plate of the stage's
 * temperature (a tonal photographic surface, NOT the screen's chromatic event —
 * that is the Waterline in HomeJourney). Expands to the Book / Place / FACE
 * connections, so every content system binds back to the stage.
 */
function ConnectionRow({
  label,
  value,
  href,
  note,
}: {
  label: string;
  value: string;
  href?: string;
  note?: string;
}) {
  const body = (
    <>
      <span className="t-micro text-slate-light">{label}</span>
      <span className="font-display text-base text-ink">
        {value}
        {note ? <span className="t-micro text-slate-light"> · {note}</span> : null}
        {href ? <span aria-hidden="true"> →</span> : null}
      </span>
    </>
  );
  return (
    <div className="flex flex-col gap-0.5 border-t border-stone py-2.5">
      {href ? (
        <Link href={href} className="klink flex flex-col gap-0.5">
          {body}
        </Link>
      ) : (
        body
      )}
    </div>
  );
}

export function JourneyCard({
  stage,
  locale,
  placeLive,
}: {
  stage: JourneyStage;
  locale: Locale;
  placeLive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const c = stage.copy[locale];
  const tone = plateTone(stage.kmAnchor);
  const panelId = `journey-${stage.key}`;

  return (
    <div className="border-t border-stone pt-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="block w-full text-left"
      >
        <div className={`plate plate-${tone} h-16 w-full`} style={{ aspectRatio: "auto" }} aria-hidden="true" />
        <div className="mt-3 flex items-baseline gap-2">
          <span className="label-row text-slate-light">{String(stage.n).padStart(2, "0")}</span>
          <span className="font-display text-xl text-ink">{c.title}</span>
          <span className="ml-auto t-micro text-slate-light" aria-hidden="true">
            {open ? "–" : "+"}
          </span>
        </div>
        <p className="t-body mt-2 text-slate">{c.summary}</p>
        <p className="t-micro mt-2 text-slate-light">
          {c.placeAnchor} · {c.emotional}
        </p>
      </button>

      {open && (
        <div id={panelId} className="mt-4">
          <ConnectionRow
            label={locale === "hi" ? "पुस्तक" : "Book"}
            value={c.bookConnection}
            href={`/${locale}/library`}
          />
          <ConnectionRow
            label={locale === "hi" ? "स्थान" : "Place"}
            value={c.placeAnchor}
            href={placeLive ? `/${locale}/places/${stage.placeSlug}` : undefined}
            note={placeLive ? undefined : locale === "hi" ? "आगामी" : "forthcoming"}
          />
          <ConnectionRow
            label="FACE"
            value={c.faceConnection}
            href={`/${locale}/face-ganga`}
          />
        </div>
      )}
    </div>
  );
}
