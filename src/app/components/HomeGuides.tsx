import Link from "next/link";
import ArticleCard from "@/components/blog/ArticleCard";
import { withImages } from "@/lib/blogImages";
import { getPostsSorted } from "@/blog/posts";

/** The three newest homeowner guides, for the home page. */
export default async function HomeGuides() {
  const posts = await withImages(getPostsSorted().slice(0, 3));
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="guides-heading"
      className="relative bg-brand-navy"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 id="guides-heading" className="text-4xl font-semibold text-brand-gold">
            Homeowner Guides
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-14 rounded-full bg-brand-gold/70" />
          <p className="mt-3 text-sm text-brand-cream/80">
            A little clarity before you commit. Plain-language answers from a
            licensed electrician.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} heading="h3" />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-sm link-gold">
            All articles and guides →
          </Link>
        </div>
      </div>
    </section>
  );
}
