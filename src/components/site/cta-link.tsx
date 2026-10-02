import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-brand text-cream hover:bg-brand/90",
  outline: "border border-ink text-ink hover:bg-ink/5",
  outlineLight: "border border-cream text-cream hover:bg-cream/10",
} as const;

export function ctaClass(variant: keyof typeof variants, className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-sm px-6 py-3.5 text-sm font-semibold tracking-[0.5px] transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className,
  );
}

export function CtaLink({
  variant,
  className,
  ...props
}: React.ComponentProps<typeof Link> & { variant: keyof typeof variants }) {
  return <Link className={ctaClass(variant, className)} {...props} />;
}
