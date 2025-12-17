"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isActive } from "./navItems";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function MobileMenu({ open, onClose }: Props) {
    const pathname = usePathname();

    return (
        <div
            className={[
                "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
                open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            ].join(" ")}
        >
            <div className="border-t border-brand-cream/10 bg-brand-navy px-6 py-4">
                <div className="flex flex-col gap-3">
                    {NAV_ITEMS.map((item) => {
                        const active = isActive(pathname, item);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}  // ✅ close only when user navigates
                                className={[
                                    "py-2 text-sm font-medium",
                                    active ? "text-brand-gold" : "text-brand-cream/90 hover:text-brand-gold",
                                ].join(" ")}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <Link
                        href="/book"
                        onClick={onClose}
                        className="mt-2 inline-flex w-fit items-center justify-center rounded-md bg-brand-gold px-5 py-2
                       text-sm font-semibold text-brand-navy hover:bg-brand-gold-3 active:bg-brand-gold-2"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
