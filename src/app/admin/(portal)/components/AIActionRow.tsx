"use client";

import { Play } from "lucide-react";
import type { PostAiAction } from "@/lib/postAiValidation";
import { ACTIONS, type ActionConfig } from "../postAiActions";

type Props = {
  selectedAction: PostAiAction;
  selectedConfig: ActionConfig;
  selectedValidation: { valid: boolean; message: string };
  loadingAction: PostAiAction | null;
  onActionChange: (action: PostAiAction) => void;
  onRun: () => void;
};

export default function AIActionRow({
  selectedAction,
  selectedConfig,
  selectedValidation,
  loadingAction,
  onActionChange,
  onRun,
}: Props) {
  return (
    <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)_auto] lg:items-end">
      <div>
        <label
          htmlFor="post-ai-action"
          className="mb-1.5 block text-sm font-medium text-gray-800"
        >
          Tool
        </label>
        <select
          id="post-ai-action"
          value={selectedAction}
          onChange={(e) => onActionChange(e.target.value as PostAiAction)}
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
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {selectedConfig.helpText}
        </p>
      </div>

      <button
        type="button"
        onClick={onRun}
        disabled={loadingAction !== null || !selectedValidation.valid}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Play size={15} />
        {loadingAction === selectedAction ? "Working..." : "Run"}
      </button>
    </div>
  );
}
