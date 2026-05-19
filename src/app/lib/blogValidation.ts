import { sanitizeBlogHtml } from "./sanitize";

export type BlogPostInput = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
};

const MAX_TITLE_LENGTH = 255;
const MAX_SLUG_LENGTH = 255;
const MAX_EXCERPT_LENGTH = 600;
const MAX_CONTENT_LENGTH = 100_000;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseBlogPostInput(input: unknown): BlogPostInput {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid request body.");
  }

  const record = input as Record<string, unknown>;
  const title = asTrimmedString(record.title);
  const slug = asTrimmedString(record.slug);
  const excerpt = asTrimmedString(record.excerpt);
  const rawContent = typeof record.content === "string" ? record.content : "";
  const published = typeof record.published === "boolean" ? record.published : false;

  if (!title || title.length > MAX_TITLE_LENGTH) {
    throw new Error("Title is required and must be 255 characters or fewer.");
  }

  if (!slug || slug.length > MAX_SLUG_LENGTH || !SLUG_PATTERN.test(slug)) {
    throw new Error("Slug must be lowercase, hyphenated, and 255 characters or fewer.");
  }

  if (excerpt.length > MAX_EXCERPT_LENGTH) {
    throw new Error("Excerpt must be 600 characters or fewer.");
  }

  if (!rawContent || rawContent.length > MAX_CONTENT_LENGTH) {
    throw new Error("Content is required and is too large.");
  }

  const content = sanitizeBlogHtml(rawContent);
  if (!content) {
    throw new Error("Content must contain valid allowed HTML.");
  }

  return {
    title,
    slug,
    excerpt,
    content,
    published,
  };
}
