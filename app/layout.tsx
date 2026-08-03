import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/lib/lenis-provider";
import MotionProvider from "@/lib/motion-provider";
import { EnquiryProvider } from "@/lib/enquiry-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingButtons from "@/components/FloatingButtons";
import EnquiryModal from "@/components/EnquiryModalLoader";
import { SITE } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteUrl = "https://www.srajconstruction.com";

// e.g. "Chennai, Trichy & Tirunelveli"
const serviceAreaAmpersand = SITE.serviceAreas.join(", ").replace(/,([^,]*)$/, " &$1");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} | Premium Construction & Interiors in ${serviceAreaAmpersand}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    `SRAJ Construction & Interior — civil contracting, residential construction, architecture, interior design, turnkey construction and renovation across ${serviceAreaAmpersand}.`,
  keywords: [
    "construction company Chennai",
    "construction company Trichy",
    "construction company Tirunelveli",
    "civil contractor Chennai",
    "civil contractor Trichy",
    "civil contractor Tirunelveli",
    "interior design Chennai",
    "interior design Trichy",
    "interior design Tirunelveli",
    "turnkey construction Chennai",
    "turnkey construction Trichy",
    "turnkey construction Tirunelveli",
    "architecture firm Trichy",
    "architecture firm Tirunelveli",
    "house construction Kolathur",
    "house construction Ambattur",
    "renovation Chennai",
    "renovation Trichy",
    "renovation Tirunelveli",
    "SRAJ Construction",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: `${SITE.name} | Premium Construction & Interiors in ${serviceAreaAmpersand}`,
    description:
      `Civil contracting, construction, architecture, interior design, turnkey construction and renovation across ${serviceAreaAmpersand}.`,
    siteName: SITE.name,
    // Crawlers fetch this raw, bypassing next/image — so it points at the
    // pre-sized square icon rather than the 4160px master.
    images: [{ url: "/favicon-512.png", width: 512, height: 512, alt: SITE.name }],
  },
  twitter: {
    card: "summary",
    title: `${SITE.name} | Premium Construction & Interiors in ${serviceAreaAmpersand}`,
    description:
      `Civil contracting, construction, architecture, interior design, turnkey construction and renovation across ${serviceAreaAmpersand}.`,
    images: ["/favicon-512.png"],
  },
  // Dedicated square icons rather than the full logo. Browsers fetch the
  // favicon eagerly and unoptimised — pointing it at the main logo meant
  // downloading the whole artwork to render a 16px tab icon.
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/favicon-192.png", sizes: "192x192", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: SITE.name,
  image: `${siteUrl}/logo.png`,
  "@id": siteUrl,
  url: siteUrl,
  telephone: SITE.phone,
  email: SITE.email,
  // Office location — stays in Chennai.
  address: {
    "@type": "PostalAddress",
    streetAddress: "No.41, Thirumal Nagar, Kadappa Road, Madhanakuppam",
    addressLocality: "Chennai",
    postalCode: "600099",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  // Cities SRAJ actively delivers construction, architecture, interior
  // design and turnkey projects in (office remains Chennai-based).
  areaServed: SITE.serviceAreas.map((city) => ({
    "@type": "City",
    name: city,
  })),
  priceRange: "₹₹",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <MotionProvider>
          <LenisProvider>
            <EnquiryProvider>
              <ScrollProgress />
              <Navbar />
              {children}
              <Footer />
              <FloatingButtons />
              <EnquiryModal />
            </EnquiryProvider>
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
