import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-4xl items-center px-6 py-16">
      <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-gold">
          Blog
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-cream md:text-5xl">
          That blog post could not be found
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-brand-cream/75 md:text-lg">
          The page address may be outdated, the post may have been removed, or
          the link may have been entered incorrectly.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-lg bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-gold-3"
          >
            View all blog posts
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-brand-cream transition-colors hover:bg-white/5"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
