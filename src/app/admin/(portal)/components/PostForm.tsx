"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import RichTextEditor from "./RichTextEditor";
import PostAIAssistant from "./PostAIAssistant";
import PostAttachmentsField from "./PostAttachmentsField";
import BlogPostView from "@/components/blog/BlogPostView";
import BlogPostCard from "@/components/blog/BlogPostCard";
import usePostFormState from "../hooks/usePostFormState";

export type PostFormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
};

type Props = {
  initialData: PostFormData;
  onSave: (data: PostFormData) => void;
  saving: boolean;
  draftStorageKey?: string;
  onReset?: () => void;
};

type MobileTab = "edit" | "preview";

const ADMIN_NAV_HEIGHT = 56;

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 mb-0.5">
        {label}
      </label>
      <p className="text-xs text-gray-500 mb-1.5">{hint}</p>
      {children}
    </div>
  );
}

export default function PostForm({
  initialData,
  onSave,
  saving,
  draftStorageKey,
  onReset,
}: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("edit");
  const [aiResultStickyTop, setAiResultStickyTop] = useState(
    ADMIN_NAV_HEIGHT,
  );
  const actionBarRef = useRef<HTMLDivElement | null>(null);
  const {
    form,
    setField,
    editorContent,
    attachments,
    setEditorContent,
    addAttachment,
    removeAttachment,
    updateAttachment,
    applyUpdates,
    appendContent,
    handleTitleChange,
  } = usePostFormState({
    initialData,
    draftStorageKey,
  });

  useEffect(() => {
    const node = actionBarRef.current;
    if (!node) return;

    const updateOffset = () => {
      setAiResultStickyTop(ADMIN_NAV_HEIGHT + node.getBoundingClientRect().height);
    };

    updateOffset();

    const observer = new ResizeObserver(() => {
      updateOffset();
    });

    observer.observe(node);
    window.addEventListener("resize", updateOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  const blogBase = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/blog/`;

  const aiHelper = (
    <PostAIAssistant
      form={form}
      onApply={applyUpdates}
      onAppendContent={appendContent}
      resultStickyTop={aiResultStickyTop}
    />
  );

  const editorFields = (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <Field
        label="Post Title"
        hint="The headline of your post. Keep it clear and descriptive — this is what people see first in Google."
      >
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g. How to Know When to Upgrade Your Electrical Panel"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </Field>

      <Field
        label="Page Address"
        hint="The web address for this post. It fills in automatically from the title — only change it if you want a shorter URL. Never change this after a post is published."
      >
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <span className="px-3 py-2 text-sm text-gray-400 bg-gray-50 border-r border-gray-300 whitespace-nowrap select-none">
            {blogBase}
          </span>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setField("slug", e.target.value)}
            className="flex-1 px-3 py-2 text-sm text-gray-900 font-mono focus:outline-none"
            required
          />
        </div>
      </Field>

      <Field
        label="Short Summary"
        hint="A 1–3 sentence description of what the post is about. This appears in search results and on the blog listing page."
      >
        <textarea
          value={form.excerpt}
          onChange={(e) => setField("excerpt", e.target.value)}
          rows={3}
          placeholder="e.g. If your breakers trip often or you're adding a hot tub or EV charger, your panel may need an upgrade. Here's how to tell and what to expect."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Field>

      <Field
        label="Post Content"
        hint="The main written body of your post. Use the toolbar to format text, add headings, lists, and more."
      >
        <RichTextEditor
          value={editorContent}
          onChange={setEditorContent}
          onAddImage={({ url, fileName }) =>
            addAttachment({
              src: url,
              alt: "",
              title: fileName,
            })
          }
          placeholder="Start writing your post here..."
        />
      </Field>

      <Field
        label="Attachments"
        hint="Images added from the uploader or library will appear here. They will be shown in a dedicated image section for the post."
      >
        <PostAttachmentsField
          attachments={attachments}
          onRemove={removeAttachment}
          onUpdate={updateAttachment}
        />
      </Field>

      <div className="border border-gray-200 rounded-lg p-4 flex items-start gap-3">
        <input
          type="checkbox"
          id="draft"
          checked={!form.published}
          onChange={(e) => setField("published", !e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-blue-600"
        />
        <label htmlFor="draft" className="cursor-pointer">
          <span className="block text-sm font-medium text-gray-800">
            Save as draft
          </span>
          <span className="block text-xs text-gray-500 mt-0.5">
            Check this to save the post privately. Leave it unchecked to publish
            it live on your website.
          </span>
        </label>
      </div>
    </div>
  );

  const postPreviewPanel = (
    <div className="bg-white rounded-xl border border-gray-200 overflow-auto">
      <div className="border-b border-gray-100 px-4 py-2">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Full post preview
        </p>
      </div>
      <BlogPostView
        title={form.title}
        excerpt={form.excerpt}
        content={form.content}
        createdAt={new Date()}
      />
    </div>
  );

  const listingCardPreview = (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
        Blog listing card preview
      </p>
      <div className="max-w-sm">
        <BlogPostCard
          title={form.title}
          excerpt={form.excerpt}
          slug={form.slug}
          createdAt={new Date()}
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Sticky action bar */}
      <div
        ref={actionBarRef}
        className="sticky top-14 z-10 -mx-4 flex items-center gap-3 border-b border-gray-200 bg-gray-100 px-4 py-3"
      >
        <div className="w-px h-5 bg-gray-300" />
        <button
          type="submit"
          disabled={saving}
          className="cursor-pointer bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving…" : "Save post"}
        </button>
        <button
          type="button"
          onClick={() => setShowPreview((p) => !p)}
          className={` cursor-pointer text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${
            showPreview
              ? "bg-gray-900 text-white border-gray-900"
              : "text-gray-600 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {showPreview ? "Hide preview" : "Show preview"}
        </button>
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50"
          >
            Reset
          </button>
        ) : null}
        <Link
          href="/admin/posts"
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          Cancel
        </Link>
      </div>

      {aiHelper}

      {/* Desktop: 2-column split when preview is on */}
      {showPreview ? (
        <>
          {/* Mobile tab toggle */}
          <div className="flex md:hidden gap-1 bg-gray-100 p-1 rounded-lg">
            {(["edit", "preview"] as MobileTab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setMobileTab(t)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  mobileTab === t
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                {t === "edit" ? "Edit" : "Preview"}
              </button>
            ))}
          </div>

          {/* Mobile: show one panel at a time, listing card only on preview tab */}
          <div className="md:hidden space-y-5">
            {mobileTab === "edit" ? (
              editorFields
            ) : (
              <>
                {postPreviewPanel}
                {listingCardPreview}
              </>
            )}
          </div>

          {/* Desktop: side-by-side, listing card below the preview column */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-6 md:items-start">
            {editorFields}
            <div className="space-y-5">
              {postPreviewPanel}
              {listingCardPreview}
            </div>
          </div>
        </>
      ) : (
        editorFields
      )}
    </form>
  );
}
