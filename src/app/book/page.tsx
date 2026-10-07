import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, JOBBER } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote or Book an Electrician in London, ON",
  description:
    "Request a quote from Levere Electric, a licensed electrician in London, Ontario. EV charger installs, panel upgrades, lighting and repairs. Call 226-559-7897 or send a request online.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Request a Quote | Levere Electric",
    description:
      "Request a quote from a licensed electrician in London, Ontario. EV chargers, panel upgrades, lighting and repairs.",
    url: "/book",
  },
};

const REQUESTS = [
  {
    title: "EV charger installation",
    desc: "Level 2 chargers for Tesla, Ford, Hyundai/Kia, GM, VW and more. A photo of your panel and the spot you want the charger gets you a faster quote.",
    href: JOBBER.ev,
    learn: "/ev-charger-installation",
  },
  {
    title: "Panel or service upgrade",
    desc: "100A to 200A upgrades, panel replacements, grounding and bonding. Include a photo of the panel with the cover on.",
    href: JOBBER.panel,
    learn: "/panel-service-upgrades",
  },
  {
    title: "Lighting, repairs and everything else",
    desc: "Troubleshooting, lighting, receptacles, renovations, pool and hot-tub circuits, aluminum wiring pigtails.",
    href: JOBBER.general,
    learn: "/services",
  },
] as const;

export default function Book() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Request a Quote
      </h1>
      <p className="mt-4 text-brand-cream/85">
        Tell us what you need and where you are. Requests go straight to
        Brandon, and you get a written quote before any work starts. Serving
        London, St. Thomas, Dorchester, Komoka and Delaware.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {REQUESTS.map((r) => (
          <div
            key={r.title}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="text-lg font-semibold text-white">{r.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{r.desc}</p>
            <div className="mt-auto pt-5 flex flex-col gap-2">
              <Link
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-navy hover:bg-brand-gold-3 transition"
              >
                Start request
              </Link>
              <Link
                href={r.learn}
                className="text-center text-xs text-brand-gold/90 hover:text-brand-gold-3"
              >
                Learn more<span className="sr-only"> about {r.title.toLowerCase()}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 px-6 py-6 text-brand-cream">
        <h2 className="text-lg font-semibold">Prefer to call or email?</h2>
        <p className="mt-2">
          Phone:{" "}
          <a className="text-brand-gold hover:text-brand-gold-3" href={`tel:${BUSINESS.phone.replace(/-/g, "")}`}>
            {BUSINESS.phone}
          </a>
        </p>
        <p className="mt-1">
          Email:{" "}
          <a className="text-brand-gold hover:text-brand-gold-3" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
        </p>
        <p className="mt-3 text-sm text-brand-cream/75">
          ESA licensed (ECRA/ESA #{BUSINESS.licence}) and fully insured. Existing
          customers can view quotes and invoices in the{" "}
          <a
            className="text-brand-gold hover:text-brand-gold-3"
            href={JOBBER.clientHub}
            target="_blank"
            rel="noopener noreferrer"
          >
            Client Hub
          </a>
          .
        </p>
      </div>
    </section>
  );
}
