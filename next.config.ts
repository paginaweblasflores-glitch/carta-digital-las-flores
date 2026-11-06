import type { NextConfig } from "next";

// Exportación estática: la carta se puede publicar en cualquier hosting (Vercel, Netlify, cPanel...).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
