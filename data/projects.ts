export type Project = {
  id: string;
  title: string;
  category: "Residential" | "Interior" | "Renovation" | "Commercial";
  location: string;
  area: string;
  gradient: string;
};

// Placeholder portfolio entries — replace with real project photography in /public/projects
export const projects: Project[] = [
  { id: "p1", title: "Contemporary Villa", category: "Residential", location: "Ambattur, Chennai", area: "2,400 sqft", gradient: "from-royal-700 via-royal-600 to-sky" },
  { id: "p2", title: "Modular Kitchen Suite", category: "Interior", location: "Kolathur, Chennai", area: "180 sqft", gradient: "from-navy via-royal-800 to-royal-500" },
  { id: "p3", title: "Independent House", category: "Residential", location: "Madhavaram, Chennai", area: "1,850 sqft", gradient: "from-royal-800 via-navy to-royal-600" },
  { id: "p4", title: "Full Home Interior", category: "Interior", location: "Chennai", area: "3,200 sqft", gradient: "from-sky via-royal-600 to-navy" },
  { id: "p5", title: "Façade Renovation", category: "Renovation", location: "Ambattur, Chennai", area: "2,000 sqft", gradient: "from-royal-600 via-royal-900 to-navy" },
  { id: "p6", title: "Duplex Residence", category: "Residential", location: "Kolathur, Chennai", area: "3,600 sqft", gradient: "from-navy via-sky to-royal-700" },
];

export const projectCategories = ["All", "Residential", "Interior", "Renovation", "Commercial"] as const;
