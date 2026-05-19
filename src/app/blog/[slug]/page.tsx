import type { Metadata } from "next";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/blog/BlogPostView";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { sanitizeBlogHtml } from "@/lib/sanitize";

type Params = Promise<{ slug: string }>;

async function getPublishedPost(slug: string) {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)));

  return post ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white">
      <BlogPostView
        title={post.title}
        excerpt={post.excerpt ?? ""}
        content={sanitizeBlogHtml(post.content)}
        createdAt={post.createdAt}
      />
    </div>
  );
}
