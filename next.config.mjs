/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // Next 16 only permits `quality` values listed here (default: [75]).
    // 90 is whitelisted for the logo: it is flat-colour artwork with hard
    // edges, where lossy codecs put visible ringing around the strokes at 75.
    // Photographs stay at 75, where the difference is imperceptible.
    qualities: [75, 90],
    // The logo renders at 200 CSS px in the hero. Without a 512 candidate the
    // browser jumps from 384 to 640, so a 2x display either under-samples or
    // downloads 2.5x more data than it needs.
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
