import "../globals.css";

import { fontVariables } from "../fonts";

/* A root layout for the embedded Studio branch (kept separate from the locale
   site so /studio carries no masthead/footer and its own lang). */
export default function StudioRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
