"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = { heroImages: string[] };

export default function HeroGalleryClient({ heroImages }: Props) {
  const total = heroImages.length;

  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const intervalMs = 4500;
  const resumeDelayMs = 5000;

  const pauseAndResume = useCallback(() => {
    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), resumeDelayMs);
  }, []);

  useEffect(() => {
    return () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, []);

  const prev = () => {
    setIndex((i) => (i - 1 + total) % total);
    pauseAndResume();
  };
  const next = () => {
    setIndex((i) => (i + 1) % total);
    pauseAndResume();
  };

  useEffect(() => {
    if (isHovering || paused || total <= 1) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [isHovering, paused, total]);

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

  if (total === 0) return null;

  return (
    <div
      className={[
        "group relative h-full w-full overflow-hidden rounded-xl",
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
        {heroImages.map((src, i) => (
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
              quality={75}
              priority={i === 0}
              sizes="(min-width: 1280px) 50vw, (min-width: 768px) 50vw, 100vw"
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

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className={[
              "cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 rounded-full",
              "bg-brand-navy/65 px-3 py-2 text-brand-cream border border-brand-cream/15",
              "opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200",
              "hover:bg-brand-navy/85",
            ].join(" ")}
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className={[
              "cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 rounded-full",
              "bg-brand-navy/65 px-3 py-2 text-brand-cream border border-brand-cream/15",
              "opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200",
              "hover:bg-brand-navy/85",
            ].join(" ")}
          >
            ›
          </button>

          {total <= 6 ? (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={() => {
                    setIndex(i);
                    pauseAndResume();
                  }}
                  className={[
                    "h-2 w-2 rounded-full transition",
                    i === index
                      ? "bg-brand-gold"
                      : "bg-brand-cream/35 hover:bg-brand-cream/70",
                  ].join(" ")}
                />
              ))}
            </div>
          ) : (
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-navy/65 border border-brand-cream/15 px-3 py-1 text-xs text-brand-cream tabular-nums">
              {index + 1} / {total}
            </span>
          )}
        </>
      )}
    </div>
  );
}
