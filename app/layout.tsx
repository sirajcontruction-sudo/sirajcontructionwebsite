import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/lib/lenis-provider";
import { EnquiryProvider } from "@/lib/enquiry-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingButtons from "@/components/FloatingButtons";
import EnquiryModal from "@/components/EnquiryModal";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} | Premium Construction & Interiors in Chennai`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "SRAJ Construction & Interior — civil contracting, residential construction, architecture, interior design, turnkey construction and renovation across Kolathur, Ambattur, Madhavaram and Chennai.",
  keywords: [
    "construction company Chennai",
    "civil contractor Chennai",
    "interior design Chennai",
    "turnkey construction Chennai",
    "house construction Kolathur",
    "house construction Ambattur",
    "renovation Chennai",
    "SRAJ Construction",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: `${SITE.name} | Premium Construction & Interiors in Chennai`,
    description:
      "Civil contracting, construction, architecture, interior design, turnkey construction and renovation — Kolathur, Ambattur, Madhavaram & Chennai.",
    siteName: SITE.name,
    images: [{ url: "/logo.png", width: 520, height: 575, alt: SITE.name }],
  },
  twitter: {
    card: "summary",
    title: `${SITE.name} | Premium Construction & Interiors`,
    description:
      "Civil contracting, construction, architecture, interior design, turnkey construction and renovation in Chennai.",
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
  address: {
    "@type": "PostalAddress",
    streetAddress: "No.41, Thirumal Nagar, Kadappa Road, Madhanakuppam",
    addressLocality: "Chennai",
    postalCode: "600099",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: SITE.serviceAreas,
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
