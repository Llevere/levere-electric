import { ShieldCheck, BadgeCheck, Star, MapPin, Lightbulb } from "lucide-react";
import { BUSINESS, LICENCE_LABEL } from "@/lib/site";

const ITEMS = [
  { Icon: ShieldCheck, title: "ESA Licensed", detail: LICENCE_LABEL },
  { Icon: BadgeCheck, title: "Fully Insured", detail: null },
  { Icon: Lightbulb, title: "Lutron RadioRA 3 Certified", detail: "Smart lighting design & installation" },
  { Icon: Star, title: "5-Star Google Rated", detail: null },
  { Icon: MapPin, title: "Serving London & Area", detail: `${BUSINESS.primaryAreas.slice(0, 4).join(", ")} & more` },
] as const;

export default function HeroTrustList() {
    return (
        <ul className="mt-8 space-y-4">
            {ITEMS.map(({ Icon, title, detail }) => (
                <li key={title} className="flex items-start gap-4">
                    <div className="mt-0.5 rounded-md bg-brand-gold/10 p-2 text-brand-gold">
                        <Icon size={18} aria-hidden="true" />
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-brand-cream">{title}</div>
                        {detail && (
                            <div className="text-xs text-brand-cream/70">{detail}</div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}
