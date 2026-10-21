/** One FAQ entry. Native <details> needs no JavaScript and keeps the answer in the HTML. */
export default function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq-item group rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-1 text-sm font-semibold leading-relaxed text-white">
        {q}
        <svg
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-white/70 transition-transform duration-300 group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p className="pt-2 pb-1 text-sm leading-relaxed text-white/75">{a}</p>
    </details>
  );
}
