import HeroGalleryClient from "./HeroGalleryClient";

const EXCLUDE = new Set(["FullLogo.png", "FullLogo-Dark.jpg"]);

export default async function HeroGallery({ images }: { images: Map<string, string> }) {
    const heroImages = [...images.entries()]
        .filter(([name]) => !EXCLUDE.has(name))
        .map(([, url]) => url);

    return <HeroGalleryClient heroImages={heroImages} />;
}
