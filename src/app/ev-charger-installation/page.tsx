import { getHomeImageUrl } from "@/lib/homeImages";
import HeroSection from "./HeroSection";
import PackagesSection from "./package-tiers/PackagesSection";
import FAQSection from "./FAQ/FAQSection";

const HERO_BG = "ev-car.jpg";

export default async function EvChargerInstallationPage() {
  const heroUrl = (await getHomeImageUrl(HERO_BG)) ?? "";

  return (
    <>
      <HeroSection heroUrl={heroUrl} />
      <PackagesSection />
      <FAQSection />
    </>
  );
}
