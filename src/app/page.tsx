import Hero from "./components/HeroSection/Hero";
import Footer from "./components/layout/Footer";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";
import OurServicesSection from "./components/Services/OurServices";
import WhyChooseUsSection from "./components/WhyChooseUs/WhyChooseUsSectionClient";
import { getHomeImagesByFileName } from "./lib/homeImages";


export default async function Home() {

  //Key: image name 'ev-car.jpg'
  //Value: image blob url
  const homeImagesByName: Map<string, string> = await getHomeImagesByFileName();
  const panel = homeImagesByName.get("panel.jpg") ?? "";

  return (
    <div className=" bg-[radial-gradient(ellipse_at_top,rgba(226,192,81,0.08),transparent_55%)]">

      <Hero images={homeImagesByName} />
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-gold/25 to-transparent" />

      <OurServicesSection />
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-gold/25 to-transparent " />
      <WhyChooseUsSection imageSrc={panel} />

      <ReviewsSection />
      <Footer />
    </div>
  );
}
