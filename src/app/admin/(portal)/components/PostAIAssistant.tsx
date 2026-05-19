"use client";

import { useState } from "react";
import { Check, ChevronDown, History, PanelTopOpen } from "lucide-react";
import type { PostFormData } from "./PostForm";
import useAIAssistant from "../hooks/useAIAssistant";
import AIActionRow from "./AIActionRow";
import AIResultPanel from "./AIResultPanel";

type Props = {
  form: PostFormData;
  onApply: (updates: Partial<PostFormData>) => void;
  onAppendContent: (html: string) => void;
  resultStickyTop: number;
};

export default function PostAIAssistant({
  form,
  onApply,
  onAppendContent,
  resultStickyTop,
}: Props) {
  const [panelOpen, setPanelOpen] = useState(false);
  const {
    toast,
    prompt,
    setPrompt,
    selectedAction,
    setSelectedAction,
    selectedConfig,
    selectedValidation,
    loadingAction,
    error,
    result,
    setResult,
    resultOpen,
    resultCardRef,
    resultHeaderRef,
    history,
    contentDiffRows,
    showContentDiff,
    runAction,
    applyWithToast,
    appendWithToast,
    copyText,
    loadHistoryItem,
    toggleResultOpen,
  } = useAIAssistant({ form, onApply, onAppendContent, resultStickyTop });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {toast ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <Check size={13} />
          {toast}
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-gray-100 p-2 text-gray-600">
            <PanelTopOpen size={16} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-sm font-semibold text-gray-900">
                Writing tools
              </h3>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                Optional
              </span>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Open this section when you want help with titles, summaries,
              images, or draft cleanup.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPanelOpen((open) => !open)}
          className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          {panelOpen ? "Hide tools" : "Show tools"}
          <ChevronDown
            size={16}
            className={`transition-transform ${panelOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {panelOpen ? (
        <>
          <AIActionRow
            selectedAction={selectedAction}
            selectedConfig={selectedConfig}
            selectedValidation={selectedValidation}
            loadingAction={loadingAction}
            onActionChange={setSelectedAction}
            onRun={() => runAction(selectedAction)}
          />

          {!selectedValidation.valid ? (
            <p className="mt-3 text-sm text-amber-700">
              {selectedValidation.message}
            </p>
          ) : null}

          <div className="mt-3">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
              Extra notes
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              placeholder="Optional: mention service area, keyword, tone, or what to focus on."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {history.length ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <label
                htmlFor="post-ai-history"
                className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                <History size={13} />
                Recent results
              </label>
              <select
                id="post-ai-history"
                defaultValue=""
                onChange={(e) => {
                  loadHistoryItem(e.target.value);
                  setPanelOpen(true);
                }}
                className="min-w-56 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a recent result
                </option>
                {history.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

          {result ? (
            <AIResultPanel
              result={result}
              resultOpen={resultOpen}
              resultStickyTop={resultStickyTop}
              resultCardRef={resultCardRef}
              resultHeaderRef={resultHeaderRef}
              contentDiffRows={contentDiffRows}
              showContentDiff={showContentDiff}
              onToggleOpen={toggleResultOpen}
              onDismiss={() => setResult(null)}
              onApplyWithToast={applyWithToast}
              onAppendWithToast={appendWithToast}
              onCopyText={copyText}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
