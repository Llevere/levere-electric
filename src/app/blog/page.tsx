import Link from "next/link";
import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { isLoggedInAdmin } from "@/lib/adminSession";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Helpful electrical articles from Levere Electric on upgrades, repairs, safety, and home power projects.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const adminView = await isLoggedInAdmin();

  const query = db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      published: blogPosts.published,
      createdAt: blogPosts.createdAt,
    })
    .from(blogPosts)
    .$dynamic();

  const posts = await (
    adminView ? query : query.where(eq(blogPosts.published, true))
  ).orderBy(desc(blogPosts.createdAt));

  return (
    <div>
      <section className="mx-auto w-full max-w-6xl px-6 py-14 md:py-18">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-gold">
            Blog
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-cream md:text-5xl">
            Electrical advice for homeowners in and around London, Ontario
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-cream/75 md:text-lg">
            Straightforward articles on panel upgrades, EV chargers, repairs,
            and practical ways to keep your home safe and ready for what&apos;s
            next.
          </p>
        </div>

        {adminView ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-brand-gold">
                Admin view enabled
              </p>
              <p className="text-sm text-brand-cream/75">
                Draft posts are visible here while you&apos;re logged in.
              </p>
            </div>
            <Link
              href="/admin/posts"
              className="inline-flex items-center rounded-lg bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-gold-3"
            >
              Manage posts
            </Link>
          </div>
        ) : null}

        {posts.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 px-8 py-14 text-center">
            <h2 className="text-2xl font-semibold text-brand-cream">
              No posts yet
            </h2>
            <p className="mt-3 text-brand-cream/70">
              New articles will appear here once they&apos;re published.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt ?? ""}
                slug={post.slug}
                createdAt={post.createdAt}
                published={post.published}
                adminView={adminView}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
