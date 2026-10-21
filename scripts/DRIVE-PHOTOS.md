# Getting the Google Drive photos onto the site

The gallery reads from Vercel Blob (folder `gallery/<category>/`) through a
Redis index. Photos in Google Drive get there in two steps:

1. **Download from Drive into category folders** (Claude Desktop with the
   Google Drive connector, or by hand). Target layout:

   ```
   C:\Users\mattl\Desktop\levere-drive\
     ev-charging\
     panel\
     lighting\
     electrical-upgrade\
     pool\
   ```

   Folder names are normalised, so "EV Charging" or "Panel Upgrades" also work.
   Any other category needs a new entry in `src/app/photo-gallery/galleryData.ts`
   and in `KNOWN_FOLDERS` at the top of the upload script.

2. **Convert, upload and index** with the script in this folder:

   ```
   node scripts/upload-gallery.mjs --src="C:\Users\mattl\Desktop\levere-drive" --dry-run
   node scripts/upload-gallery.mjs --src="C:\Users\mattl\Desktop\levere-drive"
   ```

   It decodes HEIC, strips EXIF/GPS, caps the long edge at 2048 px, re-encodes
   as WebP, skips files already in Blob, then rebuilds the Redis index. Redeploy
   afterwards so the prerendered gallery pages pick up the new photos.

The three EV photos bundled under `public/projects/` are listed in
`src/app/photo-gallery/localGalleryImages.ts`. Once the same photos are in
Blob under `gallery/ev-charging/`, delete those entries (the EV page and the
EV cost guide can keep using the local files).

## Prompt for Claude Desktop

> I have a Google Drive folder of job-site photos for Levere Electric, organised
> into sub-folders by category (EV charging, panels, lighting, electrical
> upgrades, pool/hot tub). Please:
>
> 1. Use the Google Drive connector to list the folder called **Levere Electric
>    photos** (ask me if you can't find it) and every sub-folder inside it, with
>    file names, types and sizes. Show me the tree before downloading anything.
> 2. Download every image (HEIC, JPG, PNG, WebP) into
>    `C:\Users\mattl\Desktop\levere-drive\<category>\`, using the Drive
>    sub-folder name as `<category>`. Keep the original file names. Do not
>    convert, resize or rename anything, and do not modify or delete anything in
>    Drive.
> 3. If a photo is not inside a category sub-folder, put it in
>    `C:\Users\mattl\Desktop\levere-drive\_unsorted\` and tell me.
> 4. When finished, give me a table of category → number of files → total MB,
>    and list any files that failed to download.
>
> Once the download is done, I'll run `node scripts/upload-gallery.mjs` from the
> levere-electric repo, which converts the photos and uploads them to Vercel Blob.
