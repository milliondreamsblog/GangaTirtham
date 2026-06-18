"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Offering Released (signature moment #2). Keeping a lamp floats a single
 * inscriptional gold light down and settles it in the field — and it persists
 * across visits ("your lamp still burns") via localStorage. The lamp is a thin
 * gold bar, never a glow (DESIGN_SYSTEM canary). The money rail is M6; this is
 * the gesture, remembered locally until the ledger exists.
 */
const BASE_HEIGHTS = [
  14, 22, 10, 28, 16, 12, 24, 18, 30, 13, 20, 26, 11, 23, 17, 32, 15, 21, 12, 27, 19, 14, 25, 16, 29, 13,
];

const STORAGE_KEY = "gt_lamps_kept";

export function LampField({
  initialCount,
  keepLabel,
  standingLabel,
  countLabel,
}: {
  initialCount: number;
  keepLabel: string;
  standingLabel: string;
  countLabel: string;
}) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(initialCount);
  const [mine, setMine] = useState(0);

  // Restore lamps kept on previous visits.
  useEffect(() => {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY) || "0");
    if (stored > 0) {
      setMine(stored);
      setCount((c) => c + stored);
    }
  }, []);

  function keepLamp() {
    const field = fieldRef.current;
    if (field) {
      const span = document.createElement("span");
      span.className = "lamp";
      span.style.height = `${10 + Math.round(Math.random() * 22)}px`;
      field.appendChild(span);
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduced && span.animate) {
        span.animate(
          [
            { opacity: 0, transform: "translateY(-44px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 600, easing: "cubic-bezier(.22,1,.36,1)" },
        );
      }
    }
    const next = mine + 1;
    setMine(next);
    setCount((c) => c + 1);
    window.localStorage.setItem(STORAGE_KEY, String(next));
  }

  return (
    <div>
      <div
        ref={fieldRef}
        className="mx-auto mt-14 flex h-14 max-w-[640px] items-end justify-center gap-[5px]"
        aria-hidden="true"
      >
        {BASE_HEIGHTS.map((h, i) => (
          <span key={i} className="lamp" style={{ height: `${h}px` }} />
        ))}
        {Array.from({ length: mine }).map((_, i) => (
          <span key={`mine-${i}`} className="lamp" style={{ height: `${12 + ((i * 7) % 20)}px` }} />
        ))}
      </div>

      <p className="t-micro mt-5" style={{ color: "#8c8377" }}>
        <span>{count.toLocaleString("en-IN")}</span> {countLabel}
        {mine > 0 && (
          <span style={{ color: "#E8B85C" }}> · {mine === 1 ? "your lamp still burns" : `${mine} of them yours`}</span>
        )}
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        <button type="button" onClick={keepLamp} className="font-display klink text-xl" style={{ color: "#E8B85C" }}>
          {keepLabel}
        </button>
        <button type="button" onClick={keepLamp} className="t-label klink" style={{ color: "#cfc7ba" }}>
          {standingLabel}
        </button>
      </div>
    </div>
  );
}
