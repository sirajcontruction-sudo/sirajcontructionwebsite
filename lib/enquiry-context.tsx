"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Split into two contexts on purpose.
 *
 * Previously a single context carried both the modal state and the two
 * actions in one object memoised on `[isOpen, presetSubject]`. Every
 * consumer therefore re-rendered whenever the modal opened or closed — and
 * almost every consumer (the navbar, the hero CTA, all four package header
 * cards, all four mobile package cards, the contact form) only ever calls
 * `openEnquiry` and does not read `isOpen` at all.
 *
 * The actions object is now created once and never changes identity, so
 * those components never re-render from this context again. Only the modal
 * subscribes to the state half.
 */

type EnquiryState = {
  isOpen: boolean;
  presetSubject: string;
};

type EnquiryActions = {
  openEnquiry: (subject?: string) => void;
  closeEnquiry: () => void;
};

const EnquiryStateContext = createContext<EnquiryState | null>(null);
const EnquiryActionsContext = createContext<EnquiryActions | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EnquiryState>({
    isOpen: false,
    presetSubject: "General Enquiry",
  });

  // Both callbacks use the functional setState form, so neither closes over
  // state and neither needs a dependency — their identity stays stable for
  // the lifetime of the provider.
  const openEnquiry = useCallback((subject?: string) => {
    setState({ isOpen: true, presetSubject: subject ?? "General Enquiry" });
  }, []);

  const closeEnquiry = useCallback(() => {
    setState((prev) => (prev.isOpen ? { ...prev, isOpen: false } : prev));
  }, []);

  const actions = useMemo(
    () => ({ openEnquiry, closeEnquiry }),
    [openEnquiry, closeEnquiry]
  );

  return (
    <EnquiryActionsContext.Provider value={actions}>
      <EnquiryStateContext.Provider value={state}>
        {children}
      </EnquiryStateContext.Provider>
    </EnquiryActionsContext.Provider>
  );
}

/** Actions only — subscribing to this never causes a re-render. */
export function useEnquiry() {
  const ctx = useContext(EnquiryActionsContext);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}

/** State half — intended for the modal itself. */
export function useEnquiryState() {
  const ctx = useContext(EnquiryStateContext);
  if (!ctx) throw new Error("useEnquiryState must be used within EnquiryProvider");
  return ctx;
}
