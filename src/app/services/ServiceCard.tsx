import BookNowButton from "@/components/BookNowButton";
import type { ServiceItem } from "@/types/services";
import Image from "next/image";

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
        border border-white/10 bg-white/5
        transition hover:border-white/20
      "
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={src}
          alt={item.title.replace("\n", " ")}
          fill
          quality={75}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
        <BookNowButton href="https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207525/new" />
      </div>
    </article>
  );
}
