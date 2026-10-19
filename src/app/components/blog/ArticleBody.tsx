import { Fragment } from "react";
import Link from "next/link";
import { articleBlocks, safeLink } from "@/lib/blog";

function Inline({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
        .map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={i} className="font-semibold text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
          if (link) {
            const href = safeLink(link[2]);
            return href.startsWith("https:") ? (
              <a key={i} href={href} className="link-gold" rel="noopener noreferrer">
                {link[1]}
              </a>
            ) : (
              <Link key={i} href={href} className="link-gold">
                {link[1]}
              </Link>
            );
          }
          return <Fragment key={i}>{part}</Fragment>;
        })}
    </>
  );
}

/** Renders the markdown subset used by posts. Server component, no JS shipped. */
export default function ArticleBody({ body }: { body: string }) {
  return (
    <div className="article-body max-w-3xl">
      {articleBlocks(body).map((block, i) => {
        if (block.type === "heading") {
          return block.level === 2 ? (
            <h2
              key={i}
              id={block.id}
              className="mt-10 scroll-mt-28 text-2xl font-semibold tracking-tight text-brand-gold"
            >
              <Inline text={block.text} />
            </h2>
          ) : (
            <h3
              key={i}
              id={block.id}
              className="mt-7 scroll-mt-28 text-xl font-semibold text-white"
            >
              <Inline text={block.text} />
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul
              key={i}
              className="my-5 list-disc space-y-2 pl-6 text-brand-cream/85"
            >
              {block.items.map((item, j) => (
                <li key={j} className="leading-relaxed">
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="my-4 leading-relaxed text-brand-cream/85">
            <Inline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
