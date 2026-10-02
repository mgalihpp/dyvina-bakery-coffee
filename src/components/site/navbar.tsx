import Link from "next/link";
import { CartLink } from "@/components/cart/cart-link";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";
import { gutter } from "./section";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-brand text-cream">
      <div
        className={`${gutter} flex items-center justify-between py-4 md:py-5`}
      >
        <Link
          href="/"
          className="font-heading text-[22px] font-light tracking-[0.18em] md:text-[26px] md:tracking-[0.23em]"
        >
          DYVINA
        </Link>
        <NavLinks />
        <div className="flex items-center gap-4">
          <CartLink />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
