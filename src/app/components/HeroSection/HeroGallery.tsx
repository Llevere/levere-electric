"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HERO_IMAGES = ["/homepage1.jpg", "/homepage2.jpg", "/homepage3.jpg"] as const;

export default function HeroGallery() {
    const total = HERO_IMAGES.length;

    const [index, setIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const intervalMs = 4500;

    const prev = () => setIndex((i) => (i - 1 + total) % total);
    const next = () => setIndex((i) => (i + 1) % total);

    useEffect(() => {
        if (isHovering) return;

        const id = window.setInterval(() => {
            setIndex((i) => (i + 1) % total);
        }, intervalMs);

        return () => window.clearInterval(id);
    }, [isHovering, total]);

    const startX = useRef<number | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0]?.clientX ?? null;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        const endX = e.changedTouches[0]?.clientX ?? null;
        if (startX.current == null || endX == null) return;

        const delta = endX - startX.current;
        const threshold = 40;

        if (delta > threshold) prev();
        if (delta < -threshold) next();

        startX.current = null;
    };

    return (
        <div
            className={[
                "group relative overflow-hidden rounded-xl",
                "border border-brand-gold/25",
                "shadow-[0_0_0_1px_rgba(226,192,81,0.15),0_10px_40px_rgba(0,0,0,0.35)]",
                "hover:shadow-[0_0_0_1px_rgba(226,192,81,0.35),0_12px_60px_rgba(226,192,81,0.08)]",
                "bg-brand-navy-2/40 transition-shadow duration-300",
            ].join(" ")}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div className="relative aspect-4/3 w-full">
                {HERO_IMAGES.map((src, i) => (
                    <div
                        key={src}
                        className={[
                            "absolute inset-0",
                            "transition-opacity duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
                            i === index ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                    >
                        <Image
                            src={src}
                            alt={`Homepage photo ${i + 1}`}
                            fill
                            priority={i === 0}
                            sizes="(min-width: 1024px) 520px, 100vw"
                            className={[
                                "object-cover",
                                "transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
                                i === index ? "scale-[1.02]" : "scale-100",
                            ].join(" ")}
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/25 via-black/0 to-black/10" />
                    </div>
                ))}
            </div>

            <button
                type="button"
                aria-label="Previous image"
                onClick={prev}
                className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-brand-navy/65 px-3 py-2 text-brand-cream
                    border border-brand-cream/15
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    hover:bg-brand-navy/85">

            </button>

            <button
                type="button"
                aria-label="Next image"
                onClick={next}
                className={[
                    "cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 rounded-full",
                    "bg-brand-navy/65 px-3 py-2 text-brand-cream",
                    "border border-brand-cream/15",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                    "hover:bg-brand-navy/85",
                ].join(" ")}
            >
                ›
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {HERO_IMAGES.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Go to image ${i + 1}`}
                        onClick={() => setIndex(i)}
                        className={[
                            "h-2 w-2 rounded-full transition",
                            i === index ? "bg-brand-gold" : "bg-brand-cream/35 hover:bg-brand-cream/70",
                        ].join(" ")}
                    />
                ))}
            </div>
        </div>
    );
}
