import BlogAttachments from "./BlogAttachments";
import { splitBlogContentAndAttachments } from "@/lib/blogAttachments";

type Props = {
  title: string;
  excerpt: string;
  content: string;
  createdAt: Date | string;
};

export default function BlogPostView({ title, excerpt, content, createdAt }: Props) {
  const date = new Date(createdAt).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const { content: articleContent, attachments } = splitBlogContentAndAttachments(content);

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-8">
        <time className="text-sm text-gray-400 block mb-3">{date}</time>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-5">
          {title || <span className="text-gray-300">Post title will appear here</span>}
        </h1>
        {excerpt && (
          <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-4 italic">
            {excerpt}
          </p>
        )}
      </header>

      {articleContent ? (
        <div
          className="blog-content text-gray-700 leading-relaxed text-base"
          dangerouslySetInnerHTML={{ __html: articleContent }}
        />
      ) : attachments.length === 0 ? (
        <p className="text-gray-300 italic text-sm">Post content will appear here.</p>
      ) : null}

      <BlogAttachments attachments={attachments} />
    </article>
  );
}
