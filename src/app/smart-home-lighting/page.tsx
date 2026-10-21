import type { Metadata } from "next";
import { getImagesByFileName } from "@/lib/homeImages";
import {
  JOBBER,
  LICENCE_LABEL,
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
  "Lutron Smart Lighting in London, Ontario",
  `Lutron RadioRA 3 certified electrician in London, ON. Smart lighting scenes, wall controls and a first phase that fits your home. ${LICENCE_LABEL}.`,
  "/smart-home-lighting",
);

const FAQS: readonly FAQ[] = [
  {
    q: "What can smart lighting do in my home?",
    a: "Smart lighting groups lights into scenes, such as cooking, relaxing or leaving home, and adds scheduled or remote control with a compatible system. A good design makes common tasks simpler while keeping convenient wall controls. We discuss which functions are actually useful for your household before recommending anything.",
  },
  {
    q: "Is Levere Electric certified for Lutron RadioRA 3?",
    a: "Yes. Levere Electric holds Lutron RadioRA 3 certification. We design a lighting-control plan for your home and confirm product compatibility as part of the written scope.",
  },
  {
    q: "Can smart lighting be added to an existing home?",
    a: "Usually, yes. RadioRA 3 controls communicate by radio and do not depend on Wi-Fi or rewiring every room. The options depend on the existing wiring, fixtures and switches, so we review those details before recommending devices or confirming whether electrical changes are needed.",
  },
  {
    q: "Do I have to automate the whole house at once?",
    a: "No. Most homeowners start with a kitchen, a living area or a renovation, with a plan for future rooms. Choosing a system that can grow at the start avoids buying devices that do not fit the later plan.",
  },
  {
    q: "How much does a smart lighting system cost?",
    a: "Pricing depends on the number of rooms, controls and fixtures, the existing wiring, and the programming you want. Share a room list and a few examples of what you would like the lights to do, and we define a scope and quote for a first phase.",
  },
];

const BENEFITS = [
  {
    title: "Lighting that fits your routine",
    text: "Scenes for cooking, relaxing, entertaining or leaving home, with wall controls that stay easy for family and guests to use.",
  },
  {
    title: "RadioRA 3 certified expertise",
    text: "Work with a Lutron RadioRA 3 certified electrician. We review your fixtures, wiring and room layout before recommending a system.",
  },
  {
    title: "A considered starting point",
    text: "Begin with a room, a renovation or a whole-home plan. Your quote defines the devices, programming and handover included, so you know exactly what to expect.",
  },
] as const;

const STARTING_POINTS = [
  "Kitchen scenes: bright for cooking, softer after dinner, one button for each",
  "Living room dimming and a single \"movie\" or \"evening\" setting",
  "Entry and exterior lights on a schedule, so you never come home to a dark house",
  "An \"all off\" control by the bed or the door for the end of the night",
  "Renovation prewiring, so controls and keypads go exactly where you want them",
] as const;

const STEPS = [
  {
    title: "Share your rooms and routines",
    text: "List the rooms and lights you want to control and two or three daily routines you want to simplify. Photos of your current switches and fixtures help.",
  },
  {
    title: "Fixture and wiring review",
    text: "We check dimmer and fixture compatibility, the existing wiring and where the controls should live before anything is specified.",
  },
  {
    title: "A written scope",
    text: "Your quote names the devices, scenes, programming and handover included, and explains how later rooms can be added.",
  },
  {
    title: "Install, program, walk-through",
    text: "We install and program the system, then walk you through every control so the house makes sense to everyone who lives in it.",
  },
] as const;

export default async function SmartHomeLighting() {
  const images = await getImagesByFileName("services/");
  const image = images.get("residential-lighting.jpeg");

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Lutron smart lighting and smart home installation",
          serviceType: "Smart lighting installation",
          description:
            "Lutron RadioRA 3 smart lighting design and installation for homes in London, Ontario and surrounding communities, by a RadioRA 3 certified electrician. Lighting scenes, wall keypads, schedules and renovation prewiring.",
          path: "/smart-home-lighting",
        })}
      />

      <ServiceHero
        crumb={{ label: "Smart homes & lighting", href: "/smart-home-lighting" }}
        eyebrow="Smart homes & Lutron lighting"
        title={
          <>
            Lutron Smart Lighting &amp; Smart Homes in{" "}
            <span className="text-brand-gold">London, Ontario</span>
          </>
        }
        lead="Levere Electric helps homeowners in London and the surrounding area plan Lutron RadioRA 3 smart lighting, with RadioRA 3 certification. Start with the rooms you use most, the controls you prefer and the routines you want to simplify, then build a system around your home."
        quoteHref={JOBBER.general}
        quoteLabel="Ask about smart lighting"
        image={
          image
            ? {
                src: image,
                alt: "Residential lighting project completed by Levere Electric in London, Ontario",
              }
            : null
        }
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-brand-gold">
          A smarter home starts with simpler controls
        </h2>
        <p className="mt-4 text-brand-cream/85">
          Smart lighting should make a room easier to use, not harder. That
          means scenes that match how you actually live, physical wall controls
          that a guest can understand, and a system that keeps working when the
          Wi-Fi does not. Lutron RadioRA 3 is built for exactly that: it is
          professionally installed, communicates by its own Clear Connect
          radio, and can grow from one room to the whole house.
        </p>
        <p className="mt-4 text-brand-cream/75">
          We are a RadioRA 3 certified electrical contractor, so the lighting
          design, the electrical work and the programming come from the same
          person.
        </p>
      </section>

      <BenefitGrid title="A plan built around your home" items={BENEFITS} />

      <CheckList
        title="Where homeowners usually start"
        intro="A first phase does not have to be the whole house. These are the projects that pay off fastest."
        items={STARTING_POINTS}
      />

      <StepList title="How it works" steps={STEPS} />

      <FAQSection
        title="Smart lighting questions"
        intro="What London homeowners ask before their first Lutron project."
        items={FAQS}
      />

      <RelatedLinks
        links={[
          { label: "See our lighting projects", href: "/photo-gallery/lighting" },
          { label: "Home networking and UniFi enquiries", href: "/home-networking" },
          { label: "Guide: adding Lutron smart lighting to an existing home", href: "/blog/lutron-radiora-3-smart-lighting-existing-home" },
        ]}
      />

      <CtaPanel
        title="Tell us how you want your rooms to work."
        text="Send a room list, a few photos of your switches and fixtures, and the routines you want to simplify. We come back with a first-phase scope and a written quote."
        href={JOBBER.general}
        label="Ask about smart lighting"
        secondary={{ label: "See lighting photos", href: "/photo-gallery/lighting" }}
      />
    </>
  );
}
