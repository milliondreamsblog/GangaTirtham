import type { Metadata } from "next";
import { notFound } from "next/navigation";

import "../globals.css";

import { Masthead } from "@/components/chrome/Masthead";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { siteUrl } from "@/lib/env";
import { isLocale, locales, type Locale } from "@/lib/i18n";

import { fontVariables } from "../fonts";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gangatirtham · The Ganga Collection",
    template: "%s · Gangatirtham",
  },
  description:
    "A digital cultural archive centred on the river Ganga — seventy-five sacred places, ordered as the river orders them, from the ice of Gaumukh to the open sea at Ganga Sagar.",
};

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  return (
    <html lang={typedLocale} className={fontVariables}>
      <body>
        {/* mobile progress hairline — the Waterline's one chromatic event, static here */}
        <div className="progress" aria-hidden="true" />
        <Masthead locale={typedLocale} />
        {children}
        <SiteFooter locale={typedLocale} />
      </body>
    </html>
  );
}
