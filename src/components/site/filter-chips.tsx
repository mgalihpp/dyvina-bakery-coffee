import Link from "next/link";
import { cn } from "@/lib/utils";

export function FilterChips({
  items,
  className,
  compact,
}: {
  items: readonly { href: string; label: string; active: boolean }[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <nav
      aria-label="Filter"
      className={cn(
        "-mx-5 flex overflow-x-auto px-5 md:mx-0 md:flex-wrap md:gap-2 md:overflow-visible md:px-0",
        compact ? "gap-1.5" : "gap-2",
        className,
      )}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          scroll={false}
          className={cn(
            "shrink-0 rounded-sm border py-2 text-[13px] font-semibold transition-colors md:px-4.5 md:py-2.5 md:text-sm",
            compact ? "px-2.75" : "px-3.5",
            item.active
              ? "border-brand bg-brand text-cream"
              : "border-line text-ink hover:bg-cream-dark",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
