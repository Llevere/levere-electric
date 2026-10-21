import Link from "next/link";
import BookNowButton from "./BookNowButton";
import CallButton from "./CallButton";
import { AREAS_TEXT, BUSINESS, JOBBER, LICENCE_LABEL } from "@/lib/site";

type Props = {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
  secondary?: { label: string; href: string };
};

/** Closing call to action at the bottom of a page. */
export default function CtaPanel({
  title = "Ready to plan your project?",
  text = `Tell us what you have in mind and where you are. Requests go straight to ${BUSINESS.owner}, and you get a written quote before any work starts.`,
  href = JOBBER.general,
  label = "Request a quote",
  secondary,
}: Props) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="mx-auto w-full max-w-4xl px-6 pb-14"
    >
      <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/10 px-6 py-7 md:px-8">
        <h2
          id="cta-heading"
          className="text-xl font-semibold text-white md:text-2xl"
        >
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-brand-cream/85">{text}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <BookNowButton href={href} label={label} />
          <CallButton />
          {secondary && (
            <Link href={secondary.href} className="link-gold text-sm">
              {secondary.label}
            </Link>
          )}
        </div>
        <p className="mt-4 text-xs text-brand-cream/60">
          ESA licensed ({LICENCE_LABEL}) and fully insured. Serving{" "}
          {AREAS_TEXT} and the surrounding area.
        </p>
      </div>
    </section>
  );
}
