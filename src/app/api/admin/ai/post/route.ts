import { NextRequest, NextResponse } from "next/server";
import { sessionCheck } from "@/lib/blacklist";
import { generateGeminiJson } from "@/lib/gemini";
import {
  validatePostAiInput,
  type PostAiAction,
  type PostAiInput,
} from "@/lib/postAiValidation";
import { sanitizeBlogHtml } from "@/lib/sanitize";

type ImageSignal = {
  src: string;
  fileName: string;
  alt: string;
  title: string;
  nearbyText: string;
};

const SYSTEM_INSTRUCTION = `
Write for Levere Electric, a residential electrician serving London, Ontario.
Audience: homeowners.
Style: plain English, practical, local, trustworthy.
Avoid hype, fake stats, legal/code claims, and generic AI phrasing.
If unsure, leave the claim out.
For HTML, only use h2, h3, p, ul, ol, li, strong, em, a, blockquote.
Prefer concrete homeowner situations, clear next steps, and natural wording over SEO filler.
Do not mention being an AI or refer to the prompt.
`;

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max)}...`;
}

function buildContext(input: PostAiInput) {
  const images = extractImageSignals(input.content ?? "");

  return JSON.stringify({
    t: (input.title ?? "").trim(),
    s: (input.slug ?? "").trim(),
    e: truncate((input.excerpt ?? "").trim(), 280),
    c: truncate(stripHtml(input.content ?? ""), 2200),
    i: images,
    ic: images.length,
    g: truncate((input.prompt ?? "").trim(), 400),
  });
}

function getAttr(tag: string, name: string) {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return (match?.[1] ?? "").trim();
}

function fileNameFromSrc(src: string) {
  const clean = src.split("?")[0]?.split("#")[0] ?? src;
  const parts = clean.split("/");
  return (parts[parts.length - 1] ?? src).trim();
}

function extractImageSignals(html: string): ImageSignal[] {
  const matches = Array.from(html.matchAll(/<img\b[^>]*>/gi));

  return matches.slice(0, 8).map((match) => {
    const tag = match[0];
    const index = match.index ?? 0;
    const nearbyHtml = html.slice(Math.max(0, index - 180), Math.min(html.length, index + tag.length + 180));

    const src = getAttr(tag, "src");

    return {
      src,
      fileName: fileNameFromSrc(src),
      alt: getAttr(tag, "alt"),
      title: getAttr(tag, "title"),
      nearbyText: truncate(stripHtml(nearbyHtml), 180),
    };
  });
}

function buildPrompt(action: PostAiAction, input: PostAiInput) {
  const postContext = buildContext(input);
  const editorialRules = `
Editorial rules:
- Match the real article content, not a generic electrician article.
- Prioritize clarity over cleverness.
- Sound local and useful without stuffing "London, Ontario" everywhere.
- Prefer specific homeowner outcomes, warning signs, timing, cost expectations, preparation steps, and decision-making help.
- Avoid repetitive intros, filler transitions, and salesy closing lines.
- If context is thin, stay conservative and do not invent details.
`;

  switch (action) {
    case "reviewTitle":
      return `
Return JSON: {"summary":"","recommendedTitle":"","titles":["","",""]}.
${editorialRules}
Task:
- Review whether the current title accurately matches the article body.
- In summary, say what is working and what should change.
- Judge the title for accuracy, clarity, homeowner usefulness, and likely search intent.
- If the current title is already strong, keep the recommended title very close to it.
- Generate 3 alternate title options ranked from strongest to weakest.
Title guidance:
- Keep titles natural, specific, and easy to understand.
- Avoid clickbait, vagueness, and generic titles like "Everything You Need to Know".
- Prefer 7-14 words when possible.
Context:${postContext}
`;
    case "titleIdeas":
      return `
Return JSON: {"titles":["","","","",""],"slugSuggestions":["","",""]}.
${editorialRules}
Generate 5 natural title ideas and 3 lowercase hyphen slugs.
Title guidance:
- Make each option meaningfully different.
- Prefer homeowner language, local relevance, and clear problem/solution framing.
- Avoid duplicate structures and avoid titles that could fit any trade business.
- Make the best title option first.
Slug guidance:
- Keep slugs short, descriptive, lowercase, and hyphenated.
- Remove stop words when it improves readability.
Context:${postContext}
`;
    case "outline":
      return `
