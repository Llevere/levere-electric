import WhyChooseUsSectionClient from "./WhyChooseUsSectionClient";
import { getHomeImageUrl } from "@/lib/homeImages";

export default async function WhyChooseUsSection() {
    const img = await getHomeImageUrl("panel.jpg");
    if (!img) return null; // or fallback UI

    return <WhyChooseUsSectionClient imageSrc={img} />;
}
