import { CheckCircle2, XCircle } from "lucide-react";
import type { SpecLine } from "@/data/packages";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

/**
 * Renders a single "label: value" spec line as one table-like row — a
 * fixed-proportion label column (36%) and a value column (remaining
 * space), so the same row across all four package panels lines up at the
 * same left/right edges regardless of how long each package's value text
 * is.
 * - "Included"     -> green check + label
 * - "Not Included" -> muted X + label
 * - anything else  -> the actual specification text, wrapped naturally
 *
 * Wrapping notes (why this took a few passes to get right):
 *
 * 1. `min-w-0` on the row and every cell is essential. CSS Grid items
 *    default to `min-width: auto`, meaning a column will never shrink
 *    below its content's intrinsic width. Without this, a long value
 *    like "bed/kitchen/pooja" was forcing the whole grid track wider,
 *    pushing text out past the card's edge instead of wrapping.
 *
 * 2. `overflow-wrap: break-word` (NOT `anywhere`) is deliberate.
 *    `break-word` only splits a word as an absolute last resort — when
 *    that single word is wider than the entire column even on a line by
 *    itself. `overflow-wrap: anywhere` is more aggressive: it's allowed
 *    to insert a break literally anywhere to avoid overflow, which is
 *    what produced ugly mid-word splits earlier ("p"/"ooja", "pooj"/"a").
 *
 * 3. In the narrowest real layout (desktop's 4-up comparison grid, after
 *    a ~180px sidebar), even a fairly short word like "pooja" was still
 *    a few pixels too wide for its column at the default text-sm size —
 *    each width increase closed the gap by one more character instead of
 *    fully fitting it. Dropping to text-xs for this row (still fully
 *    legible body text) and giving the value column more of the row's
 *    width (36/64 instead of 45/55) gives enough headroom that "pooja"
 *    now fits on one line as a whole, un-split word in that tightest case.
 */
export default function FeatureRow({ label, value }: SpecLine) {
  const normalized = normalize(value);
  const isIncluded = normalized === "included";
  const isNotIncluded = normalized === "not included";

  return (
    <li className="grid min-w-0 grid-cols-[36%_1fr] items-start gap-2.5 py-3">
      <span className="min-w-0 text-xs font-medium leading-snug text-ink">{label}</span>

      {isIncluded ? (
        <span className="inline-flex min-w-0 items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Included
        </span>
      ) : isNotIncluded ? (
        <span className="inline-flex min-w-0 items-center gap-1.5 text-xs font-medium text-ink-soft/50">
          <XCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Not Included
        </span>
      ) : (
        <span className="min-w-0 text-xs leading-relaxed text-ink-soft [overflow-wrap:break-word] [white-space:normal] [word-break:normal]">
          {value}
        </span>
      )}
    </li>
  );
}
