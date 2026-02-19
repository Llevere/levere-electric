import Image from "next/image";
import Link from "next/link";
import { FEATURES } from "./data";

export default function HeroSection({ heroUrl }: { heroUrl: string }) {
  return (
    <section className="relative w-full overflow-hidden min-h-[calc(100dvh-5rem)]">
      <Image
        src={heroUrl}
        alt="EV charger installation"
        fill
        quality={75}
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-brand-navy/95 via-brand-navy/55 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/45 to-brand-navy/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,192,81,0.14),transparent_60%)]" />
      <div className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,black,transparent_72%)] bg-black/35" />

      <div className="relative mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-6xl flex-col px-4 lg:pb-5">
        <div className="flex-1" />

        <div className="pb-2">
          <div className="max-w-3xl">
            <h1 className="mt-3 font-semibold leading-[1.06] tracking-tight text-[clamp(2rem,8vw,3.25rem)] md:text-6xl">
              Home EV Charger Installation{" "}
              <span className="text-brand-gold">Done Right</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
              Power your EV properly with a professionally installed Level 2
              charger. Serving London, St. Thomas, Dorchester, Komoka, Delaware
              & surrounding areas.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex flex-row gap-3 max-w-md">
                <Link
                  target="_"
                  href="https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207525/new"
                  className="
                    group inline-flex items-center justify-center
                    rounded-xl bg-brand-gold px-4 py-2.5
                    text-sm font-semibold text-brand-navy
                    shadow-[0_8px_24px_rgba(226,192,81,0.18)]
                    transition hover:brightness-110 active:brightness-95
                    w-40 cursor-pointer
                  "
                >
                  Request Quote
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-white/70 sm:pt-0 sm:text-xs">
                <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">
                  ESA Licensed
                </span>
                <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">
                  Fully Insured
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 hidden gap-4 border-t border-white/10 pt-6 md:grid md:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <div className="text-sm font-semibold">{f.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 md:hidden">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FEATURES.map((f) => (
                <span
                  key={f.title}
                  className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/75 backdrop-blur"
                >
                  {f.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
