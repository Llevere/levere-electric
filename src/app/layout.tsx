import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import PublicLayout from "./components/PublicLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://levere-electric.ca";

export const metadata: Metadata = {
  verification: {
    google: "R1iKLziAYLQAvQLHLOYQj51E3QsIsuuKnVex6-BNjUc",
  },
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Levere Electric | Licensed Electrician in London, ON",
    template: "%s | Levere Electric",
  },
  description:
    "ESA-licensed residential electrician serving London, St. Thomas, Dorchester & Komoka. EV charger installs, panel upgrades, lighting & repairs. ECRA/ESA #7017944.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "Levere Electric",
    title: "Levere Electric | Licensed Electrician in London, ON",
    description:
      "ESA-licensed residential electrician serving London, St. Thomas, Dorchester & Komoka. EV charger installs, panel upgrades, lighting & repairs.",
  },
  twitter: {
    card: "summary",
    title: "Levere Electric | Licensed Electrician in London, ON",
    description:
      "ESA-licensed residential electrician serving London, St. Thomas, Dorchester & Komoka.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased min-h-dvh bg-brand-navy text-brand-cream`}
      >
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
