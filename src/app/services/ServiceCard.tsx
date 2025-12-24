import type { ServiceItem } from "@/types/services";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({
  item,
  src,
}: {
  item: ServiceItem;
  src: string;
}) {
  return (
    <article
      className="
        group flex h-full flex-col overflow-hidden rounded-xl
        border border-white/10
        bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]
        shadow-[0_18px_60px_rgba(0,0,0,0.28)]
        transition
        hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_22px_80px_rgba(0,0,0,0.35)]
      "
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={src}
          alt={item.title.replace("\n", " ")}
          fill
          sizes="(max-width: 1024px) 100vw, 360px"
          className="object-cover object-center "
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.25))]" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="min-h-[3.6rem] text-[1.55rem] font-semibold leading-tight tracking-tight text-white">
          {item.title.replace("\n", " ")}
        </h3>

        <div className="my-4 h-px w-full bg-white/10" />

        <div className="space-y-2 text-sm text-white/75">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-gold/80" />
            <span className="text-white/70">{item.duration}</span>
          </div>

          <div className="flex items-center gap-2 mb-5">
            <span className="inline-block h-2 w-2 rounded-full bg-white/25" />
            <span>{item.estimate}</span>
          </div>
        </div>

        <Link
          href={item.href}
          className="
            mt-auto inline-flex w-fit items-center justify-center rounded-md
            bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-navy
            shadow-[0_10px_25px_rgba(226,192,81,0.18)]
            transition
            hover:bg-brand-gold-3 hover:shadow-[0_14px_35px_rgba(226,192,81,0.22)]
            active:bg-brand-gold-2
          "
        >
          Book Now
        </Link>
      </div>
    </article>
  );
}
