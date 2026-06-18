/** A consistent editorial page intro — kicker, Devanagari line, title, lede. */
export function PageHeader({
  kicker,
  deva,
  title,
  lede,
}: {
  kicker: string;
  deva?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mx-auto max-w-[1320px] px-6 pt-12 pb-4 md:px-12 lg:px-24 lg:pt-16">
      <p className="t-label text-slate-light">{kicker}</p>
      {deva && (
        <p lang="hi" className="font-deva mt-6 text-2xl text-ink md:text-3xl">
          {deva}
        </p>
      )}
      <h1 className="t-h1 font-display mt-3 max-w-[20ch] text-ink">{title}</h1>
      {lede && <p className="t-lede mt-6 max-w-[56ch] text-slate">{lede}</p>}
    </header>
  );
}
