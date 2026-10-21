import type { ReactNode } from "react";
import SkeletonImage from "@/components/SkeletonImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookNowButton from "@/components/BookNowButton";
import CallButton from "@/components/CallButton";
import { LICENCE_LABEL } from "@/lib/site";

type Props = {
  crumb: { label: string; href: string };
  eyebrow: string;
  title: ReactNode;
  /** Answer-first paragraph that search and AI answers can quote directly. */
  lead: string;
  quoteHref: string;
  quoteLabel: string;
  image?: { src: string; alt: string } | null;
};

/** Service page header. Text comes first so phones paint it before the photo. */
export default function ServiceHero({
  crumb,
  eyebrow,
  title,
  lead,
  quoteHref,
  quoteLabel,
  image,
}: Props) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-8 pb-12">
      <Breadcrumbs items={[{ label: "Services", href: "/services" }, crumb]} />
      <div
        className={`mt-6 grid items-center gap-10 ${image ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}
      >
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-cream/90">
            {lead}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BookNowButton href={quoteHref} label={quoteLabel} />
            <CallButton />
          </div>
          <p className="mt-4 text-sm text-brand-cream/65">
            {LICENCE_LABEL} · Owner-operated · Serving London &amp; area
          </p>
        </div>
        {image && (
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-brand-cream/10 bg-brand-navy-2 shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:aspect-4/5">
            {/* Above the fold on desktop, so preload it rather than lazy-load. */}
            <SkeletonImage
              src={image.src}
              alt={image.alt}
              fill
              priority
              quality={75}
              sizes="(min-width: 1024px) 480px, calc(100vw - 48px)"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
