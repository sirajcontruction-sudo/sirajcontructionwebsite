import { CheckCircle2, XCircle } from "lucide-react";
import type { SpecLine } from "@/data/packages";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

/**
 * Renders a single "label: value" spec line inside an accordion.
 * - "Included"      -> green check + label
 * - "Not Included"   -> muted X + label
 * - anything else    -> stacked label (eyebrow) + full spec text, wrapped
 *   onto its own line so long specifications never get clipped or crammed
 *   next to the label.
 */
export default function FeatureRow({ label, value }: SpecLine) {
  const normalized = normalize(value);

  if (normalized === "included") {
    return (
      <li className="flex items-center justify-between gap-4 py-3">
        <span className="text-sm text-ink">{label}</span>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Included
        </span>
      </li>
    );
  }

  if (normalized === "not included") {
    return (
      <li className="flex items-center justify-between gap-4 py-3">
        <span className="text-sm text-ink-soft/70">{label}</span>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-ink-soft/50">
          <XCircle className="h-4 w-4" aria-hidden="true" />
          Not Included
        </span>
      </li>
    );
  }

  return (
    <li className="py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/60">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-ink">{value}</p>
    </li>
  );
}
