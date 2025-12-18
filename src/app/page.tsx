"use client";

import Hero from "./components/HeroSection/Hero";
import Footer from "./components/layout/Footer";
import OurServicesSection from "./components/Services/OurServices";
import WhyChooseUsSection from "./components/WhyChooseUs/WhyChooseUs";


export default function Home() {
  return (
    <div className=" bg-[radial-gradient(ellipse_at_top,rgba(226,192,81,0.08),transparent_55%)]">

      <Hero />
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-gold/25 to-transparent" />

      <OurServicesSection />
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-gold/25 to-transparent " />
      <WhyChooseUsSection />
      <Footer />
    </div>
  );
}
