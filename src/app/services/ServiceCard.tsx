import Link from "next/link";
import { Network } from "lucide-react";
import BookNowButton from "@/components/BookNowButton";
import SkeletonImage from "@/components/SkeletonImage";
import type { ServiceItem } from "@/types/services";

export default function ServiceCard({
  item,
  src,
  priority = false,
}: {
  item: ServiceItem;
  src?: string;
  priority?: boolean;
}) {
  const hasPage = item.href !== "/book";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20">
      <div className="relative h-44 w-full overflow-hidden bg-brand-navy-2">
        {src ? (
          <>
            <SkeletonImage
              src={src}
              alt={`${item.title} by Levere Electric, London, Ontario`}
              fill
              quality={75}
              priority={priority}
              fetchPriority={priority ? "high" : undefined}
              sizes="(min-width: 1024px) 368px, (min-width: 768px) 50vw, calc(100vw - 48px)"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.25))]" />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full items-center justify-center text-brand-gold/80"
          >
            <Network size={56} strokeWidth={1.25} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-[1.45rem] font-semibold leading-tight tracking-tight text-white">
          {hasPage ? (
            <Link href={item.href} className="transition hover:text-brand-gold">
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-cream/75">
          {item.description}
        </p>

        <div className="my-4 h-px w-full bg-white/10" />

        <ul className="space-y-2 text-sm text-white/75">
          {item.duration && (
            <li className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-brand-gold/80"
              />
              <span className="text-white/70">
                Typical time on site: {item.duration}
              </span>
            </li>
          )}
          {item.estimate && (
            <li className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-white/25"
              />
              <span>{item.estimate}</span>
            </li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          {hasPage && (
            <Link
              href={item.href}
              className="inline-flex items-center justify-center rounded-md border border-brand-gold/50 px-5 py-3 text-sm text-brand-cream transition hover:bg-brand-gold/10"
            >
              Learn more<span className="sr-only"> about {item.title}</span>
            </Link>
          )}
          <BookNowButton href={item.quote} label="Request a quote" />
        </div>
      </div>
    </article>
  );
}
