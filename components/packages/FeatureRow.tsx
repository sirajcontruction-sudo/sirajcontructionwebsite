import { CheckCircle2, XCircle } from "lucide-react";
import type { SpecLine } from "@/data/packages";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

/**
 * Renders a single "label: value" spec line as one table-like row — a
 * fixed-proportion label column (45%) and a value column (remaining
 * space), so the same row across all four package panels lines up at the
 * same left/right edges regardless of how long each package's value text
 * is.
 * - "Included"     -> green check + label
 * - "Not Included" -> muted X + label
 * - anything else  -> the actual specification text, wrapped as needed
 */
export default function FeatureRow({ label, value }: SpecLine) {
  const normalized = normalize(value);
  const isIncluded = normalized === "included";
  const isNotIncluded = normalized === "not included";

  return (
    <li className="grid grid-cols-[45%_1fr] items-start gap-3 py-3">
      <span className="text-sm font-medium leading-snug text-ink">{label}</span>

      {isIncluded ? (
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          Included
        </span>
      ) : isNotIncluded ? (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft/50">
          <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Not Included
        </span>
      ) : (
        <span className="text-sm leading-snug text-ink-soft">{value}</span>
      )}
    </li>
  );
}
