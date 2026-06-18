import type { Locale } from "@/lib/i18n";

/**
 * The issue-line — the single device that frames the page as a publication of
 * record (not a store) in the first second. Sits under the masthead.
 */
export function IssueLine({ locale }: { locale: Locale }) {
  return (
    <div className="border-b border-stone">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-2 md:px-12 lg:px-24">
        <span className="t-label text-slate-light">
          {locale === "hi" ? "अंक 01 · नदी अंक" : "No. 01 · The River Issue"}
        </span>
        <span className="t-label hidden text-slate-light sm:inline">
          {locale === "hi" ? "स्रोत → सागर" : "Source → Ocean"}
        </span>
        <span className="t-label text-slate-light">
          <span lang="hi" className="font-deva">
            प्रातः
          </span>{" "}
          · {locale === "hi" ? "प्रातः संस्करण" : "Dawn edition"}
        </span>
      </div>
    </div>
  );
}
