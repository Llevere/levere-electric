import Footer from "@/components/layout/Footer";
import { getHomeImageUrl } from "@/lib/homeImages";
import Image from "next/image";
import Link from "next/link";

const HERO_BG = "ev-car.jpg";

const FEATURES = [
    { title: "ESA-Licensed Electrical Contractor", desc: "Safe, code-compliant installs that pass inspection the first time." },
    { title: "Experience With All EV Brands", desc: "Tesla, Ford, Hyundai/Kia, GM, VW, Polestar, Rivian — we install all major chargers." },
    { title: "Clean, Professional, Premium Work", desc: "Neat cable runs, proper bonding & grounding. No sloppy handyman installs." },
    { title: "Local & Trusted in London, ON", desc: "Owner-operated, fully insured, upfront pricing. Serving London & surrounding area." },
];

export default async function EvChargerInstallationPage() {
    const heroUrl = (await getHomeImageUrl(HERO_BG)) ?? "";

    return (
        <main className="bg-brand-navy text-brand-cream">
            <section className="relative w-full overflow-hidden min-h-[calc(100dvh-5rem)]">
                <Image
                    src={heroUrl}
                    alt="EV charger installation"
                    fill
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
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/85 backdrop-blur sm:text-xs">
                                <span className="h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_18px_rgba(226,192,81,0.55)]" />
                                Level 2 EV Charger Installation • London, ON
                            </div>

                            <h1 className="mt-3 font-semibold leading-[1.06] tracking-tight text-[clamp(2rem,8vw,3.25rem)] md:text-6xl">
                                Home EV Charger Installation{" "}
                                <span className="text-brand-gold">Done Right</span>
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
                                Power your EV properly with a professionally installed Level 2 charger. Serving
                                London, St. Thomas, Dorchester, Komoka, Delaware & surrounding areas.
                            </p>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                                <Link
                                    href="/contact"
                                    className="group inline-flex w-full items-center justify-center rounded-xl bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-navy shadow-[0_10px_30px_rgba(226,192,81,0.18)] transition hover:brightness-110 active:brightness-95 sm:w-auto"
                                >
                                    Book Installation
                                    <span className="ml-2 inline-block transition group-hover:translate-x-0.5">→</span>
                                </Link>

                                <Link
                                    href="/contact"
                                    className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:w-auto"
                                >
                                    Request Quote
                                </Link>

                                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-white/70 sm:pt-0 sm:text-xs">
                                    <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">ESA Licensed</span>
                                    <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">Fully Insured</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 hidden gap-4 border-t border-white/10 pt-6 md:grid md:grid-cols-4">
                            {FEATURES.map((f) => (
                                <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                                    <div className="text-sm font-semibold">{f.title}</div>
                                    <p className="mt-2 text-sm leading-relaxed text-white/75">{f.desc}</p>
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
                    <div className="flex justify-center mb-3 sm:mb-0 lg:mt-3">
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur">
                            <span className="animate-bounce">↓</span>
                            Scroll for details
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-6xl px-4 py-14">
                <div className="grid gap-10 md:grid-cols-2">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                            What’s included in an EV charger install
                        </h2>
                        <p className="mt-3 text-white/75 leading-relaxed">
                            We assess your panel capacity, select the proper breaker sizing and wiring,
                            install a dedicated circuit, and ensure correct grounding/bonding — all to
                            meet Ontario Electrical Code requirements.
                        </p>

                        <ul className="mt-6 space-y-3 text-sm text-white/80">
                            {[
                                "Site assessment + load considerations",
                                "Dedicated circuit, breaker, wiring + conduit where needed",
                                "Clean cable routing and mounting",
                                "Commissioning + basic customer walkthrough",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                                >
                                    <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                                        ✓
                                    </span>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-linear-to-b from-white/7 to-white/3 p-6 backdrop-blur">
                        <h3 className="text-lg font-semibold">Typical quote factors</h3>
                        <p className="mt-2 text-sm text-white/75 leading-relaxed">
                            Pricing depends on panel capacity, cable run length, wall type, and whether
                            upgrades are needed.
                        </p>

                        <div className="mt-5 grid gap-3">
                            {[
                                { k: "Panel capacity", v: "Available amps / spare breaker slots" },
                                { k: "Distance", v: "Longer runs require more cable/conduit" },
                                { k: "Mount location", v: "Garage vs exterior + weatherproofing" },
                                { k: "Upgrades", v: "Panel/service upgrades if required" },
                            ].map((row) => (
                                <div
                                    key={row.k}
                                    className="flex items-start justify-between gap-6 rounded-2xl border border-white/10 bg-black/20 p-4"
                                >
                                    <div className="font-medium">{row.k}</div>
                                    <div className="text-sm text-white/70">{row.v}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-navy transition hover:brightness-110"
                            >
                                Get a Quote
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                View All Services
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                    <h3 className="text-xl font-semibold">Ready to install your charger?</h3>
                    <p className="mt-2 text-white/75">
                        Send a few details (address, charger model, and a photo of your electrical panel)
                        and we’ll confirm a clean, code-compliant plan.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-navy transition hover:brightness-110"
                        >
                            Book Installation
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Request Quote
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
