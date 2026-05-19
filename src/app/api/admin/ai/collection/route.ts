import { NextRequest, NextResponse } from "next/server";
import { sessionCheck } from "@/lib/blacklist";
import { generateGeminiJson } from "@/lib/gemini";
import { sanitizeAiHtml } from "@/lib/sanitize";

type CollectionAiAction =
  | "summary"
  | "contentGaps"
  | "calendar"
  | "titleAudit"
  | "quickWins"
  | "nextPost";

type CollectionPost = {
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  createdAt: string;
};

type CollectionAiResponse = {
  title: string;
  contentHtml: string;
};

type TopicSummary = {
  keyword: string;
  count: number;
};

const SYSTEM_INSTRUCTION = `
You are planning blog content for Levere Electric in London, Ontario.
Be concise, strategic, practical, and specific.
Do not invent analytics or unsupported market claims.
Use only the provided post inventory and obvious homeowner search intent.
For HTML, only use h3, p, ul, ol, li, strong.
Prefer advice an owner or office manager could act on immediately.
`;

function compactPosts(posts: CollectionPost[]) {
  return JSON.stringify(
    posts.map((post) => ({
      t: post.title,
      s: post.slug,
      e: (post.excerpt ?? "").slice(0, 160),
      p: post.published ? 1 : 0,
      d: post.createdAt.slice(0, 10),
    }))
  );
}

const STOP_WORDS = new Set([
  "a",
  "about",
  "after",
  "all",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "before",
  "best",
  "by",
  "can",
  "do",
  "for",
  "from",
  "get",
  "guide",
  "has",
  "have",
  "how",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "know",
  "london",
  "more",
  "need",
  "new",
  "of",
  "on",
  "or",
  "our",
  "out",
  "service",
  "services",
  "should",
  "the",
  "their",
  "them",
  "this",
  "to",
  "up",
  "upgrade",
  "when",
  "what",
  "why",
  "with",
  "your",
]);

function normalizeWord(word: string) {
  const cleaned = word.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (cleaned.endsWith("s") && cleaned.length > 4) {
    return cleaned.slice(0, -1);
  }

  return cleaned;
}

function extractTopTopics(posts: CollectionPost[], limit = 10): TopicSummary[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    const text = `${post.title} ${post.excerpt ?? ""}`;
    const uniqueWords = new Set(
      text
        .split(/\s+/)
        .map(normalizeWord)
        .filter((word) => word.length >= 4 && !STOP_WORDS.has(word)),
    );

    for (const word of uniqueWords) {
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([keyword, count]) => ({ keyword, count }));
}

function buildArchiveSnapshot(posts: CollectionPost[]) {
  const publishedPosts = posts.filter((post) => post.published);
  const sortedPosts = [...publishedPosts].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  const totalPosts = publishedPosts.length;
  const recentPosts = sortedPosts.slice(0, totalPosts > 80 ? 24 : totalPosts > 40 ? 18 : 12);
  const olderPosts = sortedPosts.slice(recentPosts.length);
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const recent90Count = publishedPosts.filter(
    (post) => new Date(post.createdAt) >= ninetyDaysAgo,
  ).length;
  const topTopics = extractTopTopics(publishedPosts);

  return {
    totalPosts,
    recent90Count,
    oldestPostDate: sortedPosts[sortedPosts.length - 1]?.createdAt.slice(0, 10) ?? null,
    newestPostDate: sortedPosts[0]?.createdAt.slice(0, 10) ?? null,
    topTopics,
    recentPosts,
    olderPostsSample: olderPosts.slice(0, 12),
  };
}

function compactNextPostContext(posts: CollectionPost[]) {
  const snapshot = buildArchiveSnapshot(posts);

  return JSON.stringify({
    total: snapshot.totalPosts,
    recent90Count: snapshot.recent90Count,
    newest: snapshot.newestPostDate,
    oldest: snapshot.oldestPostDate,
    topTopics: snapshot.topTopics,
    recentPosts: snapshot.recentPosts.map((post) => ({
      t: post.title,
      s: post.slug,
      e: (post.excerpt ?? "").slice(0, 160),
      d: post.createdAt.slice(0, 10),
    })),
    archiveSample: snapshot.olderPostsSample.map((post) => ({
      t: post.title,
      s: post.slug,
      e: (post.excerpt ?? "").slice(0, 120),
      d: post.createdAt.slice(0, 10),
    })),
  });
}

