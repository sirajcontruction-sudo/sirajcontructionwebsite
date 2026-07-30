import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/lib/lenis-provider";
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
    images: [{ url: "/logo.png", width: 520, height: 575, alt: SITE.name }],
  },
  twitter: {
    card: "summary",
    title: `${SITE.name} | Premium Construction & Interiors in ${serviceAreaAmpersand}`,
    description:
      `Civil contracting, construction, architecture, interior design, turnkey construction and renovation across ${serviceAreaAmpersand}.`,
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
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
      </body>
    </html>
  );
}
