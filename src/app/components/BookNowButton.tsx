import Link from "next/link";

type Props = {
  href: string;
  px?: string;
  py?: string;
};

export default function BookNowButton({ href, px = "6", py = "3" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex w-full items-center justify-center rounded-md bg-brand-gold px-${px} py-${py}
                 text-sm font-semibold text-brand-navy hover:bg-brand-gold-3
                active:bg-brand-gold-2 transition-colors md:w-fit`}
    >
      Book Now
    </Link>
  );
}
