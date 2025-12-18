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
                "md:hidden",
                "fixed left-0 right-0 z-40",
                "top-20",
                open ? "pointer-events-auto" : "pointer-events-none",
            ].join(" ")}
            aria-hidden={!open}
        >
            <div
                onClick={onClose}
                className={[
                    "fixed inset-0 top-20",
                    "bg-black/60 backdrop-blur-[2px]",
                    "transition-opacity duration-200",
                    open ? "opacity-100" : "opacity-0",
                ].join(" ")}
            />

            <div
                onClick={(e) => e.stopPropagation()}
                className={[
                    "relative w-full",
                    "border-t border-brand-cream/10 bg-brand-navy/95 backdrop-blur",
                    "shadow-[0_20px_40px_rgba(0,0,0,0.35)]",
                    "origin-top",
                    "transition-[transform,opacity] duration-200 ease-out",
                    open ? "scale-y-100 opacity-100" : "scale-y-95 opacity-0",
                ].join(" ")}
            >
                <div className="mx-auto w-full max-w-screen-2xl px-6 py-5">
                    <nav className="flex flex-col gap-2">
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(pathname, item);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={[
                                        "rounded-lg px-3 py-3 text-sm font-medium",
                                        "transition-colors",
                                        active
                                            ? "bg-brand-cream/10 text-brand-gold"
                                            : "text-brand-cream/90 hover:bg-brand-cream/10 hover:text-brand-gold",
                                    ].join(" ")}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        <div className="pt-2">
                            <Link
                                href="/book"
                                onClick={onClose}
                                className="inline-flex w-full items-center justify-center rounded-lg bg-brand-gold px-5 py-3
                  text-sm font-semibold text-brand-navy hover:bg-brand-gold-3 active:bg-brand-gold-2 transition-colors"
                            >
                                Book Now
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
