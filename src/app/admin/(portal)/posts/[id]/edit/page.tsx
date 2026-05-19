"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostForm from "../../../components/PostForm";
import type { PostFormData } from "../../../components/PostForm";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<PostFormData | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/posts/${id}`)
      .then((r) => r.json())
      .then(setPost);
  }, [id]);

  async function handleSave(data: PostFormData) {
    setSaving(true);
    setError("");

    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/posts");
    } else {
      const body = await res.json();
      setError(body.error ?? "Failed to save post.");
      setSaving(false);
    }
  }

  if (!post) return <p className="text-gray-500 text-sm">Loading…</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Post</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <PostForm initialData={post} onSave={handleSave} saving={saving} />
    </div>
  );
}
