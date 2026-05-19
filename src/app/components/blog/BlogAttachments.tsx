"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { BlogAttachment } from "@/lib/blogAttachments";

type Props = {
  attachments: BlogAttachment[];
};

export default function BlogAttachments({ attachments }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (attachments.length === 0) return null;

  const active = activeIndex === null ? null : attachments[activeIndex];

  return (
    <>
      <section className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
              Attachments
            </p>
            <h2 className="mt-2 text-xl font-semibold text-gray-900">
              Images for this post
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            Tap or click any image to enlarge it.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {attachments.map((attachment, index) => (
            <button
              key={`${attachment.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white text-left transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
            >
              <img
                src={attachment.src}
                alt={attachment.alt || attachment.title || `Attachment ${index + 1}`}
                className="h-44 w-full object-cover sm:h-48"
              />
              <div className="px-3 py-3">
                <p className="break-words text-sm font-medium text-gray-800">
                  {attachment.title || attachment.alt || `Attachment ${index + 1}`}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Click to enlarge
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveIndex(null);
            }
          }}
        >
          <div className="relative max-h-full w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-black/80"
              aria-label="Close image preview"
            >
              <X size={18} />
            </button>

            <div className="flex max-h-[85vh] flex-col">
              <div className="flex-1 bg-black">
                <img
                  src={active.src}
                  alt={active.alt || active.title || "Attachment preview"}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>
              <div className="border-t border-gray-200 px-4 py-4 sm:px-5">
                <p className="text-sm font-medium text-gray-900">
                  {active.title || active.alt || `Attachment ${activeIndex! + 1}`}
                </p>
                {active.alt && active.title && active.alt !== active.title ? (
                  <p className="mt-1 text-sm text-gray-500">{active.alt}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
