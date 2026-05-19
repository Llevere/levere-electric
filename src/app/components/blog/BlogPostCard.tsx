import Link from "next/link";

type Props = {
  id?: number;
  title: string;
  excerpt: string;
  slug: string;
  createdAt: Date | string;
  published?: boolean;
  adminView?: boolean;
};

export default function BlogPostCard({
  id,
  title,
  excerpt,
  slug,
  createdAt,
  published = true,
  adminView = false,
}: Props) {
  const date = new Date(createdAt).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="flex h-full flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <time className="text-xs text-gray-400">{date}</time>
        {adminView ? (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
              published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {published ? "Published" : "Draft"}
          </span>
        ) : null}
      </div>
      <h2 className="text-lg font-semibold leading-snug text-gray-900">
        {title || "Untitled post"}
      </h2>
      {excerpt && <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">{excerpt}</p>}
      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <Link href={`/blog/${slug}`} className="text-sm text-blue-600 hover:underline">
          Read more
        </Link>
        {adminView && id ? (
          <Link
            href={`/admin/posts/${id}/edit`}
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            Edit
          </Link>
        ) : null}
      </div>
    </article>
  );
}
