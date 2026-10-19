import Link from "next/link";

export type Benefit = { title: string; text: string };

/** Three numbered cards: "what working with us looks like" for this service. */
export function BenefitGrid({
  title,
  intro,
  items,
}: {
  title: string;
  intro?: string;
  items: readonly Benefit[];
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <h2 className="text-2xl font-semibold tracking-tight text-brand-gold md:text-3xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-2 max-w-2xl text-brand-cream/75">{intro}</p>
      )}
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {items.map((b, i) => (
          <article
            key={b.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <span
              aria-hidden="true"
              className="text-sm font-semibold tracking-[0.14em] text-brand-gold"
            >
              0{i + 1}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-white">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-cream/75">
              {b.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Bulleted list with gold check marks, in a titled block. */
export function CheckList({
  title,
  intro,
  items,
}: {
  title: string;
  intro?: string;
  items: readonly string[];
}) {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-10">
      <h2 className="text-2xl font-semibold text-brand-gold">{title}</h2>
      {intro && <p className="mt-2 text-brand-cream/75">{intro}</p>}
      <ul className="mt-4 space-y-3 text-brand-cream/85">
        {items.map((s) => (
          <li key={s} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold"
            >
              ✓
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Numbered "how it works" steps. */
export function StepList({
  title,
  steps,
}: {
  title: string;
  steps: readonly { title: string; text: string }[];
}) {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-10">
      <h2 className="text-2xl font-semibold text-brand-gold">{title}</h2>
      <ol className="mt-5 space-y-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-sm font-semibold text-brand-gold">
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-brand-cream/75">
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Internal links to related pages (passes link equity, helps crawl paths). */
export function RelatedLinks({
  links,
}: {
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav
      aria-label="Related pages"
      className="mx-auto w-full max-w-4xl px-6 pb-10"
    >
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-cream/60">
        Related
      </h2>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-gold">
              {l.label} →
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
