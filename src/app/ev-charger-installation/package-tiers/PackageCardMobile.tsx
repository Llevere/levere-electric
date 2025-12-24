"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PACKAGES, PackageKey } from "../data";

export default function PackageCardMobile({
    selectedKey,
    onSelect,
}: {
    selectedKey: PackageKey;
    onSelect: (k: PackageKey) => void;
}) {
    const selected = useMemo(() => PACKAGES.find((p) => p.key === selectedKey)!, [selectedKey]);

    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
            {/* Tabs (top of card) */}
            <div className="grid grid-cols-3 gap-2 border-b border-white/10 p-3">
                {PACKAGES.map((p) => {
                    const active = p.key === selectedKey;
                    return (
                        <button
                            key={p.key}
                            type="button"
                            onClick={() => onSelect(p.key)}
                            className={[
                                "rounded-xl px-3 py-2 text-center text-xs font-semibold transition",
                                "border border-white/10",
                                active ? "bg-brand-gold/15 text-white border-brand-gold/40" : "bg-black/20 text-white/70 hover:bg-white/10",
                            ].join(" ")}
                        >
                            {p.tab}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="flex min-h-[420px] flex-col p-5">
                <div>
                    <div className="text-base font-semibold">{selected.title}</div>
                    <div className="mt-2 text-lg font-semibold text-brand-gold">{selected.price}</div>
                    <p className="mt-3 text-sm text-white/75">{selected.note}</p>

                    <div className="mt-4 space-y-2 text-sm text-white/80">
                        {selected.bullets.map((b) => (
                            <div key={b} className="flex items-start gap-3">
                                <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                                    ✓
                                </span>
                                <span>{b}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-3">
                    <Link
                        href="/contact"
                        className="inline-flex w-full items-center justify-center rounded-xl bg-brand-gold px-4 py-2.5 text-sm font-semibold text-brand-navy transition hover:brightness-110"
                    >
                        {selected.cta}
                    </Link>
                </div>
            </div>
        </div>
    );
}