Return JSON: {"suggestedTitle":"","suggestedSlug":"","excerpt":"","outlineHtml":""}.
${editorialRules}
Create a concise SEO-friendly setup for this exact post.
Requirements:
- suggestedTitle should be clear and specific.
- suggestedSlug should be short and readable.
- excerpt should be 1-2 sentences, specific enough for the blog card.
- outlineHtml should feel publishable as a starter outline, not a generic template.
` +
        `outlineHtml should be brief valid HTML using only h2,h3,p,ul,li.
Use 3-5 main sections max and include practical homeowner questions where helpful.
Context:${postContext}
`;
    case "excerpt":
      return `
Return JSON: {"excerpt":""}.
${editorialRules}
Write a 1-2 sentence excerpt for the blog listing and search preview.
Requirements:
- Explain what the reader will learn.
- Be specific to the article body.
- Keep it concise and human.
- Avoid generic intros and avoid repeating the exact title wording.
Context:${postContext}
`;
    case "fullDraft":
      return `
Return JSON: {"title":"","slug":"","excerpt":"","content":""}.
${editorialRules}
Write a practical homeowner-friendly draft in valid HTML.
Requirements:
- Aim for 700-1100 words unless context clearly needs more.
- Open with a short practical introduction, not marketing copy.
- Use headings that help scanning.
- Include concrete homeowner context, what to look for, what to expect, and when to call a licensed electrician.
- End with a short grounded close, not a hard sell.
- Keep paragraphs fairly short.
Context:${postContext}
`;
    case "faq":
      return `
Return JSON: {"content":""}.
${editorialRules}
Write an HTML FAQ section with one h2 and 3-5 h3 questions plus short answers.
Requirements:
- Questions should reflect realistic homeowner concerns related to the current article.
- Answers should be direct, helpful, and not repetitive.
- Avoid legal certainty, price promises, and unsupported code claims.
Context:${postContext}
`;
    case "improveHtml":
      return `
Return JSON: {"content":""}.
${editorialRules}
Improve clarity and flow of the existing HTML.
Requirements:
- Preserve the meaning and article structure unless a small structural improvement clearly helps.
- Remove fluff, repetition, and awkward wording.
- Keep the author's intent and keep all supported claims intact.
- Add no unsupported claims.
- Improve headings if they are vague.
Context:${postContext}
`;
    case "improveImages":
      return `
Return JSON: {"summary":"","imageNotes":["","",""],"content":""}.
${editorialRules}
Review image usage using the article copy, nearby text, filenames, and any current alt/title attributes.
Requirements:
- If images exist, return the full HTML with improved alt text on each img tag.
- Title attributes are optional and should only be used when clearly helpful.
- Alt text should describe what the image most likely shows in a concise, accessible way.
- Do not keyword-stuff alt text and do not repeat nearby captions word-for-word.
- Keep all existing src values, article text, and structure intact.
- In summary, explain what was improved.
- In imageNotes, give up to 3 short practical notes about image accessibility or clarity.
- If no images exist, keep content unchanged and explain that no images were found.
Context:${postContext}
`;
  }
}

export async function POST(req: NextRequest) {
  const denied = await sessionCheck(req);
  if (denied) return denied;

  try {
    const body = (await req.json()) as { action: PostAiAction; input: PostAiInput };
    const validation = validatePostAiInput(body.action, body.input);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.message },
        { status: 400 },
      );
    }

    const result = await generateGeminiJson({
      systemInstruction: SYSTEM_INSTRUCTION,
      prompt: buildPrompt(body.action, body.input),
      temperature: body.action === "titleIdeas" ? 0.8 : 0.45,
      maxOutputTokens:
        body.action === "fullDraft"
          ? 2200
          : body.action === "improveHtml" || body.action === "improveImages"
            ? 1800
            : 700,
    });

    const safeResult = { ...result } as Record<string, unknown>;
    if (typeof safeResult.content === "string") {
      safeResult.content = sanitizeBlogHtml(safeResult.content);
    }
    if (typeof safeResult.outlineHtml === "string") {
      safeResult.outlineHtml = sanitizeBlogHtml(safeResult.outlineHtml);
    }

    return NextResponse.json(safeResult);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "AI request failed.",
      },
      { status: 500 }
    );
  }
}
