import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import CtaPanel from "@/components/CtaPanel";
import ArticleCard from "@/components/blog/ArticleCard";
import { withImages } from "@/lib/blogImages";
import { BLOG_CATEGORIES, CATEGORY_SERVICE } from "@/lib/blog";
import { BUSINESS, BUSINESS_ID, SITE_URL, pageMetadata } from "@/lib/site";
import { getPostsSorted } from "./posts";

export const metadata: Metadata = pageMetadata(
  "Electrical Guides for London, ON Homeowners",
  "Plain-language answers about EV charger costs, panel upgrades, Lutron smart lighting and home Wi-Fi from a licensed electrician in London, Ontario.",
  "/blog",
);


export default async function BlogIndex() {
  const posts = await withImages(getPostsSorted());

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          name: "Levere Electric Homeowner Guides",
          url: `${SITE_URL}/blog`,
          inLanguage: "en-CA",
          publisher: { "@id": BUSINESS_ID },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.publishedAt,
            dateModified: p.updatedAt,
          })),
        }}
      />
      <section className="mx-auto w-full max-w-6xl px-6 pt-8 pb-14">
        <Breadcrumbs items={[{ label: "Guides", href: "/blog" }]} />
        <div className="mt-6 max-w-3xl">
          <p className="eyebrow">Homeowner guides</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Good questions.{" "}
            <span className="text-brand-gold">Clear answers.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-cream/85">
            Understand your options before your next home project. Practical
            advice on EV charging, panel upgrades, Lutron smart lighting and a
            better-connected home, written by {BUSINESS.owner}, a licensed
            electrician in London, Ontario.
          </p>
        </div>

        <nav aria-label="Topics" className="mt-8 flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={CATEGORY_SERVICE[c].page}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-brand-cream/80 transition hover:border-brand-gold/50 hover:text-brand-gold"
            >
              {c}
              <span className="sr-only"> service page</span>
            </Link>
          ))}
        </nav>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <ArticleCard key={post.slug} post={post} priority={i === 0} />
          ))}
        </div>
      </section>
      <CtaPanel
        title="Have a question about your home?"
        text="Send a few photos and a short description. We will tell you what your home needs and what it does not."
        href="/book"
      />
    </>
  );
}
