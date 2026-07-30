import { Building2, Landmark, Waves, type LucideIcon } from "lucide-react";

export type ServiceLocation = {
  id: string;
  city: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  services: string[];
};

export const serviceLocations: ServiceLocation[] = [
  {
    id: "chennai",
    city: "Chennai",
    tagline: "Head Office & Home Base",
    description:
      "Our home base — full-scale civil contracting, architecture and interior design delivered end-to-end by our head office team, from Kolathur and Ambattur to Madhavaram and greater Chennai.",
    icon: Building2,
    services: ["Construction", "Interior Design", "Architecture", "Turnkey Projects"],
  },
  {
    id: "trichy",
    city: "Trichy",
    tagline: "Expanding Our Reach",
    description:
      "Fixed-rate construction and interior design for Trichy, backed by the same certified engineering, transparent contracts and dedicated site supervision as our Chennai projects.",
    icon: Landmark,
    services: ["Construction", "Interior Design", "Architecture", "Turnkey Projects"],
  },
  {
    id: "tirunelveli",
    city: "Tirunelveli",
    tagline: "Building Trust, Further South",
    description:
      "Bringing SRAJ's construction and interior expertise to Tirunelveli — from design and structural work through to final handover, managed by a single point of contact.",
    icon: Waves,
    services: ["Construction", "Interior Design", "Architecture", "Turnkey Projects"],
  },
];
