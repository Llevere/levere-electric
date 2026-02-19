"use client";

import Link from "next/link";
import { PACKAGES, PackageKey } from "../data";
import useLocalStorageState from "../hook/useLocalStorageState";
import PackageCardMobile from "./PackageCardMobile";

export default function PackagesSection() {
  const [selectedTier, setSelectedTier] = useLocalStorageState<PackageKey>(
    "evTier",
    "standard",
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-14">
      <div className="pt-2">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
              EV Charger Installation Packages
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/75 md:text-base">
              Transparent tiers based on distance, wall type, and panel
              capacity. Final pricing is confirmed after a quick panel photo +
              site details.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              target="_"
              href="https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207525/new"
              className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy transition hover:brightness-110"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/** Desktop */}
        <div className="mt-8 hidden gap-5 md:grid md:grid-cols-3">
          {PACKAGES.map((p) => (
            <div
              key={p.key}
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div>
                <div className="text-base font-semibold">{p.title}</div>
                <div className="mt-2 text-xl font-semibold text-brand-gold">
                  {p.price}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {p.note}
                </p>

                <div className="mt-5 space-y-2 text-sm text-white/80">
                  {p.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                        ✓
                      </span>
                      <span className="leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Link
                  target="_"
                  href="https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207543/new"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/** Mobile */}
        <div className="mt-6 md:hidden">
          <PackageCardMobile
            selectedKey={selectedTier}
            onSelect={setSelectedTier}
          />
        </div>
      </div>
    </section>
  );
}
