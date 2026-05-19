"use client";

import NextImage from "next/image";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ImageIcon,
  Minus,
  Upload,
  X,
  Loader2,
} from "lucide-react";
import type { BlobImage } from "@/types/images";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  onAddImage?: (image: { url: string; fileName: string }) => void;
};

const PRESET_COLORS = [
  "#111827",
  "#374151",
  "#6b7280",
  "#dc2626",
  "#ea580c",
  "#ca8a04",
  "#16a34a",
  "#0284c7",
  "#7c3aed",
];

function Divider() {
  return <div className="w-px h-5 bg-gray-300 mx-0.5 shrink-0" />;
}

// onMouseDown + preventDefault keeps the editor focused so commands like
// toggleBulletList retain the current selection.
function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex cursor-pointer items-center justify-center w-7 h-7 rounded transition-colors shrink-0 ${
        active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Image modal ────────────────────────────────────────────────────────────

type ImageModalProps = {
  onClose: () => void;
  onInsert: (image: { url: string; fileName: string }) => void;
};

type BlobFolder = {
  pathname: string;
  name: string;
};

type BlobLibraryResponse = {
  prefix: string;
  folders: BlobFolder[];
  images: BlobImage[];
  cursor: string | null;
  hasMore: boolean;
};

const LIBRARY_PAGE_SIZE = 24;

function prefixSegments(prefix: string) {
  const clean = prefix.replace(/\/$/, "");
  return clean ? clean.split("/") : [];
}

function ImageModal({ onClose, onInsert }: ImageModalProps) {
  const [tab, setTab] = useState<"upload" | "library">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [folders, setFolders] = useState<BlobFolder[]>([]);
  const [library, setLibrary] = useState<BlobImage[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState("");
  const [currentPrefix, setCurrentPrefix] = useState("");
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  async function loadLibrary(
    prefix: string,
    cursor?: string,
    history: string[] = [],
  ) {
    setLibraryLoading(true);
    setLibraryError("");

    try {
      const params = new URLSearchParams({
        prefix,
        limit: String(LIBRARY_PAGE_SIZE),
      });
      if (cursor) params.set("cursor", cursor);

      const res = await fetch(`/api/admin/blobs?${params.toString()}`);
      const data = (await res.json()) as BlobLibraryResponse;

      if (!res.ok) {
        throw new Error("Failed to load image library.");
      }

      setCurrentPrefix(data.prefix ?? prefix);
      setCurrentCursor(cursor ?? null);
      setFolders(Array.isArray(data.folders) ? data.folders : []);
      setLibrary(Array.isArray(data.images) ? data.images : []);
      setNextCursor(data.cursor ?? null);
      setCursorHistory(history);
    } catch {
      setFolders([]);
      setLibrary([]);
      setCurrentCursor(null);
      setNextCursor(null);
      setLibraryError("Could not load images from storage.");
    } finally {
      setLibraryLoading(false);
    }
  }

  useEffect(() => {
    if (tab !== "library") return;
    void loadLibrary("", undefined, []);
  }, [tab]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/blobs", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      onInsert({ url, fileName: file.name });
      onClose();
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  const segments = prefixSegments(currentPrefix);
  const canGoBackPage = cursorHistory.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mx-4 flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-xl md:max-h-[92vh] md:min-h-[50vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">Insert image</h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-5">
          {(["upload", "library"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`-mb-px cursor-pointer border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                tab === t
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {t === "upload" ? "Upload new" : "From library"}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {tab === "upload" ? (
            <div className="flex h-full min-h-full flex-col space-y-4">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex min-h-72 w-full flex-1 cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-8 transition-colors hover:border-blue-400 hover:bg-blue-50"
              >
                {preview ? (
                  <div className="relative h-full min-h-64 w-full overflow-hidden rounded-lg">
                    <NextImage
                      src={preview}
                      alt="Preview"
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Click to browse or drop an image
                    </span>
                    <span className="text-xs text-gray-400">
                      PNG, JPG, WebP, AVIF, GIF
                    </span>
                  </>
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
              {file && (
                <p className="text-xs text-gray-500 truncate">
                  {file.name}{" "}
                  <span className="text-gray-400">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </p>
              )}
              <button
                type="button"
                onClick={handleUpload}
                disabled={!file || uploading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Uploading…
                  </>
                ) : (
                  "Upload & insert"
                )}
              </button>
            </div>
          ) : (
            <div>
              {libraryLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 size={24} className="animate-spin text-gray-400" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Current folder
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-1 text-sm text-gray-700">
                        <button
                          type="button"
                          onClick={() => void loadLibrary("", undefined, [])}
                          className="cursor-pointer rounded px-1.5 py-0.5 hover:bg-gray-100"
                        >
                          All folders
                        </button>
                        {segments.map((segment, index) => {
                          const pathname = `${segments.slice(0, index + 1).join("/")}/`;
                          return (
                            <button
                              key={pathname}
                              type="button"
                              onClick={() =>
                                void loadLibrary(pathname, undefined, [])
                              }
                              className="cursor-pointer rounded px-1.5 py-0.5 hover:bg-gray-100"
                            >
                              / {segment}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const parent = segments.slice(0, -1);
                          const parentPrefix = parent.length
                            ? `${parent.join("/")}/`
                            : "";
                          void loadLibrary(parentPrefix, undefined, []);
                        }}
                        disabled={segments.length === 0}
                        className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ChevronLeft size={13} />
                        Up one level
                      </button>
                    </div>
                  </div>

                  {libraryError ? (
                    <p className="py-8 text-center text-sm text-red-500">
                      {libraryError}
                    </p>
                  ) : (
                    <>
                      {folders.length ? (
                        <div>
                          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                            Folders
                          </p>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {folders.map((folder) => (
                              <button
                                key={folder.pathname}
                                type="button"
                                onClick={() =>
                                  void loadLibrary(
                                    folder.pathname,
                                    undefined,
                                    [],
                                  )
                                }
                                className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50"
                              >
                                {folder.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {library.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-10">
                          No images found in this folder.
                        </p>
                      ) : (
                        <div>
                          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                            Images
                          </p>
                          <div className="grid grid-cols-3 gap-3 pr-1">
                            {library.map((img) => (
                              <button
                                key={img.url}
                                type="button"
                                onClick={() => {
                                  onInsert({
                                    url: img.url,
                                    fileName: img.fileName,
                                  });
                                  onClose();
                                }}
                                className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 text-left transition-all hover:border-blue-400 hover:shadow-md"
                              >
                                <div className="relative h-20 w-full">
                                  <NextImage
                                    src={img.url}
                                    alt={img.fileName}
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 33vw, 20vw"
                                    className="object-cover"
                                  />
                                </div>
                                <p className="text-[10px] text-gray-500 px-1.5 py-1 truncate group-hover:text-blue-600">
                                  {img.fileName}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {canGoBackPage || nextCursor ? (
                        <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-3">
                          <button
                            type="button"
                            onClick={() => {
                              const previousCursor =
                                cursorHistory[cursorHistory.length - 1];
                              const nextHistory = cursorHistory.slice(0, -1);
                              void loadLibrary(
                                currentPrefix,
                                previousCursor || undefined,
                                nextHistory,
                              );
                            }}
                            disabled={!canGoBackPage}
                            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <ChevronLeft size={13} />
                            Previous
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              void loadLibrary(
                                currentPrefix,
                                nextCursor ?? undefined,
                                [...cursorHistory, currentCursor ?? ""],
                              );
                            }}
                            disabled={!nextCursor}
                            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Next
                            <ChevronRight size={13} />
                          </button>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Editor ─────────────────────────────────────────────────────────────────

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  onAddImage,
}: Props) {
  const [showImageModal, setShowImageModal] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Image.configure({ inline: false }),
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "tiptap-editor",
        style: "min-height: 200px",
        ...(placeholder ? { "data-placeholder": placeholder } : {}),
      },
    },
  });

  useEffect(() => {
    if (editor && !editor.isFocused) {
      const current = editor.getHTML();
      if (value !== current) editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <>
      <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-gray-200 bg-gray-50">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            <Bold size={14} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            <Italic size={14} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon size={14} />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
            title="Large heading"
          >
            <Heading2 size={14} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
            title="Small heading"
          >
            <Heading3 size={14} />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet list"
          >
            <List size={14} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Numbered list"
          >
            <ListOrdered size={14} />
          </ToolbarButton>

          <Divider />

          {/* Colour swatches */}
          <div className="flex items-center gap-0.5">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                title={`Text color: ${color}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().setColor(color).run();
                }}
                className="w-4 h-4 rounded-full border border-gray-300 shrink-0 transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
            <label
              title="Custom color"
              className="flex items-center justify-center w-7 h-7 rounded text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
            >
              <span
                className="text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg, red, blue)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                A
              </span>
              <input
                type="color"
                className="sr-only"
                onChange={(e) =>
                  editor.chain().focus().setColor(e.target.value).run()
                }
              />
            </label>
          </div>

          <Divider />

          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            active={false}
            title="Divider line"
          >
            <Minus size={14} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => setShowImageModal(true)}
            active={false}
            title="Insert image"
          >
            <ImageIcon size={14} />
          </ToolbarButton>
        </div>

        <EditorContent editor={editor} />
      </div>

      {showImageModal && (
        <ImageModal
          onClose={() => setShowImageModal(false)}
          onInsert={(image) => {
            if (onAddImage) {
              onAddImage(image);
              return;
            }

            editor.chain().focus().setImage({ src: image.url }).run();
          }}
        />
      )}
    </>
  );
}
