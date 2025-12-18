"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { NAV_ITEMS, isActive } from "./navItems";

export default function NavLinks() {
    const pathname = usePathname();

    const navRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);

    const activeIndex = useMemo(() => {
        const idx = NAV_ITEMS.findIndex((item) => isActive(pathname, item));
        return idx === -1 ? 0 : idx;
    }, [pathname]);

    const moveIndicator = (index: number) => {
        const nav = navRef.current;
        const indicator = indicatorRef.current;
        if (!nav || !indicator) return;

        const linkEl = nav.children[index] as HTMLElement | undefined;
        if (!linkEl) return;

        indicator.style.width = `${linkEl.offsetWidth}px`;
        indicator.style.transform = `translateX(${linkEl.offsetLeft}px)`;
    };

    useEffect(() => {
        requestAnimationFrame(() => moveIndicator(activeIndex));
    }, [activeIndex]);

    useEffect(() => {
        const onResize = () => moveIndicator(activeIndex);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [activeIndex]);


    return (
        <nav className="relative hidden md:flex">
            <div
                ref={navRef}
                onMouseLeave={() => moveIndicator(activeIndex)}
                className="flex items-center gap-6 lg:gap-10 whitespace-nowrap h-full"
            >
                {NAV_ITEMS.map((item, index) => {
                    const active = isActive(pathname, item);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onMouseEnter={() => moveIndicator(index)}
                            className={`pb-3 text-[13px] lg:text-sm font-medium transition-colors ${active ? "text-brand-gold" : "text-brand-cream hover:text-brand-gold"} `}
                        >
                            {item.label === "EV Charger Installation" ? (
                                <>
                                    <span className="hidden lg:inline">EV Charger Installation</span>
                                    <span className="lg:hidden">EV Charger</span>
                                </>
                            ) : (
                                item.label
                            )}
                        </Link>
                    );
                })}
            </div>

            <span
                ref={indicatorRef}
                className="absolute bottom-0 h-0.5 bg-brand-gold transition-all duration-300 ease-out"
            />
        </nav>
    );
}
