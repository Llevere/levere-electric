"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import BookNowButton from "../BookNowButton";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    if (mobileOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full bg-brand-navy">
        <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center px-6">
          <div className="shrink-0">
            <NavbarLogo />
          </div>

          <div className="flex flex-1 justify-center px-6">
            <NavLinks />
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <BookNowButton href="#" px="5" py="2" />

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-md p-2
                text-brand-cream hover:bg-brand-cream/10 transition"
            >
              <div className="relative h-5 w-6">
                <span
                  className={[
                    "absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform duration-200",
                    mobileOpen ? "translate-y-2.25 rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-2.25 h-0.5 w-6 bg-current transition-opacity duration-200",
                    mobileOpen ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-4.5 h-0.5 w-6 bg-current transition-transform duration-200",
                    mobileOpen ? "-translate-y-2.25 -rotate-45" : "",
                  ].join(" ")}
                />
              </div>
            </button>
          </div>
        </div>

        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </header>

      <div className="h-20" />
    </>
  );
}
