"use client";

import { useState } from "react";

const MAX_LENGTH = 200;

export default function ReviewCard({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > MAX_LENGTH;

  return (
    <div className="rounded-xl border border-brand-cream/10 bg-brand-navy-2 p-6">
      {children}

      {/* Review text */}
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-brand-cream/80">
        {isLong && !expanded ? text.slice(0, MAX_LENGTH) + "..." : text}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs font-medium text-brand-gold hover:text-brand-gold-3"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
