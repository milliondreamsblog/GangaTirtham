import Link from "next/link";

/** A quiet 404 — the river continues elsewhere. */
export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1320px] px-6 pt-24 pb-32 md:px-12 lg:px-24">
      <p className="t-label text-slate-light">404 · off the river</p>
      <h1 className="t-h1 font-display mt-6 max-w-[18ch] text-ink">
        This bend isn’t in the collection yet.
      </h1>
      <p className="t-lede mt-6 max-w-[48ch] text-slate">
        The page you followed has moved or was never here. The river is felt everywhere and required
        nowhere — return to the source and follow the water down.
      </p>
      <div className="mt-10">
        <Link href="/en/places/varanasi" className="font-display klink text-xl text-ink">
          Enter the Collection →
        </Link>
      </div>
    </main>
  );
}
