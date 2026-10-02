import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export function BackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex w-fit items-center gap-1.5 text-[13px] text-ink-soft hover:text-ink"
    >
      <ArrowLeftIcon className="size-4" />
      {children}
    </Link>
  );
}
