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
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className="flex w-full items-start justify-between gap-4 text-left"
                aria-expanded={open}
            >
                <span className="text-sm font-semibold leading-relaxed text-white">
                    {q}
                </span>

                <span
                    className="ml-2 inline-flex h-9 w-9 shrink-0 items-center justify-center
                     rounded-full border border-white/10 bg-black/20
                     text-white/70 text-xl leading-none cursor-pointer"
                >
                    {open ? "×" : "+"}
                </span>
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
