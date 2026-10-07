/**
 * One-time clean-up of the gallery originals in Vercel Blob.
 *
 * What it does, per object under gallery/:
 *   - converts .heic/.HEIC to JPEG (13 iPhone photos currently never render),
 *   - applies EXIF rotation and downscales to max 2048 px on the long edge,
 *   - re-encodes as JPEG quality 80 (1.2–6.5 MB originals become ~150–350 KB),
 *   - uploads to the same folder with a .jpg extension and deletes the old
 *     object when the name changed.
 * Then re-run the Redis index:  POST /api/blob-index/sync-all  (x-admin-secret)
 * and redeploy so the prerendered pages pick up the new URLs.
 *
 * Setup (once):  npm i -D sharp heic-convert
 * Dry run:        node scripts/downscale-gallery.mjs --dry-run
 * Real run:       node scripts/downscale-gallery.mjs
 *
 * Needs BLOB_READ_WRITE_TOKEN in .env.local (already present).
 * Keep a copy of the full-resolution photos outside the site (phone / cloud);
 * the public store does not need 16 MP files.
 */
import { readFileSync } from "node:fs";
import { list, put, del } from "@vercel/blob";
import sharp from "sharp";

const DRY = process.argv.includes("--dry-run");
const MAX_EDGE = 2048;
const QUALITY = 80;

// Load .env.local without a dotenv dependency.
try {
  for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  /* .env.local optional if the token is already exported */
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN is not set");
  process.exit(1);
}

async function heicToJpeg(buf) {
  const { default: heicConvert } = await import("heic-convert");
  const out = await heicConvert({ buffer: buf, format: "JPEG", quality: 0.95 });
  return Buffer.from(out);
}

async function main() {
  let cursor;
  const blobs = [];
  do {
    const page = await list({ prefix: "gallery/", cursor, limit: 1000 });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const files = blobs.filter((b) => b.size > 0 && /\.(heic|jpe?g|png|webp)$/i.test(b.pathname));
  console.log(`${files.length} gallery files, ${(files.reduce((s, b) => s + b.size, 0) / 1048576).toFixed(1)} MB`);

  let before = 0;
  let after = 0;
  for (const b of files) {
    const res = await fetch(b.url);
    let buf = Buffer.from(await res.arrayBuffer());
    const isHeic = /\.heic$/i.test(b.pathname);
    if (isHeic) buf = await heicToJpeg(buf);

    const out = await sharp(buf)
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();

    const newPath = b.pathname.replace(/\.(heic|jpe?g|png|webp)$/i, ".jpg");
    before += b.size;
    after += out.length;
    console.log(
      `${DRY ? "[dry] " : ""}${b.pathname} ${(b.size / 1024).toFixed(0)} KB -> ${newPath} ${(out.length / 1024).toFixed(0)} KB`,
    );
    if (DRY) continue;

    await put(newPath, out, {
      access: "public",
      contentType: "image/jpeg",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });
    if (newPath !== b.pathname) await del(b.url);
  }

  console.log(
    `Total ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB${DRY ? " (dry run, nothing written)" : ""}`,
  );
  if (!DRY) {
    console.log("Next: POST /api/blob-index/sync-all with x-admin-secret, then redeploy.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
