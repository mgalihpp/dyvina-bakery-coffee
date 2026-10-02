"use client";

import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { fieldClass } from "./ui";

export function FilterSelect({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <span className={cn("relative inline-flex", className)}>
      <select
        {...props}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className={cn(fieldClass, "h-11 appearance-none pr-10")}
      />
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-soft" />
    </span>
  );
}
