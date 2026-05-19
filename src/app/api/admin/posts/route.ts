import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { sessionCheck } from "@/lib/blacklist";
import { parseBlogPostInput } from "@/lib/blogValidation";

export async function GET(req: NextRequest) {
  const denied = await sessionCheck(req);
  if (denied) return denied;

  const posts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      published: blogPosts.published,
      createdAt: blogPosts.createdAt,
      updatedAt: blogPosts.updatedAt,
    })
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt));

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const denied = await sessionCheck(req);
  if (denied) return denied;

  try {
    const { title, slug, content, excerpt, published } = parseBlogPostInput(await req.json());

    const [existingPost] = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (existingPost) {
      return NextResponse.json(
        { error: "Page address already exists. Please choose a different one." },
        { status: 400 }
      );
    }

    const [post] = await db
      .insert(blogPosts)
      .values({ title, slug, content, excerpt, published })
      .returning();

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid post payload." },
      { status: 400 }
    );
  }
}
