import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const SITE = {
  name: "SRAJ Construction & Interior",
  shortName: "SRAJ",
  tagline: "Building Trust. Crafting Spaces.",

  // Display Number
  phone: "+91 99940 26462",

  // WhatsApp Number (NO +, NO SPACES, NO DASHES)
  phoneRaw: "919994026462",

  email: "sraj.enquiry@gmail.com",

  // Office address — stays in Chennai. Do not change.
  address: "No.41, Thirumal Nagar, Kadappa Road, Madhanakuppam, Chennai – 600099",

  addressShort: "Madhanakuppam, Chennai – 600099",

  // Primary cities we actively deliver construction, architecture, interior
  // design and turnkey projects in. The office itself remains in Chennai.
  serviceAreas: ["Chennai", "Trichy", "Tirunelveli"],

  mapEmbedQuery:
    "No.41, Thirumal Nagar, Kadappa Road, Madhanakuppam, Chennai 600099",

  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=No.41+Thirumal+Nagar+Kadappa+Road+Madhanakuppam+Chennai+600099",
};
