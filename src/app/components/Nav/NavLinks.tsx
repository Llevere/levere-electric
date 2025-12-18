"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { NAV_ITEMS, isActive } from "./navItems";

export default function NavLinks() {
    const pathname = usePathname();

    const navRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);

    const HOVER_IN_DELAY = 70;
    const SNAP_BACK_DELAY = 180;

    const hoverInTimeoutRef = useRef<number | null>(null);
    const snapBackTimeoutRef = useRef<number | null>(null);

    const activeIndex = useMemo(() => {
        return NAV_ITEMS.findIndex((item) => isActive(pathname, item));
    }, [pathname]);

    const clearHoverIn = () => {
        if (hoverInTimeoutRef.current !== null) {
            window.clearTimeout(hoverInTimeoutRef.current);
            hoverInTimeoutRef.current = null;
        }
    };

    const clearSnapBack = () => {
        if (snapBackTimeoutRef.current !== null) {
            window.clearTimeout(snapBackTimeoutRef.current);
            snapBackTimeoutRef.current = null;
        }
    };

    const clearAllTimers = () => {
        clearHoverIn();
        clearSnapBack();
    };

    const moveIndicator = (index: number) => {
        const nav = navRef.current;
        const indicator = indicatorRef.current;
        if (!nav || !indicator) return;

        if (index === -1) {
            indicator.style.width = "0px";
            indicator.style.opacity = "0";
            return;
        }

        const linkEl = nav.children[index] as HTMLElement | undefined;
        if (!linkEl) return;

        indicator.style.opacity = "1";
        indicator.style.width = `${linkEl.offsetWidth}px`;
        indicator.style.transform = `translateX(${linkEl.offsetLeft}px)`;
    };

    const scheduleHoverIn = (index: number) => {
        clearSnapBack();
        clearHoverIn();

        hoverInTimeoutRef.current = window.setTimeout(() => {
            moveIndicator(index);
            hoverInTimeoutRef.current = null;
        }, HOVER_IN_DELAY);
    };

    const scheduleSnapBack = () => {
        clearSnapBack();
        clearHoverIn();

        snapBackTimeoutRef.current = window.setTimeout(() => {
            moveIndicator(activeIndex);
            snapBackTimeoutRef.current = null;
        }, SNAP_BACK_DELAY);
    };

    useEffect(() => {
        requestAnimationFrame(() => moveIndicator(activeIndex));
    }, [activeIndex]);

    useEffect(() => {
        const onResize = () => moveIndicator(activeIndex);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [activeIndex]);

    useEffect(() => {
        return () => clearAllTimers();
    }, []);

    return (
        <nav className="relative hidden md:flex">
            <div
                ref={navRef}
                className="flex items-center gap-6 lg:gap-10 whitespace-nowrap h-full"
                onMouseEnter={clearAllTimers}
                onMouseLeave={scheduleSnapBack}
            >
                {NAV_ITEMS.map((item, index) => {
                    const active = isActive(pathname, item);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onMouseEnter={() => scheduleHoverIn(index)}
                            onMouseLeave={clearHoverIn}
                            className={`pb-3 text-[13px] lg:text-sm font-medium transition-colors ${active ? "text-brand-gold" : "text-brand-cream hover:text-brand-gold"
                                }`}
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
                className="absolute bottom-0 h-0.5 bg-brand-gold transition-[width,transform,opacity] duration-300 ease-out"
            />
        </nav>
    );
}
