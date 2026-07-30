"use client";

import dynamic from "next/dynamic";

// `ssr: false` is only allowed inside a Client Component boundary, so this
// tiny wrapper exists purely to let app/layout.tsx (a Server Component)
// keep the enquiry modal — closed by default, renders nothing until opened —
// out of the initial server render and load it as its own chunk on demand.
const EnquiryModal = dynamic(() => import("@/components/EnquiryModal"), {
  ssr: false,
});

export default EnquiryModal;
