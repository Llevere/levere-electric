"use client";

import { useEffect, useRef, useState } from "react";

export default function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => setH(el.scrollHeight);

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    setH(el.scrollHeight);
  }, [open]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold leading-relaxed text-white flex">
          {q}
        </span>

        <svg
          className={`ml-2 h-5 w-5 shrink-0 text-white/70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-[height,opacity] duration-300 ease-out"
        style={{ height: open ? h : 0, opacity: open ? 1 : 0 }}
      >
        <div ref={innerRef} className="pt-3">
          <p className="text-sm leading-relaxed text-white/75">{a}</p>
        </div>
      </div>
    </div>
  );
}
