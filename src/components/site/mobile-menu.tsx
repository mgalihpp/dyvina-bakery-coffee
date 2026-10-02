"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/site";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Buka menu"
        className="inline-flex size-9 items-center justify-center text-cream md:hidden"
      >
        <MenuIcon className="size-6" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-cream text-ink">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl tracking-[0.2em]">
            DYVINA
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-6">
          {navLinks.map((link) => (
            <SheetClose
              key={link.href}
              nativeButton={false}
              render={<Link href={link.href} />}
              className="border-b border-line py-4 text-base"
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
