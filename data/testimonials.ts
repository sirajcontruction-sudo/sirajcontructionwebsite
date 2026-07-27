export type Testimonial = {
  id: string;
  name: string;
  location: string;
  role: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ramesh Kumar",
    location: "Ambattur",
    role: "Villa Owner",
    quote:
      "SRAJ delivered our home exactly on the promised timeline. The site engineer kept us updated every week and the finishing quality exceeded what we expected for the budget.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Priya Venkatesh",
    location: "Kolathur",
    role: "Homeowner",
    quote:
      "We chose the Premium package for our interiors — the modular kitchen and wardrobes look far more expensive than what we paid. Very transparent costing throughout.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Arun & Divya",
    location: "Madhavaram",
    role: "Independent House",
    quote:
      "From the 3D elevation to the final handover, the team was professional and honest about material choices. No hidden costs, no surprises.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Suresh Babu",
    location: "Chennai",
    role: "Renovation Client",
    quote:
      "Our 20-year-old house got a complete façade and interior renovation without demolishing the structure. Clean execution and minimal disruption to our daily life.",
    rating: 5,
  },
];
