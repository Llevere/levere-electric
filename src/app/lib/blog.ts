// Blog model and the markdown subset posts are written in. Posts live in
// src/app/blog/posts.ts and are prerendered, so no database is involved.
import { JOBBER } from "./site";

/** Each topic's service page and Jobber form, used for CTAs and topic links. */
export const CATEGORY_SERVICE = {
  "EV charging": {
    page: "/ev-charger-installation",
    quote: JOBBER.ev,
    quoteLabel: "Request an EV charger quote",
  },
  "Panel upgrades": {
    page: "/panel-service-upgrades",
    quote: JOBBER.panel,
    quoteLabel: "Request a panel upgrade quote",
  },
  "Smart homes": {
    page: "/smart-home-lighting",
    quote: JOBBER.general,
    quoteLabel: "Ask about smart lighting",
  },
  "Home networking": {
    page: "/home-networking",
    quote: JOBBER.general,
    quoteLabel: "Discuss a networking project",
  },
} as const;

export type BlogCategory = keyof typeof CATEGORY_SERVICE;
export const BLOG_CATEGORIES = Object.keys(CATEGORY_SERVICE) as BlogCategory[];

/** Either a file from the Vercel Blob index or a file bundled under /public. */
export type PostImage =
  | { blob: "home/" | "services/"; file: string }
  | { src: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  image: PostImage;
  imageAlt: string;
  /** ISO dates (UTC). */
  publishedAt: string;
  updatedAt: string;
  /** Two or three one-sentence answers shown above the article. */
  keyTakeaways: readonly string[];
  /** Markdown subset: `## `/`### ` headings, `- ` bullets, `**bold**`, `[text](href)`. */
  body: string;
};

export function readingMinutes(body: string) {
  return Math.max(1, Math.ceil(body.split(/\s+/).length / 210));
}

export function headingId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Only same-site paths, fragments and https links survive into the HTML. */
export function safeLink(value: string) {
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\"))
    return value;
  if (value.startsWith("#")) return value;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "#";
  } catch {
    return "#";
  }
}

export type HeadingBlock = {
  type: "heading";
  level: 2 | 3;
  text: string;
  id: string;
};
export type ArticleBlock =
  | HeadingBlock
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string };

export function articleBlocks(body: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const ids = new Map<string, number>();
  let paragraph: string[] = [];
  let list: string[] = [];

  const flush = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
    if (list.length) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };

  for (const raw of body.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const heading = /^(##|###) (.+)$/.exec(line);
    if (heading) {
      flush();
      const text = heading[2];
      const base = headingId(text) || "section";
      const count = (ids.get(base) ?? 0) + 1;
      ids.set(base, count);
      blocks.push({
        type: "heading",
        level: heading[1] === "##" ? 2 : 3,
        text,
        id: count === 1 ? base : `${base}-${count}`,
      });
    } else if (line.startsWith("- ")) {
      if (paragraph.length) flush();
      list.push(line.slice(2));
    } else {
      if (list.length) flush();
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

/** Plain text of the article (for schema.org `articleBody` / word counts). */
export function plainText(body: string) {
  return body
    .replace(/^#{2,3} /gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^- /gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Toronto",
  }).format(new Date(iso));
}
