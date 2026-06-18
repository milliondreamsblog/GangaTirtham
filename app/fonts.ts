import { Fraunces, Inter, JetBrains_Mono, Tiro_Devanagari_Hindi } from "next/font/google";

/* Self-hosted via next/font, subset. Shared by both root layouts (the locale
   site + the Studio). Tiro is the Devanagari SOUL FACE — never a default. */

export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});

/** All four font CSS variables, for the <html> className. */
export const fontVariables = `${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${tiroDevanagari.variable}`;
