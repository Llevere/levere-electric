import BookNowButton from "@/components/BookNowButton";
import type { ServiceItem } from "@/types/services";
import SkeletonImage from "@/components/SkeletonImage";
import Link from "next/link";
import { JOBBER } from "@/lib/site";

export default function ServiceCard({
  item,
  src,
}: {
  item: ServiceItem;
  src: string;
}) {
  const title = item.title.replace("\n", " ");
  return (
    <article
      className="
        group flex h-full flex-col overflow-hidden rounded-xl
        border border-white/10 bg-white/5
        transition hover:border-white/20
      "
    >
      <div className="relative h-44 w-full overflow-hidden">
        <SkeletonImage
          src={src}
          alt={`${title} by Levere Electric, London, Ontario`}
          fill
          quality={75}
          sizes="(min-width: 1024px) 368px, (min-width: 768px) 50vw, calc(100vw - 48px)"
          className="object-cover object-center "
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.25))]" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="min-h-[3.6rem] text-[1.55rem] font-semibold leading-tight tracking-tight text-white">
          {item.href !== "/book" ? (
            <Link href={item.href} className="hover:text-brand-gold transition">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        <div className="my-4 h-px w-full bg-white/10" />

        <div className="space-y-2 text-sm text-white/75">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-gold/80" />
            <span className="text-white/70">Typical time on site: {item.duration}</span>
          </div>

          <div className="flex items-center gap-2 mb-5">
            <span className="inline-block h-2 w-2 rounded-full bg-white/25" />
            <span>{item.estimate}</span>
          </div>
        </div>
        <div className="mt-auto flex flex-wrap gap-3">
          {item.href !== "/book" && (
            <Link
              href={item.href}
              className="inline-flex items-center justify-center rounded-md border border-brand-gold/50 px-5 py-3 text-sm text-brand-cream hover:bg-brand-gold/10 transition"
            >
              Learn more
            </Link>
          )}
          <BookNowButton href={JOBBER.general} label="Request a quote" />
        </div>
      </div>
    </article>
  );
}
