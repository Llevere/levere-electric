import { FAQS } from "../data";
import FAQItem from "./FAQItem";

export default function FAQSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-14">
      <div className="mt-4">
        <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
          EV Charger Install – FAQ
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/75 md:text-base">
          Quick answers to the most common questions we get in London and
          surrounding areas.
        </p>

        <div className="mt-6 grid gap-3">
          {FAQS.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
