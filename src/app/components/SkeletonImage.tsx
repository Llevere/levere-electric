"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "onLoad" | "onError"> & {
  /** Extra classes for the placeholder (e.g. a border radius). */
  skeletonClassName?: string;
};

/**
 * next/image with a shimmering placeholder underneath it.
 *
 * The placeholder sits *below* the image in the stacking order and is hidden
 * once the browser reports the image as loaded. The image itself is never
 * hidden, so the LCP image paints the moment its bytes arrive even if
 * hydration has not happened yet (a fade-in on the <img> would delay LCP on
 * slow mobile connections, which is exactly the case this exists for).
 *
 * Must be rendered inside a `position: relative` box, like any `fill` image.
 */
export default function SkeletonImage({
  skeletonClassName = "",
  alt,
  ...imageProps
}: Props) {
  const [settled, setSettled] = useState(false);
  const settle = () => setSettled(true);

  return (
    <>
      <div
        aria-hidden="true"
        className={`img-skeleton ${settled ? "is-settled" : ""} ${skeletonClassName}`}
      />
      <Image {...imageProps} alt={alt} onLoad={settle} onError={settle} />
    </>
  );
}
