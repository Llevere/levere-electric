import type { Metadata } from "next";
import { getHomeImageUrl } from "@/lib/homeImages";
import {
  BUSINESS,
  JOBBER,
  PRICE,
  PRICING,
  pageMetadata,
  serviceJsonLd,
  type FAQ,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import ServiceHero from "@/components/service/ServiceHero";
import {
  BenefitGrid,
  CheckList,
  RelatedLinks,
  StepList,
} from "@/components/service/ServiceSections";
import FAQSection from "@/components/FAQ/FAQSection";
import CtaPanel from "@/components/CtaPanel";

export const metadata: Metadata = pageMetadata(
  "Electrical Panel Upgrades in London, Ontario",
  `100A to 200A service upgrades in London, ON, typically ${PRICE.serviceUpgrade}, ESA permit included. Load calculation first, so you only upgrade if needed.`,
  "/panel-service-upgrades",
);

const FAQS: readonly FAQ[] = [
  {
    q: "Is a panel replacement the same as a service upgrade?",
    a: "No. A panel replacement changes the equipment that distributes power to your circuits. A service upgrade increases the capacity supplied to the home and may involve the meter base, service conductors and the utility. We explain which work your home needs before quoting, and the two are often done together.",
  },
  {
    q: "Do I need a 200A service to add an EV charger?",
    a: "Not always. We do a load calculation first. Many homes can support a 40A charger even with a 100A service, so an upgrade is only recommended when the numbers say you need one. An approved EV energy management system can also be an alternative to a larger service.",
  },
  {
    q: "How much does a 100A to 200A service upgrade cost in London?",
    a: `Most 100A to 200A upgrades run ${PRICE.serviceUpgrade}, including the new panel, breakers, grounding and bonding, utility coordination, and the ESA permit and inspection. We confirm the price after seeing a photo of your panel and meter.`,
  },
  {
    q: "How long does a panel upgrade take, and will the power be off?",
    a: "Plan for about one working day on site. The power is off for part of that time while the utility disconnects and reconnects the service. We confirm the expected timing with you before the installation so you can plan around it.",
  },
  {
    q: "Is the ESA permit included, and who deals with the utility?",
    a: "Yes. Every panel and service upgrade includes the ESA permit and inspection. Levere Electric also coordinates the disconnect and reconnect with the utility, so you do not have to arrange anything yourself.",
  },
  {
    q: "What should I send for a panel upgrade quote?",
    a: "Send a photo of the closed panel, its label, and the meter location, plus a short note about what you are adding, such as an EV charger, heat pump or hot tub. Only photograph accessible, closed equipment. There is no need to remove any covers.",
  },
];

const SIGNS = [
  "You are adding a Level 2 EV charger, hot tub or heat pump and the load calculation shows the service is at its limit",
  "The panel is full and there is no room for new circuits",
  "Breakers trip regularly, or you hear buzzing or crackling at the panel",
  "The panel is an older or recalled model, or has visible heat damage",
  "A renovation or addition is adding significant new load",
] as const;

const INCLUDED = [
  "Load calculation to confirm whether an upgrade is actually needed",
  "Utility coordination for the disconnect and reconnect",
  "New panel, breakers, grounding and bonding",
  "Meter base repairs where required",
  "ESA permit and inspection included",
  "Clean, labelled panel when we leave",
] as const;

const BENEFITS = [
  {
    title: "An assessment before an upgrade",
    text: "Adding an EV charger, heat pump or new appliances? We check capacity first. Empty breaker spaces alone do not tell you how much demand your service can support.",
  },
  {
    title: "A coordinated installation",
    text: "The agreed scope covers utility coordination, the new panel and breakers, grounding and bonding, and the ESA permit and inspection, so nothing is left for you to arrange.",
  },
  {
    title: "A plan for future projects",
    text: "Tell us what you may add later so we can size the panel and service capacity for the home you will have, not just the home you have today.",
  },
] as const;

const STEPS = [
  {
    title: "Send a photo and a note",
    text: `Use the request form or call ${BUSINESS.phone} with a picture of your panel and what you are planning to add.`,
  },
  {
    title: "Get the numbers",
    text: "We run the load calculation and send a written quote with the options, including whether an upgrade can be avoided.",
  },
  {
    title: "Installation day",
    text: "We coordinate the utility disconnect, replace the panel and service equipment, and bring grounding and bonding up to code.",
  },
  {
    title: "Inspection and paperwork",
    text: "ESA inspects the work. You get a labelled panel and the permit paperwork for your records.",
  },
] as const;

export default async function PanelServiceUpgrades() {
  const panelImage = await getHomeImageUrl("panel.jpg");

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Electrical panel and service upgrades",
          serviceType: "Electrical service upgrade",
          description:
            "Panel replacements and 100A to 200A electrical service upgrades in London, Ontario, with a load calculation first, utility coordination, grounding and bonding, and the ESA permit and inspection included.",
          path: "/panel-service-upgrades",
          price: PRICING.serviceUpgrade,
        })}
      />

      <ServiceHero
        crumb={{ label: "Panel & service upgrades", href: "/panel-service-upgrades" }}
        eyebrow="Panel & service upgrades"
        title={
          <>
            Electrical Panel &amp; Service Upgrades in{" "}
            <span className="text-brand-gold">London, Ontario</span>
          </>
        }
        lead={`A 100A to 200A service upgrade in London typically costs ${PRICE.serviceUpgrade}, includes the ESA permit and inspection, and takes about one working day. Levere Electric does a load calculation first, so you only upgrade if your home actually needs it.`}
        quoteHref={JOBBER.panel}
        quoteLabel="Request a panel upgrade quote"
        image={
          panelImage
            ? {
                src: panelImage,
                alt: "New electrical panel installed and labelled by Levere Electric in London, Ontario",
              }
            : null
        }
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-brand-gold">
          Panel replacement or service upgrade?
        </h2>
        <p className="mt-4 text-brand-cream/85">
          A <strong className="text-white">panel replacement</strong> changes
          the equipment that distributes power to the circuits in your home. A{" "}
          <strong className="text-white">service upgrade</strong> increases the
          capacity supplied to the home and can involve the meter base, service
          conductors and the utility. They often happen together, but they
          answer different questions. We look at your existing equipment and
          electrical demand, then explain whether you need a replacement, a
          larger service or neither.
        </p>
        <p className="mt-4 text-brand-cream/75">
          Not every EV charger needs a bigger service. Many 100A homes can run a
          40A charger safely once the numbers are checked. If the load
          calculation says you are fine, we will tell you.
        </p>
      </section>

      <CheckList
        title="When a panel or service upgrade makes sense"
        items={SIGNS}
      />

      <BenefitGrid title="A plan built around your home" items={BENEFITS} />

      <CheckList title="What is included" items={INCLUDED} />

      <StepList title="How it works" steps={STEPS} />

      <FAQSection
        title="Panel upgrade questions"
        intro="Straight answers to what London homeowners ask us most."
        items={FAQS}
      />

      <RelatedLinks
        links={[
          { label: "EV charger installation and load management", href: "/ev-charger-installation#load-management" },
          { label: "See our panel upgrade photos", href: "/photo-gallery/panel" },
          { label: "Guide: panel replacement vs 200A service upgrade", href: "/blog/panel-replacement-vs-200-amp-service-upgrade" },
        ]}
      />

      <CtaPanel
        title="Not sure whether you need an upgrade?"
        text="Send a photo of your panel and tell us what you are adding. We run the numbers and give you a written quote, including the option of not upgrading at all."
        href={JOBBER.panel}
        label="Request a quote"
        secondary={{ label: "See panel upgrade photos", href: "/photo-gallery/panel" }}
      />
    </>
  );
}
