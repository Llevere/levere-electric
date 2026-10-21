import { BUSINESS, PHONE_HREF } from "@/lib/site";

/** Outlined click-to-call button, paired with BookNowButton. */
export default function CallButton() {
  return (
    <a
      href={PHONE_HREF}
      className="inline-flex w-full items-center justify-center rounded-md border border-brand-gold/50 px-5 py-3 text-sm text-brand-cream transition hover:bg-brand-gold/10 md:w-fit"
    >
      Call {BUSINESS.phone}
    </a>
  );
}
