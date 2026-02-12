import { REVIEWS } from "./reviews";
import ReviewCard from "./ReviewCard";
import { StarIcon, GoogleIcon } from "./icons";

const REVIEWS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "Levere Electric",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: (
      REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
    ).toFixed(1),
    reviewCount: REVIEWS.length,
    bestRating: 5,
  },
  review: REVIEWS.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    datePublished: r.date,
    reviewBody: r.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
    },
  })),
};

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

export default function ReviewsSection() {
  return (
    <section className="relative bg-brand-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(REVIEWS_JSONLD) }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-brand-gold">
            What Our Customers Say
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-14 rounded-full bg-brand-gold/70" />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} text={review.text}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-sm font-semibold text-brand-gold">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-brand-cream">
                      {review.name}
                    </div>
                    <div
                      className="text-xs text-brand-cream/60"
                      suppressHydrationWarning
                    >
                      {timeAgo(review.date)}
                    </div>
                  </div>
                </div>
                <GoogleIcon />
              </div>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} filled={i < review.rating} />
                ))}
              </div>
            </ReviewCard>
          ))}
        </div>
      </div>
    </section>
  );
}
