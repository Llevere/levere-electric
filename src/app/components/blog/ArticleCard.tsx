import Link from "next/link";
import SkeletonImage from "@/components/SkeletonImage";
import { readingMinutes, formatDate } from "@/lib/blog";
import type { ResolvedPost } from "@/lib/blogImages";

export default function ArticleCard({
  post,
  heading = "h2",
  priority = false,
}: {
  post: ResolvedPost;
  heading?: "h2" | "h3";
  priority?: boolean;
}) {
  const Heading = heading;
  const href = `/blog/${post.slug}`;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20">
      {post.imageUrl && (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-16/10 w-full overflow-hidden bg-brand-navy-2"
        >
          <SkeletonImage
            src={post.imageUrl}
            alt=""
            fill
            quality={75}
            priority={priority}
            fetchPriority={priority ? "high" : undefined}
            sizes="(min-width: 1024px) 368px, (min-width: 768px) 50vw, calc(100vw - 48px)"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
          {post.category}
          <span className="px-1.5 text-brand-cream/35" aria-hidden="true">
            /
          </span>
          <span className="normal-case tracking-normal text-brand-cream/60">
            {readingMinutes(post.body)} min read
          </span>
        </p>
        <Heading className="mt-2 text-lg font-semibold leading-snug text-white">
          <Link href={href} className="transition hover:text-brand-gold">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 text-sm leading-relaxed text-brand-cream/75">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-brand-cream/55">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <Link
            href={href}
            className="text-sm font-medium text-brand-gold hover:text-brand-gold-3"
          >
            Read the guide<span className="sr-only">: {post.title}</span> →
          </Link>
        </div>
      </div>
    </article>
  );
}
