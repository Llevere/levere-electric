"use client";

import Hero from "./components/HeroSection/Hero";
import OurServicesSection from "./components/Services/OurServices";


export default function Home() {
  return (
    <div className=" bg-[radial-gradient(ellipse_at_top,rgba(226,192,81,0.08),transparent_55%)]">
      {/* HERO */}
      <Hero />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />

      {/* SERVICES */}
      <OurServicesSection />
    </div>
  );
}