function buildPrompt(action: CollectionAiAction, posts: CollectionPost[]) {
  const inventory = compactPosts(posts);
  const nextPostContext = compactNextPostContext(posts);
  const planningRules = `
Planning rules:
- Base every recommendation only on the provided inventory.
- Prefer practical editorial decisions over abstract marketing language.
- Make recommendations specific enough that a non-technical client can act on them.
- Avoid jargon, filler, and speculative SEO claims.
`;

  switch (action) {
    case "summary":
      return `
Return JSON: {"title":"Collection Summary","contentHtml":""}.
${planningRules}
Review the inventory and summarize covered themes, thin areas, homeowner value, and 3 recommendations.
Use compact HTML with h3, p, ul, li.
Posts:${inventory}
`;
    case "contentGaps":
      return `
Return JSON: {"title":"Content Gaps","contentHtml":""}.
${planningRules}
Identify 5 missing topic opportunities.
For each include:
- why it matters
- likely homeowner intent
- one target keyword
- one simple title suggestion
Use compact HTML with h3, p, ol, li, strong.
Posts:${inventory}
`;
    case "calendar":
      return `
Return JSON: {"title":"6-Post Calendar","contentHtml":""}.
${planningRules}
Propose 6 next posts.
For each include:
- title
- why now
- target keyword
- CTA
Make the sequence feel varied and realistic for a local electrician blog.
Use compact HTML with h3, p, ol, li, strong.
Posts:${inventory}
`;
    case "titleAudit":
      return `
Return JSON: {"title":"Title Review","contentHtml":""}.
${planningRules}
Review the existing post titles for clarity, homeowner relevance, and likely search intent.
Highlight the strongest titles, the weakest titles, and 5 specific title improvements.
When suggesting changes, explain why the new wording is better.
Use compact HTML with h3, p, ul, li, strong.
Posts:${inventory}
`;
    case "quickWins":
      return `
Return JSON: {"title":"Quick Wins","contentHtml":""}.
${planningRules}
Identify the easiest blog improvements with the highest likely payoff.
Use only the provided post inventory.
Write for a busy client who wants to scan the result in under a minute.
Start with one short p that explains the overall pattern you noticed.
Then include 3-5 actions as an ordered list.
For each action:
- begin with an h3 that names the change clearly
- add one short p with a direct recommendation
- add a ul with these labels in strong text: What to change, Why it matters, Effort, Best post to update first
- keep each point short and specific
Favor low-effort, high-clarity improvements first.
Avoid long paragraphs, repeated explanations, and generic SEO phrasing.
Use compact HTML with h3, p, ol, ul, li, strong.
Posts:${inventory}
`;
    case "nextPost":
      return `
Return JSON: {"title":"Suggested Next Post","contentHtml":""}.
${planningRules}
You are choosing one strong next post idea for the blog.
Use the recent posts to understand what has been published lately.
Use the archive topic counts to understand what themes are most commonly covered overall.
Do not invent analytics or pageviews. If no view data exists, say the recommendation is based on publishing frequency, recency, and topical overlap.
Pick a next post that:
- is close enough to the blog's strongest existing themes to feel relevant
- is different enough to avoid repeating what is already covered
- would make sense for a local electrician serving homeowners
- can be explained clearly to a non-technical client

Structure the HTML with:
- one short h3 summary of the recommendation
- a p explaining why this topic should be next
- a ul with these labels in strong text: Suggested title, Primary keyword, Why this fits now, How it differs from existing posts, Supporting posts to borrow from, Recommended angle
- a final p called Content planning note that explains the scaling logic in plain language, including that the recommendation uses archive trends plus the most recent posts rather than only the last 3 months

Context:${nextPostContext}
`;
  }
}

export async function POST(req: NextRequest) {
  const denied = await sessionCheck(req);
  if (denied) return denied;

  try {
    const body = (await req.json()) as {
      action: CollectionAiAction;
      posts: CollectionPost[];
    };

    if (body.action === "nextPost" && body.posts.filter((post) => post.published).length < 2) {
      return NextResponse.json(
        {
          error:
            "Create at least two published posts before asking for the next post recommendation.",
        },
        { status: 400 },
      );
    }

    const result = await generateGeminiJson<CollectionAiResponse>({
      systemInstruction: SYSTEM_INSTRUCTION,
      prompt: buildPrompt(body.action, body.posts),
      temperature: 0.45,
      maxOutputTokens: 900,
    });

    return NextResponse.json({
      title: result.title,
      contentHtml: sanitizeAiHtml(result.contentHtml),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "AI request failed.",
      },
      { status: 500 }
    );
  }
}
