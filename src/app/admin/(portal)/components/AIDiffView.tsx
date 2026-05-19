"use client";

import type { DiffRow } from "@/lib/htmlDiff";

type Props = {
  rows: DiffRow[];
};

export default function AIDiffView({ rows }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="hidden grid-cols-2 border-b border-gray-200 bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-500 md:grid">
        <div className="border-r border-gray-200 px-3 py-2">Current</div>
        <div className="px-3 py-2">Suggested</div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {rows.length ? (
          rows.map((row, index) => (
            <div
              key={`${row.left}-${row.right}-${index}`}
              className="grid border-b border-gray-100 md:grid-cols-2"
            >
              <div
                className={`px-3 py-2 text-sm leading-6 md:border-r md:border-gray-100 ${
                  row.status === "changed" || row.status === "removed"
                    ? "bg-rose-50 text-rose-900"
                    : "bg-white text-gray-700"
                }`}
              >
                <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-gray-400 md:hidden">
                  Current
                </p>
                {row.left || (
                  <span className="text-gray-300">No matching text</span>
                )}
              </div>
              <div
                className={`px-3 py-2 text-sm leading-6 ${
                  row.status === "changed" || row.status === "added"
                    ? "bg-emerald-50 text-emerald-900"
                    : "bg-white text-gray-700"
                }`}
              >
                <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-gray-400 md:hidden">
                  Suggested
                </p>
                {row.right || (
                  <span className="text-gray-300">No matching text</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="px-3 py-4 text-sm text-gray-500">
            No visible text differences found.
          </div>
        )}
      </div>
    </div>
  );
}
