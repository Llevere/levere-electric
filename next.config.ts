import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent the site from being embedded in iframes (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Stop browsers from guessing MIME types
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control how much referrer info is sent
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features that aren't needed
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Force HTTPS for 1 year once the site is live
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // Content Security Policy — controls what scripts/styles/resources can load
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for its hydration scripts
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      // Tailwind and Next.js inject inline styles
      "style-src 'self' 'unsafe-inline'",
      // Vercel Blob + data URIs for images
      `img-src 'self' data: https://lsx1noiu2kmtzxqs.public.blob.vercel-storage.com`,
      // Geist font is self-hosted by next/font — no external font CDN needed
      "font-src 'self'",
      // Vercel Analytics beacon
      "connect-src 'self' https://vitals.vercel-insights.com",
      // Prevents other sites from embedding this one
      "frame-ancestors 'none'",
      // Restricts where forms can submit
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
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
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
