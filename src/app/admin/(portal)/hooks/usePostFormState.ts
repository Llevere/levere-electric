"use client";

import { useEffect, useState } from "react";
import type { PostFormData } from "../components/PostForm";
import {
  buildBlogContentWithAttachments,
  splitBlogContentAndAttachments,
  type BlogAttachment,
} from "@/lib/blogAttachments";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isStoredPostFormData(value: unknown): value is PostFormData {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;
  return (
    typeof record.title === "string" &&
    typeof record.slug === "string" &&
    typeof record.excerpt === "string" &&
    typeof record.content === "string" &&
    typeof record.published === "boolean"
  );
}

type Options = {
  initialData: PostFormData;
  draftStorageKey?: string;
};

export default function usePostFormState({ initialData, draftStorageKey }: Options) {
  const [form, setForm] = useState<PostFormData>(initialData);
  const [draftReady, setDraftReady] = useState(!draftStorageKey);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  useEffect(() => {
    if (!draftStorageKey) return;

    try {
      const raw = localStorage.getItem(draftStorageKey);
      if (!raw) {
        setDraftReady(true);
        return;
      }

      const parsed = JSON.parse(raw);
      if (isStoredPostFormData(parsed)) {
        setForm(parsed);
      }
    } catch {
      // Ignore invalid draft payloads and keep the current form state.
    } finally {
      setDraftReady(true);
    }
  }, [draftStorageKey]);

  useEffect(() => {
    if (!draftStorageKey || !draftReady) return;

    try {
      localStorage.setItem(draftStorageKey, JSON.stringify(form));
    } catch {
      // Ignore storage failures and keep the editor usable.
    }
  }, [draftReady, draftStorageKey, form]);

  function setField<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const { content: editorContent, attachments } = splitBlogContentAndAttachments(form.content);

  function applyUpdates(updates: Partial<PostFormData>) {
    setForm((prev) => ({ ...prev, ...updates }));
  }

  function appendContent(html: string) {
    setForm((prev) => ({
      ...prev,
      content: buildBlogContentWithAttachments(
        prev.content ? `${splitBlogContentAndAttachments(prev.content).content}\n${html}` : html,
        splitBlogContentAndAttachments(prev.content).attachments
      ),
    }));
  }

  function setEditorContent(content: string) {
    setForm((prev) => ({
      ...prev,
      content: buildBlogContentWithAttachments(
        content,
        splitBlogContentAndAttachments(prev.content).attachments
      ),
    }));
  }

  function addAttachment(attachment: BlogAttachment) {
    setForm((prev) => {
      const parts = splitBlogContentAndAttachments(prev.content);
      return {
        ...prev,
        content: buildBlogContentWithAttachments(parts.content, [...parts.attachments, attachment]),
      };
    });
  }

  function removeAttachment(index: number) {
    setForm((prev) => {
      const parts = splitBlogContentAndAttachments(prev.content);
      return {
        ...prev,
        content: buildBlogContentWithAttachments(
          parts.content,
          parts.attachments.filter((_, itemIndex) => itemIndex !== index)
        ),
      };
    });
  }

  function updateAttachment(index: number, updates: Partial<BlogAttachment>) {
    setForm((prev) => {
      const parts = splitBlogContentAndAttachments(prev.content);
      return {
        ...prev,
        content: buildBlogContentWithAttachments(
          parts.content,
          parts.attachments.map((attachment, itemIndex) =>
            itemIndex === index ? { ...attachment, ...updates } : attachment
          )
        ),
      };
    });
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug === toSlug(prev.title) ? toSlug(title) : prev.slug,
    }));
  }

  return {
    form,
    setForm,
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
  };
}
