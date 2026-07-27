export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    id: "f1",
    question: "What is included in your construction package rate?",
    answer:
      "Each package (Budget, Economic, Premium, Luxury) includes design & drawings, structural work, kitchen, bathroom, joineries, paint, flooring and electrical as per the specification listed in that tier. Compound wall, EB/water connections, government approvals, sump and septic tank are billed separately as noted in exclusions.",
  },
  {
    id: "f2",
    question: "Do you provide free site visits and quotations?",
    answer:
      "Yes. We offer a free initial site visit and consultation within Chennai, Kolathur, Ambattur and Madhavaram, followed by a detailed written quotation based on your plot size and chosen package.",
  },
  {
    id: "f3",
    question: "How long does a typical residential project take?",
    answer:
      "A standard independent house (1,500–2,500 sqft) typically takes 8–12 months from foundation to handover, depending on design complexity, weather and approval timelines. We share a milestone-based schedule at contract signing.",
  },
  {
    id: "f4",
    question: "Can I switch between construction package tiers mid-project?",
    answer:
      "Upgrades are possible before the relevant work stage begins (e.g. upgrading flooring before flooring work starts). Our team will guide you on cost implications for any tier change.",
  },
  {
    id: "f5",
    question: "Do you handle interior design separately from construction?",
    answer:
      "Yes. Interior design and modular work (kitchen, wardrobes, false ceiling) can be booked independently of construction, using our interior rate card for plywood, laminate and finish specifications.",
  },
  {
    id: "f6",
    question: "What areas do you currently service?",
    answer:
      "We actively service Kolathur, Ambattur, Madhavaram and greater Chennai. For projects outside these areas, please reach out and we'll confirm feasibility.",
  },
];
