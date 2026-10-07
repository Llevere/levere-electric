import type { NextConfig } from "next";

const BLOB_HOST = "https://lsx1noiu2kmtzxqs.public.blob.vercel-storage.com";
const isDev = process.env.NODE_ENV !== "production";
const isPreview = process.env.VERCEL_ENV === "preview";
const isNonProdDeploy =
  !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

// Everything the production pages actually load is same-origin: Next chunks,
// self-hosted Geist, /_next/image, and Vercel Analytics at /_vercel/insights.
// The only cross-origin resource is the Blob host (lightbox / "open original").
const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js hydration/RSC payloads are inline scripts; a nonce would force every
  // page to render dynamically, so 'unsafe-inline' stays. 'unsafe-eval' and the
  // Vercel script host are only needed by `next dev`.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}${isPreview ? " https://vercel.live" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${BLOB_HOST}`,
  "font-src 'self'",
  `connect-src 'self'${isPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `frame-src ${isPreview ? "https://vercel.live" : "'none'"}`,
  "frame-ancestors 'none'",
  "form-action 'self' https://clienthub.getjobber.com",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Keep preview/branch deployments (e.g. dev.levere-electric.ca) out of search.
  ...(isNonProdDeploy
    ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
    : []),
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Nothing on the site renders wider than ~1200 CSS px; trimming the list
    // shortens every srcset and caps the no-srcset fallback at 1920w.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Cache optimised images for 30 days instead of the 60-second default
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lsx1noiu2kmtzxqs.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // /index is served as a 200 duplicate of the home page otherwise.
      { source: "/index", destination: "/", permanent: true },
      // Old Jobber Sites URLs that Google may still hold.
      {
        source: "/service/ev-charger-installs",
        destination: "/ev-charger-installation",
        permanent: true,
      },
      { source: "/service/:slug*", destination: "/services", permanent: true },
      { source: "/contact", destination: "/book", permanent: true },
    ];
  },
};

export default nextConfig;
