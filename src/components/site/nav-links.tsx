"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden gap-10 text-sm tracking-wide md:flex">
      {navLinks.map((link) => {
        const active =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "underline-offset-8 hover:underline",
              active && "font-semibold underline",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
