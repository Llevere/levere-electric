"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "../../components/PostForm";
import type { PostFormData } from "../../components/PostForm";

const emptyPost: PostFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  published: true,
};

const NEW_POST_DRAFT_KEY = "admin:new-post-draft";

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formKey, setFormKey] = useState(0);

  async function handleSave(data: PostFormData) {
    setSaving(true);
    setError("");

    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      localStorage.removeItem(NEW_POST_DRAFT_KEY);
      router.push("/admin/posts");
    } else {
      const body = await res.json();
      setError(body.error ?? "Failed to create post.");
      setSaving(false);
    }
  }

  function handleReset() {
    localStorage.removeItem(NEW_POST_DRAFT_KEY);
    setError("");
    setFormKey((value) => value + 1);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">New Post</h1>
      <p className="mb-6 max-w-3xl text-sm leading-6 text-gray-500">
        Start from scratch or use the AI writing help below for simple tasks like
        reviewing a title, improving image text, drafting content, or writing a
        short summary.
      </p>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <PostForm
        key={formKey}
        initialData={emptyPost}
        onSave={handleSave}
        saving={saving}
        draftStorageKey={NEW_POST_DRAFT_KEY}
        onReset={handleReset}
      />
    </div>
  );
}
