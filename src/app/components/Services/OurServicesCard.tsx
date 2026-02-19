import Link from "next/link";
import type { ServiceCardType } from "./types/ServiceCard";

export default function OurServiceCard({
  title,
  description,
  href,
  Icon,
}: ServiceCardType) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-xl",
        "border border-brand-cream/10",
        "bg-brand-navy/45 backdrop-blur-sm",
        "px-10 py-12 text-center",
        "shadow-[0_16px_50px_rgba(0,0,0,0.35)]",
        "transition-transform duration-300 hover:-translate-y-1",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 to-transparent" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px
                            bg-linear-to-r from-transparent via-brand-gold/30 to-transparent"
      />

      <div className="relative mb-6 flex justify-center text-brand-gold">
        <Icon size={34} className="opacity-90" />
      </div>

      <h3 className="relative text-2xl font-semibold text-brand-cream">
        {title}
      </h3>

      <p className="relative mt-5 text-sm leading-relaxed text-brand-cream/75">
        {description}
      </p>

      <Link
        target="_"
        href={href}
        className="cursor-pointer relative mt-10 inline-flex rounded-md bg-brand-gold px-6 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-gold-3 active:bg-brand-gold-2 transition"
      >
        Get A Quote
      </Link>
    </div>
  );
}
