import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { sessionCheck } from "@/lib/blacklist";
import { parseBlogPostInput } from "@/lib/blogValidation";
import { sanitizeBlogHtml } from "@/lib/sanitize";

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const denied = await sessionCheck(req);
  if (denied) return denied;

  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, parseInt(id)));

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    ...post,
    content: sanitizeBlogHtml(post.content),
  });
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const denied = await sessionCheck(req);
  if (denied) return denied;

  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const { title, slug, content, excerpt, published } = parseBlogPostInput(await req.json());

    const [post] = await db
      .update(blogPosts)
      .set({ title, slug, content, excerpt, published, updatedAt: new Date() })
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();

    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid post payload." },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const denied = await sessionCheck(req);
  if (denied) return denied;

  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(id)));
  return new NextResponse(null, { status: 204 });
}
