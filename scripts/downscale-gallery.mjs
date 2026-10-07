/**
 * One-time clean-up of the photo originals in Vercel Blob.
 *
 * The pages never serve the originals directly (next/image transforms them to
 * AVIF/WebP), but every first transform of a 3–6 MB, 16 MP source makes the
 * optimizer download and decode the whole file. A gallery page with 20+ cold
 * images queues 60+ MB of source fetches before anything renders, which is
 * why pages feel slow on first visit in a region and fine afterwards.
 *
 * Per object under home/, services/ and gallery/:
 *   - skips files that are already web-sized (long edge <= MAX_EDGE and
 *     <= SKIP_UNDER_BYTES), so logos and small photos are left untouched,
 *   - backs up the original to originals/<same path> (same store, cheap),
 *   - converts .heic/.HEIC to JPEG (13 iPhone photos currently never render),
 *   - applies EXIF rotation, downscales to MAX_EDGE px on the long edge,
 *   - re-encodes as JPEG quality QUALITY (1.2–6.5 MB originals -> ~150–400 KB),
 *   - uploads to the same path (or .jpg for HEIC) and deletes the old object
 *     when the name changed.
 * Then re-run the Redis index:  POST /api/blob-index/sync-all  (x-admin-secret)
 * and redeploy so the prerendered pages pick up the new URLs.
 *
 * Setup (once):   npm i -D sharp heic-convert   (already in devDependencies)
 * Dry run:        node scripts/downscale-gallery.mjs --dry-run
 * Real run:       node scripts/downscale-gallery.mjs
 * Options:        --prefix=gallery/pool/   only touch one folder
 *                 --no-backup              skip the originals/ copy
 *
 * Needs BLOB_READ_WRITE_TOKEN in .env.local.
 */
import { readFileSync } from "node:fs";
import { list, put, del, copy } from "@vercel/blob";
import sharp from "sharp";

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const BACKUP = !args.includes("--no-backup");
const ONLY = args.find((a) => a.startsWith("--prefix="))?.slice("--prefix=".length);

const PREFIXES = ONLY ? [ONLY] : ["home/", "services/", "gallery/"];
const BACKUP_PREFIX = "originals/";
const MAX_EDGE = 2048;
const QUALITY = 80;
const SKIP_UNDER_BYTES = 600 * 1024;
const IMAGE_RE = /\.(heic|jpe?g|png|webp)$/i;

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

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const mb = (n) => `${(n / 1048576).toFixed(1)} MB`;

async function listAll(prefix) {
  let cursor;
  const blobs = [];
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
}

async function heicToJpeg(buf) {
  const { default: heicConvert } = await import("heic-convert");
  const out = await heicConvert({ buffer: buf, format: "JPEG", quality: 0.95 });
  return Buffer.from(out);
}

async function main() {
  const blobs = [];
  for (const p of PREFIXES) blobs.push(...(await listAll(p)));

  const files = blobs
    .filter((b) => b.size > 0 && IMAGE_RE.test(b.pathname) && !b.pathname.startsWith(BACKUP_PREFIX))
    .sort((a, b) => a.pathname.localeCompare(b.pathname));
  console.log(`${files.length} image files, ${mb(files.reduce((s, b) => s + b.size, 0))}`);
  if (DRY) console.log("(dry run: nothing is written)\n");

  let before = 0;
  let after = 0;
  let skipped = 0;
  for (const b of files) {
    const res = await fetch(b.url);
    if (!res.ok) throw new Error(`${b.pathname}: download failed ${res.status}`);
    let buf = Buffer.from(await res.arrayBuffer());
    const isHeic = /\.heic$/i.test(b.pathname);
    if (isHeic) buf = await heicToJpeg(buf);

    const meta = await sharp(buf).metadata();
    const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);
    const dims = `${meta.width}x${meta.height}`;

    if (!isHeic && longEdge <= MAX_EDGE && b.size <= SKIP_UNDER_BYTES) {
      skipped++;
      console.log(`  keep  ${b.pathname}  ${dims}  ${kb(b.size)}`);
      continue;
    }

    const out = await sharp(buf)
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();
    const outMeta = await sharp(out).metadata();

    // Keep .jpg/.jpeg names as they are: services/servicesData.ts looks images
    // up by file name. Only HEIC/WebP/PNG sources get a new .jpg name.
    const newPath = /\.jpe?g$/i.test(b.pathname)
      ? b.pathname
      : b.pathname.replace(IMAGE_RE, ".jpg");
    before += b.size;
    after += out.length;
    console.log(
      `  write ${b.pathname}  ${dims}  ${kb(b.size)}  ->  ${newPath}  ${outMeta.width}x${outMeta.height}  ${kb(out.length)}`,
    );
    if (DRY) continue;

    if (BACKUP) {
      await copy(b.url, BACKUP_PREFIX + b.pathname, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    }
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
    `\nRewritten: ${mb(before)} -> ${mb(after)} (${skipped} file${skipped === 1 ? "" : "s"} already web-sized, kept as is)${DRY ? "  [dry run]" : ""}`,
  );
  if (!DRY) {
    console.log(
      `Originals ${BACKUP ? `backed up under ${BACKUP_PREFIX}` : "NOT backed up"}.\n` +
        "Next: POST /api/blob-index/sync-all with x-admin-secret, then redeploy.",
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
