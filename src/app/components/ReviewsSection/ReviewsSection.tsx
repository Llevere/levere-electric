import { REVIEWS } from "./reviews";
import ReviewCard from "./ReviewCard";
import { StarIcon, GoogleIcon } from "./icons";
import { BUSINESS } from "@/lib/site";

// Google ignores self-authored aggregateRating/review markup on LocalBusiness
// pages, and a "3 reviews" count understated the real Google count, so the
// review JSON-LD was removed. The reviews stay visible as plain text.

function formatMonth(dateString: string): string {
  // Absolute dates: pages are prerendered, so "x months ago" went stale.
  return new Date(`${dateString}T12:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

export default function ReviewsSection() {
  return (
    <section className="relative bg-brand-navy">
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-brand-gold">
            What Our Customers Say
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-14 rounded-full bg-brand-gold/70" />
          <p className="mt-3 text-sm text-brand-cream/80">
            A few of the reviews homeowners in London and area have left on
            Google.
          </p>
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
                    <div className="text-xs text-brand-cream/60">
                      {formatMonth(review.date)}
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
        <div className="mt-8 text-center">
          <a
            href={BUSINESS.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-gold hover:text-brand-gold-3 underline underline-offset-4"
          >
            Read all of our reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
