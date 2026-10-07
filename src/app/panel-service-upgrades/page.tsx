import type { Metadata } from "next";
import Link from "next/link";
import BookNowButton from "@/components/BookNowButton";
import { JOBBER, SITE_URL } from "@/lib/site";

// NOTE: every figure and claim below already appears elsewhere on the site
// (EV packages / FAQ / services data). Brandon should expand this page with
// his own job details, photos and any pricing changes.

export const metadata: Metadata = {
  title: "Electrical Panel & Service Upgrades in London, Ontario",
  description:
    "100A to 200A electrical service upgrades in London, ON, typically $2,400–$3,500 + HST with the ESA permit and inspection included. Load calculation first, so you only upgrade if you need to. ECRA/ESA #7017944.",
  alternates: { canonical: "/panel-service-upgrades" },
  openGraph: {
    title: "Electrical Panel & Service Upgrades in London, Ontario | Levere Electric",
    description:
      "100A to 200A service upgrades, panel replacements, grounding and bonding. ESA permit and inspection included.",
    url: "/panel-service-upgrades",
  },
};

const FAQS = [
  {
    q: "Do I need a 200A service to add an EV charger?",
    a: "Not always. We do a load calculation first. Many homes can support a 40A charger even with a 100A service, so an upgrade is only recommended when the numbers say you need one.",
  },
  {
    q: "How much does a 100A to 200A service upgrade cost in London?",
    a: "Most 100A to 200A upgrades run $2,400 to $3,500 + HST, including the new panel, breakers, grounding and bonding, utility coordination, and the ESA permit and inspection. We confirm the price after seeing a photo of your panel.",
  },
  {
    q: "How long does a panel upgrade take?",
    a: "Plan for about one working day on site. The power is off for part of that time while the utility disconnects and reconnects the service.",
  },
  {
    q: "Is the ESA permit included?",
    a: "Yes. Every panel and service upgrade includes the ESA permit and inspection.",
  },
] as const;

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Electrical panel and service upgrades",
  serviceType: "Electrical service upgrade",
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: { "@type": "City", name: "London, Ontario" },
  url: `${SITE_URL}/panel-service-upgrades`,
};

const INCLUDED = [
  "Load calculation to confirm whether an upgrade is actually needed",
  "Utility coordination for the disconnect and reconnect",
  "New panel, breakers, grounding and bonding",
  "Meter base repairs where required",
  "ESA permit and inspection included",
  "Clean, labelled panel when we leave",
] as const;

const SIGNS = [
  "You are adding a Level 2 EV charger, hot tub, or heat pump and the load calculation shows the service is at its limit",
  "The panel is full and there is no room for new circuits",
  "Breakers trip regularly, or you hear buzzing or crackling at the panel",
  "The panel is an older or recalled model, or has visible heat damage",
  "A renovation or addition is adding significant new load",
] as const;

export default function PanelServiceUpgrades() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />

      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Electrical Panel &amp; Service Upgrades in London, Ontario
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-brand-cream/90">
        A 100A to 200A service upgrade in London typically costs $2,400 to
        $3,500 + HST, includes the ESA permit and inspection, and takes about
        one working day. Levere Electric does a load calculation first, so you
        only upgrade if your home actually needs it.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <BookNowButton href={JOBBER.panel} label="Request a panel upgrade quote" />
        <Link
          href="/ev-charger-installation"
          className="inline-flex items-center justify-center rounded-md border border-brand-gold/50 px-5 py-3 text-sm text-brand-cream hover:bg-brand-gold/10 transition"
        >
          Upgrading for an EV charger?
        </Link>
      </div>

      <h2 className="mt-12 text-2xl font-semibold text-brand-gold">
        When a panel or service upgrade makes sense
      </h2>
      <ul className="mt-4 space-y-3 text-brand-cream/80">
        {SIGNS.map((s) => (
          <li key={s} className="flex gap-3">
            <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-brand-gold/80" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-brand-cream/75">
        Not every EV charger needs a bigger service. Many 100A homes can run a
        40A charger safely once the numbers are checked. If the load
        calculation says you are fine, we will tell you.
      </p>

      <h2 className="mt-12 text-2xl font-semibold text-brand-gold">
        What is included
      </h2>
      <ul className="mt-4 space-y-3 text-brand-cream/80">
        {INCLUDED.map((s) => (
          <li key={s} className="flex gap-3">
            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
              ✓
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl font-semibold text-brand-gold">
        How it works
      </h2>
      <ol className="mt-4 list-decimal space-y-3 pl-6 text-brand-cream/80">
        <li>
          Send a photo of your panel and a note about what you are adding. Use
          the request form or call 226-559-7897.
        </li>
        <li>
          We run the load calculation and send a written quote with the options,
          including whether an upgrade can be avoided.
        </li>
        <li>
          We coordinate the utility disconnect, replace the panel and service
          equipment, and bring grounding and bonding up to code.
        </li>
        <li>
          ESA inspects the work. You get a labelled panel and the permit
          paperwork.
        </li>
      </ol>

      <h2 className="mt-12 text-2xl font-semibold text-brand-gold">
        Panel upgrade questions
      </h2>
      <div className="mt-4 space-y-5">
        {FAQS.map((f) => (
          <div
            key={f.q}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
          >
            <h3 className="text-sm font-semibold text-white">{f.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{f.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 px-6 py-6">
        <p className="text-brand-cream">
          Serving London, St. Thomas, Dorchester, Komoka and Delaware. Owner
          operated, ESA licensed (ECRA/ESA #7017944) and fully insured.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <BookNowButton href={JOBBER.panel} label="Request a quote" />
          <Link
            href="/photo-gallery/panel"
            className="inline-flex items-center justify-center rounded-md border border-brand-gold/50 px-5 py-3 text-sm text-brand-cream hover:bg-brand-gold/10 transition"
          >
            See panel upgrade photos
          </Link>
        </div>
      </div>
    </section>
  );
}
