"use client";

import { ChevronDown, Copy, X } from "lucide-react";
import type { PostFormData } from "./PostForm";
import type { PostAiResponse } from "../hooks/useAIAssistant";
import type { DiffRow } from "@/lib/htmlDiff";
import AIDiffView from "./AIDiffView";

type Props = {
  result: PostAiResponse;
  resultOpen: boolean;
  resultStickyTop: number;
  resultCardRef: React.RefObject<HTMLDivElement | null>;
  resultHeaderRef: React.RefObject<HTMLDivElement | null>;
  contentDiffRows: DiffRow[];
  showContentDiff: boolean;
  onToggleOpen: () => void;
  onDismiss: () => void;
  onApplyWithToast: (updates: Partial<PostFormData>, message: string) => void;
  onAppendWithToast: (html: string) => void;
  onCopyText: (text: string, message: string) => Promise<void>;
};

export default function AIResultPanel({
  result,
  resultOpen,
  resultStickyTop,
  resultCardRef,
  resultHeaderRef,
  contentDiffRows,
  showContentDiff,
  onToggleOpen,
  onDismiss,
  onApplyWithToast,
  onAppendWithToast,
  onCopyText,
}: Props) {
  return (
    <div
      ref={resultCardRef}
      className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4"
    >
      <div
        ref={resultHeaderRef}
        className="sticky z-[5] -mx-4 -mt-4 mb-4 border-b border-gray-200 bg-gray-50 px-4 py-3"
        style={{ top: `${resultStickyTop}px` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onToggleOpen}
            className="inline-flex cursor-pointer items-center gap-2 text-left"
          >
            <span className="text-sm font-semibold text-gray-900">
              Latest AI result
            </span>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform ${resultOpen ? "rotate-180" : ""}`}
            />
          </button>

          <button
            type="button"
            onClick={onDismiss}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            <X size={13} />
            Dismiss
          </button>
        </div>
      </div>

      {resultOpen ? (
        <>
          {result.excerpt ? (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Summary preview
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                {result.excerpt}
              </p>
            </div>
          ) : null}

          {result.suggestedTitle ? (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Suggested title
              </p>
              <p className="mt-2 text-sm font-medium text-gray-900">
                {result.suggestedTitle}
              </p>
            </div>
          ) : null}

          {result.suggestedSlug ? (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Suggested page address
              </p>
              <p className="mt-2 text-sm font-mono text-gray-700">
                {result.suggestedSlug}
              </p>
            </div>
          ) : null}

          {result.outlineHtml ? (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Outline preview
              </p>
              <div
                className="blog-content mt-2 text-sm leading-6 text-gray-700"
                dangerouslySetInnerHTML={{ __html: result.outlineHtml }}
              />
            </div>
          ) : null}

          {showContentDiff ? (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Change comparison
                </p>
                <p className="text-xs text-gray-500">
                  Current draft on the left, AI revision on the right
                </p>
              </div>
              <div className="mt-3">
                <AIDiffView rows={contentDiffRows} />
              </div>
            </div>
          ) : null}

          {result.content ? (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Draft preview
              </p>
              <div
                className="blog-content mt-2 text-sm leading-6 text-gray-700"
                dangerouslySetInnerHTML={{ __html: result.content }}
              />
            </div>
          ) : null}

          {result.summary ? (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Quick read
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                {result.summary}
              </p>
            </div>
          ) : null}

          {result.imageNotes?.length ? (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Image notes
              </p>
              <div className="mt-2 space-y-2">
                {result.imageNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700"
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {result.titles?.length ? (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Title suggestions
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onCopyText(
                      result.titles?.join("\n") ?? "",
                      "Title ideas copied",
                    )
                  }
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800"
                >
                  <Copy size={13} />
                  Copy
                </button>
              </div>
              {result.titles.map((title) => (
                <div
                  key={title}
                  className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2.5"
                >
                  <p className="text-sm text-gray-700">{title}</p>
                  <button
                    type="button"
                    onClick={() => onApplyWithToast({ title }, "Title applied")}
                    className="shrink-0 cursor-pointer rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-200"
                  >
                    Use title
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          {result.slugSuggestions?.length ? (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Slug suggestions
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onCopyText(
                      result.slugSuggestions?.join("\n") ?? "",
                      "Slug suggestions copied",
                    )
                  }
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800"
                >
                  <Copy size={13} />
                  Copy
                </button>
              </div>
              {result.slugSuggestions.map((slug) => (
                <div
                  key={slug}
                  className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2.5"
                >
                  <p className="text-sm font-mono text-gray-700">{slug}</p>
                  <button
                    type="button"
                    onClick={() => onApplyWithToast({ slug }, "Slug applied")}
                    className="shrink-0 cursor-pointer rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-200"
                  >
                    Use slug
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          {result.recommendedTitle ? (
            <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                Recommended title
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-gray-900">
                  {result.recommendedTitle}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onApplyWithToast(
                      { title: result.recommendedTitle ?? "" },
                      "Title applied",
                    )
                  }
                  className="cursor-pointer rounded-lg border border-blue-300 bg-blue-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-700"
                >
                  Apply title
                </button>
              </div>
            </div>
          ) : null}

          {result.suggestedTitle ||
          result.suggestedSlug ||
          result.excerpt ||
          result.outlineHtml ? (
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Quick apply
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.suggestedTitle ? (
                  <button
                    type="button"
                    onClick={() =>
                      onApplyWithToast(
                        { title: result.suggestedTitle },
                        "Title applied",
                      )
                    }
                    className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-white"
                  >
                    Apply title
                  </button>
                ) : null}
                {result.suggestedSlug ? (
                  <button
                    type="button"
                    onClick={() =>
                      onApplyWithToast(
                        { slug: result.suggestedSlug },
                        "Slug applied",
                      )
                    }
                    className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-white"
                  >
                    Apply slug
                  </button>
                ) : null}
                {result.excerpt ? (
                  <button
                    type="button"
                    onClick={() =>
                      onApplyWithToast(
                        { excerpt: result.excerpt },
                        "Excerpt applied",
                      )
                    }
                    className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-white"
                  >
                    Apply excerpt
                  </button>
                ) : null}
                {result.outlineHtml ? (
                  <button
                    type="button"
                    onClick={() =>
                      onApplyWithToast(
                        { content: result.outlineHtml },
                        "Outline applied",
                      )
                    }
                    className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-white"
                  >
                    Use outline
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}

          {result.title || result.slug || result.content ? (
            <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                  Draft actions
                </p>
                {result.content ? (
                  <button
                    type="button"
                    onClick={() =>
                      onCopyText(result.content ?? "", "Draft HTML copied")
                    }
                    className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Copy size={13} />
                    Copy HTML
                  </button>
                ) : null}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.title ? (
                  <button
                    type="button"
                    onClick={() =>
                      onApplyWithToast({ title: result.title }, "Title applied")
                    }
                    className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-white"
                  >
                    Apply title
                  </button>
                ) : null}
                {result.slug ? (
                  <button
                    type="button"
                    onClick={() =>
                      onApplyWithToast({ slug: result.slug }, "Slug applied")
                    }
                    className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-white"
                  >
                    Apply slug
                  </button>
                ) : null}
                {result.excerpt ? (
                  <button
                    type="button"
                    onClick={() =>
                      onApplyWithToast(
                        { excerpt: result.excerpt },
                        "Excerpt applied",
                      )
                    }
                    className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-white"
                  >
                    Apply excerpt
                  </button>
                ) : null}
                {result.content ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        onApplyWithToast(
                          { content: result.content },
                          "Content replaced",
                        )
                      }
                      className="cursor-pointer rounded-lg border border-blue-300 bg-blue-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-700"
                    >
                      Replace content
                    </button>
                    <button
                      type="button"
                      onClick={() => onAppendWithToast(result.content ?? "")}
                      className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-white"
                    >
                      Append to content
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
