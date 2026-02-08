import type { Metadata } from "next";
import { listFolderCached } from "@/lib/blob";
import type { BlobImage } from "@/types/images";
import HeroGallery from "@/components/HeroSection/HeroGallery";
import Link from "next/link";
import { GalleryFolders, FOLDER_LABELS } from "./galleryData";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Browse photos of our electrical work — EV charger installations, panel upgrades, lighting, and more across London, ON.",
  alternates: { canonical: "/photo-gallery" },
  openGraph: {
    title: "Photo Gallery | Levere Electric",
    description:
      "Browse photos of our electrical work — EV charger installations, panel upgrades, lighting, and more.",
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
  const images = await listFolderCached("gallery/");
  const grouped = groupByFolder(images);
  return (
    <section className="grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2 max-w-6xl mx-auto w-full">
      {Object.values(GalleryFolders).map((folder) => (
        <div key={folder}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              {FOLDER_LABELS[folder]}
            </h3>
            <Link
              href={`/photo-gallery/${folder}`}
              className="text-sm  transition text-brand-gold hover:text-brand-gold/80"
            >
              View All
            </Link>
          </div>
          <div className="aspect-4/3 w-full">
            <HeroGallery
              images={
                new Map(grouped[folder].map((img) => [img.fileName, img.url]))
              }
            />
          </div>
        </div>
      ))}
    </section>
  );
}
