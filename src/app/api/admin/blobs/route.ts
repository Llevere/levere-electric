import { NextRequest, NextResponse } from "next/server";
import { list, put } from "@vercel/blob";
import { sessionCheck } from "@/lib/blacklist";
import { getIndexedFolderListing } from "@/lib/blob";

const IMAGE_EXT = /\.(png|jpe?g|webp|avif|gif)$/i;
const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "image/gif",
]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const DEFAULT_LIST_LIMIT = 24;
const MAX_LIST_LIMIT = 60;

function asFolderLabel(pathname: string) {
  return pathname.replace(/\/$/, "").split("/").pop() ?? pathname;
}

export async function GET(req: NextRequest) {
  const blocked = await sessionCheck(req);
  if (blocked) return blocked;

  const searchParams = req.nextUrl.searchParams;
  const prefix = searchParams.get("prefix")?.trim() ?? "";
  const cursor = searchParams.get("cursor")?.trim() || undefined;
  const requestedLimit = Number.parseInt(searchParams.get("limit") ?? "", 10);
  const limit =
    Number.isFinite(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, MAX_LIST_LIMIT)
      : DEFAULT_LIST_LIMIT;

  const indexedResult = prefix ? await getIndexedFolderListing(prefix, limit, cursor) : null;
  if (indexedResult) {
    return NextResponse.json({
      prefix,
      folders: indexedResult.folders,
      images: indexedResult.images,
      cursor: indexedResult.cursor,
      hasMore: indexedResult.hasMore,
      source: "redis",
    });
  }

  const { blobs, folders, cursor: nextCursor, hasMore } = await list({
    mode: "folded",
    prefix,
    cursor,
    limit,
  });

  const images = blobs
    .filter((b) => IMAGE_EXT.test(b.pathname) && b.size > 0)
    .map((b) => ({
      url: b.url,
      pathname: b.pathname,
      fileName: b.pathname.split("/").pop() ?? b.pathname,
      size: b.size,
      uploadedAt: b.uploadedAt ? new Date(b.uploadedAt).toISOString() : undefined,
    }))
    .sort((a, b) => (b.uploadedAt ?? "").localeCompare(a.uploadedAt ?? ""));

  return NextResponse.json({
    prefix,
    folders: folders.map((folderPath) => ({
      pathname: folderPath,
      name: asFolderLabel(folderPath),
    })),
    images,
    cursor: nextCursor ?? null,
    hasMore,
    source: "blob",
  });
}

export async function POST(req: NextRequest) {
  const blocked = await sessionCheck(req);
  if (blocked) return blocked;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!ALLOWED_TYPES.has(file.type) || !IMAGE_EXT.test(file.name)) {
    return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
  }
  if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Image must be between 1 byte and 5 MB." }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const filename = `blog/${Date.now()}.${ext}`;
  const { url } = await put(filename, file, { access: "public" });

  return NextResponse.json({ url });
}
