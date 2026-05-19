"use client";

import { useState } from "react";
import { X } from "lucide-react";
import BlogPostCard from "@/components/blog/BlogPostCard";
import BlogPostView from "@/components/blog/BlogPostView";
import type { PostFormData } from "./PostForm";

type Tab = "post" | "card";

type Props = { form: PostFormData };

export default function PostPreview({ form }: Props) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("post");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Preview
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="border-b border-gray-200 px-4 h-14 flex items-center justify-between shrink-0">
        <div className="flex gap-1">
          {(["post", "card"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t === "post" ? "Full post" : "Listing card"}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-gray-50">
        {tab === "card" ? (
          <div className="max-w-sm mx-auto px-4 py-12">
            <p className="text-xs text-gray-400 text-center mb-4">
              How this post appears in the blog listing
            </p>
            <BlogPostCard
              title={form.title}
              excerpt={form.excerpt}
              slug={form.slug}
              createdAt={new Date()}
            />
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 text-center pt-6">
              How this post appears when opened
            </p>
            <BlogPostView
              title={form.title}
              excerpt={form.excerpt}
              content={form.content}
              createdAt={new Date()}
            />
          </>
        )}
      </div>
    </div>
  );
}
