"use client";

import { useEffect, useState } from "react";

export default function useTimedToast(durationMs = 1800) {
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(""), durationMs);
    return () => window.clearTimeout(timer);
  }, [durationMs, toast]);

  return {
    toast,
    showToast: setToast,
    clearToast: () => setToast(""),
  };
}
