import type { BlogPost } from "@/lib/blog";
import { AREAS_TEXT, PRICE } from "@/lib/site";

// One homeowner question per post: answer it in the first paragraph and end
// with a link to the service page. `updatedAt` feeds the sitemap.

export const POSTS: BlogPost[] = [
  {
    slug: "ev-charger-installation-cost-london-ontario",
    title: "What affects the cost of an EV charger installation in London, Ontario?",
    description:
      `Our ${PRICE.ev} starting package explained, plus the three home details that change an EV charger installation quote in London, Ontario.`,
    category: "EV charging",
    image: { src: "/projects/tesla-wall-connector.webp" },
    imageAlt:
      "Tesla Wall Connector installed on a garage wall by Levere Electric in London, Ontario",
    publishedAt: "2026-09-09T12:00:00.000Z",
    updatedAt: "2026-10-07T12:00:00.000Z",
    keyTakeaways: [
      `A standard Level 2 install in London starts at ${PRICE.ev} when the panel is on the same level as the garage and within about 20 feet.`,
      "Cable route, charger location and available panel capacity are the three things that move the price.",
      "A load calculation comes before any talk of a panel upgrade. Many 100A homes can run a 40A charger.",
    ],
    body: `Levere Electric's standard Level 2 installation starts at **${PRICE.ev}** for qualifying homes in London and the surrounding area. The right question is not only "What does an installation cost?" It is "What is included for my particular home?" A clear quote connects the price to your equipment, the cable route and the electrical capacity you already have.

## What the starting package is designed for

Our standard package is intended for a panel on the same level as the garage, within about 20 feet of the proposed charging location. It includes a load calculation, a 240V 40 to 50A circuit, a NEMA 14-50 receptacle or hardwired connection, all materials, mounting and testing, and the ESA permit and inspection.

The written quote identifies whether the charger itself is supplied, what connection is proposed and what happens if site conditions differ from the initial photos. Starting prices are useful for planning; they are not a promise that every home fits the same package.

## Three details that change the quote

- **The cable route:** the practical installation route is often longer than the straight-line distance between your panel and parking space. Finished basements and changes between levels affect access. Runs of 30 to 60 feet usually fall into our extended install, typically ${PRICE.evExtended}.
- **The installation location:** a garage wall, an exterior parking spot or a detached building each present different work. Tell us where the car normally parks and where you want the cable to reach.
- **Available capacity:** your home's existing electrical demand needs to be assessed. Additional equipment or a service upgrade changes the scope and the price.

Take a photo of the closed panel and its label, the proposed charger location and the areas along the likely route. There is no need to remove electrical covers. A few useful photos make the first conversation far more specific than a picture of the charger alone.

## Ask about capacity before assuming an upgrade

A panel upgrade should follow an assessment, not precede it. Depending on the home and the charger, a suitable charging rate or an approved EV energy management system (EVEMS) may be worth comparing with a 100A to 200A service upgrade, which typically runs ${PRICE.serviceUpgrade}. The appropriate option has to be established for the actual installation.

Tell us your vehicle model, whether you already own a charger and how you use the vehicle. That keeps the discussion about a charging setup that fits your routine rather than the largest number on a product box.

## Compare the same scope

When comparing quotes, check charger supply, cable route, installation materials, wall repairs, permit arrangements and any additional equipment. A lower total is hard to judge when the work included is different.

The Electrical Safety Authority requires a notification (permit) for EV charger work, and homeowners who hire out electrical work must use a Licensed Electrical Contractor. Keep the ESA certificate of acceptance with your home records. [Read ESA's homeowner EV charging guidance](https://esasafe.com/home-renovation-buying-and-selling/ev-charging-systems/).

## Start with your home

Levere Electric serves ${AREAS_TEXT} and surrounding communities. [Compare our EV charger installation packages](/ev-charger-installation), then send your location, photos and charger details for a quote tied to your home.`,
  },
  {
    slug: "panel-replacement-vs-200-amp-service-upgrade",
    title: "Panel replacement or 200A service upgrade: what is the difference?",
    description:
      "Understand the difference between replacing your electrical panel and increasing your home's service capacity, and what to send for an accurate quote.",
    category: "Panel upgrades",
    image: { blob: "home/", file: "panel.jpg" },
    imageAlt:
      "Electrical panel installed and labelled by Levere Electric in London, Ontario",
    publishedAt: "2026-09-09T12:00:00.000Z",
    updatedAt: "2026-10-07T12:00:00.000Z",
    keyTakeaways: [
      "A panel replacement swaps the distribution equipment. A service upgrade increases the capacity supplied to the home and can involve the meter base, service conductors and the utility.",
      `A 100A to 200A service upgrade in London typically costs ${PRICE.serviceUpgrade}, including the ESA permit and inspection.`,
      "Start with the reason for the project and a load calculation, not with an amperage.",
    ],
    body: `A **panel replacement** changes the equipment that distributes power to the circuits in your home. A **service upgrade** increases the capacity supplied to the home and can involve more than the panel. They often happen together, but they answer different questions.

For a homeowner planning an EV charger, a renovation or new electrical equipment, that distinction matters. You want a quote for the work your home actually needs, with a clear explanation of why it is recommended.

## Start with the reason for the project

Are you replacing failing equipment, making space for additional circuits or checking whether the home can support a new load? Describe the outcome you want before choosing an amperage or asking for a particular panel brand.

Levere Electric reviews the existing installation and your planned additions. An equipment problem calls for a different conversation than a long-term plan to add several large loads. The starting point is a load calculation, not the assumption that a larger service is always necessary. Many homes with 100A service can support a 40A EV charger once the numbers are checked.

## A panel and a service are different parts of the plan

The panel holds the circuit breakers and distributes power. The electrical service is the supply arrangement that brings power into the home: the meter base, service conductors and main disconnect. Replacing a panel does not, by itself, increase the supply capacity.

For service work, the agreed scope can also involve the meter location, grounding, bonding and coordination with the utility for the disconnect and reconnect. Your quote should make these responsibilities clear rather than grouping everything under one unexplained "panel upgrade" line.

## What we need to know before quoting

- What you are adding or changing in the home.
- Photos of the closed panel, its exterior label and the meter location.
- Where the equipment is located and whether access is restricted.
- Any upcoming renovation or electrical project that should be considered at the same time.
- Any known concerns, such as tripping breakers, buzzing or heat marks, described in your own words.

Only photograph accessible, closed equipment. We arrange a site assessment when the details are not visible from outside the panel.

## Plan the interruption as well as the installation

Ask when the power will be off, who coordinates the utility and how the day is scheduled. Most 100A to 200A upgrades take about one working day on site, with power off for part of it. Mention anything in your household that needs special planning during the outage, such as medical equipment or a home office.

This planning belongs in the quote conversation. It gives you a clearer view of the whole project than comparing panel brands or headline prices alone.

## Questions to ask about any quote

Does the proposal replace the panel, increase service capacity or both? Which equipment is included? Are added circuits priced separately? Is the ESA permit and inspection included? How are unexpected conditions, such as corroded service conductors, handled?

[Explore our panel and service upgrade page](/panel-service-upgrades) for pricing and process. If an EV is the reason for your enquiry, [read about charging and load management](/ev-charger-installation#load-management) as part of the same planning conversation.`,
  },
  {
    slug: "lutron-radiora-3-smart-lighting-existing-home",
    title: "Can you add Lutron smart lighting to an existing home?",
    description:
      "How to plan useful lighting scenes, familiar wall controls and a sensible first phase of Lutron RadioRA 3 lighting in a home you already live in.",
    category: "Smart homes",
    image: { blob: "services/", file: "residential-lighting.jpeg" },
    imageAlt:
      "Residential lighting project completed by Levere Electric in London, Ontario",
    publishedAt: "2026-09-09T12:00:00.000Z",
    updatedAt: "2026-10-07T12:00:00.000Z",
    keyTakeaways: [
      "Yes. Lutron RadioRA 3 is designed for existing homes: its controls communicate by radio and do not depend on Wi-Fi or rewiring every room.",
      "Design around the moments you want to improve, and keep physical wall controls that guests can understand.",
      "Start with one room or a renovation, and choose a system that can grow so later rooms fit the same plan.",
    ],
    body: `You can usually add smart lighting controls to an existing home, but the design needs to suit the wiring, fixtures and switches already there. Levere Electric is **Lutron RadioRA 3 certified** and helps turn a list of everyday frustrations into a practical lighting plan for homes in London and the surrounding area.

The best first conversation is about how you want a room to work. It does not need to begin with a shopping list of connected devices.

## Describe the moments you want to improve

Think about arriving home, preparing dinner, settling into the living room or switching everything off for the night. Write down which lights you use and which switches feel inconvenient. That gives the project a purpose beyond adding another app.

For example, you might want a kitchen setting that suits food preparation and a second one that leaves softer light on after dinner. Fixture and dimmer compatibility determines the options for each room, which is why we review what is installed before recommending devices.

## Keep wall controls part of the design

A smart home should still make sense to someone who has never used it. Discuss where people naturally reach for a switch, how guests should operate the room and which routines deserve a single scene button.

Lutron describes RadioRA 3 as a professionally installed system that can grow from individual rooms to a whole home. Its controls use Clear Connect radio communication independently of Wi-Fi, so a dropped network does not leave you in the dark. [Explore Lutron's RadioRA 3 system](https://www.lutron.com/us/en/controls/systems/radiora3).

Those capabilities are a starting point. We still confirm the specific devices, fixtures, wiring and functions proposed for your home.

## Start with a phase you will actually use

A kitchen, a living area or a renovation already under way is a natural first phase. Before buying equipment, decide whether you expect to expand into other rooms later. A plan can set the direction without requiring the whole home to be finished at once.

The quote should describe the rooms, controls and programming included, and explain the handover and how later changes are handled. These details distinguish a complete installation from a collection of products.

## Prepare a useful project brief

- List the rooms and lights you want to control.
- Describe two or three daily routines you want to simplify.
- Share photos of the existing switches and fixtures.
- Note any renovation timing or decorating already planned.
- Mention other home systems you hope to connect, so compatibility can be checked.

## Make the first step clear

You do not need every technical detail to start. [Talk to Levere Electric about Lutron smart lighting](/smart-home-lighting) in London and the surrounding area. We define the electrical work, equipment and setup needed for a first phase that fits your home.`,
  },
  {
    slug: "home-wifi-wired-access-points-or-mesh",
    title: "Better home Wi-Fi: wired access points or wireless mesh?",
    description:
      "What to sort out before buying networking equipment, especially during a renovation or smart-home project in London, Ontario.",
    category: "Home networking",
    image: { blob: "home/", file: "kitchen.jpg" },
    imageAlt: "Renovated kitchen with new lighting wired by Levere Electric",
    publishedAt: "2026-09-09T12:00:00.000Z",
    updatedAt: "2026-10-07T12:00:00.000Z",
    keyTakeaways: [
      "New Wi-Fi equipment does not make your internet plan faster. It changes how well devices around the house can use the connection you already pay for.",
      "A wired access point is the more reliable option where cabling is practical. Mesh helps where it is not, but placement and the link between units matter.",
      "If walls are open for a renovation, run the data cable now. It is the cheapest moment you will ever have.",
    ],
    body: `Better home Wi-Fi starts with understanding where the connection falls short. A faster internet plan, different access-point locations and new cabling solve different problems. Before choosing UniFi or any other equipment, describe what actually happens in the rooms where you work, stream or use connected devices.

Levere Electric welcomes home-networking enquiries in London and the surrounding area. We confirm project fit, scope and availability before anything is booked.

## Separate internet speed from indoor coverage

Your internet provider supplies a connection to the house. Your home network then connects devices to it. New Wi-Fi equipment does not increase the speed of the plan itself, although a better layout can help devices use the available connection more consistently.

Note whether the problem affects the whole house or only certain rooms, whether it happens at particular times, and which devices are affected. Those observations are more useful than assuming a particular product will fix it.

## Why cabling is worth discussing

An access point with a wired connection does not need a wireless link to carry traffic back to the rest of the network. Wireless mesh is still useful where cabling is impractical, but placement and the quality of the link between units decide how well it works.

Ubiquiti's own guidance says wireless mesh performance depends on the layout and that wired connections are preferable where practical. [Read Ubiquiti's mesh network guidance](https://help.ui.com/hc/en-us/articles/115002262328-Considerations-for-Optimal-Wireless-Mesh-Networks).

The right decision depends on the actual house. We talk through cable routes and the electrical work alongside the proposed equipment, rather than treating cabling as an afterthought.

## Plan before renovation walls close

If you are already renovating, bring the home-office, media and smart-home plans into the electrical discussion early. Decide where equipment will live, which rooms need wired connections and where access points could go.

A simple floor plan and a list of priorities keep the conversation focused. It also separates work worth doing now from equipment you might add later.

## Agree on the handover

For a proposed UniFi project, ask who owns the accounts, what documentation you receive and what follow-up support is included. Identify the equipment and configuration covered by the quote. An installation should leave you knowing how the network is managed and where to go with questions.

## What to send with an enquiry

- Your location and a brief description of the connectivity problems.
- A floor plan or a description of the levels and rooms involved.
- The internet service and networking equipment you currently use.
- Any existing data outlets or planned renovation work.
- The home-office, streaming and smart-home uses that matter most.

[Start a home networking conversation](/home-networking). If lighting controls are also part of the plan, [explore our Lutron smart-home service](/smart-home-lighting) so the two projects can be planned together.`,
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsSorted() {
  return [...POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
