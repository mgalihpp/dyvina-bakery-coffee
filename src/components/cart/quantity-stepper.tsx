import { MinusIcon, PlusIcon } from "lucide-react";
import { MAX_QUANTITY } from "@/lib/order";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  label,
  compact,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
  compact?: boolean;
}) {
  const button = cn(
    "flex items-center justify-center text-ink transition-colors hover:bg-cream-dark disabled:opacity-40 disabled:hover:bg-transparent",
    compact ? "size-8.5 md:size-11" : "size-11",
  );
  const icon = compact ? "size-4 md:size-4.5" : "size-4.5";

  return (
    <fieldset
      className="inline-flex min-w-0 items-center border border-line p-0"
      aria-label={label}
    >
      <button
        type="button"
        className={button}
        aria-label="Kurangi jumlah"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <MinusIcon className={icon} />
      </button>
      <output
        className={cn(
          "flex items-center justify-center font-semibold text-ink",
          compact
            ? "size-8.5 text-sm md:size-11 md:text-base"
            : "h-11 w-12 text-base md:w-11",
        )}
      >
        {value}
      </output>
      <button
        type="button"
        className={button}
        aria-label="Tambah jumlah"
        disabled={value >= MAX_QUANTITY}
        onClick={() => onChange(value + 1)}
      >
        <PlusIcon className={icon} />
      </button>
    </fieldset>
  );
}
