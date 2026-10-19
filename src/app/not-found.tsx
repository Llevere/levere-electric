import type { Metadata } from "next";
import Link from "next/link";

// Next adds noindex to 404 responses automatically.
export const metadata: Metadata = { title: "Page not found" };

const LINKS = [
  { label: "EV charger installation", href: "/ev-charger-installation" },
  { label: "Panel & service upgrades", href: "/panel-service-upgrades" },
  { label: "Smart homes & Lutron lighting", href: "/smart-home-lighting" },
  { label: "All services", href: "/services" },
  { label: "Homeowner guides", href: "/blog" },
  { label: "Request a quote", href: "/book" },
] as const;

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Let&apos;s get you to the right place.
      </h1>
      <p className="mt-4 max-w-2xl text-brand-cream/80">
        This page may have moved. Pick a service below or tell us about your
        project.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-brand-cream transition hover:border-brand-gold/50 hover:text-brand-gold"
            >
              {l.label} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
