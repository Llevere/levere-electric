import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SkeletonImage from "@/components/SkeletonImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import CtaPanel from "@/components/CtaPanel";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleCard from "@/components/blog/ArticleCard";
import {
  CATEGORY_SERVICE,
  articleBlocks,
  formatDate,
  plainText,
  readingMinutes,
  type HeadingBlock,
} from "@/lib/blog";
import { loadPostImageMaps, resolvePostImage, withImages } from "@/lib/blogImages";
import { BUSINESS, BUSINESS_ID, SITE_URL, pageMetadata } from "@/lib/site";
import { getPost, getPostsSorted } from "../posts";

type Props = { params: Promise<{ slug: string }> };

// Prerendered at build time; unknown slugs 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return getPostsSorted().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const imageUrl = resolvePostImage(post.image, await loadPostImageMaps());
  return pageMetadata(post.title, post.description, `/blog/${post.slug}`, {
    type: "article",
    absoluteTitle: true,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    ...(imageUrl ? { image: { url: imageUrl, alt: post.imageAlt } } : {}),
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const all = await withImages(getPostsSorted());
  const current = all.find((p) => p.slug === post.slug)!;
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  const headings = articleBlocks(post.body).filter(
    (b): b is HeadingBlock => b.type === "heading" && b.level === 2,
  );
  const service = CATEGORY_SERVICE[post.category];
  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          inLanguage: "en-CA",
          author: {
            "@type": "Person",
            name: BUSINESS.owner,
            jobTitle: "Licensed Electrical Contractor",
            worksFor: { "@id": BUSINESS_ID },
          },
          publisher: { "@id": BUSINESS_ID },
          mainEntityOfPage: url,
          articleSection: post.category,
          wordCount: plainText(post.body).split(" ").length,
          ...(current.imageUrl
            ? { image: new URL(current.imageUrl, SITE_URL).href }
            : {}),
        }}
      />

      <article className="mx-auto w-full max-w-6xl px-6 pt-8">
        <Breadcrumbs
          items={[
            { label: "Guides", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
        />
        <header className="mt-6 max-w-3xl">
          <p className="eyebrow">
            {post.category}
            <span className="px-2 text-brand-cream/35" aria-hidden="true">
              /
            </span>
            <span className="normal-case tracking-normal text-brand-cream/60">
              {readingMinutes(post.body)} min read
            </span>
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-cream/85">
            {post.description}
          </p>
          <p className="mt-4 text-sm text-brand-cream/60">
            By {BUSINESS.owner}, {BUSINESS.name} ·{" "}
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            {post.updatedAt.slice(0, 10) !== post.publishedAt.slice(0, 10) && (
              <>
                {" "}
                · Updated{" "}
                <time dateTime={post.updatedAt}>
                  {formatDate(post.updatedAt)}
                </time>
              </>
            )}
          </p>
        </header>

        {current.imageUrl && (
          <div className="relative mt-8 aspect-16/9 w-full overflow-hidden rounded-2xl border border-brand-cream/10 bg-brand-navy-2 md:aspect-2/1">
            <SkeletonImage
              src={current.imageUrl}
              alt={post.imageAlt}
              fill
              priority
              quality={75}
              sizes="(min-width: 1200px) 1152px, calc(100vw - 48px)"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-10 grid gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <aside
              aria-labelledby="takeaways-heading"
              className="rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-5"
            >
              <h2
                id="takeaways-heading"
                className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-gold"
              >
                Key takeaways
              </h2>
              <ul className="mt-3 space-y-2 text-brand-cream/90">
                {post.keyTakeaways.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="text-brand-gold">
                      ✓
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </aside>
            <ArticleBody body={post.body} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            {headings.length > 0 && (
              <nav
                aria-label="In this guide"
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
                  In this guide
                </p>
                <ol className="mt-3 space-y-2 text-sm">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="text-brand-cream/80 transition hover:text-brand-gold"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold text-white">A project in mind?</p>
              <p className="mt-1 text-sm text-brand-cream/70">
                Get advice for your home in London and the surrounding area.
              </p>
              <Link href={service.page} className="mt-3 block text-sm link-gold">
                See the service page →
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <CtaPanel href={service.quote} label={service.quoteLabel} />

      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="mx-auto w-full max-w-6xl px-6 pb-14"
        >
          <div className="flex items-end justify-between gap-4">
            <h2
              id="related-heading"
              className="text-2xl font-semibold text-brand-gold"
            >
              Keep reading
            </h2>
            <Link href="/blog" className="text-sm link-gold">
              All guides →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ArticleCard key={p.slug} post={p} heading="h3" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
