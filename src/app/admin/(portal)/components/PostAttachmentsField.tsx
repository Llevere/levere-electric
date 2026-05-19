"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { BlogAttachment } from "@/lib/blogAttachments";

type Props = {
  attachments: BlogAttachment[];
  onRemove: (index: number) => void;
  onUpdate: (index: number, updates: Partial<BlogAttachment>) => void;
};

export default function PostAttachmentsField({ attachments, onRemove, onUpdate }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (attachments.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-sm text-gray-500">
        Images added from the library or uploader will appear here as attachments.
      </div>
    );
  }

  const active = activeIndex === null ? null : attachments[activeIndex];

  return (
    <>
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {attachments.map((attachment, index) => (
            <div
              key={`${attachment.src}-${index}`}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="block w-full cursor-pointer text-left"
              >
                <img
                  src={attachment.src}
                  alt={attachment.alt || attachment.title || `Attachment ${index + 1}`}
                  className="h-40 w-full object-cover"
                />
              </button>
              <div className="flex items-start justify-between gap-3 px-3 py-3">
                <div className="min-w-0">
                  <input
                    type="text"
                    value={attachment.title || ""}
                    onChange={(event) =>
                      onUpdate(index, {
                        title: event.target.value,
                      })
                    }
                    placeholder={`Image ${index + 1} name`}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Click image to enlarge</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                  aria-label={`Remove attachment ${index + 1}`}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
