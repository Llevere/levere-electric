/**
 * Upload local photo folders (one sub-folder per gallery category) to Vercel
 * Blob as web-sized WebP, then refresh the Redis image index.
 * See scripts/DRIVE-PHOTOS.md for the folder layout and usage.
 *
 *   node scripts/upload-gallery.mjs --src="C:\Users\mattl\Desktop\levere-drive" [--dry-run]
 *   Options: --only=<folder>  --allow-new  --no-sync
 *
 * Needs BLOB_READ_WRITE_TOKEN and REDIS_URL in .env.local.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";
import sharp from "sharp";
import heicConvert from "heic-convert";
import { createClient } from "redis";

const args = process.argv.slice(2);
const opt = (name) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const flag = (name) => args.includes(`--${name}`);

const SRC = opt("src");
const DRY = flag("dry-run");
const ONLY = opt("only");
const ALLOW_NEW = flag("allow-new");
const SYNC = !flag("no-sync");

const MAX_EDGE = 2048;
const QUALITY = 80;
const IMAGE_RE = /\.(heic|heif|jpe?g|png|webp)$/i;
// Keep in step with GalleryFolders in src/app/photo-gallery/galleryData.ts
// (a TS enum, which Node cannot import directly).
const KNOWN_FOLDERS = ["ev-charging", "panel", "lighting", "electrical-upgrade", "pool"];
const ALIASES = {
  ev: "ev-charging", "ev-chargers": "ev-charging", "ev-charger": "ev-charging", "ev-charging": "ev-charging",
  "panel-upgrades": "panel", panels: "panel", "panel-upgrade": "panel",
  "electrical-upgrades": "electrical-upgrade", "pool-hot-tub": "pool", "pool-and-hot-tub": "pool", "hot-tub": "pool",
};

if (!SRC) {
  console.error('Pass --src="<folder with one sub-folder per category>"');
  process.exit(1);
}

// Load .env.local without a dotenv dependency.
try {
  for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  /* .env.local optional if the variables are already exported */
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN is not set");
  process.exit(1);
}

const slugify = (s) => s.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function existingNames(prefix) {
  const names = new Set();
  let cursor;
  do {
    const page = await list({ prefix, cursor });
    for (const b of page.blobs) names.add(decodeURIComponent(b.pathname.split("/").pop()));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return names;
}

async function toWebp(file) {
  let input = readFileSync(file);
  if (/\.(heic|heif)$/i.test(file)) {
    input = Buffer.from(await heicConvert({ buffer: input, format: "JPEG", quality: 1 }));
  }
  return sharp(input)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer();
}

const touched = new Set();
let uploaded = 0;
let skipped = 0;

for (const entry of readdirSync(SRC)) {
  const dir = path.join(SRC, entry);
  if (!statSync(dir).isDirectory()) continue;
  const raw = slugify(entry);
  const folder = ALIASES[raw] ?? raw;
  if (ONLY && folder !== ONLY) continue;
  if (!KNOWN_FOLDERS.includes(folder) && !ALLOW_NEW) {
    console.log(`SKIP "${entry}": not a gallery folder (pass --allow-new to upload anyway)`);
    continue;
  }
  const prefix = `gallery/${folder}/`;
  const have = DRY ? new Set() : await existingNames(prefix);
  const files = readdirSync(dir).filter((f) => IMAGE_RE.test(f)).sort();
  console.log(`\n${entry} -> ${prefix}  (${files.length} photo${files.length === 1 ? "" : "s"})`);

  for (const f of files) {
    const base = f.replace(/\.[^.]+$/, "");
    const name = `${base}.webp`;
    if (have.has(name) || have.has(f)) {
      console.log(`  = ${name} already in Blob, skipped`);
      skipped++;
      continue;
    }
    const src = path.join(dir, f);
    const before = statSync(src).size;
    const out = await toWebp(src);
    const meta = await sharp(out).metadata();
    console.log(`  ${DRY ? "would upload" : "upload"} ${name}  ${kb(before)} -> ${kb(out.length)}  ${meta.width}x${meta.height}`);
    if (!DRY) {
      await put(prefix + name, out, {
        access: "public",
        addRandomSuffix: false,
        contentType: "image/webp",
        cacheControlMaxAge: 60 * 60 * 24 * 365,
      });
      uploaded++;
      touched.add(folder);
    }
  }
}

console.log(`\n${DRY ? "Dry run: " : ""}${uploaded} uploaded, ${skipped} skipped.`);

if (SYNC && !DRY && touched.size) {
  if (!process.env.REDIS_URL) {
    console.log("REDIS_URL is not set; refresh the index with POST /api/blob-index/sync-all (x-admin-secret header) instead.");
    process.exit(0);
  }
  // Same key format and payload as src/app/lib/blob.ts syncPrefixToRedis().
  const redis = createClient({ url: process.env.REDIS_URL });
  await redis.connect();
  for (const prefix of ["gallery/", ...[...touched].map((f) => `gallery/${f}/`)]) {
    const blobs = [];
    let cursor;
    do {
      const page = await list({ prefix, cursor });
      blobs.push(...page.blobs);
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    const images = blobs
      .filter((b) => !b.pathname.endsWith("/") && b.size > 0 && /\.(png|jpe?g|webp|avif)$/i.test(b.pathname))
      .map((b) => ({
        url: b.url,
        pathname: b.pathname,
        fileName: decodeURIComponent(b.pathname.split("/").pop()),
        size: b.size,
        uploadedAt: b.uploadedAt ? new Date(b.uploadedAt).toISOString() : undefined,
      }))
      .sort((a, b) => a.pathname.localeCompare(b.pathname));
    await redis.set(`blobindex:${prefix.replace(/\//g, "__")}`, JSON.stringify(images));
    console.log(`index ${prefix} -> ${images.length} images`);
  }
  await redis.quit();
  console.log("Redis index refreshed. Redeploy (or wait for the next build) so the prerendered gallery pages pick up the new photos.");
}
