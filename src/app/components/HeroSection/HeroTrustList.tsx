import { ShieldCheck, BadgeCheck, Star, MapPin } from "lucide-react";

export default function HeroTrustList() {
    return (
        <ul className="mt-8 space-y-5">
            <li className="flex items-start gap-4">
                <div className="mt-0.5 rounded-md bg-brand-gold/10 p-2 text-brand-gold">
                    <ShieldCheck size={18} />
                </div>
                <div>
                    <div className="text-sm font-semibold text-brand-cream">ESA Licensed</div>
                    <div className="text-xs text-brand-cream/70">ECRA/ESA #7017944</div>
                </div>
            </li>

            <li className="flex items-start gap-4">
                <div className="mt-0.5 rounded-md bg-brand-gold/10 p-2 text-brand-gold">
                    <BadgeCheck size={18} />
                </div>
                <div>
                    <div className="text-sm font-semibold text-brand-cream">Fully Insured</div>
                </div>
            </li>

            <li className="flex items-start gap-4">
                <div className="mt-0.5 rounded-md bg-brand-gold/10 p-2 text-brand-gold">
                    <Star size={18} />
                </div>
                <div>
                    <div className="text-sm font-semibold text-brand-cream">5-Star Google Rated</div>
                </div>
            </li>

            <li className="flex items-start gap-4">
                <div className="mt-0.5 rounded-md bg-brand-gold/10 p-2 text-brand-gold">
                    <MapPin size={18} />
                </div>
                <div>
                    <div className="text-sm font-semibold text-brand-cream">Serving London &amp; Area</div>
                    <div className="text-xs text-brand-cream/70">
                        London, St. Thomas, Dorchester, Komoka &amp; more
                    </div>
                </div>
            </li>
        </ul>
    );
}
