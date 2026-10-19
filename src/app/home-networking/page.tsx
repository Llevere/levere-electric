import type { Metadata } from "next";
import { JOBBER, pageMetadata, serviceJsonLd, type FAQ } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import ServiceHero from "@/components/service/ServiceHero";
import {
  BenefitGrid,
  CheckList,
  RelatedLinks,
} from "@/components/service/ServiceSections";
import FAQSection from "@/components/FAQ/FAQSection";
import CtaPanel from "@/components/CtaPanel";

export const metadata: Metadata = pageMetadata(
  "Home Networking & UniFi in London, Ontario",
  "Plan home Wi-Fi coverage, wired access points, data cabling and UniFi networks with Levere Electric in London, Ontario, ideally before the walls close.",
  "/home-networking",
);

const FAQS: readonly FAQ[] = [
  {
    q: "Can I enquire about a UniFi installation?",
    a: "Yes. Send your location, a description of the coverage or connectivity problems and any existing equipment details. We confirm whether the project fits our current scope and availability before quoting.",
  },
  {
    q: "Will new Wi-Fi equipment increase my internet-plan speed?",
    a: "No. It does not increase the speed supplied by your internet provider. A better network layout can improve coverage and how reliably devices use the connection you already have. We need to understand the source of the problem first.",
  },
  {
    q: "When should I plan data cabling during a renovation?",
    a: "While the electrical layout is being planned and before walls are closed. That gives you the most options for wired connections and access-point locations, at the lowest cost.",
  },
  {
    q: "Is ongoing network support included?",
    a: "Support terms are agreed in the project scope. Ask about the handover, documentation and any follow-up assistance so responsibilities are clear before work starts.",
  },
];

const BENEFITS = [
  {
    title: "Start with where coverage matters",
    text: "Tell us where calls drop, video buffers or Wi-Fi is unreliable. A useful plan starts with your floor layout and how people use the space, not with a product.",
  },
  {
    title: "Consider wired connections",
    text: "Renovations are the moment to discuss data cabling and access-point locations before walls are closed. Share your home office, media and smart-home needs.",
  },
  {
    title: "Define the handover and support",
    text: "For any proposed UniFi project, we agree on equipment, configuration, account ownership, documentation and the support included before proceeding.",
  },
] as const;

const WHAT_TO_SEND = [
  "Your location and a brief description of the connectivity problems",
  "A floor plan or a description of the levels and rooms involved",
  "The internet service and networking equipment you currently use",
  "Any existing data outlets or planned renovation work",
  "The home-office, streaming and smart-home uses that matter most",
] as const;

export default function HomeNetworking() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Home networking and UniFi project enquiries",
          serviceType: "Home network installation",
          description:
            "Home Wi-Fi planning, data cabling and UniFi network projects for homes in London, Ontario and surrounding communities. Project fit, scope and availability are confirmed before booking.",
          path: "/home-networking",
        })}
      />

      <ServiceHero
        crumb={{ label: "Home networking", href: "/home-networking" }}
        eyebrow="Home networking & UniFi"
        title={
          <>
            Home Networking &amp; UniFi Project Enquiries in{" "}
            <span className="text-brand-gold">London, Ontario</span>
          </>
        }
        lead="Planning better home Wi-Fi, wired connections or a UniFi network in London and the surrounding area? Talk to Levere Electric about the layout, cabling and equipment your project may need. We confirm project fit, scope and availability before anything is booked."
        quoteHref={JOBBER.general}
        quoteLabel="Discuss a networking project"
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-brand-gold">
          Plan the connections behind your smart home
        </h2>
        <p className="mt-4 text-brand-cream/85">
          Better home Wi-Fi starts with understanding where the connection
          falls short. A faster internet plan, different access-point locations
          and new data cabling solve different problems. Because the cabling is
          electrical work, it makes sense to plan it alongside lighting,
          receptacles and smart-home controls, especially while a renovation
          has the walls open.
        </p>
        <p className="mt-4 text-brand-cream/75">
          We take on a small number of clearly scoped networking projects, most
          often alongside smart-lighting or renovation work. Every quote
          separates equipment, cabling, configuration and support so you know
          what you are buying.
        </p>
      </section>

      <BenefitGrid title="What to include in your enquiry" items={BENEFITS} />

      <CheckList title="What to send with an enquiry" items={WHAT_TO_SEND} />

      <FAQSection
        title="Home networking questions"
        intro="What to sort out before buying equipment."
        items={FAQS}
      />

      <RelatedLinks
        links={[
          { label: "Lutron smart lighting", href: "/smart-home-lighting" },
          { label: "All residential electrical services", href: "/services" },
          { label: "Guide: wired access points or wireless mesh?", href: "/blog/home-wifi-wired-access-points-or-mesh" },
        ]}
      />

      <CtaPanel
        title="Tell us where the Wi-Fi lets you down."
        text="Send your location, a floor plan or room list and what you currently use. We confirm whether the project fits, then put together a scope and quote."
        href={JOBBER.general}
        label="Discuss a networking project"
      />
    </>
  );
}
