import Image from "next/image";
import { listFolderCached } from "@/lib/blob";

function shouldContain(fileName: string) {
    // adjust rules as you like:
    const n = fileName.toLowerCase();
    return n.includes("logo") || n.includes("full") || n.includes("dark");
}

export default async function PhotoGalleryPage() {
    const images = await listFolderCached("home/");

    return (
        <section className="grid grid-cols-2 gap-4">
            {images.map((img) => {
                const contain = shouldContain(img.fileName);

                return (
                    <div
                        key={img.pathname}
                        className="relative aspect-4/3 overflow-hidden rounded-xl bg-[#062845]"
                    >
                        <Image
                            src={img.url}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={contain ? "object-contain" : "object-cover"}
                        />
                    </div>
                );
            })}
        </section>
    );
}
