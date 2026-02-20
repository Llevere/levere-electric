import Image from "next/image";

const FEATURES = [
  {
    title: "ESA Licensed (ECRA/ESA #7017944)",
    desc: "Fully certified to perform residential electrical work in Ontario.",
  },
  {
    title: "Fully Insured",
    desc: "Up to $2M liability coverage for complete peace of mind.",
  },
  {
    title: "5-Star Google Rated",
    desc: "Trusted by homeowners throughout London, St. Thomas, Dorchester & Komoka.",
  },
  {
    title: "Transparent Pricing",
    desc: "Upfront quotes with no hidden fees or surprises.",
  },
  {
    title: "Professional, Clean Work",
    desc: "Respectful of your home—clean installs, labelled panels, and the right materials.",
  },
  {
    title: "Fast Local Service",
    desc: "Based in London with quick response times to surrounding communities.",
  },
];

export default function WhyChooseUsSectionClient({
  imageSrc,
}: {
  imageSrc: string;
}) {
  return (
    <section className="w-full bg-brand-navy">
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:gap-12">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-gold sm:text-4xl">
            Why Choose Levere Electric
          </h2>
          <p className="mt-2 max-w-xl text-sm text-brand-cream/80">
            Professional, reliable, and fully licensed electrical work you can
            trust.
          </p>

          <ul className="mt-8 space-y-5">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-4">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-cream/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-brand-cream"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>

                <div>
                  <div className="text-xl font-medium text-brand-cream">
                    {f.title}
                  </div>
                  <div className="mt-1 text-sm text-brand-cream/70">
                    {f.desc}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl border border-brand-cream/10 bg-brand-navy/50 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <Image
              src={imageSrc}
              alt="Electrical panel installation"
              fill
              quality={75}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
