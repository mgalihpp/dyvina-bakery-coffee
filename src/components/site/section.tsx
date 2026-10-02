import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const gutter = "px-5 md:px-12 lg:px-30";

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold tracking-[0.22em] text-brand uppercase md:text-xs md:tracking-[0.25em]",
        className,
      )}
      {...props}
    />
  );
}

export function SectionHeading({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "font-heading text-3xl leading-tight text-ink md:text-[44px]",
        className,
      )}
      {...props}
    />
  );
}

export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
    >
      {children}
      <ArrowRightIcon className="size-4" />
    </Link>
  );
}
