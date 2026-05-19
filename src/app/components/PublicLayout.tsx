"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "./Nav/Navbar";
import Footer from "./layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
      <Analytics />
    </div>
  );
}
