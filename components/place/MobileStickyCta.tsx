"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Mobile behavior — one context-aware sticky CTA (mobile only, lg:hidden). It
 * reveals once the reader is past the hero, so the first screen stays clean. No
 * persistent motion; a single one-shot fade honoured by prefers-reduced-motion.
 * `suppressOverId` hides the bar while that section is in view (e.g. the Sankalp
 * dark field — "Order" must never sit on Lamp Gold).
 */
export function MobileStickyCta({
  label,
  href,
  suppressOverId,
}: {
  label: string;
  href: string;
  suppressOverId?: string;
}) {
  const [shown, setShown] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!suppressOverId) return;
    const el = document.getElementById(suppressOverId);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setSuppressed(entry.isIntersecting),
      { rootMargin: "0px 0px -40% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [suppressOverId]);

  const visible = shown && !suppressed;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-stone bg-bone/95 px-6 py-3 backdrop-blur-sm transition-opacity duration-200 lg:hidden"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <Link href={href} className="flex items-center justify-between">
        <span className="font-display text-lg text-ink">{label}</span>
        <span className="t-label text-slate-light" aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  );
}
