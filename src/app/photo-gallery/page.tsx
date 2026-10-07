import type { Metadata } from "next";
import SkeletonImage from "@/components/SkeletonImage";
import Link from "next/link";
import { getIndexedImages } from "@/lib/blob";
import type { BlobImage } from "@/types/images";
import {
  GalleryFolders,
  FOLDER_LABELS,
  FOLDER_DESCRIPTIONS,
  FOLDER_ALT,
} from "./galleryData";

export const metadata: Metadata = {
  title: "Electrical Project Photos, London, Ontario",
  description:
    "Real photos of Levere Electric's work in London, ON: EV charger installations, panel upgrades, lighting, and pool and hot-tub electrical.",
  alternates: { canonical: "/photo-gallery" },
  openGraph: {
    title: "Electrical Project Photos | Levere Electric",
    description:
      "Real photos of our electrical work in London, ON: panel upgrades, lighting, pool and hot-tub circuits, and more.",
    url: "/photo-gallery",
  },
};

function groupByFolder(images: BlobImage[]) {
  const folders = Object.values(GalleryFolders);
  const grouped = Object.fromEntries(
    folders.map((f) => [f, [] as BlobImage[]]),
  ) as Record<GalleryFolders, BlobImage[]>;

  for (const img of images) {
    const subfolder = img.pathname.split("/")[1];
    if (subfolder && subfolder in grouped) {
      grouped[subfolder as GalleryFolders].push(img);
    }
  }
  return grouped;
}

export default async function PhotoGalleryPage() {
  const images = await getIndexedImages("gallery/");
  const grouped = groupByFolder(images);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Electrical Project Photos
      </h1>
      <p className="mt-3 max-w-3xl text-brand-cream/80">
        Real jobs by Levere Electric in London, St. Thomas, Dorchester, Komoka
        and Delaware. No stock photos. Pick a category to see the full set.
      </p>

      {/* One cover image per folder. The previous version stacked every photo of
          every folder inside carousels, which forced 30+ downloads on load. */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {Object.values(GalleryFolders).map((folder, i) => {
          const list = grouped[folder];
          const cover = list[0];
          return (
            <Link
              key={folder}
              href={`/photo-gallery/${folder}`}
              className="group block rounded-xl border border-brand-gold/25 bg-brand-navy-2/40 p-3 transition hover:border-brand-gold/60"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-brand-navy-2">
                {cover ? (
                  <SkeletonImage
                    src={cover.url}
                    alt={FOLDER_ALT[folder]}
                    fill
                    priority={i < 2}
                    sizes="(min-width: 768px) 536px, calc(100vw - 72px)"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">
                  {FOLDER_LABELS[folder]}
                </h2>
                <span className="text-sm text-brand-gold group-hover:text-brand-gold-3">
                  {list.length} photo{list.length === 1 ? "" : "s"} →
                </span>
              </div>
              <p className="mt-1 text-sm text-brand-cream/70">
                {FOLDER_DESCRIPTIONS[folder]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
