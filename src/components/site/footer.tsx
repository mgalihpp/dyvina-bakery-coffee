import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { gutter } from "./section";

const heading = "text-[11px] font-semibold tracking-[0.25em] text-gold-muted";

export function Footer() {
  return (
    <footer className="bg-ink text-sand">
      <div
        className={`${gutter} grid gap-8 py-10 md:grid-cols-4 md:gap-20 md:py-16`}
      >
        <div className="flex flex-col gap-3">
          <p className="font-heading text-3xl font-light tracking-[0.18em] text-cream md:text-[40px] md:tracking-[0.18em]">
            DYVINA
          </p>
          <p className={`${heading} tracking-[0.2em]`}>BAKERY & COFFEE</p>
        </div>
        <div className="flex flex-col gap-2.5 text-sm">
          <p className={`${heading} hidden md:block`}>MENU</p>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-[13px] md:gap-2.5 md:text-sm">
          <p className={`${heading} hidden md:block`}>KUNJUNGI</p>
          <p>{site.address}</p>
          <p>{site.hours}</p>
        </div>
        <div className="flex flex-col gap-2 text-[13px] md:gap-2.5 md:text-sm">
          <p className={`${heading} hidden md:block`}>HUBUNGI</p>
          <p>WhatsApp {site.phone}</p>
          <p className="text-[11px] text-[#8f897d] md:text-sm md:text-sand">
            © {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
