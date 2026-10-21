import { faqJsonLd, type FAQ } from "@/lib/site";
import JsonLd from "../JsonLd";
import FAQItem from "./FAQItem";

type Props = {
  title: string;
  intro?: string;
  items: readonly FAQ[];
  id?: string;
  /** Use the EV page's wider 6xl container. */
  wide?: boolean;
};

/** FAQ accordion plus matching FAQPage structured data. */
export default function FAQSection({
  title,
  intro,
  items,
  id = "faq",
  wide = false,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={
        wide
          ? "mx-auto w-full max-w-6xl px-4 pb-14"
          : "mx-auto w-full max-w-4xl px-6 py-12"
      }
    >
      <JsonLd data={faqJsonLd(items)} />
      <h2
        id={`${id}-heading`}
        className="text-2xl font-semibold tracking-tight text-brand-gold md:text-3xl"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-2 max-w-2xl text-sm text-brand-cream/75 md:text-base">
          {intro}
        </p>
      )}
      <div className="mt-6 grid gap-3">
        {items.map((f) => (
          <FAQItem key={f.q} {...f} />
        ))}
      </div>
    </section>
  );
}
