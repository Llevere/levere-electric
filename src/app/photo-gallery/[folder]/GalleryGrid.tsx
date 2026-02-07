"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Props = {
  images: { url: string; fileName: string }[];
};

export default function GalleryGrid({ images }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.url}
            onClick={() => setOpenIndex(i)}
            className="relative aspect-4/3 overflow-hidden rounded-lg cursor-pointer
                       transition hover:opacity-90 active:scale-[0.98]"
          >
            <Image
              src={img.url}
              alt={img.fileName}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={close}
        >
          <a
            href={images[openIndex].url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute right-16 top-4 z-10 rounded-full bg-white/10 p-2 text-white
                       transition hover:bg-white/20"
            aria-label="Open in new tab"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 5H19V11M19 5L10 14M5 7V19H17V14"
              />
            </svg>
          </a>

          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white
                       transition hover:bg-white/20"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2
                       text-white transition hover:bg-white/20"
            aria-label="Previous image"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2
                       text-white transition hover:bg-white/20"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="flex h-[85vh] w-[90vw] items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[openIndex].url}
              alt={images[openIndex].fileName}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-lg"
            />
          </div>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm text-white tabular-nums">
            {openIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
