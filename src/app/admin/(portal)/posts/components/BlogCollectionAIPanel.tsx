"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Copy, History, PanelTopOpen, Play, X } from "lucide-react";
import useTimedToast from "../../hooks/useTimedToast";

type PostSummary = {
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  createdAt: string;
};

type CollectionAiAction =
  | "summary"
  | "contentGaps"
  | "calendar"
  | "titleAudit"
  | "quickWins"
  | "nextPost";

type Props = {
  posts: PostSummary[];
};

type CollectionResult = {
  title: string;
  contentHtml: string;
};

type HistoryItem = {
  id: string;
  label: string;
  result: CollectionResult;
};

const ACTIONS: Array<{
  id: CollectionAiAction;
  label: string;
  description: string;
  helpText: string;
}> = [
  {
    id: "summary",
    label: "What topics are already covered?",
    description: "Summarizes the main themes already in your blog.",
    helpText: "Useful when you want a quick overview before planning the next post.",
  },
  {
    id: "contentGaps",
    label: "Which topics are missing?",
    description: "Finds useful blog ideas you have not covered yet.",
    helpText: "Good for spotting gaps based on your current inventory.",
  },
  {
    id: "calendar",
    label: "What should we publish next?",
    description: "Builds a simple next-post calendar with suggested CTAs.",
    helpText: "Best when you want a ready-made shortlist of future post ideas.",
  },
  {
    id: "titleAudit",
    label: "Review post titles",
    description: "Checks whether your existing titles are clear and useful.",
    helpText: "Helpful for improving clickability and clarity across the whole blog.",
  },
  {
    id: "quickWins",
    label: "Find the easiest improvements",
    description: "Highlights simple changes likely to improve the blog fastest.",
    helpText: "Best for a client who wants clear actions without a big rewrite project.",
  },
  {
    id: "nextPost",
    label: "Suggest the next post",
    description: "Uses the blog archive to recommend one strong next post idea.",
    helpText:
      "Looks at recurring themes across the archive and what was published recently, so it scales better than only checking the last few posts.",
  },
];

export default function BlogCollectionAIPanel({ posts }: Props) {
  const [selectedAction, setSelectedAction] = useState<CollectionAiAction>("quickWins");
  const [loadingAction, setLoadingAction] = useState<CollectionAiAction | null>(null);
  const [error, setError] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [result, setResult] = useState<CollectionResult | null>(null);
  const [resultOpen, setResultOpen] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast, showToast } = useTimedToast();

  const selectedConfig = useMemo(
    () => ACTIONS.find((action) => action.id === selectedAction) ?? ACTIONS[0],
    [selectedAction],
  );
  const publishedPostCount = useMemo(
    () => posts.filter((post) => post.published).length,
    [posts],
  );
  const selectedActionBlocked =
    selectedAction === "nextPost" && publishedPostCount < 2;
  const selectedActionBlockMessage =
    selectedAction === "nextPost" && publishedPostCount < 2
      ? "Publish at least two posts before asking for a next-post recommendation."
      : "";

  async function copyHtml(html: string) {
    try {
      await navigator.clipboard.writeText(html);
      showToast("Result copied");
    } catch {
      setError("Could not copy to clipboard.");
    }
  }

  async function runAction(action: CollectionAiAction) {
    setLoadingAction(action);
    setError("");
    setResultOpen(true);

    try {
      const res = await fetch("/api/admin/ai/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          posts,
        }),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.error ?? "AI request failed.");
      }

      setResult(body);
      setHistory((prev) => [
        {
          id: `${action}-${Date.now()}`,
          label: body.title ?? ACTIONS.find((item) => item.id === action)?.label ?? action,
          result: body,
        },
        ...prev,
      ].slice(0, 5));
      showToast("Collection insight ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI request failed.");
      setResult(null);
    } finally {
      setLoadingAction(null);
    }
  }

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {toast ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <Check size={13} />
          {toast}
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
        <div className="rounded-lg bg-gray-100 p-2 text-gray-600">
          <PanelTopOpen size={16} />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-sm font-semibold text-gray-900">Blog planner</h2>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
              Optional
            </span>
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Open this section when you want quick planning help across all posts.
          </p>
        </div>
      </div>
        <button
          type="button"
          onClick={() => setPanelOpen((open) => !open)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
      <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)_auto] lg:items-end">
        <div>
          <label
            htmlFor="collection-ai-action"
            className="mb-1.5 block text-sm font-medium text-gray-800"
          >
            Tool
          </label>
          <select
            id="collection-ai-action"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value as CollectionAiAction)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ACTIONS.map((action) => (
              <option key={action.id} value={action.id}>
                {action.label}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
          <p className="text-sm text-gray-700">{selectedConfig.description}</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">{selectedConfig.helpText}</p>
        </div>

        <button
          type="button"
          onClick={() => runAction(selectedAction)}
          disabled={loadingAction !== null || selectedActionBlocked}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Play size={15} />
          {loadingAction === selectedAction ? "Working..." : "Run"}
        </button>
      </div>

      {selectedActionBlocked ? (
        <p className="mt-3 text-sm text-amber-700">{selectedActionBlockMessage}</p>
      ) : null}

      {history.length ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <label
            htmlFor="collection-ai-history"
            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-500"
          >
            <History size={13} />
            Recent results
          </label>
          <select
            id="collection-ai-history"
            defaultValue=""
            onChange={(e) => {
              const item = history.find((entry) => entry.id === e.target.value);
              if (item) {
                setResult(item.result);
                setResultOpen(true);
                setPanelOpen(true);
                showToast(`Loaded ${item.label}`);
              }
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
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setResultOpen((open) => !open)}
              className="inline-flex cursor-pointer items-center gap-2 text-left"
            >
              <span className="text-sm font-semibold text-gray-900">{result.title}</span>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${resultOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyHtml(result.contentHtml)}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                <Copy size={13} />
                Copy
              </button>
              <button
                type="button"
                onClick={() => setResult(null)}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                <X size={13} />
                Dismiss
              </button>
            </div>
          </div>

          {resultOpen ? (
            <div
              className="blog-content mt-4 rounded-xl border border-gray-200 bg-white p-4 text-sm leading-6 text-gray-700 shadow-sm [&_h3]:mt-0 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3:not(:first-child)]:mt-5 [&_p]:my-0 [&_p:not(:first-child)]:mt-3 [&_ol]:mt-4 [&_ol]:list-none [&_ol]:space-y-4 [&_ol]:pl-0 [&_ol>li]:rounded-xl [&_ol>li]:border [&_ol>li]:border-gray-200 [&_ol>li]:bg-gray-50 [&_ol>li]:p-4 [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:pl-0 [&_ul]:list-none [&_ul>li]:rounded-lg [&_ul>li]:bg-white [&_ul>li]:px-3 [&_ul>li]:py-2 [&_ul>li]:border [&_ul>li]:border-gray-200 [&_strong]:font-semibold [&_strong]:text-gray-900"
              dangerouslySetInnerHTML={{ __html: result.contentHtml }}
            />
          ) : null}
        </div>
      ) : null}
        </>
      ) : null}
    </div>
  );
}
