"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type EnquiryContextValue = {
  isOpen: boolean;
  presetSubject: string;
  openEnquiry: (subject?: string) => void;
  closeEnquiry: () => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetSubject, setPresetSubject] = useState("General Enquiry");

  const value = useMemo(
    () => ({
      isOpen,
      presetSubject,
      openEnquiry: (subject?: string) => {
        setPresetSubject(subject ?? "General Enquiry");
        setIsOpen(true);
      },
      closeEnquiry: () => setIsOpen(false),
    }),
    [isOpen, presetSubject]
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}
