import Link from "next/link";
import { JOBBER } from "@/lib/site";

type Props = {
  href?: string;
  px?: string;
  py?: string;
  label?: string;
};

export default function BookNowButton({
  href = JOBBER.general,
  px = "6",
  py = "3",
  label = "Request a Quote",
}: Props) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex w-full items-center justify-center rounded-md bg-brand-gold px-${px} py-${py}
                 text-sm font-semibold text-brand-navy hover:bg-brand-gold-3
                active:bg-brand-gold-2 transition-colors md:w-fit cursor-pointer`}
    >
      {label}
    </Link>
  );
}
