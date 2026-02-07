import { listFolderCached } from "@/lib/blob";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FOLDER_LABELS, isValidFolder } from "../galleryData";
import GalleryGrid from "./GalleryGrid";

type Props = {
  params: Promise<{ folder: string }>;
};

export default async function FolderGalleryPage({ params }: Props) {
  const { folder } = await params;

  if (!isValidFolder(folder)) notFound();

  const label = FOLDER_LABELS[folder];
  const images = await listFolderCached(`gallery/${folder}/`);
  const serialized = images.map((img) => ({ url: img.url, fileName: img.fileName }));

  return (
    <section className="max-w-6xl mx-auto w-full px-6 py-12">
      <div className="relative mb-10 flex items-center justify-center">
        <Link
          href="/photo-gallery"
          className="absolute left-0 flex items-center gap-1.5 rounded-md border border-white/15
                     px-3 py-1.5 text-sm text-white/70 transition hover:border-brand-gold hover:text-brand-gold"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Gallery
        </Link>
        <h2 className="text-2xl font-semibold text-white">{label}</h2>
      </div>

      <GalleryGrid images={serialized} />
    </section>
  );
}
