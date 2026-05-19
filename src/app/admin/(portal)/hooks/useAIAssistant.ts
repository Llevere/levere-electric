"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PostFormData } from "../components/PostForm";
import { validatePostAiInput, type PostAiAction } from "@/lib/postAiValidation";
import { buildDiffRows } from "@/lib/htmlDiff";
import { ACTIONS } from "../postAiActions";
import useTimedToast from "./useTimedToast";

export type PostAiResponse = Partial<{
  summary: string;
  imageNotes: string[];
  titles: string[];
  slugSuggestions: string[];
  suggestedTitle: string;
  suggestedSlug: string;
  recommendedTitle: string;
  excerpt: string;
  outlineHtml: string;
  title: string;
  slug: string;
  content: string;
}>;

type HistoryItem = {
  id: string;
  label: string;
  result: PostAiResponse;
};

type Options = {
  form: PostFormData;
  onApply: (updates: Partial<PostFormData>) => void;
  onAppendContent: (html: string) => void;
  resultStickyTop: number;
};

export default function useAIAssistant({
  form,
  onApply,
  onAppendContent,
  resultStickyTop,
}: Options) {
  const [prompt, setPrompt] = useState("");
  const [selectedAction, setSelectedAction] =
    useState<PostAiAction>("reviewTitle");
  const [loadingAction, setLoadingAction] = useState<PostAiAction | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<PostAiResponse | null>(null);
  const [resultOpen, setResultOpen] = useState(true);
  const [resultsByAction, setResultsByAction] = useState<
    Partial<Record<PostAiAction, PostAiResponse>>
  >({});
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast, showToast } = useTimedToast();
  const resultCardRef = useRef<HTMLDivElement | null>(null);
  const resultHeaderRef = useRef<HTMLDivElement | null>(null);

  const selectedConfig = useMemo(
    () => ACTIONS.find((action) => action.id === selectedAction) ?? ACTIONS[0],
    [selectedAction],
  );
  const selectedValidation = useMemo(
    () => validatePostAiInput(selectedAction, { ...form, prompt }),
    [form, prompt, selectedAction],
  );
  const contentDiffRows = useMemo(() => {
    if (!result?.content || !form.content) return [];
    return buildDiffRows(form.content, result.content);
  }, [form.content, result?.content]);

  useEffect(() => {
    const cachedResult = resultsByAction[selectedAction] ?? null;
    setResult(cachedResult);
    if (cachedResult) {
      setResultOpen(true);
    }
  }, [resultsByAction, selectedAction]);

  function applyWithToast(updates: Partial<PostFormData>, message: string) {
    onApply(updates);
    showToast(message);
  }

  function appendWithToast(html: string) {
    onAppendContent(html);
    showToast("Content appended");
  }

  async function copyText(text: string, message: string) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(message);
    } catch {
      setError("Could not copy to clipboard.");
    }
  }

  async function runAction(action: PostAiAction) {
    const validation = validatePostAiInput(action, { ...form, prompt });

    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    setLoadingAction(action);
    setError("");
    setResultOpen(true);

    try {
      const res = await fetch("/api/admin/ai/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          input: { ...form, prompt },
        }),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.error ?? "AI request failed.");
      }

      setResultsByAction((prev) => ({ ...prev, [action]: body }));
      setResult(body);
      setHistory((prev) =>
        [
          {
            id: `${action}-${Date.now()}`,
            label: ACTIONS.find((item) => item.id === action)?.label ?? action,
            result: body,
          },
          ...prev,
        ].slice(0, 5),
      );
      showToast("AI result ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI request failed.");
      setResult(null);
    } finally {
      setLoadingAction(null);
    }
  }

  function loadHistoryItem(id: string) {
    const item = history.find((entry) => entry.id === id);
    if (item) {
      setResult(item.result);
      setResultOpen(true);
      showToast(`Loaded ${item.label}`);
    }
  }

  function toggleResultOpen() {
    if (resultOpen) {
      const headerRect = resultHeaderRef.current?.getBoundingClientRect();
      const cardTop = resultCardRef.current?.getBoundingClientRect().top;
      const stickyThreshold = resultStickyTop + 1;
      const isSticky =
        typeof headerRect?.top === "number" &&
        headerRect.top <= stickyThreshold;

      setResultOpen(false);

      if (isSticky && typeof cardTop === "number") {
        requestAnimationFrame(() => {
          const absoluteCardTop = window.scrollY + cardTop;
          const targetTop = Math.max(0, absoluteCardTop - resultStickyTop);
          window.scrollTo({ top: targetTop, behavior: "smooth" });
        });
      }

      return;
    }

    setResultOpen(true);
  }

  return {
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
    showContentDiff: !!(result?.content && form.content),
    runAction,
    applyWithToast,
    appendWithToast,
    copyText,
    loadHistoryItem,
    toggleResultOpen,
  };
}
